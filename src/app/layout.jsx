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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-54QN78ZJ');
            `,
          }}
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <ImagePreloader />
      </Head>

      <body className={montserrat.className}>
        <noscript>
          <iframe
            src={"https://www.googletagmanager.com/ns.html?id=GTM-54QN78ZJ"}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SessionProvider session={session}>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
