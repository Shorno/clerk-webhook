"use client"

import {useForm} from "react-hook-form";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {createPostSchema} from "@/schema/schemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {toast} from "sonner";
import {CreatePost} from "@/app/actions/create-post";

type FormValues = {
    title: string
    content: string
}

export default function PostForm() {
    const [isPending, setIsPending] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    async function onSubmit(data: FormValues) {
        setIsPending(true)
        try {
            const result = await CreatePost(data)

            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create post")
        } finally {
            setIsPending(false)

        }
    }


    return (
        <div>
            <Card className={"max-w-lg mx-auto my-10"}>
                <CardHeader>
                    <CardTitle className={"text-2xl"}>Add new post</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form} >
                        <form className={"space-y-8"} onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={"title"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"Title"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"content"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={"Content"} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full flex justify-end"}>
                                <Button type={"submit"}>{isPending ? "Posting..." : "Post"}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}