// import Link from "next/link";
// import { Users2, CalendarCheck, ClipboardCheck, TrendingUp } from "lucide-react";

// const features = [
//   { icon: Users2, text: "Manage your entire workforce from one dashboard" },
//   { icon: CalendarCheck, text: "Automated attendance & leave tracking" },
//   { icon: ClipboardCheck, text: "Streamlined onboarding for new hires" },
//   { icon: TrendingUp, text: "Real-time performance insights" },
// ];

// export default function AuthLayout({ children }) {
//   return (
//     <div className="flex min-h-screen w-full bg-white">
//       {/* Left branding panel */}
//       <div className="auth-side-panel hidden lg:flex lg:w-[45%] flex-col justify-between p-14 text-white relative overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
//         <div className="absolute bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />

//         <Link href="/" className="flex items-center gap-2 relative z-10">
//           <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center font-bold text-lg">
//             H
//           </div>
//           <span className="text-xl font-semibold tracking-tight">HRMS People</span>
//         </Link>

//         <div className="space-y-8 relative z-10">
//           <h1 className="text-4xl font-semibold leading-tight">
//             Everything HR, <br /> in one clean workspace.
//           </h1>
//           <div className="space-y-4">
//             {features.map(({ icon: Icon, text }) => (
//               <div key={text} className="flex items-center gap-3">
//                 <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
//                   <Icon className="h-4 w-4" />
//                 </div>
//                 <p className="text-sm text-slate-200">{text}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <p className="text-xs text-slate-400 relative z-10">
//           © 2026 HRMS People. All rights reserved.
//         </p>
//       </div>

//       {/* Right form panel */}
//       <div className="flex flex-1 items-center justify-center px-6 py-10 bg-[#F7F8FA]">
//         <div className="w-full max-w-[420px]">{children}</div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users2, CalendarCheck, ClipboardCheck, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const features = [
  { icon: Users2, text: "Manage your entire workforce from one dashboard" },
  { icon: CalendarCheck, text: "Automated attendance & leave tracking" },
  { icon: ClipboardCheck, text: "Streamlined onboarding for new hires" },
  { icon: TrendingUp, text: "Real-time performance insights" },
];

export default function AuthLayout({ children }) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (accessToken) router.push("/dashboard");
  }, [accessToken, router]);

  if (accessToken) return null;

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left branding panel */}
      <div className="auth-side-panel hidden lg:flex lg:w-[45%] flex-col justify-between p-14 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5" />

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center font-bold text-lg">
            E
          </div>
          <span className="text-xl font-semibold tracking-tight">EZlife</span>
        </Link>

        <div className="space-y-8 relative z-10">
          <h1 className="text-4xl font-semibold leading-tight">
            Everything HR, <br /> in one clean workspace.
          </h1>
          <div className="space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm text-slate-200">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 relative z-10">
          © 2026 EZlife. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-10 bg-[#F7F8FA]">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}