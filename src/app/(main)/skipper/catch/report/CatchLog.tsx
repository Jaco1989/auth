"use client";
import React, { useState } from "react";
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
import { catchSchema, CatchValues } from "@/lib/validation";
import {
  Anchor,
  Calendar,
  Fish,
  Scale,
  Flag,
  User,
  FileText,
  Ship,
  Building,
} from "lucide-react";
import { submitCatch } from "./actions";
import LoadingButton from "@/components/LoadingButton";

const CatchLog = () => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CatchValues>({
    resolver: zodResolver(catchSchema),
    defaultValues: {
      port: "",
      logDate: new Date(),
      catchType: "",
      quantity: 0,
      weight: 0,
      country: "",
      skipperName: "",
      permitHolder: "",
      idNumber: "",
      permitType: "",
      permitDate: new Date(),
      vesselName: "",
      factoryName: "",
      factoryAddress: "",
    },
  });

  const { handleSubmit, control } = form;

  async function onSubmit(values: CatchValues) {
    setLoading(true);
    try {
      const result = await submitCatch(values);

      if (result.success) {
        router.push("/skipper");
      } else if (result.error) {
        setSubmitError(result.error);
      }
    } catch (error) {
      console.error("Error submitting catch:", error);
      setSubmitError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="rounded-lg px-4 py-12 shadow-2xl shadow-black sm:px-6 lg:px-8">
      <div className="mx-auto h-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-8">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-indigo-500">
              Catch Log Submission
            </div>
            <h2 className="mb-5 text-2xl font-bold leading-tight text-gray-900">
              Fishing Catch Report
            </h2>
            <p className="mb-8 text-gray-600">
              Please fill out the form below with details of your catch. All
              fields are required.
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
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <FormField
                    control={control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Anchor className="mr-2 h-5 w-5" />
                          Port
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the port name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="logDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Calendar className="mr-2 h-5 w-5" />
                          Log Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            value={
                              field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="catchType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Fish className="mr-2 h-5 w-5" />
                          Catch Type
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the type of catch"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Scale className="mr-2 h-5 w-5" />
                          Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Scale className="mr-2 h-5 w-5" />
                          Weight (kg)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Flag className="mr-2 h-5 w-5" />
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="skipperName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <User className="mr-2 h-5 w-5" />
                          Skipper Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the skipper's name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="permitHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <FileText className="mr-2 h-5 w-5" />
                          Permit Holder
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the permit holder's name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <FileText className="mr-2 h-5 w-5" />
                          ID Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the ID number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="permitType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <FileText className="mr-2 h-5 w-5" />
                          Permit Type
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the permit type"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="permitDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Calendar className="mr-2 h-5 w-5" />
                          Permit Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...field}
                            value={
                              field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                            }
                            onChange={(e) =>
                              field.onChange(new Date(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="vesselName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Ship className="mr-2 h-5 w-5" />
                          Vessel Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the vessel name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="factoryName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Building className="mr-2 h-5 w-5" />
                          Factory Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the factory name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="factoryAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-gray-700">
                          <Building className="mr-2 h-5 w-5" />
                          Factory Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the factory address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <LoadingButton
                  className="mt-[26px] w-full"
                  type="submit"
                  loading={loading}
                >
                  Submit Catch Log
                </LoadingButton>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CatchLog;
