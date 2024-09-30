"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

interface StoryListProps {
    title: string;
    type: "manga" | "comic" | "popular";
}

const stories = [
    {
        name: "Demon slayer: Kimetsu NoYaiba",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "One Piece",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "Naruto",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "Demon slayer: Kimetsu NoYaiba",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "One Piece",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "Naruto",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "Demon slayer: Kimetsu NoYaiba",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "One Piece",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    },
    {
        name: "Naruto",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    }
]
export const StoryList = ({ title, type }: StoryListProps) => {

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
                    <SwiperSlide key={index}><div className="py-2 px-3 rounded-lg  w-full h-[350px] select-none cursor-pointer ">
                        <Image src={story.img_url} alt="" className=" object-cover rounded-lg" height={250} width={320} />
                        <div>
                            <h4 className="text-lg text-center line-clamp-1">{story.name}</h4>
                            <span className="text-sm text-zinc-400 line-clamp-1">Ch. {story.chapter} the bath 3</span>
                            <span> <StarFilledIcon className="text-yellow-400 inline" /> 4.3

                            </span>
                        </div>
                    </div></SwiperSlide>

                ))}
            </Swiper>
        </div>
    </div>
} 