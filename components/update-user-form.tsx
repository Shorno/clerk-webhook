"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { UserProfileProps } from "@/components/user-profile"
import { useForm } from "react-hook-form"
import { updateProfile } from "@/app/actions/update-profile"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {updateProfileSchema} from "@/schema/updateProfile";
import {zodResolver} from "@hookform/resolvers/zod";
import { toast } from "sonner"

type FormValues = {
    name?: string
    location?: string
    bio?: string
    job?: string
    website?: string
}

export default function UpdateUserForm({ user }: UserProfileProps) {
    const [isPending, setIsPending] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: user.displayName || "",
            location: user.location || "",
            bio: user.bio || "",
            job: user.job || "",
            website: user.website || "",
        },
    })

    async function onSubmit(data: FormValues) {
        setIsPending(true)

        try {
            const result = await updateProfile(data)

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update profile")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Update profile details</CardTitle>
                <CardDescription>Keep profile updated to connect more people</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your current location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your bio details" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="job"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Job</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your current job" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your website/portfolio link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

