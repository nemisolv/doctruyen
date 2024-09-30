"use client";
import Image from "next/image"
import { Button } from "./ui/button"
import { BookOpen } from "lucide-react"
import { useEffect, useState } from "react";


const spotlights = 
    {
        name: "Demon slayer: Kimetsu NoYaiba",
        genres: ['Adventure', 'Dark fantasy'],
        desc: 'Tanjiro Kamado, joined with Inosuke and Zenitsu, boards the Mugen Train on a new mission with the Flame Pillar, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!',
        chapter: 200,
        img_url: 'https://cdn.shopify.com/s/files/1/0878/6457/4255/files/cap-doi-trong-kimetsu-no-yaiba__1__12cc214f55b9481a90a37730b0d05a46.jpg?v=1716181901'
    }


export const Banner = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])
    if (!isMounted) return null;
    return <section className="max-w-5xl w-full h-[600px] overflow-hidden relative shadow-sm mt-4  rounded-xl text-white bg-opacity-50 select-none">
        <Image src={spotlights.img_url} alt="" className="w-full h-full object-cover" fill />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="absolute top-10 left-2/4 -translate-x-2/4">
            <h3 className="text-center">
                {spotlights.genres.map((genre, index) => (
                    <span key={index} className="uppercase font-semibold">{genre} {index < spotlights.genres?.length-1 ? ", ": ""} </span>
                ))}
                <h2 className="text-4xl uppercase font-bold ">{spotlights.name}</h2>
            </h3>
        </div>
        <div className="text-zinc-200 flex items-center justify-between absolute bottom-2 px-3">
                <p className="w-[40%]  line-clamp-3">{spotlights.desc}</p>
                <div className="flex items-center gap-3">
                    <Button variant="primary" className="rounded-full px-6 py-2 font-medium ">Read Now</Button>
                    <div className="flex items-center  gap-1 text-white flex-1">
                           <button>
                           <BookOpen size={18}/> 
                           </button>
                        <span >Ch.{spotlights.chapter} </span>
                    </div>
                </div>
        </div>

    </section>
}