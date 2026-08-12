
// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// export default function DepartmentsPage() {
//   const [departments, setDepartments] = useState([]);
//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const res = await api.get("/api/v1/get/departments");
//       setDepartments(res.data?.data ?? res.data ?? []);
//     } catch (err) {
//       setError(err?.response?.data?.detail || err.message || "Unable to fetch departments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addDepartment = async (event) => {
//     event.preventDefault();
//     if (!name.trim()) return;

//     setError("");
//     setSubmitting(true);
//     try {
//       await api.post("/api/v1/add/departemnt", {
//         department_name: name.trim(),
//         department_code: code.trim() || undefined,
//       });
//       setName("");
//       setCode("");
//       setShowAddForm(false);
//       fetchDepartments();
//     } catch (err) {
//       setError(err?.response?.data?.detail || err.message || "Unable to add department.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const filteredDepartments = departments.filter((dept) => {
//     const deptName = (dept.department_name || dept.name || "").toLowerCase();
//     return deptName.includes(search.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       {/* Page Header - Zoho style */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Departments</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">
//             Manage your organization&apos;s departments and hierarchy
//           </p>
//         </div>

//         <button
//           onClick={() => setShowAddForm(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] focus:outline-none focus:ring-2 focus:ring-[#E42527]/40"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Department
//         </button>
//       </div>

//       {/* Main Card */}
//       <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
//         {/* Toolbar */}
//         <div className="flex flex-col gap-3 border-b border-[#e5e7eb] bg-white px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full max-w-xs">
//             <svg
//               className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search departments..."
//               className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//             />
//           </div>

//           <div className="text-sm text-[#6b7280]">
//             {filteredDepartments.length} department{filteredDepartments.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="flex items-center gap-3 text-sm text-[#6b7280]">
//                 <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Loading departments...
//               </div>
//             </div>
//           ) : filteredDepartments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
//                 <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-[#374151]">No departments found</p>
//               <p className="mt-1 text-sm text-[#6b7280]">
//                 {search ? "Try a different search term" : "Get started by adding your first department"}
//               </p>
//               {!search && (
//                 <button
//                   onClick={() => setShowAddForm(true)}
//                   className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
//                 >
//                   + Add Department
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Department Name</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Code</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Created</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#f3f4f6]">
//                 {filteredDepartments.map((department, index) => (
//                   <tr key={index} className="group transition hover:bg-[#fafafa]">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
//                           {(department.department_name || department.name || "D")[0]?.toUpperCase()}
//                         </div>
//                         <span className="font-medium text-[#1a1a1a]">
//                           {department.department_name || department.name || `Department ${index + 1}`}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department.department_code || department.code || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department.created_at
//                         ? new Date(department.created_at).toLocaleDateString("en-IN", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <button className="rounded p-1.5 text-[#9ca3af] opacity-0 transition hover:bg-[#f3f4f6] hover:text-[#374151] group-hover:opacity-100">
//                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Add Department Modal - Zoho style */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
//               <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Department</h2>
//               <button
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setError("");
//                   setName("");
//                   setCode("");
//                 }}
//                 className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={addDepartment} className="p-5">
//               <div className="space-y-4">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Name <span className="text-[#E42527]">*</span>
//                   </label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                     autoFocus
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="e.g. Marketing"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Code
//                   </label>
//                   <input
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="e.g. MKT"
//                   />
//                 </div>

//                 {error && (
//                   <div className="rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
//                     {error}
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="mt-6 flex items-center justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowAddForm(false);
//                     setError("");
//                     setName("");
//                     setCode("");
//                   }}
//                   className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting || !name.trim()}
//                   className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// const initialForm = {
//   department_name: "",
//   department_owner_id: "",
//   parent_department_id: "",
//   department_description: "",
// };

// // FastAPI error ko string mein convert karta hai
// const getErrorMessage = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail.map((item) => item.msg || JSON.stringify(item)).join(", ");
//   }
//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || JSON.stringify(detail);
//   }
//   return err?.message || "Something went wrong.";
// };

