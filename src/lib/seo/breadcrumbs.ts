export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Standardized Breadcrumb Generators for WMS TRANSPORT
 * Generates structured breadcrumb arrays for visual navigation and JSON-LD schema.
 */

export function getHomeBreadcrumbs(): BreadcrumbItem[] {
  return [{ name: "หน้าแรก", item: "/" }];
}

export function getPricingBreadcrumbs(subTitle?: string, subSlug?: string): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "อัตราค่าบริการ", item: "/pricing" },
  ];
  if (subTitle && subSlug) {
    trail.push({ name: subTitle, item: `/pricing/${subSlug}` });
  }
  return trail;
}

export function getProvinceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
  ];
}

export function getDistrictBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  districtThaiName: string,
  districtSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `พื้นที่${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: districtThaiName, item: `/areas/${provinceSlug}/${districtSlug}` },
  ];
}

export function getProvinceServiceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  serviceName: string,
  serviceId: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: serviceName, item: `/service/${provinceSlug}/${serviceId}` },
  ];
}

export function getRouteBreadcrumbs(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `เส้นทาง ${fromName} - ${toName}`, item: `/route/${fromSlug}/${toSlug}` },
  ];
}

export function getPortfolioBreadcrumbs(
  caseTitle?: string,
  caseSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงานการขนย้าย", item: "/portfolio" },
  ];
  if (caseTitle && caseSlug) {
    trail.push({ name: caseTitle, item: `/portfolio/${caseSlug}` });
  }
  return trail;
}

export function getGuideBreadcrumbs(
  guideTitle?: string,
  guideSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "คู่มือการขนย้าย", item: "/#guides" },
  ];
  if (guideTitle && guideSlug) {
    trail.push({ name: guideTitle, item: `/guides/${guideSlug}` });
  }
  return trail;
}
