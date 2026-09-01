// // "use client";

// // import { useMemo, useState } from "react";
// // import {
// //   Building2,
// //   Briefcase,
// //   MapPin,
// //   Users,
// //   ClipboardCheck,
// //   CalendarDays,
// //   Clock,
// //   Workflow,
// //   AlertTriangle,
// //   CheckCircle2,
// //   UserCheck2,
// // } from "lucide-react";
// // import {
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Legend,
// //   LineChart,
// //   Line,
// // } from "recharts";

// // // ---------------------- Helpers ----------------------

// // function normalizeData(response) {
// //   if (!response) return [];
// //   return response.data?.data ?? response.data ?? [];
// // }

// // function normalizeTotal(response, fallbackList) {
// //   return (
// //     response?.data?.total ??
// //     (Array.isArray(fallbackList) ? fallbackList.length : 0)
// //   );
// // }

// // // ---------------------- Dummy Data ----------------------

// // const DUMMY_DATA = {
// //   departments: [
// //     { department_id: "D001", name: "Engineering" },
// //     { department_id: "D002", name: "Human Resources" },
// //     { department_id: "D003", name: "Sales" },
// //     { department_id: "D004", name: "Finance" },
// //     { department_id: "D005", name: "Marketing" },
// //     { department_id: "D006", name: "Operations" },
// //   ],
// //   designations: [
// //     { designation_id: "DS01", title: "Software Engineer" },
// //     { designation_id: "DS02", title: "Senior Software Engineer" },
// //     { designation_id: "DS03", title: "HR Executive" },
// //     { designation_id: "DS04", title: "Sales Manager" },
// //     { designation_id: "DS05", title: "Financial Analyst" },
// //     { designation_id: "DS06", title: "Marketing Lead" },
// //     { designation_id: "DS07", title: "Operations Manager" },
// //   ],
// //   locations: [
// //     { location_id: "L001", name: "Gurugram HQ" },
// //     { location_id: "L002", name: "Bengaluru Office" },
// //     { location_id: "L003", name: "Mumbai Office" },
// //     { location_id: "L004", name: "Remote" },
// //   ],
// //   employees: [
// //     { employee_id: "E001", first_name: "Rahul", last_name: "Sharma", department_name: "Engineering" },
// //     { employee_id: "E002", first_name: "Priya", last_name: "Nair", department_name: "Engineering" },
// //     { employee_id: "E003", first_name: "Amit", last_name: "Verma", department_name: "Engineering" },
// //     { employee_id: "E004", first_name: "Sneha", last_name: "Iyer", department_name: "Human Resources" },
// //     { employee_id: "E005", first_name: "Karan", last_name: "Mehta", department_name: "Human Resources" },
// //     { employee_id: "E006", first_name: "Divya", last_name: "Rao", department_name: "Sales" },
// //     { employee_id: "E007", first_name: "Vikram", last_name: "Singh", department_name: "Sales" },
// //     { employee_id: "E008", first_name: "Anjali", last_name: "Gupta", department_name: "Sales" },
// //     { employee_id: "E009", first_name: "Rohit", last_name: "Kumar", department_name: "Finance" },
// //     { employee_id: "E010", first_name: "Neha", last_name: "Joshi", department_name: "Finance" },
// //     { employee_id: "E011", first_name: "Arjun", last_name: "Reddy", department_name: "Marketing" },
// //     { employee_id: "E012", first_name: "Pooja", last_name: "Desai", department_name: "Marketing" },
// //     { employee_id: "E013", first_name: "Sanjay", last_name: "Pillai", department_name: "Operations" },
// //     { employee_id: "E014", first_name: "Meera", last_name: "Krishnan", department_name: "Operations" },
// //   ],
// //   holidays: [
// //     { holiday_id: "H001", holiday_name: "Independence Day", holiday_message: "National holiday", date: "2026-08-15" },
// //     { holiday_id: "H002", holiday_name: "Ganesh Chaturthi", holiday_message: "Regional holiday", date: "2026-09-14" },
// //     { holiday_id: "H003", holiday_name: "Gandhi Jayanti", holiday_message: "National holiday", date: "2026-10-02" },
// //     { holiday_id: "H004", holiday_name: "Diwali", holiday_message: "Festival of lights — office closed", date: "2026-11-08" },
// //     { holiday_id: "H005", holiday_name: "Christmas", holiday_message: "Public holiday", date: "2026-12-25" },
// //   ],
// //   shifts: [
// //     { shift_id: "S001", Shift_name: "General Shift", shift_timing: "09:00 - 18:00" },
// //     { shift_id: "S002", Shift_name: "Morning Shift", shift_timing: "06:00 - 15:00" },
// //     { shift_id: "S003", Shift_name: "Evening Shift", shift_timing: "14:00 - 23:00" },
// //     { shift_id: "S004", Shift_name: "Night Shift", shift_timing: "22:00 - 07:00" },
// //   ],
// //   acknowledgements: [
// //     { asset_acknowledgement_id: "A001", acknowledged_by_name: "Rahul Sharma", acknowledged_by_id: "E001", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-01T10:00:00Z" },
// //     { asset_acknowledgement_id: "A002", acknowledged_by_name: "Priya Nair", acknowledged_by_id: "E002", status: "acknowledged", acknowledgement_type: "initial", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-06-15T09:30:00Z" },
// //     { asset_acknowledgement_id: "A003", acknowledged_by_name: "Amit Verma", acknowledged_by_id: "E003", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-05T11:15:00Z" },
// //     { asset_acknowledgement_id: "A004", acknowledged_by_name: "Divya Rao", acknowledged_by_id: "E006", status: "acknowledged", acknowledgement_type: "transfer", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-07-20T14:00:00Z" },
// //     { asset_acknowledgement_id: "A005", acknowledged_by_name: "Vikram Singh", acknowledged_by_id: "E007", status: "rejected", acknowledgement_type: "return", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-05-10T16:45:00Z" },
// //     { asset_acknowledgement_id: "A006", acknowledged_by_name: "Rohit Kumar", acknowledged_by_id: "E009", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-10T08:20:00Z" },
// //     { asset_acknowledgement_id: "A007", acknowledged_by_name: "Neha Joshi", acknowledged_by_id: "E010", status: "cancelled", acknowledgement_type: "initial", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-04-18T12:00:00Z" },
// //     { asset_acknowledgement_id: "A008", acknowledged_by_name: "Arjun Reddy", acknowledged_by_id: "E011", status: "acknowledged", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-07-28T10:30:00Z" },
// //   ],
// //   workflowRequests: [
// //     { workflow_request_id: "W001", transaction_number: "TXN-2026-0451", requested_by_name: "Sneha Iyer", status: "pending", request_type: "Leave" },
// //     { workflow_request_id: "W002", transaction_number: "TXN-2026-0452", requested_by_name: "Karan Mehta", status: "approved", request_type: "Attendance Correction" },
// //     { workflow_request_id: "W003", transaction_number: "TXN-2026-0453", requested_by_name: "Anjali Gupta", status: "pending", request_type: "Shift Change" },
// //     { workflow_request_id: "W004", transaction_number: "TXN-2026-0454", requested_by_name: "Sanjay Pillai", status: "rejected", request_type: "Leave" },
// //     { workflow_request_id: "W005", transaction_number: "TXN-2026-0455", requested_by_name: "Meera Krishnan", status: "approved", request_type: "Onboarding" },
// //   ],
// // };

// // // ---------------------- Colors & Labels ----------------------

// // const STATUS_COLORS = {
// //   pending: "#f59e0b",
// //   acknowledged: "#10b981",
// //   rejected: "#E42527",
// //   cancelled: "#94a3b8",
// // };

// // const STATUS_LABELS = {
// //   pending: "Pending",
// //   acknowledged: "Acknowledged",
// //   rejected: "Rejected",
// //   cancelled: "Cancelled",
// // };

// // // ---------------------- UI Primitives ----------------------

// // function KpiCard({
// //   icon: Icon,
// //   label,
// //   value,
// //   subtext,
// //   tone = "default",
// // }) {
// //   const toneClasses =
// //     tone === "success"
// //       ? "text-emerald-600"
// //       : tone === "warning"
// //       ? "text-amber-600"
// //       : tone === "danger"
// //       ? "text-red-600"
// //       : "text-slate-900";

// //   return (
// //     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
// //       <div className="flex items-center justify-between">
// //         <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
// //         <div className="rounded-lg bg-slate-50 p-2">
// //           <Icon className="h-4 w-4 text-slate-400" />
// //         </div>
// //       </div>
// //       <p className={`mt-3 text-3xl font-semibold ${toneClasses}`}>{value}</p>
// //       {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
// //     </div>
// //   );
// // }

