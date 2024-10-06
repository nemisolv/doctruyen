"use client";
import Link from "next/link"
import { Button } from "../ui/button"
import { BookOpen, Pencil, Trash2 } from "lucide-react"
import { deleteStory } from "@/lib/actions/story.action";
import { useToast } from "@/hooks/use-toast";


export const ActionStory = ({_id}: {_id: string}) => {
    const {toast} = useToast();

    const handleDeleteStory = async (_id: string) => {
        try {
            await deleteStory(_id);
            toast({
                title: 'Story deleted',
                description: 'Story has been deleted successfully',
            })
        }catch(error) {
            console.log('Error deleting story:', error);
            toast({
                title: 'Error deleting story',
                description:"An error occurred while deleting the story",
        })
        }
    }
    return  <div className="flex space-x-2">
    <Button variant="ghost" size="sm" >
<Link href={`/manage/stories/${_id}`}>
        <Pencil className="size-4" />
        <span className="sr-only">Edit</span>
</Link>
    </Button>
<Button variant="ghost" size="sm" onClick={() => handleDeleteStory(_id)}>
    <Trash2 className="size-4" />
    <span className="sr-only">Delete</span>
</Button>
<Button variant="ghost" size="sm">
    <Link href={`/manage/stories/${_id}/chapters`}>
    <BookOpen className="size-4" />
    <span className="sr-only">Chapters</span>
    </Link>
</Button>
</div>
}