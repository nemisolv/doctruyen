'use client'

import { Bell, Bot,  Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ModeToggle } from "./toggle-mode"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { MobileNav } from "./navbar/MobileNav"


export const Header = () => {
    return <header className="flex items-center justify-between h-16 border-b px-4 lg:px-6 w-full sticky inset-x-0 top-0 z-100">
        <div className="flex items-center gap-x-2">
            <Bot className='text-primary' size={40} />
            <h2 className="text-3xl max-sm:hidden">BacaKomic</h2>
        </div>
        <form className="flex-1 ml-4 ">
            <div className="relative ">
                <Search className="absolute left-3 top-2/4 -translate-y-2/4" size={16} />
                <Input
                    placeholder="Search stories or chapters"
                    type="search"
                    className="w-full pl-8  lg:w-1/3 border border-slate-100 dark:border-slate-800"
                />
            </div>
        </form>
        <div className="flex items-center gap-4 ">
           <div className="max-sm:hidden"> <ModeToggle /></div>
            <Button variant="ghost" size="icon">
                <Bell className="size-5" />
            </Button>

           <div className="max-sm:hidden">
                <SignedIn >
                    <UserButton
                    appearance={{
                        elements: {
                            avatarBox: 'size-8'
                        },
                        variables: {
                            colorPrimary: '#C72F44'
                        }
                    }}
                    />
                </SignedIn>
           </div>
        </div>
            <MobileNav/>
    </header>
}