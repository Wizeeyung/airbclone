import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { StoreProvider } from "./storeProvider";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Your home haven",
};
//change the default function of the rootLayout to async as we are using the getCurrentUser function
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <StoreProvider>
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {/* <Modal isOpen actionLabel="Submit" title="login" secondaryActionLabel="submit"/> */}
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
    </StoreProvider>
  );
}
