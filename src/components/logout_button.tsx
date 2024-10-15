"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/stores/store";
import { Button } from "./ui/button";
import { LogOut, LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const [user, _] = useAtom(userAtom);

  async function handleLogout() {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.refresh();
  }

  return user ? (
    <Button className="text-destructive" onClick={handleLogout} variant="ghost">
      {"logout"}
      <LogOut className="h-4 w-4 ml-2" />
    </Button>
  ) : null;
}
