import ContactsPage from "../components/ContactsPage/ContactsPage";
import ContactsPageForm from "../components/ContactsPageForm.jsx/ContactsPageForm";
import Download from "../components/Download/Download";

export default function Contacts() {
  const downloadWhiteSection = true;
  return (
    <>
      <ContactsPage />
      <ContactsPageForm />
      <Download downloadWhiteSection={downloadWhiteSection} />
    </>
  );
}