// // function SectionCard({
// //   title,
// //   subtitle,
// //   action,
// //   children,
// // }) {
// //   return (
// //     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
// //       <div className="mb-4 flex items-start justify-between">
// //         <div>
// //           <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
// //           {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
// //         </div>
// //         {action}
// //       </div>
// //       {children}
// //     </div>
// //   );
// // }

// // function EmptyState({ label }) {
// //   return (
// //     <div className="py-8 text-center text-xs text-slate-400">{label}</div>
// //   );
// // }

// // const formatDate = (value) => {
// //   if (!value) return "—";
// //   try {
// //     return new Date(value).toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });
// //   } catch {
// //     return value;
// //   }
// // };

// // // ---------------------- Dashboard Page ----------------------

// // export default function HrmsDashboardPage() {
// //   // Initialize from dummy data only
// //   const departments = normalizeData({ data: DUMMY_DATA.departments });
// //   const designations = normalizeData({ data: DUMMY_DATA.designations });
// //   const locations = normalizeData({ data: DUMMY_DATA.locations });
// //   const employees = normalizeData({ data: DUMMY_DATA.employees });
// //   const holidays = normalizeData({ data: DUMMY_DATA.holidays });
// //   const shifts = normalizeData({ data: DUMMY_DATA.shifts });

// //   const ackList = normalizeData({ data: DUMMY_DATA.acknowledgements });
// //   const acknowledgements = ackList;
// //   const acknowledgementsTotal = normalizeTotal(
// //     { data: DUMMY_DATA.acknowledgements },
// //     ackList
// //   );

// //   const workflowList = normalizeData({ data: DUMMY_DATA.workflowRequests });
// //   const workflowRequests = workflowList;
// //   const workflowTotal = normalizeTotal(
// //     { data: DUMMY_DATA.workflowRequests },
// //     workflowList
// //   );

// //   // Derived: department headcount
// //   const departmentChartData = useMemo(() => {
// //     const counts = {};
// //     employees.forEach((emp) => {
// //       const key = emp.department_name || emp.department || "Unassigned";
// //       counts[key] = (counts[key] || 0) + 1;
// //     });
// //     return Object.entries(counts)
// //       .map(([name, count]) => ({ name, count }))
// //       .sort((a, b) => b.count - a.count)
// //       .slice(0, 8);
// //   }, [employees]);

// //   // Derived: acknowledgement status (for donut)
// //   const acknowledgementChartData = useMemo(() => {
// //     const counts = { pending: 0, acknowledged: 0, rejected: 0, cancelled: 0 };
// //     acknowledgements.forEach((ack) => {
// //       const key = (ack.status || "").toLowerCase();
// //       if (key in counts) counts[key] += 1;
// //     });
// //     return Object.entries(counts)
// //       .filter(([, value]) => value > 0)
// //       .map(([key, value]) => ({
// //         key,
// //         name: STATUS_LABELS[key],
// //         value,
// //         color: STATUS_COLORS[key],
// //       }));
// //   }, [acknowledgements]);

// //   // Derived: pending acknowledgements (action list)
// //   const pendingAcknowledgements = useMemo(
// //     () =>
// //       acknowledgements
// //         .filter((a) => (a.status || "").toLowerCase() === "pending")
// //         .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
// //         .slice(0, 6),
// //     [acknowledgements]
// //   );

// //   // Derived: upcoming holidays
// //   const upcomingHolidays = useMemo(() => {
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     return holidays
// //       .filter((h) => h.date && new Date(h.date) >= today)
// //       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
// //       .slice(0, 5);
// //   }, [holidays]);

// //   // Derived: pending workflow requests
// //   const pendingWorkflows = useMemo(
// //     () =>
// //       workflowRequests
// //         .filter((w) => (w.status || "").toLowerCase() === "pending")
// //         .slice(0, 6),
// //     [workflowRequests]
// //   );

// //   // Simple attendance simulation (dummy trend for last 7 days)
// //   const attendanceTrendData = useMemo(() => {
// //     const days = 7;
// //     const base = employees.length;
// //     const data = [];
// //     for (let i = days - 1; i >= 0; i--) {
// //       const d = new Date();
// //       d.setDate(d.getDate() - i);
// //       const label = d.toLocaleDateString("en-IN", { weekday: "short" });
// //       // Fake variation: 85–100% present
// //       const present = Math.max(
// //         0,
// //         Math.min(base, Math.floor(base * (0.85 + Math.random() * 0.15)))
// //       );
// //       const absent = base - present;
// //       data.push({ day: label, present, absent });
// //     }
// //     return data;
// //   }, [employees.length]);

// //   const pendingAckCount =
// //     acknowledgementChartData.find((d) => d.key === "pending")?.value ?? 0;
// //   const pendingWorkflowCount = pendingWorkflows.length;

// //   return (
// //     <div className="min-h-screen bg-slate-50 py-6">
// //       <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
// //           <h1 className="text-2xl font-semibold text-slate-900">
// //             HRMS Dashboard
// //           </h1>
// //           <p className="mt-1 text-sm text-slate-600">
// //             Overview of headcount, attendance, acknowledgements, and workflow activity.
// //           </p>
// //         </div>

// //         {/* Row 1: KPIs */}
// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
// //           <KpiCard
// //             icon={Users}
// //             label="Total Employees"
// //             value={employees.length}
// //             subtext="Active employees"
// //           />
// //           <KpiCard
// //             icon={Building2}
// //             label="Departments"
// //             value={departments.length}
// //             subtext="Defined departments"
// //           />
// //           <KpiCard
// //             icon={Briefcase}
// //             label="Designations"
// //             value={designations.length}
// //             subtext="Job roles"
// //           />
// //           <KpiCard
// //             icon={MapPin}
// //             label="Locations"
// //             value={locations.length}
// //             subtext="Office locations"
// //           />
// //           <KpiCard
// //             icon={ClipboardCheck}
// //             label="Acknowledgements"
// //             value={acknowledgementsTotal}
// //             subtext={`${pendingAckCount} pending`}
// //             tone={pendingAckCount > 0 ? "warning" : "success"}
// //           />
// //           <KpiCard
// //             icon={Workflow}
// //             label="Workflow Requests"
// //             value={workflowTotal}
// //             subtext={`${pendingWorkflowCount} pending`}
// //             tone={pendingWorkflowCount > 0 ? "warning" : "success"}
// //           />
// //         </div>

// //         {/* Row 2: Charts */}
// //         <div className="grid gap-4 lg:grid-cols-3">
// //           <div className="lg:col-span-2">
// //             <SectionCard
// //               title="Headcount by Department"
// //               subtitle="Distribution of employees across departments"
// //             >
// //               {departmentChartData.length === 0 ? (
// //                 <EmptyState label="No employee data yet" />
// //               ) : (
// //                 <div className="h-64">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart data={departmentChartData}>
// //                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
// //                       <XAxis
// //                         dataKey="name"
// //                         tick={{ fontSize: 11, fill: "#64748b" }}
// //                         interval={0}
// //                         angle={-20}
// //                         textAnchor="end"
// //                         height={60}
// //                       />
// //                       <YAxis
// //                         tick={{ fontSize: 11, fill: "#64748b" }}
// //                         allowDecimals={false}
// //                       />
// //                       <Tooltip
// //                         contentStyle={{
// //                           borderRadius: 10,
// //                           border: "1px solid #e2e8f0",
// //                           fontSize: 12,
// //                         }}
// //                       />
// //                       <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               )}
// //             </SectionCard>
// //           </div>

// //           <SectionCard
// //             title="Acknowledgement Status"
// //             subtitle="Breakdown of all acknowledgement requests"
// //           >
// //             {acknowledgementChartData.length === 0 ? (
// //               <EmptyState label="No acknowledgement data yet" />
// //             ) : (
// //               <div className="h-64">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <PieChart>
// //                     <Pie
// //                       data={acknowledgementChartData}
// //                       dataKey="value"
// //                       nameKey="name"
// //                       innerRadius={50}
// //                       outerRadius={80}
// //                       paddingAngle={3}
// //                     >
// //                       {acknowledgementChartData.map((entry) => (
// //                         <Cell key={entry.key} fill={entry.color} />
// //                       ))}
// //                     </Pie>
// //                     <Legend
// //                       verticalAlign="bottom"
// //                       height={32}
// //                       formatter={(value) => (
// //                         <span className="text-xs text-slate-600">{value}</span>
// //                       )}
// //                     />
// //                     <Tooltip
// //                       contentStyle={{
// //                         borderRadius: 10,
// //                         border: "1px solid #e2e8f0",
// //                         fontSize: 12,
// //                       }}
// //                     />
// //                   </PieChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             )}
// //           </SectionCard>
// //         </div>

