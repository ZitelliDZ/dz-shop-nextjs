import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Shop DZ",
  description: "Shop DZ",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <main className="flex justify-center min-h-screen">{children}</main>;
}
