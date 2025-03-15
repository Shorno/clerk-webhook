import {prisma} from "@/lib/prisma";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

export default async function UserFeed() {

    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    username: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <div className="flex justify-center items-center container mx-auto py-10 ">
            <div className="flex flex-col justify-center gap-4">
                {posts.map((post) => (
                    <Card className="w-sm" key={post.id}>
                        <CardHeader>
                            <div className={"flex items-center gap-2"}>
                                <Image src={post.author.avatar || ""} alt={"avatar"} width={30} height={30}
                                       className={"rounded-full"}/>
                                <h2 className={"capitalize text-muted-foreground"}>{post.author.username}</h2>
                            </div>
                            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3">{post.content}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <CardDescription className={"text-muted-foreground"}>{new Date(post.createdAt).toLocaleTimeString()}</CardDescription>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}