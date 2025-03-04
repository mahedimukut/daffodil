"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "+447568353414";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-20 right-4 flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Ping Effect */}
      <div className="absolute w-14 h-14 bg-green-500 rounded-full animate-ping opacity-75"></div>

      {/* WhatsApp Icon */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-green-500 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
};

export default WhatsAppWidget;
