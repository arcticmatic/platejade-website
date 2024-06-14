import Header from "./components/Header/Header";
import Head from "next/head";
import Footer from "./components/Footer/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "../app/utils/SessionProvider";
import { GoogleAnalyticsTracking } from "./components/GoogleAnalytics/GoogleAnalytics";
import ImagePreloader from "./components/ImagePreloader/ImagePreloader";

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
        <ImagePreloader />
        <GoogleAnalyticsTracking />
      </Head>

      <body className={montserrat.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
