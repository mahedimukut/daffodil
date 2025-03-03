import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const testimonials = [
  {
    name: "Jonathan Grey",
    role: "CEO at ABC Property Group",
    quote:
      "Daffodil HMO Solution has been instrumental in managing our properties. Their attention to detail and excellent service has made a noticeable difference in the quality of our properties and tenant satisfaction.",
    image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with actual client images
  },
  {
    name: "Jane Smith",
    role: "Property Manager at XYZ Estates",
    quote:
      "Working with Daffodil HMO Solution has been a breeze. They handle everything from tenant support to property inspections efficiently, making my job much easier.",
    image: "https://randomuser.me/api/portraits/women/1.jpg", // Replace with actual client images
  },
  {
    name: "Samuel Adams",
    role: "Director at Real Estate Ltd.",
    quote:
      "The team at Daffodil HMO Solution provided us with incredible insights and help throughout the process of managing our HMO properties. Their professional approach is unparalleled.",
    image: "https://randomuser.me/api/portraits/men/2.jpg", // Replace with actual client images
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-gray-50 py-20">
      <MaxWidthWrapper>
        <h2 className="text-4xl font-extrabold text-charcoalGray text-center">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 mb-12 max-w-3xl mx-auto">
          Hear directly from our satisfied clients who have experienced the
          difference Daffodil HMO Solution makes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-daffodilYellow rounded-lg shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-daffodilYellow"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-charcoalGray">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">{`"${testimonial.quote}"`}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TestimonialSection;
