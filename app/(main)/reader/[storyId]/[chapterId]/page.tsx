import PageNotFound from "@/app/not-found";
import { ChapterReading } from "@/components/chapter/chapter-reading";
import { findChapterByStoryIdChapterId } from "@/lib/actions/chapter.action";

interface Props {
params: {
storyId: string;
chapterId: string;

}
}

const page =async ({params}: Props) => {
    const {storyId, chapterId} = params;
    if(!storyId || !chapterId) {
        return <PageNotFound/>
    }

    const chapter = await findChapterByStoryIdChapterId({storyId, chapterId});
    if(!chapter) {
        return <PageNotFound/>
    }

    return ( <div>
        <ChapterReading data={chapter} />
    </div> );
}
 
export default page;