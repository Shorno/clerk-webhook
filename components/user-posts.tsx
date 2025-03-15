import {prisma} from "@/lib/prisma";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {auth} from "@clerk/nextjs/server";
import Image from "next/image";

export default async function UserPosts() {
    const {userId} = await auth()

    const posts = await prisma.post.findMany({
        where: {
            authorId: userId!
        },
        include: {
            author: true
        }
    });

    return (
        <div className="flex justify-center items-center container mx-auto ">
            <div className="flex flex-col justify-center  flex-wrap gap-4">
                {posts.map((post) => (
                    <Card className="w-sm" key={post.id}>
                        <CardHeader>
                           <div className={"flex items-center gap-2"}>
                               <Image src={post.author.avatar || ""} alt={"avatar"} width={30} height={30} className={"rounded-full"}/>
                               <h2 className={"capitalize text-muted-foreground"}>{post.author.username}</h2>
                           </div>
                            <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3">{post.content}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}