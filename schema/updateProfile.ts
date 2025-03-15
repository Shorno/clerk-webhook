import {z} from "zod";

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    job: z.string().optional(),
    website: z.string().optional(),
})