// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
//     if (token) {
//       router.replace("/dashboard");
//     } else {
//       router.replace("/login");
//     }
//   }, [router]);

//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Redirecting to login...</p>
    </div>
  );
}