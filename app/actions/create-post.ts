"use server"
import {z} from "zod";
import {createPostSchema} from "@/schema/schemas";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

type CreatePostResponse = {
    success: boolean
    message: string
}

export async function CreatePost(formData: z.infer<typeof createPostSchema>): Promise<CreatePostResponse> {

    try {
        const validatedData = createPostSchema.parse(formData)

        const {userId} = await auth()

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to create new post",
            }
        }

        await prisma.post.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                authorId: userId
            }
        })

        revalidatePath("/my-posts")

        return {
            success: true,
            message: "Post created successfully",
        }
    }catch (error){
        console.error("Post creation error:", error)

        if (error instanceof z.ZodError){
            const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
            return {
                success: false,
                message: `Validation error: ${errorMessage}`,
            }
        }

        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to create post",
        }
    }

}