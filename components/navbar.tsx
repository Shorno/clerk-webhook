import {UserButton} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav className={"bg-[#2C3930]"}>
               <div className={"flex justify-between items-center container mx-auto py-2"}>
                   <Link href={"/"}>
                       <h1 className={"text-[#DCD7C9] text-2xl font-semibold"}>Next Social</h1>
                   </Link>
                   <div className={"flex justify-center items-center gap-10"}>
                       <div className={"text-white flex gap-4"}>
                           <Link href={"/my-posts"}>My Posts</Link>
                           <Link href={"/profile"}>Profile</Link>
                       </div>
                       <UserButton/>
                   </div>
               </div>
            </nav>
        </>
    )
}