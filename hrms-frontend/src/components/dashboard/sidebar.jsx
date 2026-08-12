
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, MapPin, Users } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: Home },
//   { label: "Locations", href: "/dashboard/locations", icon: MapPin },
//   { label: "Employees", href: "/dashboard/employees", icon: Users },
//   { label: "Onboarding", href: "/dashboard/Onboarding", icon: Users },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   const isEmployeeModule =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <aside className="hidden w-[64px] flex-col bg-[#0f172a] lg:flex xl:w-[200px]">
//       {/* Brand */}
//       <div className="flex h-14 items-center gap-3 border-b border-white/10 px-3">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E42527] text-sm font-bold text-white shadow-sm">
//           E
//         </div>
//         <div className="hidden min-w-0 xl:block">
//           <p className="truncate text-sm font-semibold text-white">EZlikfe</p>
//           <p className="truncate text-[10px] text-slate-400">HRMS</p>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-1 flex-col gap-1 p-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;

//           const isActive =
//             item.href === "/dashboard/employees"
//               ? isEmployeeModule
//               : pathname === item.href ||
//                 (item.href !== "/dashboard" && pathname?.startsWith(item.href));

//           return (
//             <Link
//               key={item.href + item.label}
//               href={item.href}
//               title={item.label}
//               className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13px] font-medium transition-all duration-150 ${
//                 isActive
//                   ? "bg-[#E42527] text-white shadow-md shadow-red-900/30"
//                   : "text-slate-400 hover:bg-white/5 hover:text-white"
//               }`}
//             >
//               {isActive && (
//                 <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-white xl:hidden" />
//               )}

//               <Icon
//                 className={`h-[18px] w-[18px] shrink-0 ${
//                   isActive ? "text-white" : "text-slate-400 group-hover:text-white"
//                 }`}
//               />
//               <span className="hidden truncate xl:inline">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="hidden border-t border-white/10 p-3 xl:block">
//         <p className="text-[10px] text-slate-500">© EZlikfe HRMS</p>
//       </div>
//     </aside>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, MapPin, Users } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: Home },
//   { label: "Locations", href: "/dashboard/locations", icon: MapPin },
//   { label: "Employees", href: "/dashboard/employees", icon: Users },
//   { label: "Onboarding", href: "/dashboard/Onboarding", icon: Users },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   const isEmployeeModule =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <aside className="fixed inset-y-0 left-0 z-50 hidden w-[64px] flex-col bg-[#0f172a] lg:flex xl:w-[200px]">
//       {/* Brand */}
//       <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-3">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E42527] text-sm font-bold text-white shadow-sm">
//           E
//         </div>
//         <div className="hidden min-w-0 xl:block">
//           <p className="truncate text-sm font-semibold text-white">EZlikfe</p>
//           <p className="truncate text-[10px] text-slate-400">HRMS</p>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive =
//             item.href === "/dashboard/employees"
//               ? isEmployeeModule
//               : pathname === item.href ||
//                 (item.href !== "/dashboard" && pathname?.startsWith(item.href));

//           return (
//             <Link
//               key={item.href + item.label}
//               href={item.href}
//               title={item.label}
//               className={`group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[13px] font-medium transition-all duration-150 ${
//                 isActive
//                   ? "bg-[#E42527] text-white shadow-md shadow-red-900/30"
//                   : "text-slate-400 hover:bg-white/5 hover:text-white"
//               }`}
//             >
//               {isActive && (
//                 <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-white xl:hidden" />
//               )}
//               <Icon
//                 className={`h-[18px] w-[18px] shrink-0 ${
//                   isActive ? "text-white" : "text-slate-400 group-hover:text-white"
//                 }`}
//               />
//               <span className="hidden truncate xl:inline">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="hidden shrink-0 border-t border-white/10 p-3 xl:block">
//         <p className="text-[10px] text-slate-500">© EZlikfe HRMS</p>
//       </div>
//     </aside>
//   );
// }


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Home, MapPin, Users } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", href: "/dashboard", icon: Home },
//   { label: "Locations", href: "/dashboard/locations", icon: MapPin },
//   { label: "Employees", href: "/dashboard/employees", icon: Users },
//   { label: "Onboarding", href: "/dashboard/Onboarding", icon: Users },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   const isEmployeeModule =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <aside className="fixed inset-y-0 left-0 z-50 hidden w-[220px] flex-col bg-[#0f172a] lg:flex">
//       {/* Brand */}
//       <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-4">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E42527] text-sm font-bold text-white shadow-sm">
//           E
//         </div>
//         <div className="min-w-0">
//           <p className="truncate text-sm font-semibold text-white">EZlikfe</p>
//           <p className="truncate text-[10px] text-slate-400">HRMS</p>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive =
//             item.href === "/dashboard/employees"
//               ? isEmployeeModule
//               : pathname === item.href ||
//                 (item.href !== "/dashboard" && pathname?.startsWith(item.href));

//           return (
//             <Link
//               key={item.href + item.label}
//               href={item.href}
//               title={item.label}
//               className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
//                 isActive
//                   ? "bg-[#E42527] text-white shadow-md shadow-red-900/30"
//                   : "text-slate-400 hover:bg-white/5 hover:text-white"
//               }`}
//             >
//               <Icon
//                 className={`h-[18px] w-[18px] shrink-0 ${
//                   isActive ? "text-white" : "text-slate-400 group-hover:text-white"
//                 }`}
//               />
//               <span className="truncate">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="shrink-0 border-t border-white/10 p-3">
//         <p className="text-[10px] text-slate-500">© EZlikfe HRMS</p>
//       </div>
//     </aside>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Users, CalendarDays } from "lucide-react"; // Added CalendarDays

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Locations", href: "/dashboard/locations", icon: MapPin },
  { label: "Employees", href: "/dashboard/employees", icon: Users },
  { label: "Onboarding", href: "/dashboard/Onboarding", icon: Users },
  { label: "Leave Tracker", href: "/dashboard/leave-policies", icon: CalendarDays }, // Added Leave Tracker
];

export default function Sidebar() {
  const pathname = usePathname();

  const isEmployeeModule =
    pathname?.startsWith("/dashboard/departments") ||
    pathname?.startsWith("/dashboard/designations") ||
    pathname?.startsWith("/dashboard/employees") ||
    pathname?.startsWith("/dashboard/employment-types");

  // Check if current route belongs to the Leave module
  const isLeaveModule = pathname?.startsWith("/dashboard/leave");

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[220px] flex-col bg-[#0f172a] lg:flex">
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E42527] text-sm font-bold text-white shadow-sm">
          E
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">EZlikfe</p>
          <p className="truncate text-[10px] text-slate-400">HRMS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard/employees"
              ? isEmployeeModule
              : item.href === "/dashboard/leave/policies"
              ? isLeaveModule
              : pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              title={item.label}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#E42527] text-white shadow-md shadow-red-900/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <p className="text-[10px] text-slate-500">© EZlikfe HRMS</p>
      </div>
    </aside>
  );
}