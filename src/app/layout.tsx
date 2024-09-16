import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "The Spa Galleries",
  description: "Art Dealer & Event Space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/spa_favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/spa_favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/spa_favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/spa_favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/spa_favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />{" "}
      </Head>
      <body>{children}</body>
    </html>
  );
}
