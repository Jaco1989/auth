"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "../../SessionProvider";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const Skipper = () => {
  const session = useSession();
  const [permitData, setPermitData] = useState({
    totalPermits: 0,
    maxPermits: 50,
  });

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // In a real application, you would fetch data from an API here
      const simulatedData = {
        totalPermits: 35, // Example total permits
        maxPermits: 50, // Example max permits
      };
      setPermitData(simulatedData);
    };

    fetchData();
  }, []);

  const percentageComplete = Math.round(
    (permitData.totalPermits / permitData.maxPermits) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Welcome Aboard, Captain {session.user.username}!
          </h1>
          <p className="text-xl text-gray-600">
            Your maritime dashboard is ready for smooth sailing.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center"
        >
          <div className="w-64 sm:w-80">
            <CircularProgressbar
              value={percentageComplete}
              text={`${percentageComplete}%`}
              styles={buildStyles({
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(59, 130, 246, ${percentageComplete / 100})`,
                textColor: "#1e40af",
                trailColor: "#d1d5db",
              })}
            />
          </div>
          <p className="mt-6 text-center text-2xl font-semibold text-gray-700">
            Permits Submitted: {permitData.totalPermits}/{permitData.maxPermits}
          </p>
          <p className="mt-2 text-center text-lg text-gray-600">
            You are making great progress on your permit submissions!
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 space-y-4 text-center sm:space-x-4 sm:space-y-0"
        ></motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600">
            Need assistance? Contact our support team at:{" "}
            <Link
              href="/support/fishingpermits"
              className="text-blue-600 hover:underline"
            >
              support
            </Link>
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Skipper;
