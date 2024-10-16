import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageNotFound = () => {
    return ( 
        <div className="flex items-center justify-center gap-y-4 text-center">
            <h1 className="text-2xl font-bold ">Not Found</h1>
            <p className="text-zinc-500 text-sm">
                The page you are looking for does not exist.
            </p>
            <Button variant="ghost">
                <Link href="/">Go back to home</Link>
            </Button>
        </div>
     );
}
 
export default PageNotFound;