import React from "react";
import prisma from "@/lib/prisma";
import { getPermitDataInclude } from "@/lib/types";
import UpdatePermit from "../../_components/UpadtePermit";

const UpdatePage = async () => {
  const unapprovedPermits = await prisma.permit.findMany({
    where: { approved: false },
    include: getPermitDataInclude(),
  });

  return (
    <div>
      <UpdatePermit permits={unapprovedPermits} />
    </div>
  );
};

export default UpdatePage;
