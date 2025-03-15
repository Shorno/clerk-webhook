import {UserButton} from "@clerk/nextjs";

export default function Navbar() {
    return (
        <>
            <nav className={"bg-[#2C3930]"}>
               <div className={"flex justify-between items-center container mx-auto py-2"}>
                   <div>
                       <h1 className={"text-[#DCD7C9] text-2xl font-semibold"}>Next Social</h1>
                   </div>
                   <div>
                       <UserButton/>
                   </div>
               </div>
            </nav>
        </>
    )
}