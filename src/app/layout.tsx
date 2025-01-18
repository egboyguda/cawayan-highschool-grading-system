import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import {  SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";


const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'High School Management System',
  description: 'Manage your high school with ease',
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 w-full`}>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <SidebarInset>
              <main className="flex-1 p-8 overflow-auto ">
                <SidebarTrigger  className="mb-4 sidebar-trigger"/>
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
    
      </body>
    </html>
  );
}
