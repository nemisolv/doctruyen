import { findCommentsByChapterId } from "@/lib/actions/comment.action"
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface CommentListProps {
    chapterId: string;
    storyId: string;
}


export const CommentList = async ({chapterId, storyId}: CommentListProps) => {
    const comments = await findCommentsByChapterId({chapterId}) || [];

 return <div className="mt-10">
        {
            comments.map(comment => (
                <Card  key={comment._id.toString()} className="overflow-hidden transform hover:scale-[1.01] cursor-pointer transition-all duration-200 px-3 py-1">
                    <div className="flex items-center space-x-4">
                        <Avatar className="size-8 rounded-full " >
                            <AvatarImage src={comment.userId.imgUrl} alt={comment.userId.name} />
                            <AvatarFallback className="text-white"> {comment.userId.name}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-lg font-medium truncate">{comment.userId.name}</p>
                            <p className="mt-1 text-sm">{comment.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(comment.updatedAt).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                    </div>
                </Card>
            ))
        }
 </div>
}