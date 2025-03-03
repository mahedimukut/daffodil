import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="bg-gray-50 py-24 px-6 md:px-12 lg:px-24">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section: Contact Info */}
          <div>
            <h2 className="text-5xl font-extrabold text-charcoalGray mb-8 leading-tight">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
              Got questions or need assistance? Feel free to reach out through
              our contact form or using the details below. We're here to help
              you!
            </p>

            <div className="space-y-8 text-gray-700">
              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <MapPin className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Our Office
                  </span>
                  123 Daffodil Street, London, UK
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <Phone className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Call Us
                  </span>
                  <a
                    href="tel:+447400123456"
                    className="text-daffodilYellow font-medium"
                  >
                    +44 7400 123456
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <div className="bg-daffodilYellow p-4 rounded-full shadow-md">
                  <Mail className="text-charcoalGray w-8 h-8" />
                </div>
                <p className="text-lg">
                  <span className="block font-semibold text-charcoalGray">
                    Email Us
                  </span>
                  <a
                    href="mailto:info@daffodilhmo.com"
                    className="text-daffodilYellow font-medium"
                  >
                    info@daffodilhmo.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-charcoalGray mb-8 text-center">
              Send Us a Message
            </h3>
            <form action="#" method="POST" className="space-y-8">
              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg text-gray-800 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-daffodilYellow focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-daffodilYellow text-charcoalGray py-4 rounded-lg text-lg font-bold shadow-md hover:bg-daffodilYellow/80 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ContactForm;
