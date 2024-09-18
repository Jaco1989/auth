import React from "react";
import SkipperPermit from "../_components/Permit";
import prisma from "@/lib/prisma";
import { getPermitDataInclude, PermitData } from "@/lib/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

async function getPermitId(id: string): Promise<PermitData> {
  const permit = await prisma.permit.findUnique({
    where: { id: parseInt(id, 10) },
    include: getPermitDataInclude(),
  });

  if (!permit) notFound();
  return permit;
}

export async function generateStaticParams() {
  const permits = await prisma.permit.findMany({
    where: { approved: false },
    select: { id: true },
  });

  return permits.map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const permit = await getPermitId(id);

  return {
    title: permit.title,
  };
}

export default async function Page({ params: { id } }: PageProps) {
  const permit = await getPermitId(id);
  return (
    <div>
      <SkipperPermit permit={permit} />
    </div>
  );
}
