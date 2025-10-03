
import { garageListingResponseSchema, type GarageListingResponse, type InvoiceData } from "@/lib/types";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUuid(link: string): string | null {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
  const match = link.match(uuidRegex)
  return match ? match[0] : null
}

const GARAGE_LISTING_API_URL = "https://garage-backend.onrender.com";


export async function fetchGarageListing(listingUuid: string) {
  console.log(`Fetching garage listing: ${listingUuid}`)
  console.log(`URL: ${GARAGE_LISTING_API_URL}/listings/${listingUuid}`)
  const response = await fetch(`${GARAGE_LISTING_API_URL}/listings/${listingUuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://www.shopgarage.com',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  return response.json();
}

export function validateGarageListingResponse(rawData: unknown): GarageListingResponse {
  const validationResult = garageListingResponseSchema.safeParse(rawData);

  if (!validationResult.success) {
    throw new Error(`Invalid response format from API: ${JSON.stringify(validationResult.error.issues)}`);
  }

  return validationResult.data;
}

export function transformToInvoiceData(listing: GarageListingResponse): InvoiceData {
  return {
    imageUrl: listing.imageUrls[0] || "",
    listingTitle: listing.listingTitle,
    sellingPrice: listing.sellingPrice,
    listingDescription: listing.listingDescription,
    quantity: 1,
    unitPrice: listing.sellingPrice,
  };
}