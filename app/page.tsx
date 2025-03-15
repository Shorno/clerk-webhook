import UserList from "@/components/user-list";
import UserFeed from "@/components/user-feed";

export default async function Home() {

    return (
        <div className="mx-auto container py-20">
            <UserList/>
            <UserFeed/>
        </div>
    );
}