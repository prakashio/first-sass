"use client";

import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardLink = "/dashboard";

  if (session) {
    return (
      <Link
        href={dashboardLink}
        className={`btn btn-primary ${extraStyle ?? ""}`}
      >
        Welcome back {session.user.name || "Buddy"}
      </Link>
    );
  }

  return (
    <button
      className={`btn btn-primary ${extraStyle ?? ""}`}
      onClick={() => {
        signIn(undefined, {
          redirectTo: dashboardLink,
        });
      }}
    >
      Get started
    </button>
  );
};

export default ButtonLogin;
