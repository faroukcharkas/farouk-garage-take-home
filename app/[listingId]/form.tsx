"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InvoicePreview } from "@/app/[listingId]/invoice-preview"
import { InvoiceData } from "@/lib/types"
import Link from "next/link"

const FormSchema = z.object({
    name: z.string().min(1, "Please enter your name"),
})

type FormValues = z.infer<typeof FormSchema>

interface NameFormProps {
    invoiceData: InvoiceData
}

export default function NameForm({ invoiceData }: NameFormProps) {
    const [showPreview, setShowPreview] = useState(false)
    const [customerName, setCustomerName] = useState("")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setCustomerName(data.name)
        setShowPreview(true)
    }

    function handleBack() {
        setShowPreview(false)
    }

    if (showPreview) {
        return (
            <InvoicePreview
                invoiceData={invoiceData}
                customerName={customerName}
                onBack={handleBack}
            />
        )
    }

    return (
        <>
            <h1 className="text-4xl tracking-tighter mb-8">Who should we bill to?</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<FormValues, "name"> }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                    <div className="w-full max-w-md bg-muted p-4 rounded-lg flex items-center gap-2 mt-4">
                        <p className="text-sm text-muted-foreground">
                            This invoice is for{" "}
                            <span className="font-bold">{invoiceData.listingTitle}</span>.{" "}
                            <Link href={"/"} className="text-primary underline inline">
                                Change
                            </Link>
                        </p>
                    </div>
                </form>
            </Form >
        </>
    )
}
