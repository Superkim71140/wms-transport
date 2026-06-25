import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#040b15]">
      {/* 
        This is a lightweight skeleton loading state for the province route. 
        Because Navbar and Footer are now in the layout, we don't strictly need them here,
        but this file provides the skeleton for the content.
        Wait, Navbar and Footer are in layout, so this loading.tsx only renders the children area.
      */}
      <main className="grow relative">
        <div className="absolute inset-0 bg-linear-to-b from-[#020817] via-[#04152D] to-[#061F45] opacity-50" />
        <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center animate-pulse min-h-[60vh]">
          {/* Skeleton Hero */}
          <div className="w-3/4 max-w-2xl h-12 md:h-16 bg-white/5 rounded-2xl mb-6"></div>
          <div className="w-1/2 max-w-md h-6 bg-white/5 rounded-xl mb-12"></div>
          
          {/* Skeleton Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-64 bg-white/5 rounded-3xl border border-white/5"></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
