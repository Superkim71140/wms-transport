"use client";

import React from "react";
import AreaServiceConfidenceBanner, {
  AreaServiceConfidenceBannerProps,
} from "./AreaServiceConfidenceBanner";

export type ServiceAreaPromoBannerProps = AreaServiceConfidenceBannerProps;

/**
 * ServiceAreaPromoBanner
 * Standardized wrapper delegating to AreaServiceConfidenceBanner.
 */
export default function ServiceAreaPromoBanner(
  props: ServiceAreaPromoBannerProps
) {
  return <AreaServiceConfidenceBanner {...props} />;
}