// //         {/* Row 3: Attendance trend + quick stats */}
// //         <div className="grid gap-4 lg:grid-cols-3">
// //           <div className="lg:col-span-2">
// //             <SectionCard
// //               title="Attendance Trend (Last 7 Days)"
// //               subtitle="Present vs absent employees"
// //             >
// //               <div className="h-64">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <LineChart data={attendanceTrendData}>
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
// //                     <XAxis
// //                       dataKey="day"
// //                       tick={{ fontSize: 11, fill: "#64748b" }}
// //                     />
// //                     <YAxis
// //                       tick={{ fontSize: 11, fill: "#64748b" }}
// //                       allowDecimals={false}
// //                     />
// //                     <Tooltip
// //                       contentStyle={{
// //                         borderRadius: 10,
// //                         border: "1px solid #e2e8f0",
// //                         fontSize: 12,
// //                       }}
// //                     />
// //                     <Legend
// //                       verticalAlign="bottom"
// //                       height={32}
// //                       formatter={(value) => (
// //                         <span className="text-xs text-slate-600">{value}</span>
// //                       )}
// //                     />
// //                     <Line
// //                       type="monotone"
// //                       dataKey="present"
// //                       stroke="#10b981"
// //                       strokeWidth={2}
// //                       dot={false}
// //                       name="Present"
// //                     />
// //                     <Line
// //                       type="monotone"
// //                       dataKey="absent"
// //                       stroke="#ef4444"
// //                       strokeWidth={2}
// //                       dot={false}
// //                       name="Absent"
// //                     />
// //                   </LineChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             </SectionCard>
// //           </div>

// //           <SectionCard
// //             title="At a Glance"
// //             subtitle="Quick organizational stats"
// //           >
// //             <div className="space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <UserCheck2 className="h-4 w-4 text-emerald-600" />
// //                   <span className="text-sm text-slate-700">
// //                     Avg. attendance (7 days)
// //                   </span>
// //                 </div>
// //                 <span className="text-sm font-medium text-slate-900">
// //                   ~{Math.round(
// //                     attendanceTrendData.reduce((acc, d) => acc + d.present, 0) /
// //                       attendanceTrendData.length
// //                   )}{" "}
// //                   / {employees.length}
// //                 </span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <AlertTriangle className="h-4 w-4 text-amber-600" />
// //                   <span className="text-sm text-slate-700">
// //                     Pending acknowledgements
// //                   </span>
// //                 </div>
// //                 <span className="text-sm font-medium text-amber-700">
// //                   {pendingAckCount}
// //                 </span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <Workflow className="h-4 w-4 text-indigo-600" />
// //                   <span className="text-sm text-slate-700">
// //                     Pending workflow requests
// //                   </span>
// //                 </div>
// //                 <span className="text-sm font-medium text-indigo-700">
// //                   {pendingWorkflowCount}
// //                 </span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <CalendarDays className="h-4 w-4 text-slate-500" />
// //                   <span className="text-sm text-slate-700">
// //                     Upcoming holidays (next 30 days)
// //                   </span>
// //                 </div>
// //                 <span className="text-sm font-medium text-slate-900">
// //                   {upcomingHolidays.length}
// //                 </span>
// //               </div>
// //             </div>
// //           </SectionCard>
// //         </div>

// //         {/* Row 4: Action lists */}
// //         <div className="grid gap-4 lg:grid-cols-2">
// //           <SectionCard
// //             title="Pending Acknowledgements"
// //             subtitle="Requests waiting on employee action"
// //             action={
// //               pendingAcknowledgements.length > 0 && (
// //                 <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
// //                   View all
// //                 </button>
// //               )
// //             }
// //           >
// //             {pendingAcknowledgements.length === 0 ? (
// //               <EmptyState label="Nothing pending — all caught up" />
// //             ) : (
// //               <div className="divide-y divide-slate-100">
// //                 {pendingAcknowledgements.map((ack) => (
// //                   <div
// //                     key={ack.asset_acknowledgement_id}
// //                     className="flex items-center justify-between py-3"
// //                   >
// //                     <div>
// //                       <p className="text-sm font-medium text-slate-800">
// //                         {ack.acknowledged_by_name || ack.acknowledged_by_id}
// //                       </p>
// //                       <p className="text-xs text-slate-500">
// //                         {ack.acknowledgement_type} •{" "}
// //                         {ack.financial_year || "—"}
// //                         {ack.quarter ? ` ${ack.quarter}` : ""}
// //                       </p>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
// //                         Pending
// //                       </span>
// //                       <button className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700">
// //                         Remind
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </SectionCard>

// //           <SectionCard
// //             title="Pending Workflow Requests"
// //             subtitle="Approvals waiting in the pipeline"
// //             action={
// //               pendingWorkflows.length > 0 && (
// //                 <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
// //                   View all
// //                 </button>
// //               )
// //             }
// //           >
// //             {pendingWorkflows.length === 0 ? (
// //               <EmptyState label="No pending workflow requests" />
// //             ) : (
// //               <div className="divide-y divide-slate-100">
// //                 {pendingWorkflows.map((wf, i) => (
// //                   <div
// //                     key={wf.workflow_request_id || i}
// //                     className="flex items-center justify-between py-3"
// //                   >
// //                     <div>
// //                       <p className="text-sm font-medium text-slate-800">
// //                         {wf.transaction_number}
// //                       </p>
// //                       <p className="text-xs text-slate-500">
// //                         {wf.request_type || "Request"} •{" "}
// //                         {wf.requested_by_name || wf.requested_by_id || "—"}
// //                       </p>
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
// //                         Pending
// //                       </span>
// //                       <button className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700">
// //                         Approve
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </SectionCard>
// //         </div>

// //         {/* Row 5: Holidays + Shifts */}
// //         <div className="grid gap-4 lg:grid-cols-2">
// //           <SectionCard
// //             title="Upcoming Holidays"
// //             subtitle="Next holidays on the calendar"
// //             action={
// //               upcomingHolidays.length > 0 && (
// //                 <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
// //                   View calendar
// //                 </button>
// //               )
// //             }
// //           >
// //             {upcomingHolidays.length === 0 ? (
// //               <EmptyState label="No upcoming holidays scheduled" />
// //             ) : (
// //               <div className="divide-y divide-slate-100">
// //                 {upcomingHolidays.map((holiday, i) => (
// //                   <div
// //                     key={holiday.holiday_id || i}
// //                     className="flex items-center justify-between py-3"
// //                   >
// //                     <div>
// //                       <p className="text-sm font-medium text-slate-800">
// //                         {holiday.holiday_name}
// //                       </p>
// //                       {holiday.holiday_message && (
// //                         <p className="text-xs text-slate-500 max-w-[220px] truncate">
// //                           {holiday.holiday_message}
// //                         </p>
// //                       )}
// //                     </div>
// //                     <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
// //                       {formatDate(holiday.date)}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </SectionCard>

// //           <SectionCard
// //             title="Active Shifts"
// //             subtitle="Shift configurations currently in use"
// //             action={
// //               <span className="flex items-center gap-1.5 text-xs text-slate-400">
// //                 <Clock className="h-3.5 w-3.5" />
// //                 {shifts.length} total
// //               </span>
// //             }
// //           >
// //             {shifts.length === 0 ? (
// //               <EmptyState label="No shifts configured yet" />
// //             ) : (
// //               <div className="divide-y divide-slate-100">
// //                 {shifts.slice(0, 6).map((shift, i) => (
// //                   <div
// //                     key={shift.shift_id || i}
// //                     className="flex items-center justify-between py-3"
// //                   >
// //                     <p className="text-sm font-medium text-slate-800">
// //                       {shift.Shift_name}
// //                     </p>
// //                     <span className="text-xs text-slate-500">
// //                       {shift.shift_timing || "No timing linked"}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </SectionCard>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Users,
//   UserCheck2,
//   UserX,
//   CalendarDays,
//   Clock,
//   AlertTriangle,
//   Building2,
//   Briefcase,
//   MapPin,
//   ClipboardList,
//   Cake,
//   Workflow,
//   RefreshCw,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   LineChart,
//   Line,
//   Legend,
// } from "recharts";
// import { api } from "@/lib/api";

// /* ---------------- Helpers ---------------- */

