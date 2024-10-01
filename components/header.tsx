'use client'

import { Bell, Bot, LogOut, Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ModeToggle } from "./toggle-mode"


export const Header = () => {
    return <header className="flex items-center justify-between h-16 border-b px-4 lg:px-6 w-full">
        <div className="flex items-center gap-x-2">
            <Bot className='text-primary' size={40} />
            <h2 className="text-3xl">BacaKomic</h2>
        </div>
        <form className="flex-1 ml-4 w-full">
            <div className="relative w-full">
                <Search className="absolute left-3 top-2/4 -translate-y-2/4" size={16} />
                <Input
                    placeholder="Search stories or chapters"
                    type="search"
                    className="w-full pl-8 md:w-2/3 lg:w-1/3"
                />
            </div>
        </form>
        <div className="flex items-center gap-4">
            <ModeToggle/>
            <Button variant="ghost" size="icon">
                <Bell className="size-5" />
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative size-8 rounded-full">
                        <Avatar className="size-8 ">
                            <AvatarImage src="https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901" alt="Admin" />
                            <AvatarFallback >AD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark:bg-[#313338]/80 dark:border-none shadow-sm" align="end" >
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Admin</p>
                            <p className="text-xs leading-none text-zinc-500">admin@gmail.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut className="size-5 mr-2 text-rose-500" />
                    Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
}