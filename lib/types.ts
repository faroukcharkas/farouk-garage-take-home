import { z } from "zod";

export const listingAttributeSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    listingId: z.string(),
    categoryAttributeId: z.string(),
    value: z.string(),
});

export const addressSchema = z.object({
    state: z.string(),
});

export const categoryV2Schema = z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    slug: z.string(),
    parentCategoryId: z.string(),
});

export const garageListingResponseSchema = z.object({
    tags: z.array(z.string()),
    deliveryMethod: z.string(),
    id: z.string(),
    secondaryId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    listingTitle: z.string(),
    sellingPrice: z.number(),
    estimatedPriceMin: z.number().nullable(),
    estimatedPriceMax: z.number().nullable(),
    imageUrls: z.array(z.string().url()),
    listingStatus: z.number(),
    categories: z.array(z.string()),
    itemBrand: z.string(),
    listingDescription: z.string(),
    itemAge: z.number().nullable(),
    itemLength: z.number(),
    itemWidth: z.number().nullable(),
    itemHeight: z.number(),
    itemWeight: z.number().nullable(),
    isAuction: z.boolean(),
    expirationDate: z.string().nullable(),
    vin: z.string().nullable(),
    categoryV2Id: z.string(),
    isPickupAvailable: z.boolean(),
    userId: z.string(),
    partnershipId: z.string().nullable(),
    addressId: z.string(),
    ListingAttribute: z.array(listingAttributeSchema),
    address: addressSchema,
    categoryV2: categoryV2Schema,
});

export const invoiceDataSchema = z.object({
    imageUrl: z.string(),
    listingTitle: z.string(),
    sellingPrice: z.number(),
    listingDescription: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
});

export type GarageListingResponse = z.infer<typeof garageListingResponseSchema>;
export type ListingAttribute = z.infer<typeof listingAttributeSchema>;
export type Address = z.infer<typeof addressSchema>;
export type CategoryV2 = z.infer<typeof categoryV2Schema>;
export type InvoiceData = z.infer<typeof invoiceDataSchema>;