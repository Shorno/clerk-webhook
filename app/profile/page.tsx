import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";
import {UserProfile} from "@/components/user-profile";
import UpdateUserForm from "@/components/update-user-form";

export default async function ProfilePage() {

    const {userId} = await auth()

    if (!userId) {
        return <div>Sign in to view this page</div>
    }

    const userDetails = await prisma.user.findUnique({
        where: {id: userId}
    })


    return (
        <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start justify-center">
                <div className="w-full max-w-md">
                    <UserProfile user={userDetails!} />
                </div>
                <div className="w-full max-w-md">
                    <UpdateUserForm user={userDetails!}/>
                </div>
            </div>
        </div>
    )
}