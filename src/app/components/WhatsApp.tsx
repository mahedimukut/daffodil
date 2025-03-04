"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppWidget = () => {
  const phoneNumber = "+447568353414";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 flex items-center justify-center">
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
