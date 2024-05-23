import Mobilenavbar from "@/components/mobilenavbar";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn={
    firstname:'Vibhuu',lastname:'meoww'
  }
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>

      <div className="flex size-full flex-col ">
          <div className="root-layout">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
              <Mobilenavbar user={loggedIn}/>
          </div>
          {children}
      </div>
    </main>
  );
}
