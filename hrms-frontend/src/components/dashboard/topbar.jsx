
// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Bell, LogOut, ChevronDown } from "lucide-react";
// import { useAuthStore } from "@/store/authStore";

// const employeeTabs = [
//   { label: "Department", href: "/dashboard/departments" },
//   { label: "Designation", href: "/dashboard/designations" },
//   { label: "Employee", href: "/dashboard/employees" },
//   { label: "Employment Type", href: "/dashboard/employment-types" },
// ];

// export default function Topbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   const displayName = user?.first_name
//     ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
//     : "Admin";

//   const initials = (user?.first_name?.[0] || "A").toUpperCase();

//   const showEmployeeTabs =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#0f172a] px-4">
//       {/* Left side - Employee tabs */}
//       <div className="flex flex-1 items-center">
//         {showEmployeeTabs ? (
//           <nav className="flex items-center gap-1">
//             {employeeTabs.map((tab) => {
//               const isActive =
//                 pathname === tab.href || pathname?.startsWith(tab.href + "/");

//               return (
//                 <Link
//                   key={tab.href}
//                   href={tab.href}
//                   className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
//                     isActive
//                       ? "bg-[#E42527] text-white shadow-sm"
//                       : "text-slate-400 hover:bg-white/5 hover:text-white"
//                   }`}
//                 >
//                   {tab.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         ) : (
//           <div />
//         )}
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-1">
//         {/* Notifications */}
//         <button
//           type="button"
//           className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
//           title="Notifications"
//         >
//           <Bell className="h-[18px] w-[18px]" />
//           <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E42527] ring-2 ring-[#0f172a]" />
//         </button>

//         <div className="mx-2 h-6 w-px bg-white/10" />

//         {/* Profile */}
//         <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E42527] text-xs font-bold text-white shadow-sm">
//             {initials}
//           </div>
//           <div className="hidden text-left sm:block">
//             <p className="text-sm font-medium leading-tight text-white">{displayName}</p>
//             <p className="text-[11px] leading-tight text-slate-400">Admin</p>
//           </div>
//           <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
//         </div>

//         {/* Logout */}
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="ml-1 flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-400 transition hover:bg-[#E42527]/15 hover:text-[#f87171]"
//           title="Sign out"
//         >
//           <LogOut className="h-4 w-4" />
//           <span className="hidden sm:inline">Sign out</span>
//         </button>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Bell, LogOut, ChevronDown } from "lucide-react";
// import { useAuthStore } from "@/store/authStore";

// const employeeTabs = [
//   { label: "Department", href: "/dashboard/departments" },
//   { label: "Designation", href: "/dashboard/designations" },
//   { label: "Employee", href: "/dashboard/employees" },
//   { label: "Employment Type", href: "/dashboard/employment-types" },
// ];

// export default function Topbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   const displayName = user?.first_name
//     ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
//     : "Admin";

//   const initials = (user?.first_name?.[0] || "A").toUpperCase();

//   const showEmployeeTabs =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <header className="fixed top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#0f172a] px-4 left-0 right-0 lg:left-[64px] xl:left-[200px]">
//       {/* Left - Tabs */}
//       <div className="flex flex-1 items-center overflow-x-auto">
//         {showEmployeeTabs ? (
//           <nav className="flex items-center gap-1">
//             {employeeTabs.map((tab) => {
//               const isActive =
//                 pathname === tab.href || pathname?.startsWith(tab.href + "/");

//               return (
//                 <Link
//                   key={tab.href}
//                   href={tab.href}
//                   className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
//                     isActive
//                       ? "bg-[#E42527] text-white shadow-sm"
//                       : "text-slate-400 hover:bg-white/5 hover:text-white"
//                   }`}
//                 >
//                   {tab.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         ) : null}
//       </div>

//       {/* Right */}
//       <div className="flex shrink-0 items-center gap-1">
//         <button
//           type="button"
//           className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
//           title="Notifications"
//         >
//           <Bell className="h-[18px] w-[18px]" />
//           <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E42527] ring-2 ring-[#0f172a]" />
//         </button>

//         <div className="mx-2 h-6 w-px bg-white/10" />

//         <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E42527] text-xs font-bold text-white shadow-sm">
//             {initials}
//           </div>
//           <div className="hidden text-left sm:block">
//             <p className="text-sm font-medium leading-tight text-white">{displayName}</p>
//             <p className="text-[11px] leading-tight text-slate-400">Admin</p>
//           </div>
//           <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
//         </div>

//         <button
//           type="button"
//           onClick={handleLogout}
//           className="ml-1 flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-400 transition hover:bg-[#E42527]/15 hover:text-[#f87171]"
//           title="Sign out"
//         >
//           <LogOut className="h-4 w-4" />
//           <span className="hidden sm:inline">Sign out</span>
//         </button>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Bell, LogOut, ChevronDown } from "lucide-react";
// import { useAuthStore } from "@/store/authStore";

