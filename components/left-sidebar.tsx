"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const LeftSidebar = () => {
    const pathname = usePathname();
    return <nav className=" fixed z-50 left-0 w-64 h-screen border-r max-sm:hidden">
        {sidebarLinks.map(link => {
            const isActive = link.href === pathname;
            return <Link key={link.href} href={link.href} className={cn(isActive ? "bg-primary rounded-lg text-white" : "text-[#222] dark:text-zinc-300", "flex items-center gap-1 bg-transparent p-4")}>
                {link.icon}
                <span className={isActive ? "font-normal" : "font-medium"}>{link.title}</span>
            </Link>
        })}
    </nav>
}