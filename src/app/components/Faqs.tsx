import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a range of property management services including resident support, compliance management, eviction services, property maintenance, and more.",
  },
  {
    question: "How can I book a property?",
    answer:
      "You can easily book a property through our website by navigating to the 'Find Available Rooms' section and following the booking process.",
  },
  {
    question: "Do you provide legal support?",
    answer:
      "Yes, we provide reliable legal support to help landlords and tenants with property-related issues.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We primarily operate in Birmingham, but we are expanding to other regions to serve more clients.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us via phone, email, or by filling out the contact form on our website.",
  },
];

const FAQSection = () => {
  return (
    <div className="bg-gray-100 py-20">
      <MaxWidthWrapper>
        <h2 className="text-4xl font-extrabold text-charcoalGray text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white p-5 rounded-lg border-l-4 border-daffodilYellow shadow-sm group"
            >
              <summary className="flex justify-between items-center font-semibold text-charcoalGray cursor-pointer">
                {faq.question}
                <ChevronDown className="text-daffodilYellow group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <p className="text-gray-700 mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FAQSection;
