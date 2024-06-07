import About from "@/components/About/About";
import Features from "@/components/Features/Features";
import Advantages from "@/components/Advantages/Advantages";
import Reviews from "@/components/Reviews/Reviews";
import FAQ from "@/components/FAQ/FAQ";
import Download from "@/components/Download/Download";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import ContactForm from "@/components/ContactForm/ContactForm";

export default function Home() {
  return (
    <>
      <About />
      <Features />
      <Advantages />
      <Reviews />
      <FAQ />
      <Download />
      {/* <ContactInfo /> */}
      <ContactForm />
    </>
  );
}
