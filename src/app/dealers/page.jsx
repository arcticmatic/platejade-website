import DealersHero from "../components/DealersHero/DealersHero";
import Video from "../components/Video/Video";
import DealersWork from "../components/DealersWork/DealersWork";
import Opportunities from "../components/Opportunities/Opportunities";
import PaymentOptions from "../components/PaymentOptions/PaymentOptions";
import CooperationForm from "../components/CooperationForm/CooperationForm";
import FAQ from "../components/FAQDealers/FAQDealers";
import Footer from "../components/Footer/Footer";

export default function Dealers() {
  return (
    <>
      <DealersHero />
      <Video />
      <DealersWork />
      <PaymentOptions />
      <Opportunities />
      <CooperationForm />
      <FAQ />
    </>
  );
}
