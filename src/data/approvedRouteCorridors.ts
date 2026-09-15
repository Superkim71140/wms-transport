/**
 * Approved Interprovincial Route Corridors Allowlist
 * 
 * OWNER CONFIRMATION REQUIRED:
 * Corridors listed below reflect high-demand operational pairs currently supported
 * by WMS TRANSPORT fleet capacity. Full expansion to all 64 provincial permutations
 * requires documented pricing matrix and local operational proof from the business owner.
 */

export interface RouteCorridor {
  from: string;
  to: string;
  label?: string;
  status: 'approved_pending_owner_audit';
}

export const approvedRouteCorridors: RouteCorridor[] = [
  { from: "bangkok", to: "phuket", label: "กรุงเทพฯ ⇄ ภูเก็ต", status: "approved_pending_owner_audit" },
  { from: "phuket", to: "bangkok", label: "ภูเก็ต ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "chiang-mai", label: "กรุงเทพฯ ⇄ เชียงใหม่", status: "approved_pending_owner_audit" },
  { from: "chiang-mai", to: "bangkok", label: "เชียงใหม่ ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "samutsakhon", label: "กรุงเทพฯ ⇄ สมุทรสาคร", status: "approved_pending_owner_audit" },
  { from: "samutsakhon", to: "bangkok", label: "สมุทรสาคร ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "chonburi", label: "กรุงเทพฯ ⇄ ชลบุรี", status: "approved_pending_owner_audit" },
  { from: "chonburi", to: "bangkok", label: "ชลบุรี ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "samutsakhon", to: "samut-songkhram", label: "สมุทรสาคร ⇄ สมุทรสงคราม", status: "approved_pending_owner_audit" },
  { from: "samut-songkhram", to: "samutsakhon", label: "สมุทรสงคราม ⇄ สมุทรสาคร", status: "approved_pending_owner_audit" },
];

/**
 * Validates whether a given from/to pair is an approved route corridor
 */
export function isApprovedRouteCorridor(from: string, to: string): boolean {
  if (!from || !to || from === to) return false;
  return approvedRouteCorridors.some(
    (c) => c.from.toLowerCase() === from.toLowerCase() && c.to.toLowerCase() === to.toLowerCase()
  );
}
