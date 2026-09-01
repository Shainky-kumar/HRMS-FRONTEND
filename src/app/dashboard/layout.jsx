// // import Sidebar from "@/components/dashboard/sidebar";
// // import Topbar from "@/components/dashboard/topbar";

// // export const metadata = {
// //   title: "Dashboard | EZlikfe HRMS",
// //   description: "HRMS dashboard",
// // };

// // export default function DashboardLayout({ children }) {
// //   return (
// //     <div className="min-h-screen bg-slate-50">
// //       <div className="flex min-h-screen">
// //         <Sidebar />
// //         <div className="flex min-h-screen flex-1 flex-col">
// //           <Topbar />
// //           <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import Sidebar from "@/components/dashboard/sidebar";
// import Topbar from "@/components/dashboard/topbar";

// export const metadata = {
//   title: "Dashboard | EZlikfe HRMS",
//   description: "HRMS dashboard",
// };

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Fixed Sidebar */}
//       <Sidebar />

//       {/* Fixed Topbar */}
//       <Topbar />

//       {/* Scrollable Content */}
//       <main className="min-h-screen pt-14 lg:pl-[64px] xl:pl-[200px]">
//         <div className="p-4 sm:p-6 lg:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }

import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

export const metadata = {
  title: "Dashboard | EZlife HRMS",
  description: "HRMS dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Sidebar />
      <Topbar />

      <main className="min-h-screen pt-14 lg:pl-[220px]">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}