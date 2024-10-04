import Link from "next/link";
import { Badge } from "./ui/badge";

interface RenderGenreProps {
    _id: string;
    name: string;
}

export const RenderGenre = ({_id, name}: RenderGenreProps) => {
    return <Link href={`/genre/${_id}`}>
            <Badge className="text-[10px] font-medium bg-[#ddd] dark:bg-[#414755] text-black dark:text-[#8997c3] rounded-md border-none px-3 py-2 uppercase">{name}</Badge>
        </Link>

}