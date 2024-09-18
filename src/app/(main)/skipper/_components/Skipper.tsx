"use client";
import React from "react";
import { useSession } from "../../SessionProvider";
import Link from "next/link";

const Skipper = () => {
  const session = useSession();
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome Aboard, Captain {session.user.username}!
          </h1>
          <p className="text-xl text-gray-600">
            Your maritime dashboard is ready for smooth sailing.
          </p>
        </header>

        <footer className="mt-16 text-center">
          <p className="text-gray-600">
            Need assistance? Contact our support team at:{" "}
            <span className="hover:underline">
              <Link href={"/support/fishingpermits"}>support</Link>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Skipper;
