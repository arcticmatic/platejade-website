import CooperationForm from "../components/sellers/CooperationForm/CooperationForm";
import FAQ from "../components/sellers/FAQ/FAQ";
import Hero from "../components/sellers/Hero/Hero";
import HowItWorks from "../components/sellers/HowItWorks/HowItWorks";
import Opportunities from "../components/sellers/Opportunities/Opportunities";
import PaymentOptions from "../components/sellers/PaymentOptions/PaymentOptions";
import VideoBlock from "../components/sellers/VideoBlock/VideoBlock";

export default function Sellers() {
  return (
    <>
      <Hero />
      <VideoBlock />
      <HowItWorks />
      <PaymentOptions />
      <Opportunities />
      <CooperationForm />
      <FAQ />
    </>
  );
}
