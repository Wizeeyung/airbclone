import type { Metadata } from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import dynamic from "next/dynamic";
import ClientOnly from "./components/ClientOnly";
import SearchModal from "./components/modals/SearchModal";


// Dynamically import StoreProvider
// const StoreProvider = dynamic(() => import("./storeProvider").then(mod => mod.StoreProvider), {
//   ssr: false, // Disable SSR for StoreProvider
// });

const StoreProvider = dynamic(()=> import('./storeProvider'),{
  ssr: false
})

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
  console.log(currentUser)
  return (
    
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        
        <StoreProvider>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <SearchModal />
            <LoginModal  currentUser={currentUser}/>
            <RentModal />
            {/* <Modal isOpen actionLabel="Submit" title="login" secondaryActionLabel="submit"/> */}
            <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
    
  );
}
