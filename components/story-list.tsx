"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { findAllStories } from "@/lib/actions/story.action";

interface StoryListProps {
    title: string;
    type: "manga" | "comic" | "popular" ;
}

export const StoryList = ({ title, type }: StoryListProps) => {
    const [stories,setStories] = useState([])

    console.log(stories)


    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await findAllStories();
                console.log(res)
                if(res) {
                    setStories(res);
                }
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };
        fetchStories();
    }, []);

    return <div className="my-6">
        <h2 className="dark:text-white text-3xl my-2 italic uppercase">{title}</h2>
        <div className="w-full">
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                grabCursor={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                
            >
                {stories.map((story, index) => (
                    <SwiperSlide key={index}><Link href={`/story/preview?_id=${story._id}`}
                    
                    className="py-2 px-3 rounded-lg  w-full h-[350px] select-none cursor-pointer ">
                        <Image src={story.imgUrl} alt="" className=" object-cover rounded-lg" height={250} width={320} />
                        <div>
                            <h4 className="text-lg text-center line-clamp-1">{story.title}</h4>
                            <span className="text-sm text-zinc-400 line-clamp-1">Ch. {story.chapters.length} </span>
                            <span> <StarFilledIcon className="text-yellow-400 inline" /> {story.averageRating}
                            </span>
                        </div>
                    </Link></SwiperSlide>

                ))}
            </Swiper>
        </div>
    </div>
} 