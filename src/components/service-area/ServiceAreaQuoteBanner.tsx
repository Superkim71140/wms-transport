"use client";

import React from "react";
import AreaServiceConfidenceBanner, {
  AreaServiceConfidenceBannerProps,
} from "./AreaServiceConfidenceBanner";

export type ServiceAreaQuoteBannerProps = AreaServiceConfidenceBannerProps;

/**
 * ServiceAreaQuoteBanner
 * Standardized wrapper delegating to AreaServiceConfidenceBanner.
 */
export default function ServiceAreaQuoteBanner(
  props: ServiceAreaQuoteBannerProps
) {
  return <AreaServiceConfidenceBanner {...props} />;
}
