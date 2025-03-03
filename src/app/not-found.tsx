"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "./components/MaxWidthWrapper";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center py-12 bg-softGreen/10">
      <MaxWidthWrapper className="text-center flex flex-col items-center px-6">
        {/* Title */}
        <h1 className="text-8xl font-bold text-daffodilYellow mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-charcoalGray mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 w-4/5 md:w-3/5 ">
          We couldn’t find the page you were looking for. It might have been
          removed, renamed, or doesn’t exist anymore.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/">
            <button className="bg-daffodilYellow text-charcoalGray py-3 px-6 rounded-md font-medium shadow-md hover:bg-softGreen hover:text-charcoalGray transition-all duration-300 flex items-center gap-2">
              Go to Homepage
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/contact-us">
            <button className="bg-white border border-daffodilYellow text-charcoalGray py-3 px-6 rounded-md font-medium shadow-md hover:bg-daffodilYellow transition-all duration-300">
              Contact Us
            </button>
          </Link>
        </div>

        {/* SVG Illustration */}
        <div className="mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-64 h-64 mx-auto"
            fill="none"
          >
            <path
              d="M256 16C119.3 16 16 119.3 16 256s103.3 240 240 240 240-103.3 240-240S392.7 16 256 16Zm0 432c-106 0-192-86-192-192S150 64 256 64s192 86 192 192-86 192-192 192Z"
              fill="#FDD835"
            />
            <path
              d="M256 128c-13.2 0-24 10.8-24 24v112c0 13.2 10.8 24 24 24s24-10.8 24-24V152c0-13.2-10.8-24-24-24Zm0 208c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24Z"
              fill="#333"
            />
          </svg>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
