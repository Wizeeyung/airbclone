import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { StoreProvider } from "./storeProvider";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Your home haven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ToasterProvider />
        <RegisterModal />
        {/* <Modal isOpen actionLabel="Submit" title="login" secondaryActionLabel="submit"/> */}
        <Navbar />
        {children}
      </body>
    </html>
    </StoreProvider>
  );
}
