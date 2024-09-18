"use client";

import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPermitSchema, CreatePermitValues } from "@/lib/validation";
import { Ship, Fish, Anchor, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { submitPermit } from "../new/actions";

export default function NewPermit() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CreatePermitValues>({
    resolver: zodResolver(createPermitSchema),
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: CreatePermitValues) {
    try {
      const result = await submitPermit(values);

      if (result.success) {
        // Redirect on success
        router.push("/skipper/permit");
      } else if (result.error) {
        setSubmitError(result.error);
      }
    } catch (error) {
      console.error("Error submitting permit:", error);
      setSubmitError("Something went wrong, please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-8">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-indigo-500">
              Fishing Permit Application
            </div>
            <h2 className="mb-5 text-2xl font-bold leading-tight text-gray-900">
              Vessel Registration Form
            </h2>
            <p className="mb-8 text-gray-600">
              Please fill out the form below and wait for approval. All fields
              are required.
            </p>
            {submitError && (
              <div
                className="mb-6 border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
                role="alert"
              >
                <p>{submitError}</p>
              </div>
            )}
            <Form {...form}>
              <form
                className="space-y-6"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Ship className="mr-2 h-5 w-5" />
                        Vessel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Enter the vessel's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Fish className="mr-2 h-5 w-5" />
                        Type of Catch
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="e.g., Snoek, Yellow-Tail, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Anchor className="mr-2 h-5 w-5" />
                        Harbour Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Enter the harbour name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Users className="mr-2 h-5 w-5" />
                        Description of Crew
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Provide a detailed description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-gray-700">
                        <Building className="mr-2 h-5 w-5" />
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          placeholder="Company or Skipper's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  Submit Application
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
