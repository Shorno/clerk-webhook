import {prisma} from "@/lib/prisma";
import Image from "next/image";
import {UserButton} from "@clerk/nextjs";

export default async function Home() {
    const users = await prisma.user.findMany();

    return (
        <div className={"mx-auto container py-20"}>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <Image src={user.avatar || ""} alt={"avatar"} width={30} height={30}
                           className={"rounded-full object-contain"}/>
                </div>
            ))}
            <UserButton/>
        </div>
    );
}
