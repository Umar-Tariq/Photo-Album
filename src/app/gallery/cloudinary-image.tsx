"use client";

import { Heart } from "@/components/ui/icons/heart";
import { CldImage } from "next-cloudinary";
import cloudinary from "cloudinary";
import { setAsFavouriteAction } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";
import { FullHeart } from "@/components/ui/icons/full-heart";

export function CloudinaryImage(props: any & {imageData:SearchResult;path:string} ) {
  const [transition, startTransition] = useTransition();
  const { imageData } = props;
  const isFavourite = imageData.tags.includes("favourite");
  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavourite ? (
        <FullHeart
          onClick={() => {
            startTransition(() => {
              setAsFavouriteAction(imageData.public_id,false);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            startTransition(() => {
              setAsFavouriteAction(imageData.public_id,true);
            });
          }}
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
}
