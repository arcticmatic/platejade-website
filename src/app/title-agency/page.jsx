import CooperationForm from "../components/title-agencies/CooperationForm/CooperationForm";
import FAQ from "../components/title-agencies/FAQ/FAQ";
import Hero from "../components/title-agencies/Hero/Hero";
import HowItWorks from "../components/title-agencies/HowItWorks/HowItWorks";
import Opportunities from "../components/title-agencies/Opportunities/Opportunities";
import PaymentOptions from "../components/title-agencies/PaymentOptions/PaymentOptions";
import VideoBlock from "../components/title-agencies/VideoBlock/VideoBlock";

export default function TitleAgency() {
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
