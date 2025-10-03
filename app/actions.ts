"use server";

import {
    fetchGarageListing,
    validateGarageListingResponse,
    transformToInvoiceData,
    extractUuid
} from "@/lib/utils";
import { type InvoiceData } from "@/lib/types";
import { redirect } from "next/navigation";

export async function redirectToInvoicePage(url: string) {
    const listingUuid = extractUuid(url);
    if (!listingUuid) {
        throw new Error("Invalid listing URL - could not extract UUID");
    }
    redirect(`/${listingUuid}`);
}

export async function getInvoiceDataFromGarageListing(listingUuid: string): Promise<InvoiceData | null> {
    const rawData = await fetchGarageListing(listingUuid);
    const validatedListing = validateGarageListingResponse(rawData);
    const invoiceData = transformToInvoiceData(validatedListing);

    return invoiceData ?? null;
}