"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
import { redirectToInvoicePage } from "./actions"

const FormSchema = z.object({
  listingUrl: z.string()
    .url("Please enter a valid URL")
    .refine((url) => {
      try {
        const urlObj = new URL(url)
        return urlObj.hostname === "www.shopgarage.com" &&
          urlObj.pathname.startsWith("/listing/")
      } catch {
        return false
      }
    }, "URL must be a valid Garage listing URL (e.g., https://www.shopgarage.com/listing/...)")
    .min(1, "Please enter a listing URL"),
})

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listingUrl: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await redirectToInvoicePage(data.listingUrl)
    } catch (error) {
      toast.error("Invalid URL", {
        description: error instanceof Error ? error.message : "Could not process the listing URL"
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl tracking-tighter mb-8">The Garage Listing Invoicer</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] space-y-6">
          <FormField
            control={form.control}
            name="listingUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Garage Listing URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.shopgarage.com/listing/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Go to Invoice</Button>
        </form>
      </Form>
    </div>
  )
}
