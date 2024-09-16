import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
