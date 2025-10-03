"use server";

import { getInvoiceDataFromGarageListing } from "../actions"
import NameForm from "./form"

export default async function NameFormPage({
    params,
}: {
    params: Promise<{ listingId: string }>
}) {
    const { listingId } = await params

    const invoiceData = await getInvoiceDataFromGarageListing(listingId)

    if (!invoiceData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl tracking-tighter mb-4">Invoice Not Found</h1>
                <p className="text-muted-foreground">Could not load invoice data for this listing.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
            <NameForm invoiceData={invoiceData} />
        </div>
    )
}