// function getErrorMessage(err) {
//   const detail = err?.response?.data?.detail;
//   if (Array.isArray(detail)) {
//     return detail.map((i) => i?.msg || "Error").join(", ");
//   }
//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || "Request failed";
//   }
//   return err?.message || "Something went wrong";
// }

// function formatDate(value) {
//   if (!value) return "—";
//   try {
//     if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//       const [y, m, d] = value.split("-").map(Number);
//       return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     }
//     return new Date(value).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return String(value);
//   }
// }

// /* ---------------- UI pieces ---------------- */

// function KpiCard({ icon: Icon, label, value, subtext, tone = "default" }) {
//   const toneClasses =
//     tone === "success"
//       ? "text-emerald-600"
//       : tone === "warning"
//       ? "text-amber-600"
//       : tone === "danger"
//       ? "text-[#E42527]"
//       : "text-slate-900";

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="flex items-center justify-between">
//         <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
//           {label}
//         </p>
//         <div className="rounded-lg bg-slate-50 p-2">
//           <Icon className="h-4 w-4 text-slate-400" />
//         </div>
//       </div>
//       <p className={`mt-3 text-3xl font-semibold tabular-nums ${toneClasses}`}>
//         {value ?? "—"}
//       </p>
//       {subtext ? <p className="mt-1 text-xs text-slate-500">{subtext}</p> : null}
//     </div>
//   );
// }

// function SectionCard({ title, subtitle, action, children }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="mb-4 flex items-start justify-between gap-3">
//         <div>
//           <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
//           {subtitle ? (
//             <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
//           ) : null}
//         </div>
//         {action}
//       </div>
//       {children}
//     </div>
//   );
// }

// function EmptyState({ label }) {
//   return (
//     <div className="py-10 text-center text-xs text-slate-400">{label}</div>
//   );
// }

// function SkeletonCards() {
//   return (
//     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div
//           key={i}
//           className="h-[110px] animate-pulse rounded-2xl border border-slate-200 bg-white"
//         />
//       ))}
//     </div>
//   );
// }

// /* ---------------- Page ---------------- */

// export default function HrmsDashboardPage() {
//   const [summary, setSummary] = useState(null);
//   const [trend, setTrend] = useState([]);
//   const [pendingItems, setPendingItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadDashboard = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const [sumRes, trendRes, pendingRes] = await Promise.all([
//         api.get("/api/v1/dashboard/summary"),
//         api.get("/api/v1/dashboard/attendance-trend", { params: { days: 7 } }),
//         api.get("/api/v1/dashboard/pending-approvals", {
//           params: { limit: 10 },
//         }),
//       ]);

//       const sum = sumRes?.data ?? sumRes;
//       const tr = trendRes?.data ?? trendRes;
//       const pe = pendingRes?.data ?? pendingRes;

//       setSummary(sum?.success === false ? null : sum);
//       setTrend(Array.isArray(tr?.trend) ? tr.trend : []);
//       setPendingItems(Array.isArray(pe?.items) ? pe.items : []);
//     } catch (err) {
//       console.error("Dashboard load error:", err?.response?.data || err);
//       setError(getErrorMessage(err));
//       setSummary(null);
//       setTrend([]);
//       setPendingItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadDashboard();
//   }, [loadDashboard]);

//   const headcount = summary?.headcount || {};
//   const attendanceToday = summary?.attendance_today || {};
//   const pending = summary?.pending_approvals || {};
//   const thisMonth = summary?.this_month || {};
//   const holidays = summary?.upcoming_holidays || [];
//   const birthdays = summary?.birthdays_this_week || [];
//   const deptPresent = summary?.department_present_today || [];

//   const trendChartData = useMemo(() => {
//     return (trend || []).map((row) => {
//       let dayLabel = row.date;
//       try {
//         if (row.date) {
//           const d = new Date(row.date);
//           dayLabel = d.toLocaleDateString("en-IN", { weekday: "short" });
//         }
//       } catch {
//         /* keep date */
//       }
//       return {
//         day: dayLabel,
//         present: row.present || 0,
//         absent: row.absent || 0,
//         on_leave: row.on_leave || 0,
//         half_day: row.half_day || 0,
//       };
//     });
//   }, [trend]);

//   const typeBadge = (type) => {
//     const t = (type || "").toLowerCase();
//     if (t === "leave") return "bg-blue-50 text-blue-700";
//     if (t === "regularization") return "bg-purple-50 text-purple-700";
//     if (t === "special_request") return "bg-amber-50 text-amber-700";
//     return "bg-slate-100 text-slate-600";
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f6f8] p-4 sm:p-6">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-[22px] font-semibold text-[#1a1a1a]">
//               Dashboard
//             </h1>
//             <p className="mt-1 text-sm text-[#6b7280]">
//               Headcount, today&apos;s attendance, approvals &amp; people updates
//               {summary?.date ? ` · ${formatDate(summary.date)}` : ""}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={loadDashboard}
//             disabled={loading}
//             className="inline-flex items-center gap-2 rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb] disabled:opacity-60"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//             Refresh
//           </button>
//         </div>

//         {error && (
//           <div className="rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
//             {error}
//           </div>
//         )}

//         {loading && !summary ? (
//           <SkeletonCards />
//         ) : (
//           <>
//             {/* KPI row 1 — Headcount */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//               <KpiCard
//                 icon={Users}
//                 label="Active Employees"
//                 value={headcount.active ?? 0}
//                 subtext={`Total ${headcount.total ?? 0}`}
//               />
//               <KpiCard
//                 icon={UserCheck2}
//                 label="Present Today"
//                 value={attendanceToday.present ?? 0}
//                 subtext={`Late ${attendanceToday.late ?? 0}`}
//                 tone="success"
//               />
//               <KpiCard
//                 icon={UserX}
//                 label="Absent Today"
//                 value={attendanceToday.absent ?? 0}
//                 tone={(attendanceToday.absent || 0) > 0 ? "danger" : "default"}
//               />
//               <KpiCard
//                 icon={CalendarDays}
//                 label="On Leave"
//                 value={attendanceToday.on_leave ?? 0}
//                 subtext={`Half day ${attendanceToday.half_day ?? 0}`}
//               />
//               <KpiCard
//                 icon={ClipboardList}
//                 label="Pending Approvals"
//                 value={pending.total ?? 0}
//                 subtext={`Leave ${pending.leaves ?? 0} · Reg ${pending.regularization ?? 0}`}
//                 tone={(pending.total || 0) > 0 ? "warning" : "success"}
//               />
//               <KpiCard
//                 icon={Briefcase}
//                 label="New Joiners"
//                 value={headcount.new_joiners_this_month ?? 0}
//                 subtext="This month"
//               />
//             </div>

//             {/* KPI row 2 — extra */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <KpiCard
//                 icon={Clock}
//                 label="WFH Today"
//                 value={attendanceToday.wfh ?? 0}
//               />
//               <KpiCard
//                 icon={AlertTriangle}
//                 label="Unread Alerts"
//                 value={summary?.unread_alerts ?? 0}
//                 tone={(summary?.unread_alerts || 0) > 0 ? "warning" : "default"}
//               />
//               <KpiCard
//                 icon={Building2}
//                 label="Notice Period"
//                 value={headcount.notice_period ?? 0}
//               />
//               <KpiCard
//                 icon={Users}
//                 label="Onboarding"
//                 value={summary?.onboarding_candidates ?? 0}
//                 subtext="Candidates in pipeline"
//               />
//             </div>

//             {/* Charts */}
//             <div className="grid gap-4 lg:grid-cols-3">
//               <div className="lg:col-span-2">
//                 <SectionCard
//                   title="Attendance Trend (7 days)"
//                   subtitle="Present vs absent vs leave"
//                 >
//                   {trendChartData.length === 0 ? (
//                     <EmptyState label="No attendance trend data yet" />
//                   ) : (
//                     <div className="h-64">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={trendChartData}>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                           <XAxis
//                             dataKey="day"
//                             tick={{ fontSize: 11, fill: "#64748b" }}
//                           />
//                           <YAxis
//                             tick={{ fontSize: 11, fill: "#64748b" }}
//                             allowDecimals={false}
//                           />
//                           <Tooltip
//                             contentStyle={{
//                               borderRadius: 10,
//                               border: "1px solid #e2e8f0",
//                               fontSize: 12,
//                             }}
//                           />
//                           <Legend
//                             verticalAlign="bottom"
//                             height={32}
//                             formatter={(v) => (
//                               <span className="text-xs text-slate-600">{v}</span>
//                             )}
//                           />
//                           <Line
//                             type="monotone"
//                             dataKey="present"
//                             name="Present"
//                             stroke="#10b981"
//                             strokeWidth={2}
//                             dot={false}
//                           />
//                           <Line
//                             type="monotone"
//                             dataKey="absent"
//                             name="Absent"
//                             stroke="#E42527"
//                             strokeWidth={2}
//                             dot={false}
//                           />
//                           <Line
//                             type="monotone"
//                             dataKey="on_leave"
//                             name="On Leave"
//                             stroke="#6366f1"
//                             strokeWidth={2}
//                             dot={false}
//                           />
//                         </LineChart>
//                       </ResponsiveContainer>
//                     </div>
//                   )}
//                 </SectionCard>
//               </div>

