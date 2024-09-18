import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { permitId: string };
}

const SkipperPermit = () => {
  return (
    <div>
      <h1>Permit Params</h1>
    </div>
  );
};

export default SkipperPermit;
