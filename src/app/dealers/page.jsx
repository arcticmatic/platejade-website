import DealersHero from "../components/DealersHero/DealersHero";
import Video from "../components/Video/Video";
import DealersWork from "../components/DealersWork/DealersWork";
import Opportunities from "../components/Opportunities/Opportunities";
import PaymentOptions from "../components/PaymentOptions/PaymentOptions";
import FAQ from "../components/FAQ/FAQ";
import CooperationForm from "../components/CooperationForm/CooperationForm";

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
