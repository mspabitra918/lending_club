"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Start";
import { LoanCalculator } from "@/components/calculator/LoanCalculator";
import { WhyChooseUs } from "@/components/whyus/WhyChooseUs";
import { LoanTypes } from "@/components/LoanType";
import { HowItWorks } from "@/components/howitwork/HowItWorks";
import { FAQ } from "@/components/faq/Faq";
import { Contact } from "@/components/contact/Contact";
import { CTABanner } from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyChooseUs />
        <LoanCalculator />
        <LoanTypes />
        <HowItWorks />
        <FAQ />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
