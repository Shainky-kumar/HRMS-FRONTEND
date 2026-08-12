
// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// const initialEmployee = {
//   first_name: "",
//   last_name: "",
//   company_email: "",
//   personal_email: "",
//   personal_mobile: "",
//   company_mobile: "",
//   department_id: "",
//   designation_id: "",
//   location_id: "",
//   reporting_manager: "",
//   employment_type: "",
//   joining_date: "",
//   dob: "",
//   gender: "",
//   blood_group: "",
//   marital_status: "",
//   company_role: "",
//   current_address: "",
//   permanent_address: "",
//   emergency_contact_number: "",
//   aadhaar_number: "",
//   pan_number: "",
//   current_experience: "",
//   total_experience: "",
//   about_me: "",
//   employee_status: "Active",
//   password: "",
//   company_landline: "",
//   date_of_leaving: "",
//   resignation_date: "",
// };

// const formatApiError = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail
//       .map((e) => {
//         const field = Array.isArray(e.loc) ? e.loc.slice(1).join(".") : "";
//         return field ? `${field}: ${e.msg}` : e.msg;
//       })
//       .join(" • ");
//   }

//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") return JSON.stringify(detail);

//   return err?.message || "Something went wrong";
// };

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [employeeData, setEmployeeData] = useState(initialEmployee);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("basic");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const [empRes, deptRes, desigRes, locRes] = await Promise.all([
//         api.get("/api/v1/get/employees"),
//         api.get("/api/v1/get/departments"),
//         api.get("/api/v1/get/designations"),
//         api.get("/api/v1/get/location/master"),
//       ]);
//       setEmployees(empRes.data?.data ?? empRes.data ?? []);
//       setDepartments(deptRes.data?.data ?? deptRes.data ?? []);
//       setDesignations(desigRes.data?.data ?? desigRes.data ?? []);
//       setLocations(locRes.data?.data ?? locRes.data ?? []);
//     } catch (err) {
//       setError(formatApiError(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setEmployeeData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     try {
//       const payload = {
//         ...employeeData,
//         current_experience: employeeData.current_experience
//           ? parseFloat(employeeData.current_experience)
//           : null,
//         total_experience: employeeData.total_experience
//           ? parseFloat(employeeData.total_experience)
//           : null,
//         company_id: "default-company-id", // Replace with actual company ID
//         date_of_leaving: employeeData.date_of_leaving || null,
//         resignation_date: employeeData.resignation_date || null,
//         company_landline: employeeData.company_landline || null,
//         personal_email: employeeData.personal_email || null,
//         personal_mobile: employeeData.personal_mobile || null,
//         company_mobile: employeeData.company_mobile || null,
//         current_address: employeeData.current_address || null,
//         permanent_address: employeeData.permanent_address || null,
//         about_me: employeeData.about_me || null,
//         aadhaar_number: employeeData.aadhaar_number || null,
//         pan_number: employeeData.pan_number || null,
//         blood_group: employeeData.blood_group || null,
//         marital_status: employeeData.marital_status || null,
//         gender: employeeData.gender || null,
//         dob: employeeData.dob || null,
//         company_role: employeeData.company_role || null,
//         emergency_contact_number: employeeData.emergency_contact_number || null,
//         password: employeeData.password || null,
//       };

//       await api.post("/api/v1/add/employee", payload);
//       setEmployeeData(initialEmployee);
//       setShowAddForm(false);
//       setActiveTab("basic");
//       await fetchData();
//     } catch (err) {
//       setError(formatApiError(err));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const filteredEmployees = employees.filter((emp) => {
//     const fullName = `${emp.first_name || ""} ${emp.last_name || ""} ${emp.name || ""}`.toLowerCase();
//     const email = (emp.company_email || emp.email || emp.user_email || "").toLowerCase();
//     const q = search.toLowerCase();
//     return fullName.includes(q) || email.includes(q);
//   });

//   const getInitials = (emp) => {
//     const first = emp.first_name?.[0] || emp.name?.[0] || "E";
//     const last = emp.last_name?.[0] || "";
//     return (first + last).toUpperCase();
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       {/* Page Header */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Employees</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">
//             Manage employee records and master data
//           </p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] focus:outline-none focus:ring-2 focus:ring-[#E42527]/40"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Employee
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
//               placeholder="Search by name or email..."
//               className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//             />
//           </div>
//           <div className="text-sm text-[#6b7280]">
//             {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         {/* Table / List */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="flex items-center gap-3 text-sm text-[#6b7280]">
//                 <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Loading employees...
//               </div>
//             </div>
//           ) : filteredEmployees.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
//                 <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-[#374151]">No employees found</p>
//               <p className="mt-1 text-sm text-[#6b7280]">
//                 {search ? "Try a different search term" : "Get started by adding your first employee"}
//               </p>
//               {!search && (
//                 <button
//                   onClick={() => setShowAddForm(true)}
//                   className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
//                 >
//                   + Add Employee
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Employee</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Email</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Department</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Designation</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#f3f4f6]">
//                 {filteredEmployees.map((employee, index) => (
//                   <tr key={index} className="group transition hover:bg-[#fafafa]">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
//                           {getInitials(employee)}
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#1a1a1a]">
//                             {employee.first_name
//                               ? `${employee.first_name} ${employee.last_name || ""}`.trim()
//                               : employee.name || `Employee ${index + 1}`}
//                           </p>
//                           <p className="text-xs text-[#9ca3af]">
//                             {employee.employee_id || employee.id || ""}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.company_email || employee.email || employee.user_email || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.department_name || employee.department || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.designation_name || employee.designation || "—"}
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           (employee.employee_status || "Active").toLowerCase() === "active"
//                             ? "bg-green-50 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {employee.employee_status || "Active"}
//                       </span>
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

//       {/* Add Employee Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10">
//           <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
//               <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Employee</h2>
//               <button
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setError("");
//                   setEmployeeData(initialEmployee);
//                   setActiveTab("basic");
//                 }}
//                 className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-[#e5e7eb] px-6">
//               {[
//                 { id: "basic", label: "Basic Info" },
//                 { id: "work", label: "Work Details" },
//                 { id: "personal", label: "Personal" },
//                 { id: "other", label: "Other" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   type="button"
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`relative px-4 py-3 text-sm font-medium transition ${
//                     activeTab === tab.id
//                       ? "text-[#E42527]"
//                       : "text-[#6b7280] hover:text-[#374151]"
//                   }`}
//                 >
//                   {tab.label}
//                   {activeTab === tab.id && (
//                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E42527]" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
//                 {/* BASIC INFO */}
//                 {activeTab === "basic" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         First Name <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         value={employeeData.first_name}
//                         onChange={(e) => handleChange("first_name", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Ravi"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Last Name</label>
//                       <input
//                         value={employeeData.last_name}
//                         onChange={(e) => handleChange("last_name", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Kumar"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Company Email <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         value={employeeData.company_email}
//                         onChange={(e) => handleChange("company_email", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ravi@company.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Email</label>
//                       <input
//                         type="email"
//                         value={employeeData.personal_email}
//                         onChange={(e) => handleChange("personal_email", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ravi.personal@gmail.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Mobile</label>
//                       <input
//                         value={employeeData.company_mobile}
//                         onChange={(e) => handleChange("company_mobile", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Mobile</label>
//                       <input
//                         value={employeeData.personal_mobile}
//                         onChange={(e) => handleChange("personal_mobile", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Gender</label>
//                       <select
//                         value={employeeData.gender}
//                         onChange={(e) => handleChange("gender", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Birth</label>
//                       <input
//                         type="date"
//                         value={employeeData.dob}
//                         onChange={(e) => handleChange("dob", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* WORK DETAILS */}
//                 {activeTab === "work" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Department <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.department_id}
//                         onChange={(e) => handleChange("department_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select department</option>
//                         {departments.map((dept, index) => (
//                           <option
//                             key={index}
//                             value={dept.department_id || dept.id || dept._id || ""}
//                           >
//                             {dept.department_name || dept.name || `Department ${index + 1}`}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Designation <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.designation_id}
//                         onChange={(e) => handleChange("designation_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select designation</option>
//                         {designations.map((desig, index) => (
//                           <option
//                             key={index}
//                             value={desig.designation_id || desig.id || desig._id || ""}
//                           >
//                             {desig.designation_name || desig.name || desig.title || `Designation ${index + 1}`}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Location <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.location_id}
//                         onChange={(e) => handleChange("location_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select location</option>
//                         {locations.map((loc, index) => (
//                           <option
//                             key={index}
//                             value={loc.location_id || loc.id || loc._id || ""}
//                           >
//                             {loc.location_name || loc.name || `Location ${index + 1}`}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Reporting Manager <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         value={employeeData.reporting_manager}
//                         onChange={(e) => handleChange("reporting_manager", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Manager name / ID"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Employment Type <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.employment_type}
//                         onChange={(e) => handleChange("employment_type", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select type</option>
//                         <option value="Full-time">Full-time</option>
//                         <option value="Part-time">Part-time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Intern">Intern</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Joining Date <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         value={employeeData.joining_date}
//                         onChange={(e) => handleChange("joining_date", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Role</label>
//                       <input
//                         value={employeeData.company_role}
//                         onChange={(e) => handleChange("company_role", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="e.g. Software Engineer"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Employee Status</label>
//                       <select
//                         value={employeeData.employee_status}
//                         onChange={(e) => handleChange("employee_status", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                         <option value="On Notice">On Notice</option>
//                         <option value="Terminated">Terminated</option>
//                       </select>
//                     </div>
//                     {employeeData.employee_status === "Inactive" && (
//                       <div>
//                         <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Leaving</label>
//                         <input
//                           type="date"
//                           value={employeeData.date_of_leaving}
//                           onChange={(e) => handleChange("date_of_leaving", e.target.value)}
//                           className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         />
//                       </div>
//                     )}
//                     {employeeData.employee_status === "On Notice" && (
//                       <div>
//                         <label className="mb-1.5 block text-sm font-medium text-[#374151]">Resignation Date</label>
//                         <input
//                           type="date"
//                           value={employeeData.resignation_date}
//                           onChange={(e) => handleChange("resignation_date", e.target.value)}
//                           className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* PERSONAL */}
//                 {activeTab === "personal" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Blood Group</label>
//                       <select
//                         value={employeeData.blood_group}
//                         onChange={(e) => handleChange("blood_group", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                           <option key={bg} value={bg}>
//                             {bg}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Marital Status</label>
//                       <select
//                         value={employeeData.marital_status}
//                         onChange={(e) => handleChange("marital_status", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         <option value="Single">Single</option>
//                         <option value="Married">Married</option>
//                         <option value="Divorced">Divorced</option>
//                         <option value="Widowed">Widowed</option>
//                       </select>
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Current Address</label>
//                       <textarea
//                         value={employeeData.current_address}
//                         onChange={(e) => handleChange("current_address", e.target.value)}
//                         rows={2}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Current residential address"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Permanent Address</label>
//                       <textarea
//                         value={employeeData.permanent_address}
//                         onChange={(e) => handleChange("permanent_address", e.target.value)}
//                         rows={2}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Permanent address"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Emergency Contact</label>
//                       <input
//                         value={employeeData.emergency_contact_number}
//                         onChange={(e) => handleChange("emergency_contact_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Aadhaar Number</label>
//                       <input
//                         value={employeeData.aadhaar_number}
//                         onChange={(e) => handleChange("aadhaar_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="XXXX XXXX XXXX"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">PAN Number</label>
//                       <input
//                         value={employeeData.pan_number}
//                         onChange={(e) => handleChange("pan_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ABCDE1234F"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* OTHER */}
//                 {activeTab === "other" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Current Experience (years)
//                       </label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={employeeData.current_experience}
//                         onChange={(e) => handleChange("current_experience", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="2.5"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Total Experience (years)
//                       </label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={employeeData.total_experience}
//                         onChange={(e) => handleChange("total_experience", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="5.0"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">About Me</label>
//                       <textarea
//                         value={employeeData.about_me}
//                         onChange={(e) => handleChange("about_me", e.target.value)}
//                         rows={3}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Short bio / introduction"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Landline</label>
//                       <input
//                         value={employeeData.company_landline}
//                         onChange={(e) => handleChange("company_landline", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 11 1234 5678"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Password (optional)
//                       </label>
//                       <input
//                         type="password"
//                         value={employeeData.password}
//                         onChange={(e) => handleChange("password", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Leave blank to auto-generate"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {error && (
//                   <div className="mt-4 rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
//                     {error}
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
//                 <div className="flex gap-2">
//                   {activeTab !== "basic" && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const tabs = ["basic", "work", "personal", "other"];
//                         const idx = tabs.indexOf(activeTab);
//                         setActiveTab(tabs[idx - 1]);
//                       }}
//                       className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                     >
//                       Previous
//                     </button>
//                   )}
//                   {activeTab !== "other" && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const tabs = ["basic", "work", "personal", "other"];
//                         const idx = tabs.indexOf(activeTab);
//                         setActiveTab(tabs[idx + 1]);
//                       }}
//                       className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                     >
//                       Next
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAddForm(false);
//                       setError("");
//                       setEmployeeData(initialEmployee);
//                       setActiveTab("basic");
//                     }}
//                     className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="rounded-md bg-[#E42527] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {saving ? "Saving..." : "Submit"}
//                   </button>
//                 </div>
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

// const initialEmployee = {
//   first_name: "",
//   last_name: "",
//   company_email: "",
//   personal_email: "",
//   personal_mobile: "",
//   company_mobile: "",
//   department_id: "",
//   designation_id: "",
//   location_id: "",
//   reporting_manager: "",
//   employment_type: "",
//   joining_date: "",
//   dob: "",
//   gender: "",
//   blood_group: "",
//   marital_status: "",
//   company_role: "",
//   current_address: "",
//   permanent_address: "",
//   emergency_contact_number: "",
//   aadhaar_number: "",
//   pan_number: "",
//   current_experience: "",
//   total_experience: "",
//   about_me: "",
//   employee_status: "Active",
//   password: "",
//   company_landline: "",
//   date_of_leaving: "",
//   resignation_date: "",
// };

// const formatApiError = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail
//       .map((e) => {
//         const field = Array.isArray(e.loc) ? e.loc.slice(1).join(".") : "";
//         return field ? `${field}: ${e.msg}` : e.msg;
//       })
//       .join(" • ");
//   }

//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") return JSON.stringify(detail);

//   return err?.message || "Something went wrong";
// };

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [employeeData, setEmployeeData] = useState(initialEmployee);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("basic");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const [empRes, deptRes, desigRes, locRes] = await Promise.all([
//         api.get("/api/v1/get/employees"),
//         api.get("/api/v1/get/departments"),
//         api.get("/api/v1/get/designations"),
//         api.get("/api/v1/get/location/master"),
//       ]);

//       // Employees
//       setEmployees(empRes.data?.data ?? empRes.data ?? []);

//       // Departments - only id + name
//       const deptList = (deptRes.data?.data ?? deptRes.data ?? []).map((item) => ({
//         id: item.department_id || item.id || item._id || "",
//         name: item.department_name || item.name || item.title || "Unknown",
//       }));
//       setDepartments(deptList);

//       // Designations - only id + name
//       const desigList = (desigRes.data?.data ?? desigRes.data ?? []).map((item) => ({
//         id: item.designation_id || item.id || item._id || "",
//         name: item.designation_name || item.name || item.title || "Unknown",
//       }));
//       setDesignations(desigList);

//       // Locations - only id + name
//       const locList = (locRes.data?.data ?? locRes.data ?? []).map((item) => ({
//         id: item.location_id || item.id || item._id || "",
//         name: item.location_name || item.name || item.title || "Unknown",
//       }));
//       setLocations(locList);
//     } catch (err) {
//       setError(formatApiError(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field, value) => {
//     setEmployeeData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     try {
//       const payload = {
//         ...employeeData,
//         current_experience: employeeData.current_experience
//           ? parseFloat(employeeData.current_experience)
//           : null,
//         total_experience: employeeData.total_experience
//           ? parseFloat(employeeData.total_experience)
//           : null,
//         company_id: "default-company-id", // Replace with actual company ID
//         date_of_leaving: employeeData.date_of_leaving || null,
//         resignation_date: employeeData.resignation_date || null,
//         company_landline: employeeData.company_landline || null,
//         personal_email: employeeData.personal_email || null,
//         personal_mobile: employeeData.personal_mobile || null,
//         company_mobile: employeeData.company_mobile || null,
//         current_address: employeeData.current_address || null,
//         permanent_address: employeeData.permanent_address || null,
//         about_me: employeeData.about_me || null,
//         aadhaar_number: employeeData.aadhaar_number || null,
//         pan_number: employeeData.pan_number || null,
//         blood_group: employeeData.blood_group || null,
//         marital_status: employeeData.marital_status || null,
//         gender: employeeData.gender || null,
//         dob: employeeData.dob || null,
//         company_role: employeeData.company_role || null,
//         emergency_contact_number: employeeData.emergency_contact_number || null,
//         password: employeeData.password || null,
//       };

//       await api.post("/api/v1/add/employee", payload);
//       setEmployeeData(initialEmployee);
//       setShowAddForm(false);
//       setActiveTab("basic");
//       await fetchData();
//     } catch (err) {
//       setError(formatApiError(err));
//     } finally {
//       setSaving(false);
//     }
//   };

//   const filteredEmployees = employees.filter((emp) => {
//     const fullName = `${emp.first_name || ""} ${emp.last_name || ""} ${emp.name || ""}`.toLowerCase();
//     const email = (emp.company_email || emp.email || emp.user_email || "").toLowerCase();
//     const q = search.toLowerCase();
//     return fullName.includes(q) || email.includes(q);
//   });

//   const getInitials = (emp) => {
//     const first = emp.first_name?.[0] || emp.name?.[0] || "E";
//     const last = emp.last_name?.[0] || "";
//     return (first + last).toUpperCase();
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-6">
//       {/* Page Header */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Employees</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">
//             Manage employee records and master data
//           </p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] focus:outline-none focus:ring-2 focus:ring-[#E42527]/40"
//         >
//           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//           Add Employee
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
//               placeholder="Search by name or email..."
//               className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//             />
//           </div>
//           <div className="text-sm text-[#6b7280]">
//             {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         {/* Table / List */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="flex items-center gap-3 text-sm text-[#6b7280]">
//                 <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Loading employees...
//               </div>
//             </div>
//           ) : filteredEmployees.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16 text-center">
//               <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
//                 <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-[#374151]">No employees found</p>
//               <p className="mt-1 text-sm text-[#6b7280]">
//                 {search ? "Try a different search term" : "Get started by adding your first employee"}
//               </p>
//               {!search && (
//                 <button
//                   onClick={() => setShowAddForm(true)}
//                   className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
//                 >
//                   + Add Employee
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Employee</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Email</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Department</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Designation</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#f3f4f6]">
//                 {filteredEmployees.map((employee, index) => (
//                   <tr key={index} className="group transition hover:bg-[#fafafa]">
//                     <td className="px-5 py-3.5">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
//                           {getInitials(employee)}
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#1a1a1a]">
//                             {employee.first_name
//                               ? `${employee.first_name} ${employee.last_name || ""}`.trim()
//                               : employee.name || `Employee ${index + 1}`}
//                           </p>
//                           <p className="text-xs text-[#9ca3af]">
//                             {employee.employee_id || employee.id || ""}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.company_email || employee.email || employee.user_email || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.department_name || employee.department || "—"}
//                     </td>
//                     <td className="px-5 py-3.5 text-[#6b7280]">
//                       {employee.designation_name || employee.designation || "—"}
//                     </td>
//                     <td className="px-5 py-3.5">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           (employee.employee_status || "Active").toLowerCase() === "active"
//                             ? "bg-green-50 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {employee.employee_status || "Active"}
//                       </span>
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

//       {/* Add Employee Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10">
//           <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
//               <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Employee</h2>
//               <button
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setError("");
//                   setEmployeeData(initialEmployee);
//                   setActiveTab("basic");
//                 }}
//                 className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
//               >
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-[#e5e7eb] px-6">
//               {[
//                 { id: "basic", label: "Basic Info" },
//                 { id: "work", label: "Work Details" },
//                 { id: "personal", label: "Personal" },
//                 { id: "other", label: "Other" },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   type="button"
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`relative px-4 py-3 text-sm font-medium transition ${
//                     activeTab === tab.id
//                       ? "text-[#E42527]"
//                       : "text-[#6b7280] hover:text-[#374151]"
//                   }`}
//                 >
//                   {tab.label}
//                   {activeTab === tab.id && (
//                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E42527]" />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
//                 {/* BASIC INFO */}
//                 {activeTab === "basic" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         First Name <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         value={employeeData.first_name}
//                         onChange={(e) => handleChange("first_name", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Ravi"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Last Name</label>
//                       <input
//                         value={employeeData.last_name}
//                         onChange={(e) => handleChange("last_name", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Kumar"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Company Email <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         value={employeeData.company_email}
//                         onChange={(e) => handleChange("company_email", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ravi@company.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Email</label>
//                       <input
//                         type="email"
//                         value={employeeData.personal_email}
//                         onChange={(e) => handleChange("personal_email", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ravi.personal@gmail.com"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Mobile</label>
//                       <input
//                         value={employeeData.company_mobile}
//                         onChange={(e) => handleChange("company_mobile", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Mobile</label>
//                       <input
//                         value={employeeData.personal_mobile}
//                         onChange={(e) => handleChange("personal_mobile", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Gender</label>
//                       <select
//                         value={employeeData.gender}
//                         onChange={(e) => handleChange("gender", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Birth</label>
//                       <input
//                         type="date"
//                         value={employeeData.dob}
//                         onChange={(e) => handleChange("dob", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* WORK DETAILS */}
//                 {activeTab === "work" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Department <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.department_id}
//                         onChange={(e) => handleChange("department_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select department</option>
//                         {departments.map((dept) => (
//                           <option key={dept.id} value={dept.id}>
//                             {dept.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Designation <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.designation_id}
//                         onChange={(e) => handleChange("designation_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select designation</option>
//                         {designations.map((desig) => (
//                           <option key={desig.id} value={desig.id}>
//                             {desig.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Location <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.location_id}
//                         onChange={(e) => handleChange("location_id", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select location</option>
//                         {locations.map((loc) => (
//                           <option key={loc.id} value={loc.id}>
//                             {loc.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Reporting Manager <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         value={employeeData.reporting_manager}
//                         onChange={(e) => handleChange("reporting_manager", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Manager name / ID"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Employment Type <span className="text-[#E42527]">*</span>
//                       </label>
//                       <select
//                         value={employeeData.employment_type}
//                         onChange={(e) => handleChange("employment_type", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select type</option>
//                         <option value="Full-time">Full-time</option>
//                         <option value="Part-time">Part-time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Intern">Intern</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Joining Date <span className="text-[#E42527]">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         value={employeeData.joining_date}
//                         onChange={(e) => handleChange("joining_date", e.target.value)}
//                         required
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Role</label>
//                       <input
//                         value={employeeData.company_role}
//                         onChange={(e) => handleChange("company_role", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="e.g. Software Engineer"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Employee Status</label>
//                       <select
//                         value={employeeData.employee_status}
//                         onChange={(e) => handleChange("employee_status", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                         <option value="On Notice">On Notice</option>
//                         <option value="Terminated">Terminated</option>
//                       </select>
//                     </div>
//                     {employeeData.employee_status === "Inactive" && (
//                       <div>
//                         <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Leaving</label>
//                         <input
//                           type="date"
//                           value={employeeData.date_of_leaving}
//                           onChange={(e) => handleChange("date_of_leaving", e.target.value)}
//                           className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         />
//                       </div>
//                     )}
//                     {employeeData.employee_status === "On Notice" && (
//                       <div>
//                         <label className="mb-1.5 block text-sm font-medium text-[#374151]">Resignation Date</label>
//                         <input
//                           type="date"
//                           value={employeeData.resignation_date}
//                           onChange={(e) => handleChange("resignation_date", e.target.value)}
//                           className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* PERSONAL */}
//                 {activeTab === "personal" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Blood Group</label>
//                       <select
//                         value={employeeData.blood_group}
//                         onChange={(e) => handleChange("blood_group", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
//                           <option key={bg} value={bg}>
//                             {bg}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Marital Status</label>
//                       <select
//                         value={employeeData.marital_status}
//                         onChange={(e) => handleChange("marital_status", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                       >
//                         <option value="">Select</option>
//                         <option value="Single">Single</option>
//                         <option value="Married">Married</option>
//                         <option value="Divorced">Divorced</option>
//                         <option value="Widowed">Widowed</option>
//                       </select>
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Current Address</label>
//                       <textarea
//                         value={employeeData.current_address}
//                         onChange={(e) => handleChange("current_address", e.target.value)}
//                         rows={2}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Current residential address"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Permanent Address</label>
//                       <textarea
//                         value={employeeData.permanent_address}
//                         onChange={(e) => handleChange("permanent_address", e.target.value)}
//                         rows={2}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Permanent address"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Emergency Contact</label>
//                       <input
//                         value={employeeData.emergency_contact_number}
//                         onChange={(e) => handleChange("emergency_contact_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 98765 43210"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Aadhaar Number</label>
//                       <input
//                         value={employeeData.aadhaar_number}
//                         onChange={(e) => handleChange("aadhaar_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="XXXX XXXX XXXX"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">PAN Number</label>
//                       <input
//                         value={employeeData.pan_number}
//                         onChange={(e) => handleChange("pan_number", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="ABCDE1234F"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* OTHER */}
//                 {activeTab === "other" && (
//                   <div className="grid gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Current Experience (years)
//                       </label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={employeeData.current_experience}
//                         onChange={(e) => handleChange("current_experience", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="2.5"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Total Experience (years)
//                       </label>
//                       <input
//                         type="number"
//                         step="0.1"
//                         value={employeeData.total_experience}
//                         onChange={(e) => handleChange("total_experience", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="5.0"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">About Me</label>
//                       <textarea
//                         value={employeeData.about_me}
//                         onChange={(e) => handleChange("about_me", e.target.value)}
//                         rows={3}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Short bio / introduction"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Landline</label>
//                       <input
//                         value={employeeData.company_landline}
//                         onChange={(e) => handleChange("company_landline", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="+91 11 1234 5678"
//                       />
//                     </div>
//                     <div>
//                       <label className="mb-1.5 block text-sm font-medium text-[#374151]">
//                         Password (optional)
//                       </label>
//                       <input
//                         type="password"
//                         value={employeeData.password}
//                         onChange={(e) => handleChange("password", e.target.value)}
//                         className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
//                         placeholder="Leave blank to auto-generate"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {error && (
//                   <div className="mt-4 rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
//                     {error}
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
//                 <div className="flex gap-2">
//                   {activeTab !== "basic" && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const tabs = ["basic", "work", "personal", "other"];
//                         const idx = tabs.indexOf(activeTab);
//                         setActiveTab(tabs[idx - 1]);
//                       }}
//                       className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                     >
//                       Previous
//                     </button>
//                   )}
//                   {activeTab !== "other" && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const tabs = ["basic", "work", "personal", "other"];
//                         const idx = tabs.indexOf(activeTab);
//                         setActiveTab(tabs[idx + 1]);
//                       }}
//                       className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                     >
//                       Next
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAddForm(false);
//                       setError("");
//                       setEmployeeData(initialEmployee);
//                       setActiveTab("basic");
//                     }}
//                     className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="rounded-md bg-[#E42527] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {saving ? "Saving..." : "Submit"}
//                   </button>
//                 </div>
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

const initialEmployee = {
  first_name: "",
  last_name: "",
  company_email: "",
  personal_email: "",
  personal_mobile: "",
  company_mobile: "",
  department_id: "",
  designation_id: "",
  location_id: "",
  reporting_manager: "",
  employment_type: "",
  joining_date: "",
  dob: "",
  gender: "",
  blood_group: "",
  marital_status: "",
  company_role: "",
  current_address: "",
  permanent_address: "",
  emergency_contact_number: "",
  aadhaar_number: "",
  pan_number: "",
  current_experience: "",
  total_experience: "",
  about_me: "",
  employee_status: "Active",
  password: "",
  company_landline: "",
  date_of_leaving: "",
  resignation_date: "",
};

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((e) => {
        const field = Array.isArray(e.loc) ? e.loc.slice(1).join(".") : "";
        return field ? `${field}: ${e.msg}` : e.msg;
      })
      .join(" • ");
  }

  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return JSON.stringify(detail);

  return err?.message || "Something went wrong";
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState(initialEmployee);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setError("");
    setLoading(true);
    try {
      const empRes = await api.get("/api/v1/get/employees");
      setEmployees(empRes.data?.data ?? empRes.data ?? []);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEmployeeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...employeeData,
        current_experience: employeeData.current_experience
          ? parseFloat(employeeData.current_experience)
          : null,
        total_experience: employeeData.total_experience
          ? parseFloat(employeeData.total_experience)
          : null,
        company_id: "default-company-id",
        date_of_leaving: employeeData.date_of_leaving || null,
        resignation_date: employeeData.resignation_date || null,
        company_landline: employeeData.company_landline || null,
        personal_email: employeeData.personal_email || null,
        personal_mobile: employeeData.personal_mobile || null,
        company_mobile: employeeData.company_mobile || null,
        current_address: employeeData.current_address || null,
        permanent_address: employeeData.permanent_address || null,
        about_me: employeeData.about_me || null,
        aadhaar_number: employeeData.aadhaar_number || null,
        pan_number: employeeData.pan_number || null,
        blood_group: employeeData.blood_group || null,
        marital_status: employeeData.marital_status || null,
        gender: employeeData.gender || null,
        dob: employeeData.dob || null,
        company_role: employeeData.company_role || null,
        emergency_contact_number: employeeData.emergency_contact_number || null,
        password: employeeData.password || null,
        reporting_manager: employeeData.reporting_manager || null,
        employment_type: employeeData.employment_type || null,
        joining_date: employeeData.joining_date || null,
        first_name: employeeData.first_name || null,
        last_name: employeeData.last_name || null,
        company_email: employeeData.company_email || null,
      };

      await api.post("/api/v1/add/employee", payload);
      setEmployeeData(initialEmployee);
      setShowAddForm(false);
      setActiveTab("basic");
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name || ""} ${emp.last_name || ""} ${emp.name || ""}`.toLowerCase();
    const email = (emp.company_email || emp.email || emp.user_email || "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || email.includes(q);
  });

  const getInitials = (emp) => {
    const first = emp.first_name?.[0] || emp.name?.[0] || "E";
    const last = emp.last_name?.[0] || "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Employees</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Manage employee records and master data
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] focus:outline-none focus:ring-2 focus:ring-[#E42527]/40"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-[#e5e7eb] bg-white px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
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
              placeholder="Search by name or email..."
              className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1a1a] placeholder:text-[#9ca3af] focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
            />
          </div>
          <div className="text-sm text-[#6b7280]">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading employees...
              </div>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f4f6]">
                <svg className="h-6 w-6 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-[#374151]">No employees found</p>
              <p className="mt-1 text-sm text-[#6b7280]">
                {search ? "Try a different search term" : "Get started by adding your first employee"}
              </p>
              {!search && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
                >
                  + Add Employee
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Employee</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Email</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Department</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Designation</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filteredEmployees.map((employee, index) => (
                  <tr key={index} className="group transition hover:bg-[#fafafa]">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
                          {getInitials(employee)}
                        </div>
                        <div>
                          <p className="font-medium text-[#1a1a1a]">
                            {employee.first_name
                              ? `${employee.first_name} ${employee.last_name || ""}`.trim()
                              : employee.name || `Employee ${index + 1}`}
                          </p>
                          <p className="text-xs text-[#9ca3af]">
                            {employee.employee_id || employee.id || ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {employee.company_email || employee.email || employee.user_email || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {employee.department_name || employee.department || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {employee.designation_name || employee.designation || "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          (employee.employee_status || "Active").toLowerCase() === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {employee.employee_status || "Active"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="rounded p-1.5 text-[#9ca3af] opacity-0 transition hover:bg-[#f3f4f6] hover:text-[#374151] group-hover:opacity-100">
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

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10">
          <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Employee</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setError("");
                  setEmployeeData(initialEmployee);
                  setActiveTab("basic");
                }}
                className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#374151]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#e5e7eb] px-6">
              {[
                { id: "basic", label: "Basic Info" },
                { id: "work", label: "Work Details" },
                { id: "personal", label: "Personal" },
                { id: "other", label: "Other" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "text-[#E42527]"
                      : "text-[#6b7280] hover:text-[#374151]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E42527]" />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
                {/* BASIC INFO */}
                {activeTab === "basic" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        First Name
                      </label>
                      <input
                        value={employeeData.first_name}
                        onChange={(e) => handleChange("first_name", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Ravi"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Last Name</label>
                      <input
                        value={employeeData.last_name}
                        onChange={(e) => handleChange("last_name", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Kumar"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Company Email
                      </label>
                      <input
                        type="email"
                        value={employeeData.company_email}
                        onChange={(e) => handleChange("company_email", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="ravi@company.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Email</label>
                      <input
                        type="email"
                        value={employeeData.personal_email}
                        onChange={(e) => handleChange("personal_email", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="ravi.personal@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Mobile</label>
                      <input
                        value={employeeData.company_mobile}
                        onChange={(e) => handleChange("company_mobile", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Personal Mobile</label>
                      <input
                        value={employeeData.personal_mobile}
                        onChange={(e) => handleChange("personal_mobile", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Gender</label>
                      <select
                        value={employeeData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Birth</label>
                      <input
                        type="date"
                        value={employeeData.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      />
                    </div>
                  </div>
                )}

                {/* WORK DETAILS */}
                {activeTab === "work" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Department - Only this is mandatory */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Department <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        value={employeeData.department_id}
                        onChange={(e) => handleChange("department_id", e.target.value)}
                        required
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Enter Department"
                      />
                    </div>

                    {/* Designation - Only this is mandatory */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Designation <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        value={employeeData.designation_id}
                        onChange={(e) => handleChange("designation_id", e.target.value)}
                        required
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Enter Designation"
                      />
                    </div>

                    {/* Location - Only this is mandatory */}
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Location <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        value={employeeData.location_id}
                        onChange={(e) => handleChange("location_id", e.target.value)}
                        required
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Enter Location"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Reporting Manager
                      </label>
                      <input
                        value={employeeData.reporting_manager}
                        onChange={(e) => handleChange("reporting_manager", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Manager name / ID"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Employment Type
                      </label>
                      <select
                        value={employeeData.employment_type}
                        onChange={(e) => handleChange("employment_type", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      >
                        <option value="">Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Intern">Intern</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        value={employeeData.joining_date}
                        onChange={(e) => handleChange("joining_date", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Role</label>
                      <input
                        value={employeeData.company_role}
                        onChange={(e) => handleChange("company_role", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Employee Status</label>
                      <select
                        value={employeeData.employee_status}
                        onChange={(e) => handleChange("employee_status", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="On Notice">On Notice</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </div>

                    {employeeData.employee_status === "Inactive" && (
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#374151]">Date of Leaving</label>
                        <input
                          type="date"
                          value={employeeData.date_of_leaving}
                          onChange={(e) => handleChange("date_of_leaving", e.target.value)}
                          className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        />
                      </div>
                    )}

                    {employeeData.employee_status === "On Notice" && (
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#374151]">Resignation Date</label>
                        <input
                          type="date"
                          value={employeeData.resignation_date}
                          onChange={(e) => handleChange("resignation_date", e.target.value)}
                          className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* PERSONAL */}
                {activeTab === "personal" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Blood Group</label>
                      <select
                        value={employeeData.blood_group}
                        onChange={(e) => handleChange("blood_group", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      >
                        <option value="">Select</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Marital Status</label>
                      <select
                        value={employeeData.marital_status}
                        onChange={(e) => handleChange("marital_status", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                      >
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Current Address</label>
                      <textarea
                        value={employeeData.current_address}
                        onChange={(e) => handleChange("current_address", e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Current residential address"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Permanent Address</label>
                      <textarea
                        value={employeeData.permanent_address}
                        onChange={(e) => handleChange("permanent_address", e.target.value)}
                        rows={2}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Permanent address"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Emergency Contact</label>
                      <input
                        value={employeeData.emergency_contact_number}
                        onChange={(e) => handleChange("emergency_contact_number", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Aadhaar Number</label>
                      <input
                        value={employeeData.aadhaar_number}
                        onChange={(e) => handleChange("aadhaar_number", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">PAN Number</label>
                      <input
                        value={employeeData.pan_number}
                        onChange={(e) => handleChange("pan_number", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="ABCDE1234F"
                      />
                    </div>
                  </div>
                )}

                {/* OTHER */}
                {activeTab === "other" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Current Experience (years)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={employeeData.current_experience}
                        onChange={(e) => handleChange("current_experience", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="2.5"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Total Experience (years)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={employeeData.total_experience}
                        onChange={(e) => handleChange("total_experience", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="5.0"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">About Me</label>
                      <textarea
                        value={employeeData.about_me}
                        onChange={(e) => handleChange("about_me", e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Short bio / introduction"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">Company Landline</label>
                      <input
                        value={employeeData.company_landline}
                        onChange={(e) => handleChange("company_landline", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="+91 11 1234 5678"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        Password (optional)
                      </label>
                      <input
                        type="password"
                        value={employeeData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                        placeholder="Leave blank to auto-generate"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
                    {error}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-[#e5e7eb] px-6 py-4">
                <div className="flex gap-2">
                  {activeTab !== "basic" && (
                    <button
                      type="button"
                      onClick={() => {
                        const tabs = ["basic", "work", "personal", "other"];
                        const idx = tabs.indexOf(activeTab);
                        setActiveTab(tabs[idx - 1]);
                      }}
                      className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                    >
                      Previous
                    </button>
                  )}
                  {activeTab !== "other" && (
                    <button
                      type="button"
                      onClick={() => {
                        const tabs = ["basic", "work", "personal", "other"];
                        const idx = tabs.indexOf(activeTab);
                        setActiveTab(tabs[idx + 1]);
                      }}
                      className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                    >
                      Next
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setError("");
                      setEmployeeData(initialEmployee);
                      setActiveTab("basic");
                    }}
                    className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-md bg-[#E42527] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}