//               <SectionCard
//                 title="Dept Present Today"
//                 subtitle="Top departments by presence"
//               >
//                 {deptPresent.length === 0 ? (
//                   <EmptyState label="No department data for today" />
//                 ) : (
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={deptPresent} layout="vertical" margin={{ left: 8 }}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                         <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
//                         <YAxis
//                           type="category"
//                           dataKey="department"
//                           width={90}
//                           tick={{ fontSize: 10, fill: "#64748b" }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             borderRadius: 10,
//                             border: "1px solid #e2e8f0",
//                             fontSize: 12,
//                           }}
//                         />
//                         <Bar dataKey="present" fill="#E42527" radius={[0, 6, 6, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
//               </SectionCard>
//             </div>

//             {/* Month snapshot + pending list */}
//             <div className="grid gap-4 lg:grid-cols-3">
//               <SectionCard title="This Month" subtitle="Leave & absence snapshot">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
//                     <span className="text-sm text-slate-600">Approved leave days</span>
//                     <span className="text-lg font-semibold text-slate-900">
//                       {thisMonth.leave_days_approved ?? 0}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
//                     <span className="text-sm text-slate-600">Absent days (LOP)</span>
//                     <span className="text-lg font-semibold text-[#E42527]">
//                       {thisMonth.absent_days ?? 0}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
//                     <span className="text-sm text-slate-600">Probation staff</span>
//                     <span className="text-lg font-semibold text-slate-900">
//                       {headcount.probation ?? 0}
//                     </span>
//                   </div>
//                 </div>
//               </SectionCard>

//               <div className="lg:col-span-2">
//                 <SectionCard
//                   title="Pending Approvals"
//                   subtitle="Leave, regularization & special requests"
//                 >
//                   {pendingItems.length === 0 ? (
//                     <EmptyState label="No pending approvals — all clear" />
//                   ) : (
//                     <div className="divide-y divide-slate-100">
//                       {pendingItems.map((item, i) => (
//                         <div
//                           key={`${item.type}-${item.id || i}`}
//                           className="flex items-center justify-between gap-3 py-3"
//                         >
//                           <div className="min-w-0">
//                             <p className="truncate text-sm font-medium text-slate-800">
//                               {item.title || "Request"}
//                             </p>
//                             <p className="mt-0.5 text-xs text-slate-500">
//                               Emp: {item.employee_id || "—"}
//                               {item.created_at
//                                 ? ` · ${formatDate(item.created_at)}`
//                                 : ""}
//                             </p>
//                           </div>
//                           <span
//                             className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${typeBadge(
//                               item.type
//                             )}`}
//                           >
//                             {(item.type || "request").replace(/_/g, " ")}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </SectionCard>
//               </div>
//             </div>

//             {/* Holidays + Birthdays */}
//             <div className="grid gap-4 lg:grid-cols-2">
//               <SectionCard
//                 title="Upcoming Holidays"
//                 subtitle="Next 30 days"
//                 action={
//                   <span className="flex items-center gap-1 text-xs text-slate-400">
//                     <CalendarDays className="h-3.5 w-3.5" />
//                     {holidays.length}
//                   </span>
//                 }
//               >
//                 {holidays.length === 0 ? (
//                   <EmptyState label="No upcoming holidays" />
//                 ) : (
//                   <div className="divide-y divide-slate-100">
//                     {holidays.map((h, i) => (
//                       <div
//                         key={h.holiday_id || i}
//                         className="flex items-center justify-between gap-3 py-3"
//                       >
//                         <div className="min-w-0">
//                           <p className="text-sm font-medium text-slate-800">
//                             {h.name || h.holiday_name}
//                           </p>
//                           {h.message || h.holiday_message ? (
//                             <p className="truncate text-xs text-slate-500">
//                               {h.message || h.holiday_message}
//                             </p>
//                           ) : null}
//                         </div>
//                         <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
//                           {formatDate(h.date)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </SectionCard>

//               <SectionCard
//                 title="Birthdays This Week"
//                 subtitle="Next 7 days"
//                 action={
//                   <span className="flex items-center gap-1 text-xs text-slate-400">
//                     <Cake className="h-3.5 w-3.5" />
//                     {birthdays.length}
//                   </span>
//                 }
//               >
//                 {birthdays.length === 0 ? (
//                   <EmptyState label="No birthdays this week" />
//                 ) : (
//                   <div className="divide-y divide-slate-100">
//                     {birthdays.map((b, i) => (
//                       <div
//                         key={b.employee_id || i}
//                         className="flex items-center justify-between gap-3 py-3"
//                       >
//                         <div>
//                           <p className="text-sm font-medium text-slate-800">
//                             {b.name || b.employee_id}
//                           </p>
//                           <p className="text-xs text-slate-500">
//                             {b.employee_id}
//                           </p>
//                         </div>
//                         <span className="rounded-full bg-[#fef2f2] px-2.5 py-1 text-xs font-medium text-[#E42527]">
//                           {formatDate(b.birthday_on || b.dob)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </SectionCard>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Users,
//   UserCheck2,
//   UserX,
//   CalendarDays,
//   Clock,
//   AlertTriangle,
//   Building2,
//   Briefcase,
//   ClipboardList,
//   Cake,
//   RefreshCw,
//   TrendingUp,
//   Sun,
// } from "lucide-react";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts";
// import { api } from "@/lib/api";

// function getErrorMessage(err) {
//   const detail = err?.response?.data?.detail;
//   if (Array.isArray(detail)) return detail.map((i) => i?.msg || "Error").join(", ");
//   if (typeof detail === "string") return detail;
//   if (detail && typeof detail === "object") return detail.msg || detail.message || "Request failed";
//   return err?.message || "Something went wrong";
// }

// function formatDate(value) {
//   if (!value) return "—";
//   try {
//     if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//       const [y, m, d] = value.split("-").map(Number);
//       return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//     }
//     return new Date(value).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return String(value);
//   }
// }

// function greeting() {
//   const h = new Date().getHours();
//   if (h < 12) return "Good morning";
//   if (h < 17) return "Good afternoon";
//   return "Good evening";
// }

// /* ---------- KPI ---------- */
// function StatCard({ icon: Icon, label, value, hint, accent }) {
//   const accents = {
//     red: "from-[#E42527]/10 to-white border-[#E42527]/20 text-[#E42527]",
//     green: "from-emerald-50 to-white border-emerald-100 text-emerald-600",
//     amber: "from-amber-50 to-white border-amber-100 text-amber-600",
//     blue: "from-sky-50 to-white border-sky-100 text-sky-600",
//     slate: "from-slate-50 to-white border-slate-200 text-slate-700",
//     violet: "from-violet-50 to-white border-violet-100 text-violet-600",
//   };
//   const a = accents[accent] || accents.slate;

//   return (
//     <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-sm ${a}`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
//             {label}
//           </p>
//           <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
//             {value ?? 0}
//           </p>
//           {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
//         </div>
//         <div className="rounded-xl bg-white/80 p-2.5 shadow-sm ring-1 ring-black/5">
//           <Icon className="h-5 w-5 opacity-80" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function Panel({ title, subtitle, right, children, className = "" }) {
//   return (
//     <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ${className}`}>
//       <div className="mb-4 flex items-start justify-between gap-3">
//         <div>
//           <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
//           {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
//         </div>
//         {right}
//       </div>
//       {children}
//     </div>
//   );
// }

// function Empty({ text }) {
//   return <div className="py-12 text-center text-sm text-slate-400">{text}</div>;
// }

// export default function HrmsDashboardPage() {
//   const [summary, setSummary] = useState(null);
//   const [trend, setTrend] = useState([]);
//   const [pendingItems, setPendingItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadDashboard = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const [sumRes, trendRes, pendingRes] = await Promise.all([
//         api.get("/api/v1/dashboard/summary"),
//         api.get("/api/v1/dashboard/attendance-trend", { params: { days: 7 } }),
//         api.get("/api/v1/dashboard/pending-approvals", { params: { limit: 8 } }),
//       ]);

