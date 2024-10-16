import { Banner } from "@/components/banner";
import { StoryList } from "@/components/story-list";

const page = async() => {

    return ( 
        <div>
            <Banner/>
            <StoryList title="New released comics" type="comic" />
        </div>
     );
}
 
export default page;