// export default function DepartmentsPage() {
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const [deptRes, empRes] = await Promise.all([
//         api.get("/api/v1/get/departments"),
//         api.get("/api/v1/get/employees").catch(() => ({ data: [] })),
//       ]);
//       setDepartments(deptRes.data?.data ?? deptRes.data ?? []);
//       setEmployees(empRes.data?.data ?? empRes.data ?? []);
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const addDepartment = async (event) => {
//     event.preventDefault();
//     if (!form.department_name.trim()) return;

//     setError("");
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: form.department_name.trim(),
//         department_description: form.department_description.trim(),
//         department_owner_id: form.department_owner_id || null,
//         parent_department_id: form.parent_department_id || null,
//       };

//       await api.post("/api/v1/add/departemnt", payload);
//       setForm(initialForm);
//       setShowAddForm(false);
//       fetchData();
//     } catch (err) {
//       setError(getErrorMessage(err));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const closeModal = () => {
//     setShowAddForm(false);
//     setError("");
//     setForm(initialForm);
//   };

//   const filteredDepartments = departments.filter((dept) => {
//     const name = (dept.department_name || dept.name || "").toLowerCase();
//     return name.includes(search.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       {/* Page Header */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Departments</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">
//             Manage your organization&apos;s departments and hierarchy
//           </p>
//         </div>

//         <button
//           onClick={() => setShowAddForm(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21]"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Department
//         </button>
//       </div>

//       {/* Main Card */}
//       <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
//         {/* Toolbar */}
//         <div className="flex flex-col gap-3 border-b border-[#e5e7eb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full max-w-xs">
//             <svg
//               className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search departments..."
//               className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//             />
//           </div>
//           <div className="text-sm text-[#6b7280]">
//             {filteredDepartments.length} department{filteredDepartments.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="flex items-center gap-3 text-sm text-[#6b7280]">
//                 <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Loading departments...
//               </div>
//             </div>
//           ) : filteredDepartments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
//                 <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-[#374151]">No departments found</p>
//               <p className="mt-1 text-sm text-[#6b7280]">
//                 {search ? "Try a different search term" : "Get started by adding your first department"}
//               </p>
//               {!search && (
//                 <button
//                   onClick={() => setShowAddForm(true)}
//                   className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
//                 >
//                   + Add Department
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Department Name</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Description</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Owner</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Parent</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#f3f4f6]">
//                 {filteredDepartments.map((department, index) => (
//                   <tr key={department.department_id || department.id || index} className="group transition hover:bg-[#fafafa]">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
//                           {(department.department_name || department.name || "D")[0]?.toUpperCase()}
//                         </div>
//                         <span className="font-medium text-[#1a1a1a]">
//                           {department.department_name || department.name || `Department ${index + 1}`}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280] max-w-[200px] truncate">
//                       {department.department_description || department.description || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department.department_owner_name || department.owner_name || department.department_owner_id || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department.parent_department_name || department.parent_name || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <button className="rounded p-1.5 text-[#9ca3af] opacity-0 transition hover:bg-[#f3f4f6] hover:text-[#374151] group-hover:opacity-100">
//                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Add Department Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
//               <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Department</h2>
//               <button
//                 onClick={closeModal}
//                 className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Modal Body */}
//             <form onSubmit={addDepartment} className="p-5">
//               <div className="space-y-4">
//                 {/* Department Name */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Name <span className="text-[#E42527]">*</span>
//                   </label>
//                   <input
//                     value={form.department_name}
//                     onChange={(e) => handleChange("department_name", e.target.value)}
//                     required
//                     autoFocus
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="e.g. Marketing"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Description <span className="text-[#E42527]">*</span>
//                   </label>
//                   <textarea
//                     value={form.department_description}
//                     onChange={(e) => handleChange("department_description", e.target.value)}
//                     required
//                     rows={3}
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="Brief description of the department"
//                   />
//                 </div>

//                 {/* Department Owner */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Owner
//                   </label>
//                   <select
//                     value={form.department_owner_id}
//                     onChange={(e) => handleChange("department_owner_id", e.target.value)}
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                   >
//                     <option value="">Select owner (optional)</option>
//                     {employees.map((emp, index) => (
//                       <option
//                         key={emp.employee_id || emp.id || index}
//                         value={emp.employee_id || emp.id || ""}
//                       >
//                         {emp.first_name
//                           ? `${emp.first_name} ${emp.last_name || ""}`.trim()
//                           : emp.name || `Employee ${index + 1}`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Parent Department */}
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Parent Department
//                   </label>
//                   <select
//                     value={form.parent_department_id}
//                     onChange={(e) => handleChange("parent_department_id", e.target.value)}
//                     className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm text-[#1a1a1a] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                   >
//                     <option value="">Select parent (optional)</option>
//                     {departments.map((dept, index) => (
//                       <option
//                         key={dept.department_id || dept.id || index}
//                         value={dept.department_id || dept.id || ""}
//                       >
//                         {dept.department_name || dept.name || `Department ${index + 1}`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
//                     {error}
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="mt-6 flex items-center justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting || !form.department_name.trim()}
//                   className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// const initialForm = {
//   department_name: "",
//   department_owner_id: "",
//   parent_department_id: "",
//   department_description: "",
// };

// // FastAPI error → readable string
// const getErrorMessage = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail.map((item) => item?.msg || JSON.stringify(item)).join(", ");
//   }
//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || JSON.stringify(detail);
//   }
//   return err?.message || "Something went wrong.";
// };

// // Response se hamesha array nikaalo
// const toArray = (data) => {
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.data)) return data.data;
//   if (Array.isArray(data?.results)) return data.results;
//   if (Array.isArray(data?.items)) return data.items;
//   return [];
// };

// export default function DepartmentsPage() {
//   const [departments, setDepartments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const [deptRes, empRes] = await Promise.all([
//         api.get("/api/v1/get/departments"),
//         // api.get("/api/v1/get/employees").catch(() => ({ data: [] })),
//       ]);

//       setDepartments(toArray(deptRes.data));
//       setEmployees(toArray(empRes.data));
//     } catch (err) {
//       console.error("Fetch error:", err?.response || err);
//       setError(getErrorMessage(err));
//       setDepartments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const addDepartment = async (event) => {
//     event.preventDefault();
//     if (!form.department_name.trim()) return;

//     setError("");
//     setSubmitting(true);
//     try {
//       const payload = {
//         department_name: form.department_name.trim(),
//         department_description: form.department_description.trim(),
//         department_owner_id: form.department_owner_id || null,
//         parent_department_id: form.parent_department_id || null,
//       };

//       await api.post("/api/v1/add/departemnt", payload);
//       setForm(initialForm);
//       setShowAddForm(false);
//       fetchData();
//     } catch (err) {
//       console.error("Add error:", err?.response || err);
//       setError(getErrorMessage(err));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const closeModal = () => {
//     setShowAddForm(false);
//     setError("");
//     setForm(initialForm);
//   };

//   // Safe filter — hamesha array pe
//   const list = Array.isArray(departments) ? departments : [];
//   const filteredDepartments = list.filter((dept) => {
//     const name = (dept?.department_name || dept?.name || "").toLowerCase();
//     return name.includes(search.toLowerCase());
//   });

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       {/* Header */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Departments</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">
//             Manage your organization&apos;s departments and hierarchy
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             setError("");
//             setShowAddForm(true);
//           }}
//           className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21]"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Department
//         </button>
//       </div>

//       {/* Error banner (page level) */}
//       {error && !showAddForm && (
//         <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
//           {error}
//         </div>
//       )}

//       {/* Main Card */}
//       <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
//         {/* Toolbar */}
//         <div className="flex flex-col gap-3 border-b border-[#e5e7eb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
//           <div className="relative w-full max-w-xs">
//             <svg
//               className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search departments..."
//               className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//             />
//           </div>
//           <div className="text-sm text-[#6b7280]">
//             {filteredDepartments.length} department{filteredDepartments.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="flex items-center gap-3 text-sm text-[#6b7280]">
//                 <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Loading departments...
//               </div>
//             </div>
//           ) : filteredDepartments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
//                 <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-[#374151]">No departments found</p>
//               <p className="mt-1 text-sm text-[#6b7280]">
//                 {search ? "Try a different search term" : "Get started by adding your first department"}
//               </p>
//               {!search && (
//                 <button
//                   onClick={() => setShowAddForm(true)}
//                   className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
//                 >
//                   + Add Department
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Department Name</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Description</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Owner</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Parent</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#f3f4f6]">
//                 {filteredDepartments.map((department, index) => (
//                   <tr
//                     key={department?.department_id || department?.id || index}
//                     className="group transition hover:bg-[#fafafa]"
//                   >
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
//                           {(department?.department_name || department?.name || "D")[0]?.toUpperCase()}
//                         </div>
//                         <span className="font-medium text-[#1a1a1a]">
//                           {department?.department_name || department?.name || `Department ${index + 1}`}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="max-w-[200px] truncate px-5 py-3.5 text-[#6b7280]">
//                       {department?.department_description || department?.description || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department?.department_owner_name ||
//                         department?.owner_name ||
//                         department?.department_owner_id ||
//                         "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {department?.parent_department_name || department?.parent_name || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <button className="rounded p-1.5 text-[#9ca3af] opacity-0 transition hover:bg-[#f3f4f6] hover:text-[#374151] group-hover:opacity-100">
//                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
//             <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
//               <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Department</h2>
//               <button onClick={closeModal} className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6]">
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <form onSubmit={addDepartment} className="p-5">
//               <div className="space-y-4">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Name <span className="text-[#E42527]">*</span>
//                   </label>
//                   <input
//                     value={form.department_name}
//                     onChange={(e) => handleChange("department_name", e.target.value)}
//                     required
//                     autoFocus
//                     className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="e.g. Marketing"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Description <span className="text-[#E42527]">*</span>
//                   </label>
//                   <textarea
//                     value={form.department_description}
//                     onChange={(e) => handleChange("department_description", e.target.value)}
//                     required
//                     rows={3}
//                     className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                     placeholder="Brief description of the department"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Department Owner
//                   </label>
//                   <select
//                     value={form.department_owner_id}
//                     onChange={(e) => handleChange("department_owner_id", e.target.value)}
//                     className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                   >
//                     <option value="">Select owner (optional)</option>
//                     {(Array.isArray(employees) ? employees : []).map((emp, index) => (
//                       <option key={emp?.employee_id || emp?.id || index} value={emp?.employee_id || emp?.id || ""}>
//                         {emp?.first_name
//                           ? `${emp.first_name} ${emp.last_name || ""}`.trim()
//                           : emp?.name || `Employee ${index + 1}`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                     Parent Department
//                   </label>
//                   <select
//                     value={form.parent_department_id}
//                     onChange={(e) => handleChange("parent_department_id", e.target.value)}
//                     className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                   >
//                     <option value="">Select parent (optional)</option>
//                     {list.map((dept, index) => (
//                       <option key={dept?.department_id || dept?.id || index} value={dept?.department_id || dept?.id || ""}>
//                         {dept?.department_name || dept?.name || `Department ${index + 1}`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {error && (
//                   <div className="rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
//                     {typeof error === "string" ? error : "Something went wrong."}
//                   </div>
//                 )}
//               </div>

//               <div className="mt-6 flex items-center justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting || !form.department_name.trim()}
//                   className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60"
//                 >
//                   {submitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const initialForm = {
  department_name: "",
  department_owner_id: "",
  parent_department_id: "",
  department_description: "",
};

const getErrorMessage = (err) => {
  try {
    const detail = err?.response?.data?.detail;
    if (Array.isArray(detail)) {
      return detail.map((i) => i?.msg || "Validation error").join(", ");
    }
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object") {
      return detail.msg || detail.message || "Request failed";
    }
    return err?.message || "Something went wrong";
  } catch {
    return "Something went wrong";
  }
};