//       const sum = sumRes?.data ?? sumRes;
//       const tr = trendRes?.data ?? trendRes;
//       const pe = pendingRes?.data ?? pendingRes;

//       setSummary(sum);
//       setTrend(Array.isArray(tr?.trend) ? tr.trend : []);
//       setPendingItems(Array.isArray(pe?.items) ? pe.items : []);
//     } catch (err) {
//       setError(getErrorMessage(err));
//       setSummary(null);
//       setTrend([]);
//       setPendingItems([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadDashboard();
//   }, [loadDashboard]);

//   const headcount = summary?.headcount || {};
//   const att = summary?.attendance_today || {};
//   const pending = summary?.pending_approvals || {};
//   const month = summary?.this_month || {};
//   const holidays = summary?.upcoming_holidays || [];
//   const birthdays = summary?.birthdays_this_week || [];
//   const deptPresent = summary?.department_present_today || [];

//   const trendData = useMemo(() => {
//     return (trend || []).map((row) => {
//       let day = row.date;
//       try {
//         if (row.date) day = new Date(row.date).toLocaleDateString("en-IN", { weekday: "short" });
//       } catch {}
//       return {
//         day,
//         present: row.present || 0,
//         absent: row.absent || 0,
//         leave: row.on_leave || 0,
//       };
//     });
//   }, [trend]);

//   const presentRate = useMemo(() => {
//     const p = att.present || 0;
//     const total = (att.present || 0) + (att.absent || 0) + (att.on_leave || 0) + (att.half_day || 0);
//     if (!total) return null;
//     return Math.round((p / total) * 100);
//   }, [att]);

//   const typeStyle = (type) => {
//     const t = (type || "").toLowerCase();
//     if (t === "leave") return "bg-sky-50 text-sky-700 ring-sky-100";
//     if (t === "regularization") return "bg-violet-50 text-violet-700 ring-violet-100";
//     return "bg-amber-50 text-amber-700 ring-amber-100";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-100/80 to-slate-50">
//       <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
//         {/* Hero header */}
//         <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8">
//           <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E42527]/30 blur-3xl" />
//           <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />

//           <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
//                 <Sun className="h-3.5 w-3.5 text-amber-300" />
//                 {greeting()}
//               </div>
//               <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
//                 HR Overview
//               </h1>
//               <p className="mt-1 text-sm text-slate-300">
//                 Live headcount, attendance & approvals
//                 {summary?.date ? ` · ${formatDate(summary.date)}` : ""}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={loadDashboard}
//               disabled={loading}
//               className="inline-flex items-center gap-2 self-start rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-50"
//             >
//               <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//               Refresh
//             </button>
//           </div>

//           {/* Mini strip inside hero */}
//           {!loading && summary && (
//             <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//               {[
//                 { label: "Active staff", value: headcount.active ?? 0 },
//                 { label: "Present now", value: att.present ?? 0 },
//                 { label: "Pending", value: pending.total ?? 0 },
//                 { label: "Present %", value: presentRate != null ? `${presentRate}%` : "—" },
//               ].map((item) => (
//                 <div
//                   key={item.label}
//                   className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
//                 >
//                   <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                     {item.label}
//                   </p>
//                   <p className="mt-1 text-xl font-semibold tabular-nums">{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {error && (
//           <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {loading && !summary ? (
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* KPI grid */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//               <StatCard
//                 icon={Users}
//                 label="Active"
//                 value={headcount.active ?? 0}
//                 hint={`Total ${headcount.total ?? 0}`}
//                 accent="slate"
//               />
//               <StatCard
//                 icon={UserCheck2}
//                 label="Present"
//                 value={att.present ?? 0}
//                 hint={`Late ${att.late ?? 0}`}
//                 accent="green"
//               />
//               <StatCard
//                 icon={UserX}
//                 label="Absent"
//                 value={att.absent ?? 0}
//                 accent="red"
//               />
//               <StatCard
//                 icon={CalendarDays}
//                 label="On Leave"
//                 value={att.on_leave ?? 0}
//                 hint={`Half day ${att.half_day ?? 0}`}
//                 accent="blue"
//               />
//               <StatCard
//                 icon={ClipboardList}
//                 label="Approvals"
//                 value={pending.total ?? 0}
//                 hint={`Leave ${pending.leaves ?? 0}`}
//                 accent="amber"
//               />
//               <StatCard
//                 icon={Briefcase}
//                 label="New Joiners"
//                 value={headcount.new_joiners_this_month ?? 0}
//                 hint="This month"
//                 accent="violet"
//               />
//             </div>

//             {/* Secondary stats */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <StatCard icon={Clock} label="WFH Today" value={att.wfh ?? 0} accent="blue" />
//               <StatCard
//                 icon={AlertTriangle}
//                 label="Alerts"
//                 value={summary?.unread_alerts ?? 0}
//                 accent={(summary?.unread_alerts || 0) > 0 ? "amber" : "slate"}
//               />
//               <StatCard
//                 icon={Building2}
//                 label="Notice Period"
//                 value={headcount.notice_period ?? 0}
//                 accent="slate"
//               />
//               <StatCard
//                 icon={TrendingUp}
//                 label="Onboarding"
//                 value={summary?.onboarding_candidates ?? 0}
//                 hint="Pipeline"
//                 accent="violet"
//               />
//             </div>

//             {/* Charts */}
//             <div className="grid gap-4 lg:grid-cols-5">
//               <Panel
//                 className="lg:col-span-3"
//                 title="Attendance trend"
//                 subtitle="Last 7 days — present, absent & leave"
//               >
//                 {trendData.length === 0 ? (
//                   <Empty text="No trend data yet" />
//                 ) : (
//                   <div className="h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={trendData}>
//                         <defs>
//                           <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
//                             <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
//                           </linearGradient>
//                           <linearGradient id="gAbsent" x1="0" y1="0" x2="0" y2="1">
//                             <stop offset="0%" stopColor="#E42527" stopOpacity={0.25} />
//                             <stop offset="100%" stopColor="#E42527" stopOpacity={0} />
//                           </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                         <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
//                         <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
//                         <Tooltip
//                           contentStyle={{
//                             borderRadius: 12,
//                             border: "1px solid #e2e8f0",
//                             fontSize: 12,
//                             boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
//                           }}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="present"
//                           name="Present"
//                           stroke="#10b981"
//                           fill="url(#gPresent)"
//                           strokeWidth={2.5}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="absent"
//                           name="Absent"
//                           stroke="#E42527"
//                           fill="url(#gAbsent)"
//                           strokeWidth={2}
//                         />
//                         <Area
//                           type="monotone"
//                           dataKey="leave"
//                           name="On Leave"
//                           stroke="#6366f1"
//                           fill="transparent"
//                           strokeWidth={2}
//                           strokeDasharray="4 4"
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
//               </Panel>

//               <Panel
//                 className="lg:col-span-2"
//                 title="Dept presence"
//                 subtitle="Who is in today"
//               >
//                 {deptPresent.length === 0 ? (
//                   <Empty text="No department data" />
//                 ) : (
//                   <div className="h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={deptPresent} layout="vertical" margin={{ left: 4, right: 8 }}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
//                         <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
//                         <YAxis
//                           type="category"
//                           dataKey="department"
//                           width={88}
//                           tick={{ fontSize: 10, fill: "#64748b" }}
//                         />
//                         <Tooltip
//                           contentStyle={{
//                             borderRadius: 12,
//                             border: "1px solid #e2e8f0",
//                             fontSize: 12,
//                           }}
//                         />
//                         <Bar dataKey="present" fill="#E42527" radius={[0, 8, 8, 0]} barSize={14} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
//               </Panel>
//             </div>

//             {/* Month + Pending */}
//             <div className="grid gap-4 lg:grid-cols-3">
//               <Panel title="This month" subtitle="Leave & LOP snapshot">
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
//                     <span className="text-sm text-slate-600">Approved leave days</span>
//                     <span className="text-xl font-bold tabular-nums text-slate-900">
//                       {month.leave_days_approved ?? 0}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between rounded-2xl bg-red-50 px-4 py-4">
//                     <span className="text-sm text-red-700/80">Absent days (LOP)</span>
//                     <span className="text-xl font-bold tabular-nums text-[#E42527]">
//                       {month.absent_days ?? 0}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
//                     <span className="text-sm text-slate-600">Probation staff</span>
//                     <span className="text-xl font-bold tabular-nums text-slate-900">
//                       {headcount.probation ?? 0}
//                     </span>
//                   </div>
//                 </div>
//               </Panel>

