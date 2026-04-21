import { redirect } from "next/navigation";

export default function Home() {
  // Simple redirect to the terminal dashboard
  redirect("/login");
}
