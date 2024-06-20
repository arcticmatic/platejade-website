import Header from "./components/Header/Header";
import Head from "next/head";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "../app/utils/SessionProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import ImagePreloader from "./components/ImagePreloader/ImagePreloader";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Plate Jade",
  description:
    "App for fitting plates and frames in your app in augmented reality (AR).",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* <GoogleAnalytics gaId="GTM-54QN78ZJ" /> */}
      </Head>

      <body className={montserrat.className}>
        <GoogleAnalytics gaId="GTM-54QN78ZJ" />

        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
