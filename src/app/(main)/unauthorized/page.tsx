import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="mx-auto mt-5 flex flex-col items-center gap-5">
      <div className="mx-auto flex size-fit justify-center rounded-md bg-slate-400 p-5 shadow-2xl shadow-black">
        <h1 className="text-center text-3xl font-extrabold text-black">
          Sorry you are not Authorized to access this route. Please wait for
          your authorization to be approved from Head Office.
        </h1>
      </div>
      <div className="mt-10">
        <Clock color="blue" size={200} />
      </div>
      <Button asChild>
        <Link href={"/"}>Go Back to Routing panel</Link>
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
