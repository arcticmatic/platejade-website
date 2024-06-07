import DealersHero from "../../app/components/DealersHero/DealersHero";
import Video from "../../app/components/Video/Video";
import DealersWork from "../../app/components/DealersWork/DealersWork";
import Opportunities from "../../app/components/Opportunities/Opportunities";
import PaymentOptions from "../../app/components/PaymentOptions/PaymentOptions";
import FAQ from "../../app/components/FAQ/FAQ";
import CooperationForm from "../../app/components/CooperationForm/CooperationForm";

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
