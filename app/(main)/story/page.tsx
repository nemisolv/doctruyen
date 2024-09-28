import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const page = () => {
    return ( 
        <div>
            <h1>protected route</h1>
            <Button
            className="text-red-500 bg-white"
            >Click me!</Button>
            <UserButton/>
        </div>
     );
}
 
export default page;