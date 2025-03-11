"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import MaxWidthWrapper from "./MaxWidthWrapper";

const TopBar = () => {
  return (
    <div className="hidden md:block bg-gradient-to-r from-gray-50 via-daffodilYellow/70 to-cyan-300 text-charcoalGray">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between py-3 text-xs md:text-sm">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@daffodilhmosolutions.co.uk"
              className="flex items-center gap-2 hover:text-black transition"
            >
              <MdEmail size={18} />
              info@daffodilhmosolutions.co.uk
            </a>
            <a
              href="tel:+447568353414"
              className="flex items-center gap-2 hover:text-black transition"
            >
              <FiPhone size={18} />
              +44 7568 353414
            </a>
            <div className="flex items-center gap-2 text-gray-700">
              <MdLocationOn size={18} />
              <span>Birmingham, UK</span>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-black transition">
              <FaXTwitter size={18} />
            </a>
            <a href="#" className="hover:text-black transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-black transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TopBar;
