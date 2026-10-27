import React from "react";
import PricingUrlCleanup from "@/components/pricing/PricingUrlCleanup";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PricingUrlCleanup />
      {children}
    </>
  );
}