//               <Panel
//                 className="lg:col-span-2"
//                 title="Pending approvals"
//                 subtitle="Needs your attention"
//                 right={
//                   <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
//                     {pendingItems.length}
//                   </span>
//                 }
//               >
//                 {pendingItems.length === 0 ? (
//                   <Empty text="All clear — nothing pending" />
//                 ) : (
//                   <div className="divide-y divide-slate-100">
//                     {pendingItems.map((item, i) => (
//                       <div
//                         key={`${item.type}-${item.id || i}`}
//                         className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
//                       >
//                         <div className="min-w-0">
//                           <p className="truncate text-sm font-medium text-slate-900">
//                             {item.title || "Request"}
//                           </p>
//                           <p className="mt-0.5 text-xs text-slate-500">
//                             {item.employee_id || "—"}
//                             {item.created_at ? ` · ${formatDate(item.created_at)}` : ""}
//                           </p>
//                         </div>
//                         <span
//                           className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ${typeStyle(
//                             item.type
//                           )}`}
//                         >
//                           {(item.type || "request").replace(/_/g, " ")}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Panel>
//             </div>

//             {/* Holidays + Birthdays */}
//             <div className="grid gap-4 lg:grid-cols-2">
//               <Panel
//                 title="Upcoming holidays"
//                 subtitle="Next 30 days"
//                 right={
//                   <span className="flex items-center gap-1 text-xs text-slate-400">
//                     <CalendarDays className="h-3.5 w-3.5" />
//                     {holidays.length}
//                   </span>
//                 }
//               >
//                 {holidays.length === 0 ? (
//                   <Empty text="No holidays upcoming" />
//                 ) : (
//                   <div className="space-y-2">
//                     {holidays.map((h, i) => (
//                       <div
//                         key={h.holiday_id || i}
//                         className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/80 px-3.5 py-3"
//                       >
//                         <div className="min-w-0">
//                           <p className="text-sm font-medium text-slate-900">
//                             {h.name || h.holiday_name}
//                           </p>
//                           {(h.message || h.holiday_message) && (
//                             <p className="truncate text-xs text-slate-500">
//                               {h.message || h.holiday_message}
//                             </p>
//                           )}
//                         </div>
//                         <span className="shrink-0 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
//                           {formatDate(h.date)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Panel>

//               <Panel
//                 title="Birthdays this week"
//                 subtitle="Celebrate your team"
//                 right={
//                   <span className="flex items-center gap-1 text-xs text-slate-400">
//                     <Cake className="h-3.5 w-3.5" />
//                     {birthdays.length}
//                   </span>
//                 }
//               >
//                 {birthdays.length === 0 ? (
//                   <Empty text="No birthdays this week" />
//                 ) : (
//                   <div className="space-y-2">
//                     {birthdays.map((b, i) => (
//                       <div
//                         key={b.employee_id || i}
//                         className="flex items-center justify-between gap-3 rounded-xl bg-[#fef2f2]/70 px-3.5 py-3"
//                       >
//                         <div className="flex items-center gap-3 min-w-0">
//                           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E42527] text-xs font-bold text-white">
//                             {(b.name || "E")[0]?.toUpperCase()}
//                           </div>
//                           <div className="min-w-0">
//                             <p className="truncate text-sm font-medium text-slate-900">
//                               {b.name || b.employee_id}
//                             </p>
//                             <p className="text-xs text-slate-500">{b.employee_id}</p>
//                           </div>
//                         </div>
//                         <span className="shrink-0 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-[#E42527] shadow-sm ring-1 ring-red-100">
//                           {formatDate(b.birthday_on || b.dob)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </Panel>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Users,
  UserCheck2,
  UserX,
  CalendarDays,
  Clock,
  AlertTriangle,
  Building2,
  Briefcase,
  ClipboardList,
  Cake,
  RefreshCw,
  TrendingUp,
  Sun,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((i) => i?.msg || "Error").join(", ");
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return detail.msg || detail.message || "Request failed";
  return err?.message || "Something went wrong";
}

