
import { IChapter } from "@/database/models/chapter.model";

import { CommentForm } from "../comment-form";
import { CommentList } from "../comment-list";
import { ChapterReadingContent } from "./chapter-reading-content";


interface ChapterReadingProps {
    data: IChapter;
}

export const ChapterReading = ({ data }: ChapterReadingProps) => {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
       <ChapterReadingContent data={data} />
        <main className="pt-20 pb-24 px-4">
           
                {/* comment section */}
            <div className="space-y-8">
                <CommentForm chapterId={data._id.toString()} storyId={data.storyId.toString()}/>
                <CommentList chapterId={data._id.toString()} storyId={data.storyId.toString()}/>
            </div>
        </main>
    </div>
}