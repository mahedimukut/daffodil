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

const Home = () => {
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
    </>
  );
};

export default Home;
