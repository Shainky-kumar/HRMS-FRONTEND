// import Sidebar from "@/components/dashboard/sidebar";
// import Topbar from "@/components/dashboard/topbar";

// export const metadata = {
//   title: "Dashboard | EZlikfe HRMS",
//   description: "HRMS dashboard",
// };

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-[#f4f6f8]">
//       <Sidebar />
//       <Topbar />

//       {/* Content - sidebar + topbar se proper gap */}
//       <main className="min-h-screen pt-14 lg:pl-[220px]">
//         <div className="p-6 md:p-8">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }


import "./globals.css";

export const metadata = {
  title: "EZlife HRMS",
  description: "HRMS dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}