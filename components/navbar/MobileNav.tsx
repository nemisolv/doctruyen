
"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "../toggle-mode"
import { SignedIn, UserButton } from "@clerk/nextjs"

export const MobileNav = () => {
    const pathname = usePathname();
    return <Sheet >
        <SheetTrigger asChild>
            <Menu className="size-9 sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className=" overflow-y-auto flex flex-col bg-white dark:bg-[#313338] ">
            {
                sidebarLinks.map(link => {
                    const isActive = link.href === pathname;

                    return <SheetClose key={link.href}>
                        <Link href={link.href} className={cn(isActive ? "bg-primary rounded-lg text-white" : "text-[#222] dark:text-zinc-300", "flex items-center gap-1 bg-transparent p-4")}>
                            {link.icon}
                            <span className={isActive ? "font-normal" : "font-medium"}>{link.title}</span>
                        </Link>
                    </SheetClose>
                })
            }
             <div className="flex items-center gap-4 mt-auto">
            <ModeToggle />
          

            <SignedIn>
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: 'size-8',
                        },
                        variables: {
                            colorPrimary: '#C72F44'
                        }
                    }}
                />
            </SignedIn>
        </div>

        </SheetContent>
    </Sheet>

}