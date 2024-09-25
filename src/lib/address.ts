import type { Address } from "@prisma/client";

export function getFullAddress(address: Address | undefined) {
  if (!address) return null;
  return `${address.street}, ${address.number},  ${address.neighborhood},  ${address.city}, ${address.state}`;
}
