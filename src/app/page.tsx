"use client";
import React from "react";
import Hero from "./components/Hero";
import DetailList from "./components/DetailList";
import CallToAction from "./components/Cta";
import ServiceSection from "./components/Services";
import TestimonialSection from "./components/Testimonials";
import WhyChooseUsSection from "./components/WhyUs";
import Love from "./components/Love";
import FAQSection from "./components/Faqs";
import NewlyArrived from "./components/NewlyArrived";
import SolutionsSection from "./components/SolutionsSection";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { useState, useEffect } from "react";

const Home = () => {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  // Check if the user has already accepted cookies
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      setHasAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essentialCookies: true,
        analyticalCookies: true,
        marketingCookies: true,
      })
    );
    setHasAcceptedCookies(true);
  };
  return (
    <>
      <Hero />
      <Love />
      <DetailList />
      <NewlyArrived />
      <SolutionsSection />
      <ServiceSection />
      <WhyChooseUsSection />
      <FAQSection />
      <TestimonialSection />
      <CallToAction />
      {/* Show the banner if cookies haven't been accepted */}
      {!hasAcceptedCookies && (
        <CookieConsentBanner onAccept={handleAcceptCookies} />
      )}
    </>
  );
};

export default Home;