// const employeeTabs = [
//   { label: "Department", href: "/dashboard/departments" },
//   { label: "Designation", href: "/dashboard/designations" },
//   { label: "Employee", href: "/dashboard/employees" },
//   { label: "Employment Type", href: "/dashboard/employment-types" },
// ];

// export default function Topbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { user, logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   const displayName = user?.first_name
//     ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
//     : "Admin";

//   const initials = (user?.first_name?.[0] || "A").toUpperCase();

//   const showEmployeeTabs =
//     pathname?.startsWith("/dashboard/departments") ||
//     pathname?.startsWith("/dashboard/designations") ||
//     pathname?.startsWith("/dashboard/employees") ||
//     pathname?.startsWith("/dashboard/employment-types");

//   return (
//     <header className="fixed top-0 right-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#0f172a] px-5 left-0 lg:left-[220px]">
//       {/* Left - Tabs */}
//       <div className="flex flex-1 items-center overflow-x-auto">
//         {showEmployeeTabs ? (
//           <nav className="flex items-center gap-1">
//             {employeeTabs.map((tab) => {
//               const isActive =
//                 pathname === tab.href || pathname?.startsWith(tab.href + "/");

//               return (
//                 <Link
//                   key={tab.href}
//                   href={tab.href}
//                   className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
//                     isActive
//                       ? "bg-[#E42527] text-white shadow-sm"
//                       : "text-slate-400 hover:bg-white/5 hover:text-white"
//                   }`}
//                 >
//                   {tab.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         ) : null}
//       </div>

//       {/* Right */}
//       <div className="flex shrink-0 items-center gap-1">
//         <button
//           type="button"
//           className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
//           title="Notifications"
//         >
//           <Bell className="h-[18px] w-[18px]" />
//           <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E42527] ring-2 ring-[#0f172a]" />
//         </button>

//         <div className="mx-2 h-6 w-px bg-white/10" />

//         <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E42527] text-xs font-bold text-white shadow-sm">
//             {initials}
//           </div>
//           <div className="hidden text-left sm:block">
//             <p className="text-sm font-medium leading-tight text-white">{displayName}</p>
//             <p className="text-[11px] leading-tight text-slate-400">Admin</p>
//           </div>
//           <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
//         </div>

//         <button
//           type="button"
//           onClick={handleLogout}
//           className="ml-1 flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-400 transition hover:bg-[#E42527]/15 hover:text-[#f87171]"
//           title="Sign out"
//         >
//           <LogOut className="h-4 w-4" />
//           <span className="hidden sm:inline">Sign out</span>
//         </button>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const employeeTabs = [
  { label: "Department", href: "/dashboard/departments" },
  { label: "Designation", href: "/dashboard/designations" },
  { label: "Employee", href: "/dashboard/employees" },
  { label: "Employment Type", href: "/dashboard/employment-types" },
];

const leaveTabs = [
  { label: "Policies", href: "/dashboard/leave/policies" },
  { label: "Experience Tiers", href: "/dashboard/leave/tiers" },
  { label: "Applicability Rules", href: "/dashboard/leave/applicability" },
  { label: "Clubbing Restrictions", href: "/dashboard/leave/clubbing" },
  { label: "Workflows", href: "/dashboard/leave/workflows" },
  { label: "Leave Balances", href: "/dashboard/leave/balances" },
  { label: "All Requests", href: "/dashboard/leave/requests" },
];

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const displayName = user?.first_name
    ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
    : "Admin";

  const initials = (user?.first_name?.[0] || "A").toUpperCase();

  const showEmployeeTabs =
    pathname?.startsWith("/dashboard/departments") ||
    pathname?.startsWith("/dashboard/designations") ||
    pathname?.startsWith("/dashboard/employees") ||
    pathname?.startsWith("/dashboard/employment-types");

  const showLeaveTabs = pathname?.startsWith("/dashboard/leave");

  return (
    <header className="fixed top-0 right-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#0f172a] px-5 left-0 lg:left-[220px]">
      {/* Left - Tabs */}
      <div className="flex flex-1 items-center overflow-x-auto">
        {showEmployeeTabs ? (
          <nav className="flex items-center gap-1">
            {employeeTabs.map((tab) => {
              const isActive =
                pathname === tab.href || pathname?.startsWith(tab.href + "/");

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#E42527] text-white shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        ) : showLeaveTabs ? (
          <nav className="flex items-center gap-1">
            {leaveTabs.map((tab) => {
              const isActive =
                pathname === tab.href || pathname?.startsWith(tab.href + "/");

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#E42527] text-white shadow-sm"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          title="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#E42527] ring-2 ring-[#0f172a]" />
        </button>

        <div className="mx-2 h-6 w-px bg-white/10" />

        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E42527] text-xs font-bold text-white shadow-sm">
            {initials}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight text-white">{displayName}</p>
            <p className="text-[11px] leading-tight text-slate-400">Admin</p>
          </div>
          <ChevronDown className="hidden h-3.5 w-3.5 text-slate-500 sm:block" />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="ml-1 flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-400 transition hover:bg-[#E42527]/15 hover:text-[#f87171]"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}