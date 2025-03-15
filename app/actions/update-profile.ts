"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import {updateProfileSchema} from "@/schema/updateProfile";

type UpdateProfileResponse = {
    success: boolean
    message: string
}

export async function updateProfile(formData: z.infer<typeof updateProfileSchema>): Promise<UpdateProfileResponse> {
    try {
        const validatedData = updateProfileSchema.parse(formData)

        const { userId } = await auth()

        if (!userId) {
            return {
                success: false,
                message: "You must be logged in to update your profile",
            }
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                displayName: validatedData.name,
                bio: validatedData.bio,
                location: validatedData.location,
                job: validatedData.job,
                website: validatedData.website,
            },
        })

        revalidatePath("/profile")

        return {
            success: true,
            message: "Profile updated successfully",
        }
    } catch (error) {
        console.error("Profile update error:", error)

        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
            return {
                success: false,
                message: `Validation error: ${errorMessage}`,
            }
        }

        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update profile",
        }
    }
}

