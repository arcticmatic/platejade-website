import ContactsPage from "../../app/components/ContactsPage/ContactsPage";
import ContactsPageForm from "../../app/components/ContactsPageForm.jsx/ContactsPageForm";
import Download from "../../app/components/Download/Download";

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