const toArray = (payload) => {
  try {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.departments)) return payload.departments;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.items)) return payload.items;
    return [];
  } catch {
    return [];
  }
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError("");
    setLoading(true);
    try {
      const deptRes = await api.get("/api/v1/get/departments");
      setDepartments(toArray(deptRes?.data));

      try {
        const empRes = await api.get("/api/v1/get/employees");
        setEmployees(toArray(empRes?.data));
      } catch {
        setEmployees([]);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addDepartment = async (event) => {
    event.preventDefault();
    if (!form.department_name.trim()) return;

    setError("");
    setSubmitting(true);
    try {
      const payload = {
        department_name: form.department_name.trim(),
        department_description: form.department_description.trim(),
        department_owner_id: form.department_owner_id || null,
        parent_department_id: form.parent_department_id || null,
      };

      await api.post("/api/v1/add/departemnt", payload);
      setForm(initialForm);
      setShowAddForm(false);
      await fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowAddForm(false);
    setError("");
    setForm(initialForm);
  };

  const list = Array.isArray(departments) ? departments : [];
  const empList = Array.isArray(employees) ? employees : [];

  const filteredDepartments = list.filter((dept) => {
    const name = (dept?.department_name || dept?.name || "").toLowerCase();
    return name.includes((search || "").toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Departments</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Manage your organization&apos;s departments and hierarchy
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setShowAddForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Department
        </button>
      </div>

      {error && !showAddForm && (
        <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
          {error}
        </div>
      )}

      {/* Card */}
      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e5e7eb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..."
              className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
            />
          </div>
          <div className="text-sm text-[#6b7280]">
            {filteredDepartments.length} department{filteredDepartments.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading departments...
              </div>
            </div>
          ) : filteredDepartments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
                <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#374151]">No departments found</p>
              <p className="mt-1 text-sm text-[#6b7280]">
                {search ? "Try a different search term" : "Get started by adding your first department"}
              </p>
              {!search && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
                >
                  + Add Department
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Department Name</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Description</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Owner</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Parent</th>
                  <th className="px-5 py-3 text-right font-medium text-[#6b7280]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filteredDepartments.map((department, index) => (
                  <tr
                    key={department?.department_id || department?.id || index}
                    className="group transition hover:bg-[#fafafa]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
                          {(department?.department_name || department?.name || "D")[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-[#1a1a1a]">
                          {department?.department_name || department?.name || `Department ${index + 1}`}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-[200px] truncate px-5 py-3.5 text-[#6b7280]">
                      {department?.department_description || department?.description || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {department?.department_owner_name ||
                        department?.owner_name ||
                        department?.department_owner_id ||
                        "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {department?.parent_department_name || department?.parent_name || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        className="rounded p-1.5 text-[#9ca3af] opacity-0 transition hover:bg-[#f3f4f6] hover:text-[#374151] group-hover:opacity-100"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Department</h2>
              <button type="button" onClick={closeModal} className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={addDepartment} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Department Name <span className="text-[#E42527]">*</span>
                  </label>
                  <input
                    value={form.department_name}
                    onChange={(e) => handleChange("department_name", e.target.value)}
                    required
                    autoFocus
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                    placeholder="e.g. Marketing"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Description <span className="text-[#E42527]">*</span>
                  </label>
                  <textarea
                    value={form.department_description}
                    onChange={(e) => handleChange("department_description", e.target.value)}
                    required
                    rows={3}
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                    placeholder="Brief description of the department"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Department Owner
                  </label>
                  <select
                    value={form.department_owner_id}
                    onChange={(e) => handleChange("department_owner_id", e.target.value)}
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                  >
                    <option value="">Select owner (optional)</option>
                    {empList.map((emp, index) => (
                      <option
                        key={emp?.employee_id || emp?.id || index}
                        value={emp?.employee_id || emp?.id || ""}
                      >
                        {emp?.first_name
                          ? `${emp.first_name} ${emp.last_name || ""}`.trim()
                          : emp?.name || `Employee ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Parent Department
                  </label>
                  <select
                    value={form.parent_department_id}
                    onChange={(e) => handleChange("parent_department_id", e.target.value)}
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                  >
                    <option value="">Select parent (optional)</option>
                    {list.map((dept, index) => (
                      <option
                        key={dept?.department_id || dept?.id || index}
                        value={dept?.department_id || dept?.id || ""}
                      >
                        {dept?.department_name || dept?.name || `Department ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !form.department_name.trim()}
                  className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}