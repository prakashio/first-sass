const { auth } = require("@/auth");
const { redirect } = require("next/navigation");

export default async function LayoutPrivate({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return children;
}
