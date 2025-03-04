import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 text-center leading-snug md:px-16">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/home-daffodil.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70"></div>
      </div>

      {/* Text and Content */}
      <MaxWidthWrapper>
        <div className="text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight flex flex-col gap-2 tracking-wide bg-gradient-to-r from-white via-daffodilYellow to-cyan-300 text-transparent bg-clip-text animate-gradient drop-shadow-sm">
            <span className="max-w-4xl mx-auto">
              Your Trusted Partner for HMO Solutions
            </span>
          </h1>

          <p className="mt-6 text-lg tracking-wide max-w-3xl mx-auto font-inter font-light">
            At Daffodil HMO Solutions, we specialize in comprehensive property
            management services tailored for HMO landlords and supported living
            businesses.
          </p>
        </div>

        <div className="flex gap-6 items-center justify-center mt-14 relative z-10">
          <button className="bg-daffodilYellow py-3 px-6 rounded-lg text-base md:text-lg font-semibold hover:bg-softGreen transition-all duration-300">
            <Link href={"/available-rooms"}>Available Rooms</Link>
          </button>
          <button className="border border-white/70 text-white py-3 px-6 rounded-lg text-base md:text-lg font-semibold hover:bg-softGreen hover:text-charcoalGray hover:border-softGreen transition-all duration-300">
            <Link href={"/our-services"}>Our Services</Link>
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Hero;
