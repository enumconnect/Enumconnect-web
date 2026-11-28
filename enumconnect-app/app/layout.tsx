import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Enumconnect — Research powered by people",
  description:
    "Connect with verified field professionals, coordinate research projects across Nigeria, and manage fieldwork through one trusted platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={nunito.className}>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NHLSK668');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHLSK668"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
