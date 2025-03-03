import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ListChecks, Search, Heart, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: ListChecks,
    title: "Detailed Listings",
    color: "#6A5ACD", // Slate Blue
    description: "Comprehensive property details to make informed decisions.",
  },
  {
    icon: Search,
    title: "Property Search",
    color: "#4682B4", // Steel Blue
    description: "Find properties that match your preferences quickly.",
  },
  {
    icon: Heart,
    title: "Saved Favorites",
    color: "#FF6347", // Tomato Red
    description: "Save and manage your favorite properties effortlessly.",
  },
  {
    icon: CalendarCheck,
    title: "Book Visits",
    color: "#3CB371", // Sea Green
    description: "Schedule property visits at your convenience.",
  },
];

const DetailList = () => {
  return (
    <div className="bg-white py-10">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-sm transition-all duration-300 
              hover:bg-daffodilYellow/20 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
            >
              <feature.icon
                size={48}
                color={feature.color}
                className="group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 ease-in-out"
              />
              <h3 className="mt-4 text-lg font-semibold text-charcoalGray transition-colors duration-300 group-hover:text-[#333333]">
                {feature.title}
              </h3>
              <p className="text-charcoalGray mt-2 text-sm transition-colors duration-300 group-hover:text-[#333333]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default DetailList;
