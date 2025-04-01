import Link from "next/link";
import React from "react";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className={`btn btn-primary ${extraStyle ?? ""}`}>
        Welcome back, {name}
      </Link>
    );
  } 

  return <button className="btn btn-secondary">Login</button>;
};

export default ButtonLogin;
