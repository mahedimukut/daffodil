import React from "react";

import { Heart, HomeIcon, MapIcon, Star } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Love = () => {
  return (
    <MaxWidthWrapper>
      <div className="text-center leading-relaxed text-3xl p-8">
        discover <MapIcon className="w-8 h-8 inline-block text-blue-500" /> a
        place <HomeIcon className="w-8 h-8 inline-block text-green-500" />{" "}
        you'll love <Heart className="w-8 h-8 inline-block text-red-500" /> to
        live
      </div>
    </MaxWidthWrapper>
  );
};

export default Love;
