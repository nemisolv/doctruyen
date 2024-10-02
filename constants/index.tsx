import { BookOpen, ChartColumnStacked, MessageCircleMore, TableOfContents, Users } from "lucide-react";

export const sidebarLinks = [
    {
        title: "Stories",
        href: "/manage/stories",
        icon: <BookOpen className="size-6" />,
    },
    {
        title: "Chapters",
        href: "/manage/chapters",
        icon: <TableOfContents className="size-6" />,
    },
    {
        title: "Comments",
        href: "/manage/comments",
        icon: <MessageCircleMore className="size-6" />,
    },
    {
        title: "Genres",
        href: "/manage/genres",
        icon: <ChartColumnStacked className="size-6" />,
    },
    {
        title: "Users",
        href: "/manage/users",
        icon: <Users className="size-6" />,
    },

]

export const storyStatus = [
    {
        label: "Ongoing",
        value: "Ongoing",
    },
    {
        label: "Completed",
        value: "Completed",
    },
    {
        label: "Hiatus",
        value: "Hiatus",
    }
]