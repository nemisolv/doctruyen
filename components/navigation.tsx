"use client"
import { Bot, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useAuth, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./toggle-mode"
import { usePathname } from "next/navigation"


const navLinks = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Comic list',
        href: '/comics'
    },
    {
        title: 'Genres',
        href: '/genres'
    },
    {
        title: 'Popular',
        href: '/popular'
    }
]
export const Navigation = () => {
    const { userId } = useAuth();
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between h-[52px] dark:text-white py-6">
            <div className="flex items-center gap-x-2">
                <Bot className='text-yellow-500' size={30} />
                <h2 className="text-2xl">BacaKomic</h2>
            </div>
            <ul className="flex items-center gap-4 dark:text-zinc-300">
                {
                    navLinks.map(link => (
                        <li key={link.href} className={link.href === pathname ? 'text-white font-semibold': ''}>
                            <Link href={link.href} >
                                {link.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="flex items-center gap-x-3">
              <div className="relative">
                    <Input placeholder="Search your comics"
                            className="bg-slate-700/10 pl-8 h-[40px]"
                    />
                    <Search className="absolute left-3 top-2/4 -translate-y-2/4" size={16}/>
              </div>
                <ModeToggle />
                {
                    userId ? (
                        <div>
                            <UserButton/>
                        </div>
                    ): (
                        <div className="flex items-center gap-x-2">
                            <Link href="/sign-in">Sign in</Link>
                            <Link href="/sign-up">Sign up</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}