import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "PlateJade",
  description: "PlateJade website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
