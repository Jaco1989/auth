"use client";

import React from "react";
import { useSession } from "../../SessionProvider";

const Driver = () => {
  const session = useSession();
  return <div>{session.user.username}</div>;
};

export default Driver;
