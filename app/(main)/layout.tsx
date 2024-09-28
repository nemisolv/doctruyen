import { Navigation } from "@/components/navigation";

const layout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="mx-auto max-w-5xl">
            <Navigation/>
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default layout;