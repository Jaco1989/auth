"use client";

import React from "react";
import { useSession } from "../../SessionProvider";

const Dashboard = () => {
  const session = useSession();
  return <div>{session.user.role}</div>;
};

export default Dashboard;
