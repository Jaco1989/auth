"use client";

import React from "react";
import { useSession } from "../../SessionProvider";

const Monitor = () => {
  const session = useSession();
  return <div>{session.user.role}</div>;
};

export default Monitor;
