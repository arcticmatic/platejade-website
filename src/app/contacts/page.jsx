import ContactsPage from "../components/ContactsPage/ContactsPage";
import ContactsPageForm from "../components/ContactsPageForm.jsx/ContactsPageForm";
import Download from "../components/Download/Download";
import Footer from "../components/Footer/Footer";
import Loading from "../loading";

export default function Contacts() {
  const downloadWhiteSection = true;
  return (
    <>
      <Loading />
      {/* <ContactsPage />
      <ContactsPageForm />
      <Download downloadWhiteSection={downloadWhiteSection} /> */}
    </>
  );
}
