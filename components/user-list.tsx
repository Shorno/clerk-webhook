import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {prisma} from "@/lib/prisma";

export default async function UserList() {
    const users = await prisma.user.findMany();

    return (
        <>
            <div className="flex flex-wrap gap-4">
                {users.map((user) => (
                    <Card key={user.id} className="max-w-xs w-full flex-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <Image
                                    src={user.avatar || ""}
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className="rounded-full size-8 object-cover"
                                />
                                <h2>{user.username}</h2>
                            </CardTitle>
                            <CardDescription>
                                <p>{user.email}</p>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>
    )
}