import {z} from "zod";

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    job: z.string().optional(),
    website: z.string().optional(),
})

export const createPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
})