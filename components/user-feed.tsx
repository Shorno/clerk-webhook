import {prisma} from "@/lib/prisma";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {likePost} from "@/app/actions/like-post";
import {auth} from "@clerk/nextjs/server";
import {ThumbsUp} from "lucide-react";

export default async function UserFeed() {
    const {userId} = await auth()
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true,
                    avatar: true
                }
            },
            _count: {
                select: {
                    likes: true
                }
            },
            likes: {
                include: {
                    liker: {
                        select: {
                            username: true
                        }
                    }
                }
            },
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const postsWithLikeStatus = posts.map((post) => (
        {
            ...post, hasLiked: post.likes.some((like) => like.likerId === userId)
        }
    ))

    return (
        <div className="flex justify-center items-center container mx-auto py-10 ">
            <div className="flex flex-col justify-center gap-4">
                {postsWithLikeStatus.map((post) => (
                    <Card className="w-sm" key={post.id}>
                        <CardHeader>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex items-center gap-2"}>
                                    <Image src={post.author.avatar || ""} alt={"avatar"} width={30} height={30}
                                           className={"rounded-full"}/>
                                    <h2 className={"capitalize text-muted-foreground"}>{post.author.username}</h2>
                                </div>
                                <CardDescription
                                    className={"text-muted-foreground"}>{new Date(post.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</CardDescription>
                            </div>
                            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3">{post.content}</CardDescription>
                        </CardHeader>
                        <CardFooter className={"flex flex-col gap-2 text-sm"}>
                            <div className={"flex gap-4 justify-between w-full"}>
                                <button className={"text-muted-foreground"}>{post._count.likes} likes</button>
                                {post.likes.map((like) => (
                                    <div key={like.id} className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">{like.liker.username}</span>
                                    </div>
                                ))}
                                <button className={"text-muted-foreground"}>0 comment</button>
                            </div>
                            <Separator/>
                            <div className={"flex justify-between w-full items-center text-sm"}>
                                <div className={"flex gap-4"}>
                                    <form action={likePost}>
                                        <input type={"hidden"} name={"postId"} value={post.id}/>
                                        <button type={"submit"}
                                                className={`${post.hasLiked ? "text-[#1e76ff]" : "text-muted-foreground"} cursor-pointer flex justify-center items-center gap-1`}>
                                            <ThumbsUp size={16} color={`${post.hasLiked ? "#1e76ff" : "#737373FF"}`}
                                                      fill={`${post.hasLiked ? "#1e76ff" : "#fff"}`}/>
                                            Like
                                        </button>
                                    </form>
                                    <button className={"text-muted-foreground"}>Comment</button>
                                </div>
                                <button className={"text-muted-foreground"}>Share</button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}