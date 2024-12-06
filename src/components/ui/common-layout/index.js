import Header from "@/components/header";
import { Sheet, SheetTrigger } from "../sheet";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "@/actions";


async function CommonLayout({children}){
    const user=await currentUser();
    const profileInfo=await fetchProfileAction(user?.id);
    return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
        {/* Header Component */}
        <Header
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
        />
        
        {/* Main Content */}
        <main>{children}</main>
    </div>);
}
export default CommonLayout;