function formatDate(value) {
  if (!value) return "—";
  try {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function StatCard({ icon: Icon, label, value, hint, accent, onClick }) {
  const accents = {
    red: "from-[#E42527]/10 to-white border-[#E42527]/20 text-[#E42527]",
    green: "from-emerald-50 to-white border-emerald-100 text-emerald-600",
    amber: "from-amber-50 to-white border-amber-100 text-amber-600",
    blue: "from-sky-50 to-white border-sky-100 text-sky-600",
    slate: "from-slate-50 to-white border-slate-200 text-slate-700",
    violet: "from-violet-50 to-white border-violet-100 text-violet-600",
  };
  const a = accents[accent] || accents.slate;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`relative w-full overflow-hidden rounded-2xl border bg-gradient-to-br p-5 text-left shadow-sm transition ${a} ${
        onClick ? "cursor-pointer hover:shadow-md hover:scale-[1.01]" : "cursor-default"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
            {value ?? 0}
          </p>
          {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
          {onClick ? (
            <p className="mt-2 text-[11px] font-medium text-slate-400">Click to view list →</p>
          ) : null}
        </div>
        <div className="rounded-xl bg-white/80 p-2.5 shadow-sm ring-1 ring-black/5">
          <Icon className="h-5 w-5 opacity-80" />
        </div>
      </div>
    </button>
  );
}

function Panel({ title, subtitle, right, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Empty({ text }) {
  return <div className="py-12 text-center text-sm text-slate-400">{text}</div>;
}

export default function HrmsDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [peopleStatus, setPeopleStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal: "leave" | "absent" | null
  const [listModal, setListModal] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [sumRes, trendRes, pendingRes, peopleRes] = await Promise.all([
        api.get("/api/v1/dashboard/summary"),
        api.get("/api/v1/dashboard/attendance-trend", { params: { days: 7 } }),
        api.get("/api/v1/dashboard/pending-approvals", { params: { limit: 8 } }),
        api.get("/api/v1/dashboard/today-people-status"),
      ]);

      setSummary(sumRes?.data ?? sumRes);
      const tr = trendRes?.data ?? trendRes;
      setTrend(Array.isArray(tr?.trend) ? tr.trend : []);
      const pe = pendingRes?.data ?? pendingRes;
      setPendingItems(Array.isArray(pe?.items) ? pe.items : []);
      setPeopleStatus(peopleRes?.data ?? peopleRes);
    } catch (err) {
      setError(getErrorMessage(err));
      setSummary(null);
      setTrend([]);
      setPendingItems([]);
      setPeopleStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const headcount = summary?.headcount || {};
  const att = summary?.attendance_today || {};
  const pending = summary?.pending_approvals || {};
  const month = summary?.this_month || {};
  const holidays = summary?.upcoming_holidays || [];
  const birthdays = summary?.birthdays_this_week || [];
  const deptPresent = summary?.department_present_today || [];

  const onLeaveCount =
    peopleStatus?.on_leave?.count ?? att.on_leave ?? 0;
  const absentNoLeaveCount =
    peopleStatus?.absent_without_leave?.count ?? att.absent ?? 0;
  const onLeaveList = peopleStatus?.on_leave?.list || [];
  const absentList = peopleStatus?.absent_without_leave?.list || [];

  const trendData = useMemo(() => {
    return (trend || []).map((row) => {
      let day = row.date;
      try {
        if (row.date) day = new Date(row.date).toLocaleDateString("en-IN", { weekday: "short" });
      } catch {}
      return {
        day,
        present: row.present || 0,
        absent: row.absent || 0,
        leave: row.on_leave || 0,
      };
    });
  }, [trend]);

  const presentRate = useMemo(() => {
    const p = att.present || 0;
    const total =
      (att.present || 0) + (att.absent || 0) + (att.on_leave || 0) + (att.half_day || 0);
    if (!total) return null;
    return Math.round((p / total) * 100);
  }, [att]);

  const typeStyle = (type) => {
    const t = (type || "").toLowerCase();
    if (t === "leave") return "bg-sky-50 text-sky-700 ring-sky-100";
    if (t === "regularization") return "bg-violet-50 text-violet-700 ring-violet-100";
    return "bg-amber-50 text-amber-700 ring-amber-100";
  };

  const modalTitle =
    listModal === "leave"
      ? "On leave today"
      : listModal === "absent"
      ? "Absent without leave"
      : "";
  const modalList = listModal === "leave" ? onLeaveList : listModal === "absent" ? absentList : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100/80 to-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-7 text-white shadow-xl shadow-slate-900/10 sm:px-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E42527]/30 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
                <Sun className="h-3.5 w-3.5 text-amber-300" />
                {greeting()}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">HR Overview</h1>
              <p className="mt-1 text-sm text-slate-300">
                Live headcount, attendance & who is off today
                {summary?.date ? ` · ${formatDate(summary.date)}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center gap-2 self-start rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {!loading && summary && (
            <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Active staff", value: headcount.active ?? 0 },
                { label: "Present now", value: att.present ?? 0 },
                { label: "On leave", value: onLeaveCount },
                { label: "Absent (no leave)", value: absentNoLeaveCount },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">{item.label}</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && !summary ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
            ))}
          </div>
        ) : (
          <>
            {/* KPI — clickable leave & absent */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard
                icon={Users}
                label="Active"
                value={headcount.active ?? 0}
                hint={`Total ${headcount.total ?? 0}`}
                accent="slate"
              />
              <StatCard
                icon={UserCheck2}
                label="Present"
                value={att.present ?? 0}
                hint={`Late ${att.late ?? 0}`}
                accent="green"
              />
              <StatCard
                icon={CalendarDays}
                label="On leave"
                value={onLeaveCount}
                hint="Approved leave today"
                accent="blue"
                onClick={() => setListModal("leave")}
              />
              <StatCard
                icon={UserX}
                label="Absent (no leave)"
                value={absentNoLeaveCount}
                hint="No punch, no approved leave"
                accent="red"
                onClick={() => setListModal("absent")}
              />
              <StatCard
                icon={ClipboardList}
                label="Approvals"
                value={pending.total ?? 0}
                hint={`Leave ${pending.leaves ?? 0}`}
                accent="amber"
              />
              <StatCard
                icon={Briefcase}
                label="New joiners"
                value={headcount.new_joiners_this_month ?? 0}
                hint="This month"
                accent="violet"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Clock} label="WFH today" value={att.wfh ?? 0} accent="blue" />
              <StatCard
                icon={AlertTriangle}
                label="Alerts"
                value={summary?.unread_alerts ?? 0}
                accent={(summary?.unread_alerts || 0) > 0 ? "amber" : "slate"}
              />
              <StatCard
                icon={Building2}
                label="Notice period"
                value={headcount.notice_period ?? 0}
                accent="slate"
              />
              <StatCard
                icon={TrendingUp}
                label="Onboarding"
                value={summary?.onboarding_candidates ?? 0}
                hint={presentRate != null ? `Present ${presentRate}%` : "Pipeline"}
                accent="violet"
              />
            </div>

            {/* Charts */}
            <div className="grid gap-4 lg:grid-cols-5">
              <Panel className="lg:col-span-3" title="Attendance trend" subtitle="Last 7 days">
                {trendData.length === 0 ? (
                  <Empty text="No trend data yet" />
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gAbsent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E42527" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#E42527" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                          }}
                        />
                        <Area type="monotone" dataKey="present" name="Present" stroke="#10b981" fill="url(#gPresent)" strokeWidth={2.5} />
                        <Area type="monotone" dataKey="absent" name="Absent" stroke="#E42527" fill="url(#gAbsent)" strokeWidth={2} />
                        <Area type="monotone" dataKey="leave" name="On leave" stroke="#6366f1" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Panel>

              <Panel className="lg:col-span-2" title="Dept presence" subtitle="In office today">
                {deptPresent.length === 0 ? (
                  <Empty text="No department data" />
                ) : (
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={deptPresent} layout="vertical" margin={{ left: 4, right: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                        <YAxis type="category" dataKey="department" width={88} tick={{ fontSize: 10, fill: "#64748b" }} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                        <Bar dataKey="present" fill="#E42527" radius={[0, 8, 8, 0]} barSize={14} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Panel>
            </div>

            {/* Quick lists preview + pending */}
            <div className="grid gap-4 lg:grid-cols-3">
              <Panel
                title="On leave today"
                subtitle="Approved leave"
                right={
                  <button
                    type="button"
                    onClick={() => setListModal("leave")}
                    className="text-xs font-medium text-[#E42527] hover:underline"
                  >
                    View all
                  </button>
                }
              >
                {onLeaveList.length === 0 ? (
                  <Empty text="No one on leave today" />
                ) : (
                  <div className="space-y-2">
                    {onLeaveList.slice(0, 4).map((row, i) => (
                      <div
                        key={row.employee_id || i}
                        className="flex items-center justify-between rounded-xl bg-sky-50/80 px-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {row.name || row.employee_id}
                          </p>
                          <p className="text-xs text-slate-500">
                            {row.leave_type || "Leave"}
                            {row.start_date ? ` · ${formatDate(row.start_date)}` : ""}
                            {row.end_date ? ` – ${formatDate(row.end_date)}` : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel
                title="Absent without leave"
                subtitle="No punch, no approved leave"
                right={
                  <button
                    type="button"
                    onClick={() => setListModal("absent")}
                    className="text-xs font-medium text-[#E42527] hover:underline"
                  >
                    View all
                  </button>
                }
              >
                {absentList.length === 0 ? (
                  <Empty text="No unexplained absents" />
                ) : (
                  <div className="space-y-2">
                    {absentList.slice(0, 4).map((row, i) => (
                      <div
                        key={row.employee_id || i}
                        className="flex items-center justify-between rounded-xl bg-red-50/80 px-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {row.name || row.employee_id}
                          </p>
                          <p className="text-xs text-slate-500">{row.reason || "Absent"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel title="Pending approvals" subtitle="Needs action">
                {pendingItems.length === 0 ? (
                  <Empty text="All clear" />
                ) : (
                  <div className="divide-y divide-slate-100">
                    {pendingItems.slice(0, 5).map((item, i) => (
                      <div key={`${item.type}-${item.id || i}`} className="flex items-center justify-between gap-2 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {item.title || "Request"}
                          </p>
                          <p className="text-xs text-slate-500">{item.employee_id}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ring-1 ${typeStyle(item.type)}`}>
                          {(item.type || "").replace(/_/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>

            {/* Holidays + Birthdays */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Upcoming holidays" subtitle="Next 30 days">
                {holidays.length === 0 ? (
                  <Empty text="No holidays upcoming" />
                ) : (
                  <div className="space-y-2">
                    {holidays.map((h, i) => (
                      <div
                        key={h.holiday_id || i}
                        className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/80 px-3.5 py-3"
                      >
                        <p className="text-sm font-medium text-slate-900">
                          {h.name || h.holiday_name}
                        </p>
                        <span className="text-xs font-medium text-slate-600">
                          {formatDate(h.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>

              <Panel title="Birthdays this week" subtitle="Next 7 days">
                {birthdays.length === 0 ? (
                  <Empty text="No birthdays this week" />
                ) : (
                  <div className="space-y-2">
                    {birthdays.map((b, i) => (
                      <div
                        key={b.employee_id || i}
                        className="flex items-center justify-between gap-3 rounded-xl bg-[#fef2f2]/70 px-3.5 py-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E42527] text-xs font-bold text-white">
                            {(b.name || "E")[0]?.toUpperCase()}
                          </div>
                          <p className="truncate text-sm font-medium text-slate-900">
                            {b.name || b.employee_id}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#E42527]">
                          {formatDate(b.birthday_on || b.dob)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          </>
        )}
      </div>

      {/* List modal — On leave / Absent */}
      {listModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{modalTitle}</h3>
                <p className="text-xs text-slate-500">
                  {formatDate(peopleStatus?.date || summary?.date)} · {modalList.length} people
                </p>
              </div>
              <button
                type="button"
                onClick={() => setListModal(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {modalList.length === 0 ? (
                <Empty text="No one in this list" />
              ) : (
                <ul className="divide-y divide-slate-100">
                  {modalList.map((row, i) => (
                    <li key={row.employee_id || i} className="py-3">
                      <p className="text-sm font-semibold text-slate-900">
                        {row.name || row.employee_id}
                      </p>
                      <p className="text-xs text-slate-500">{row.employee_id}</p>
                      {listModal === "leave" ? (
                        <p className="mt-1 text-xs text-sky-700">
                          {row.leave_type || "Leave"}
                          {row.start_date ? ` · ${formatDate(row.start_date)}` : ""}
                          {row.end_date ? ` → ${formatDate(row.end_date)}` : ""}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-red-600">
                          {row.reason || "Absent without approved leave"}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-slate-100 px-5 py-3">
              <button
                type="button"
                onClick={() => setListModal(null)}
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}