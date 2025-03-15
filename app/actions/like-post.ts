"use server"
import {prisma} from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

export async function likePost(formData: FormData) {

    try {
        const postId = formData.get("postId") as string
        const {userId} = await auth();

        // Ensure user is authenticated
        if (!userId) {
            throw new Error("Unauthorized");
        }

        // Check if the user has already liked this post
        const existingLike = await prisma.like.findFirst({
            where: {
                likerId: userId,
                postId: postId
            }
        });

        if (existingLike) {
            // Unlike the post - delete the like
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            });
        } else {
            // Like the post - create a new like
            await prisma.like.create({
                data: {
                    likerId: userId,
                    postId: postId,
                    count: 1
                }
            });
        }

        revalidatePath("/");
    } catch (error) {
        console.error("Error processing like:", error);
        throw new Error("Failed to process like");
    }
}