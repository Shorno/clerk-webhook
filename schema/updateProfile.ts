import {z} from "zod";

export const updateProfileSchema = z.object({
    name: z.string(),
    location: z.string(),
    bio: z.string(),
    job: z.string(),
    website: z.string(),
})