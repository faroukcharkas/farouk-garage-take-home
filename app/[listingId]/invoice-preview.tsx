"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download } from "lucide-react"
import { InvoiceData } from "@/lib/types"
import Image from "next/image"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { InvoicePDF } from "./invoice-pdf"
import garageLogo from "@/public/garage-logo.png"

interface InvoicePreviewProps {
    invoiceData: InvoiceData
    customerName: string
    onBack: () => void
}

export function InvoicePreview({ invoiceData, customerName, onBack }: InvoicePreviewProps) {
    const invoiceDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`

    const fileName = `invoice-${invoiceNumber}.pdf`

    return (
        <div className="w-full max-w-3xl space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl tracking-tighter">Invoice Preview</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onBack}>
                        Change Name
                    </Button>
                    <PDFDownloadLink
                        document={
                            <InvoicePDF
                                invoiceData={invoiceData}
                                customerName={customerName}
                                invoiceNumber={invoiceNumber}
                                invoiceDate={invoiceDate}
                            />
                        }
                        fileName={fileName}
                    >
                        {({ loading }) => (
                            <Button className="gap-2" disabled={loading}>
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            <Card id="invoice-content">
                <CardHeader className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xl font-semibold">Garage Technologies, Inc.</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl mb-2">INVOICE</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Invoice #: {invoiceNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Date: {invoiceDate}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-lg">Bill To:</p>
                            <p className="text-muted-foreground">{customerName}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Item Details</h3>

                        <div className="flex gap-6">
                            {invoiceData.imageUrl && (
                                <div className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden border">
                                    <Image
                                        src={invoiceData.imageUrl}
                                        alt={invoiceData.listingTitle}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex-1 space-y-2">
                                <h4 className="font-semibold text-xl">{invoiceData.listingTitle}</h4>
                                <div className="flex gap-6 mt-3 mb-3 pb-3 border-b">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Unit Price</p>
                                        <p className="text-lg font-semibold">${invoiceData.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Quantity</p>
                                        <p className="text-lg font-semibold">{invoiceData.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-4">
                                    {invoiceData.listingDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <div className="flex justify-between text-lg">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span>${invoiceData.sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-muted-foreground">Tax (0%):</span>
                            <span>$0.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-2xl font-bold">
                            <span>Total:</span>
                            <span>${invoiceData.sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="text-center text-sm text-muted-foreground pt-4">
                        <p>Thank you for your business!</p>
                        <p className="mt-2">Call us at (201) 293-7164 or email us at support@shopgarage.com for help.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

