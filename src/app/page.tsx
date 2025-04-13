"use client";

import { paths } from "@/components/routes/paths/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.dashboard.root);
  }, []);

  return null;
};

export default RedirectPage;
