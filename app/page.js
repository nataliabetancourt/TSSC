//Metadata

//Components
import LandingSection from "@/components/home/LandingSection/LandingSection";
import { Services } from "@/components/home/Services/Services";
import { BrandSection } from "@/components/home/BrandSection/BrandSection";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import TestimonialCarousel from "@/components/home/TestimonialsSection/TestimonialsSection";
import QuoteRequestForm from "@/components/home/RequestQuote/RequestQuote";
import VideoSection from "@/components/home/VideoSection/VideoSection";

export const metadata = {
  title: "Top Auto Repair & Tire Shop in TX - Tire Store Service Center",
  description:
    "Tire Store Service Center offers expert auto repair, tire sales, and maintenance services across Texas. Our technicians ensure top-notch care for your vehicle, from tires to repairs. Schedule an appointment online today!",
  keywords:
    "tire store service center, tire store, tire shop, tire repair shop, tire repair service, tire repair near me, auto repair shop, auto repair service, auto repair near me, car repair shop, car repair service, car repair near me, oil change service, oil change near me, brake repair service, brake repair near me, wheel alignment service, wheel alignment near me",
  language: "en",
  subject: "Auto Repair & Tire Shop in TX",
  coverage: "United States",
  robots: "index, follow",
  author: "Tire Store Service Center",
  publisher: "TIRESTORE SERVICE CENTER by eMETHOD Inc.",
  og: {
    type: "website",
    title: "Top Auto Repair & Tire Shop in TX - Tire Store Service Center",
    description:
      "Tire Store Service Center offers expert auto repair, tire sales, and maintenance services across Texas. Our technicians ensure top-notch care for your vehicle, from tires to repairs. Schedule an appointment online today!",
    site_name: "Tire Store Service Center",
    url: "https://promo.tirestoretx.com/",
  },
  alternates: {
    canonical: "https://promo.tirestoretx.com/",
    languages: {
      en: "/en",
    },
  },
};

export default function Home() {
  return (
    <>
      <LandingSection />
      <Services />
      <AboutSection />
      <TestimonialCarousel />
      <QuoteRequestForm />
      <VideoSection />
      <BrandSection />
    </>
  );
}
