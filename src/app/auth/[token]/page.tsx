"use client";

import { requestApi } from "@/utils/requestApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const { token } = useParams();
  const router = useRouter();

  useEffect(() => {
    requestApi({
      path: `/auth/email/${token}`,
      method: "GET",
    }).then(() => {
      router.push("/dashboard");
    });
  }, []);

  return null;
}
