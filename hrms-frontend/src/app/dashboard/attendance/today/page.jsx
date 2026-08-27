

// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { api } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";

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
//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || JSON.stringify(detail);
//   }
//   return err?.message || "Something went wrong";
// };

// const formatTime = (d) => {
//   if (!d) return "—";
//   try {
//     return new Date(d).toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   } catch {
//     return "—";
//   }
// };

// const formatDate = (d) => {
//   if (!d) return "—";
//   try {
//     return new Date(d).toLocaleDateString("en-IN", {
//       weekday: "short",
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   } catch {
//     return "—";
//   }
// };

// const toHistoryList = (data) => {
//   if (!data) return [];
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.data)) return data.data;
//   if (Array.isArray(data?.attendance)) return data.attendance;
//   if (Array.isArray(data?.history)) return data.history;
//   if (Array.isArray(data?.items)) return data.items;
//   return [];
// };

// const getFirstIn = (rec) =>
//   rec?.first_punch_in || rec?.punch_in || rec?.in_time || rec?.first_in || null;

// const getLastOut = (rec) =>
//   rec?.last_punch_out || rec?.punch_out || rec?.out_time || rec?.last_out || null;

// export default function AttendanceTodayPage() {
//   const { user } = useAuthStore();

//   const employeeId =
//     user?.employee_id ||
//     user?.employeeId ||
//     user?.emp_id ||
//     user?.user_id ||
//     "";

//   const [today, setToday] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [punching, setPunching] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [lastLocation, setLastLocation] = useState(null);

//   const punchState = useMemo(() => {
//     const hasIn = Boolean(getFirstIn(today));
//     const hasOut = Boolean(getLastOut(today));

//     if (!hasIn) {
//       return {
//         phase: "need_in",
//         nextType: "in",
//         buttonLabel: "Punch In",
//         buttonDisabled: false,
//         helper: "Start your day",
//       };
//     }
//     if (hasIn && !hasOut) {
//       return {
//         phase: "need_out",
//         nextType: "out",
//         buttonLabel: "Punch Out",
//         buttonDisabled: false,
//         helper: "You are currently punched in",
//       };
//     }
//     return {
//       phase: "done",
//       nextType: null,
//       buttonLabel: "Completed for today",
//       buttonDisabled: true,
//       helper: "Both punches recorded",
//     };
//   }, [today]);

//   // Better status display
//   const statusInfo = useMemo(() => {
//     if (loading) return { label: "Loading...", color: "bg-gray-100 text-gray-600" };

//     const status = (today?.status || "").toLowerCase();
//     const isHalfDay = today?.is_half_day || status === "half_day";
//     const isLate = today?.is_late;

//     if (punchState.phase === "need_in") {
//       return { label: "Not Punched In", color: "bg-amber-50 text-amber-700" };
//     }
//     if (punchState.phase === "need_out") {
//       return {
//         label: isLate ? "Punched In (Late)" : "Punched In",
//         color: isLate ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700",
//       };
//     }
//     if (isHalfDay) {
//       return { label: "Half Day", color: "bg-purple-50 text-purple-700" };
//     }
//     if (status === "present" || punchState.phase === "done") {
//       return { label: "Present", color: "bg-green-50 text-green-700" };
//     }
//     if (status) {
//       return {
//         label: String(today.status).replace(/_/g, " "),
//         color: "bg-gray-100 text-gray-700",
//       };
//     }
//     return { label: "Completed", color: "bg-green-50 text-green-700" };
//   }, [loading, today, punchState.phase]);

//   const loadToday = useCallback(async () => {
//     if (!employeeId) {
//       setToday(null);
//       return;
//     }
//     try {
//       const res = await api.get("/api/v1/get/today/attendence", {
//         params: { employee_id: employeeId },
//       });

//       const record =
//         res?.data?.attendance ??
//         res?.data?.data?.attendance ??
//         res?.data?.data ??
//         (Array.isArray(res?.data) ? res.data[0] : null) ??
//         null;

//       setToday(record);
//     } catch (err) {
//       console.error("today load error", err);
//       setToday(null);
//     }
//   }, [employeeId]);

//   const loadHistory = useCallback(async () => {
//     if (!employeeId) {
//       setHistory([]);
//       return;
//     }
//     try {
//       const res = await api.get("/api/v1/get/attendence/history", {
//         params: { employee_id: employeeId, page: 1, page_size: 10 },
//       });
//       setHistory(toHistoryList(res?.data));
//     } catch (err) {
//       console.error("history load error", err);
//       setHistory([]);
//     }
//   }, [employeeId]);

//   const refreshAll = useCallback(async () => {
//     setLoading(true);
//     await Promise.all([loadToday(), loadHistory()]);
//     setLoading(false);
//   }, [loadToday, loadHistory]);

//   useEffect(() => {
//     refreshAll();
//   }, [refreshAll]);

//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (typeof window === "undefined" || !navigator.geolocation) {
//         reject(new Error("Geolocation not supported"));
//         return;
//       }
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           resolve({
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//             accuracy: pos.coords.accuracy,
//           });
//         },
//         (err) => {
//           reject(
//             new Error(
//               err?.code === 1
//                 ? "Location permission denied"
//                 : err?.code === 2
//                 ? "Location unavailable"
//                 : err?.code === 3
//                 ? "Location timeout"
//                 : "Unable to get location"
//             )
//           );
//         },
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//       );
//     });

//   const handlePunch = async () => {
//     setError("");
//     setSuccess("");

//     if (!employeeId) {
//       setError("Employee ID missing");
//       return;
//     }
//     if (punchState.buttonDisabled || !punchState.nextType) {
//       setError("Already completed for today");
//       return;
//     }

//     setPunching(true);

//     let location = null;
//     try {
//       location = await getLocation();
//       setLastLocation(location);
//     } catch (locErr) {
//       setError(locErr.message);
//       setPunching(false);
//       return;
//     }

//     try {
//       const payload = {
//         employee_id: employeeId,
//         punch_type: punchState.nextType,
//         punch_source: "web",
//         latitude: location.latitude,
//         longitude: location.longitude,
//         location_accuracy_meters: location.accuracy
//           ? Math.round(location.accuracy)
//           : null,
//         device_type: "web",
//         is_manual: false,
//         remarks: null,
//       };

//       const res = await api.post("/api/v1/add/punch", payload);

//       const attendanceFromServer =
//         res?.data?.attendance || res?.data?.data?.attendance || null;

//       if (attendanceFromServer) {
//         setToday(attendanceFromServer);
//       } else {
//         const now = new Date().toISOString();
//         if (punchState.nextType === "in") {
//           setToday((prev) => ({
//             ...(prev || {}),
//             first_punch_in: now,
//             status: "present",
//             last_punch_out: null,
//           }));
//         } else {
//           setToday((prev) => ({
//             ...(prev || {}),
//             last_punch_out: now,
//             status: "completed",
//           }));
//         }
//       }

//       setSuccess(
//         punchState.nextType === "in"
//           ? "Punched In successfully"
//           : "Punched Out successfully"
//       );

//       setTimeout(() => loadHistory(), 400);
//     } catch (err) {
//       console.error("PUNCH ERROR →", err?.response || err);
//       setError(formatApiError(err));
//     } finally {
//       setPunching(false);
//     }
//   };

//   const firstInTime = getFirstIn(today);
//   const lastOutTime = getLastOut(today);

//   const workHours =
//     today?.total_work_minutes != null
//       ? `${Math.floor(today.total_work_minutes / 60)}h ${today.total_work_minutes % 60}m`
//       : "—";

//   return (
//     <div className="min-h-[calc(100vh-3.5rem)] bg-[#f5f6f8] p-6">
//       <div className="mb-6">
//         <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Attendance</h1>
//         <p className="mt-1 text-sm text-[#6b7280]">
//           {formatDate(new Date())} · GPS based punch
//         </p>
//       </div>

//       {!employeeId && (
//         <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           Employee ID missing. Please login again.
//         </div>
//       )}

//       {error && (
//         <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
//           {success}
//         </div>
//       )}

//       <div className="grid gap-5 lg:grid-cols-3">
//         {/* ===== PUNCH CARD ===== */}
//         <div className="lg:col-span-1">
//           <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
//             {/* Header */}
//             <div className="bg-[#0f172a] px-6 py-7 text-center text-white">
//               <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
//                 Today
//               </p>

//               <div className="mt-3 flex justify-center">
//                 <span
//                   className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.color}`}
//                 >
//                   {statusInfo.label}
//                 </span>
//               </div>

//               <p className="mt-3 text-sm text-slate-400">{punchState.helper}</p>

//               {lastLocation && (
//                 <p className="mt-1 text-[11px] text-slate-500">
//                   GPS ±{Math.round(lastLocation.accuracy || 0)}m
//                 </p>
//               )}
//             </div>

//             <div className="space-y-5 p-6">
//               {/* In / Out Times */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div
//                   className={`rounded-xl px-3 py-4 text-center ${
//                     firstInTime ? "bg-green-50" : "bg-gray-50"
//                   }`}
//                 >
//                   <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
//                     Punch In
//                   </p>
//                   <p className="mt-1.5 text-lg font-semibold text-gray-900">
//                     {formatTime(firstInTime)}
//                   </p>
//                 </div>

//                 <div
//                   className={`rounded-xl px-3 py-4 text-center ${
//                     lastOutTime ? "bg-green-50" : "bg-gray-50"
//                   }`}
//                 >
//                   <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
//                     Punch Out
//                   </p>
//                   <p className="mt-1.5 text-lg font-semibold text-gray-900">
//                     {formatTime(lastOutTime)}
//                   </p>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 gap-3 text-center">
//                 <div className="rounded-xl bg-gray-50 px-3 py-3">
//                   <p className="text-[11px] text-gray-400">Work Hours</p>
//                   <p className="mt-1 font-semibold text-gray-800">{workHours}</p>
//                 </div>
//                 <div className="rounded-xl bg-gray-50 px-3 py-3">
//                   <p className="text-[11px] text-gray-400">Late By</p>
//                   <p className="mt-1 font-semibold text-gray-800">
//                     {today?.is_late
//                       ? `${today.late_minutes || 0} min`
//                       : "—"}
//                   </p>
//                 </div>
//               </div>

//               {/* Half Day Indicator */}
//               {today?.is_half_day && (
//                 <div className="rounded-xl bg-purple-50 px-4 py-3 text-center text-sm font-medium text-purple-700">
//                   Marked as Half Day
//                 </div>
//               )}

//               {/* Punch Button */}
//               <button
//                 type="button"
//                 onClick={handlePunch}
//                 disabled={
//                   punching || loading || !employeeId || punchState.buttonDisabled
//                 }
//                 className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
//                   punchState.nextType === "out"
//                     ? "bg-[#0f172a] hover:bg-[#1e293b]"
//                     : punchState.phase === "done"
//                     ? "bg-gray-400"
//                     : "bg-[#E42527] hover:bg-[#c91f21]"
//                 }`}
//               >
//                 {punching
//                   ? "Getting location & saving..."
//                   : punchState.buttonLabel}
//               </button>

//               <p className="text-center text-[11px] text-gray-400">
//                 {punchState.phase === "need_in" && "One click → GPS + Punch In"}
//                 {punchState.phase === "need_out" && "One click → GPS + Punch Out"}
//                 {punchState.phase === "done" && "See you tomorrow"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ===== HISTORY ===== */}
//         <div className="lg:col-span-2">
//           <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
//             <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
//               <h2 className="text-sm font-semibold text-gray-900">
//                 Recent Attendance
//               </h2>
//               <button
//                 onClick={refreshAll}
//                 className="text-xs font-medium text-gray-500 hover:text-[#E42527]"
//               >
//                 Refresh
//               </button>
//             </div>

//             {loading ? (
//               <div className="py-16 text-center text-sm text-gray-500">
//                 Loading...
//               </div>
//             ) : history.length === 0 ? (
//               <div className="py-16 text-center text-sm text-gray-500">
//                 No records yet. Punch in to start.
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm">
//                   <thead>
//                     <tr className="border-b bg-gray-50">
//                       <th className="px-5 py-3 font-medium text-gray-500">Date</th>
//                       <th className="px-5 py-3 font-medium text-gray-500">Status</th>
//                       <th className="px-5 py-3 font-medium text-gray-500">In</th>
//                       <th className="px-5 py-3 font-medium text-gray-500">Out</th>
//                       <th className="px-5 py-3 font-medium text-gray-500">Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-50">
//                     {history.map((row, i) => {
//                       const isHalf = row.is_half_day || (row.status || "").toLowerCase() === "half_day";
//                       return (
//                         <tr key={row.attendance_id || i} className="hover:bg-gray-50/50">
//                           <td className="px-5 py-3.5 whitespace-nowrap">
//                             {formatDate(row.attendance_date)}
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <span
//                               className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                                 isHalf
//                                   ? "bg-purple-50 text-purple-700"
//                                   : (row.status || "").toLowerCase() === "present"
//                                   ? "bg-green-50 text-green-700"
//                                   : "bg-gray-100 text-gray-600"
//                               }`}
//                             >
//                               {isHalf
//                                 ? "Half Day"
//                                 : String(row.status || "—").replace(/_/g, " ")}
//                             </span>
//                           </td>
//                           <td className="px-5 py-3.5">{formatTime(getFirstIn(row))}</td>
//                           <td className="px-5 py-3.5">{formatTime(getLastOut(row))}</td>
//                           <td className="px-5 py-3.5">
//                             {row.total_work_minutes != null
//                               ? `${Math.floor(row.total_work_minutes / 60)}h ${
//                                   row.total_work_minutes % 60
//                                 }m`
//                               : "—"}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, useCallback, useMemo } from "react";
// import { api } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";

// const formatApiError = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail
//       .map((item) => {
//         const field = Array.isArray(item.loc)
//           ? item.loc.slice(1).join(".")
//           : "";

//         return field ? `${field}: ${item.msg}` : item.msg;
//       })
//       .join(" • ");
//   }

//   if (typeof detail === "string") return detail;

//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || JSON.stringify(detail);
//   }

//   return err?.message || "Something went wrong";
// };

// export default function AttendanceTodayPage() {
//   const { user, timezone } = useAuthStore();

//   const employeeId =
//     user?.employee_id ||
//     user?.employeeId ||
//     user?.emp_id ||
//     user?.user_id ||
//     "";

//   const [today, setToday] = useState(null);
//   const [history, setHistory] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [punching, setPunching] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [lastLocation, setLastLocation] = useState(null);

//   // Time format with company timezone
//   const formatTime = useCallback(
//     (value) => {
//       if (!value) return "—";

//       try {
//         const date = new Date(value);

//         if (Number.isNaN(date.getTime())) {
//           return "—";
//         }

//         return date.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//           timeZone: timezone || "Asia/Kolkata",
//         });
//       } catch {
//         return "—";
//       }
//     },
//     [timezone]
//   );

//   // Date format with company timezone
//   const formatDate = useCallback(
//     (value) => {
//       if (!value) return "—";

//       try {
//         const date = new Date(value);

//         if (Number.isNaN(date.getTime())) {
//           return "—";
//         }

//         return date.toLocaleDateString("en-US", {
//           weekday: "short",
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           timeZone: timezone || "Asia/Kolkata",
//         });
//       } catch {
//         return "—";
//       }
//     },
//     [timezone]
//   );

//   const toHistoryList = (data) => {
//     if (!data) return [];
//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.data)) return data.data;
//     if (Array.isArray(data?.attendance)) return data.attendance;
//     if (Array.isArray(data?.history)) return data.history;
//     if (Array.isArray(data?.items)) return data.items;
//     return [];
//   };

//   const getFirstIn = (record) =>
//     record?.first_punch_in ||
//     record?.punch_in ||
//     record?.in_time ||
//     record?.first_in ||
//     null;

//   const getLastOut = (record) =>
//     record?.last_punch_out ||
//     record?.punch_out ||
//     record?.out_time ||
//     record?.last_out ||
//     null;

//   const punchState = useMemo(() => {
//     const hasIn = Boolean(getFirstIn(today));
//     const hasOut = Boolean(getLastOut(today));

//     if (!hasIn) {
//       return {
//         phase: "need_in",
//         nextType: "in",
//         buttonLabel: "Punch In",
//         buttonDisabled: false,
//         helper: "Start your day",
//       };
//     }

//     if (hasIn && !hasOut) {
//       return {
//         phase: "need_out",
//         nextType: "out",
//         buttonLabel: "Punch Out",
//         buttonDisabled: false,
//         helper: "You are currently punched in",
//       };
//     }

//     return {
//       phase: "done",
//       nextType: null,
//       buttonLabel: "Completed for today",
//       buttonDisabled: true,
//       helper: "Both punches recorded",
//     };
//   }, [today]);

//   const statusInfo = useMemo(() => {
//     if (loading) {
//       return {
//         label: "Loading...",
//         color: "bg-gray-100 text-gray-600",
//       };
//     }

//     const status = (today?.status || "").toLowerCase();
//     const isHalfDay =
//       today?.is_half_day || status === "half_day";
//     const isLate = today?.is_late;

//     if (punchState.phase === "need_in") {
//       return {
//         label: "Not Punched In",
//         color: "bg-amber-50 text-amber-700",
//       };
//     }

//     if (punchState.phase === "need_out") {
//       return {
//         label: isLate ? "Punched In (Late)" : "Punched In",
//         color: isLate
//           ? "bg-orange-50 text-orange-700"
//           : "bg-blue-50 text-blue-700",
//       };
//     }

//     if (isHalfDay) {
//       return {
//         label: "Half Day",
//         color: "bg-purple-50 text-purple-700",
//       };
//     }

//     if (status === "present" || punchState.phase === "done") {
//       return {
//         label: "Present",
//         color: "bg-green-50 text-green-700",
//       };
//     }

//     if (status) {
//       return {
//         label: String(status).replace(/_/g, " "),
//         color: "bg-gray-100 text-gray-700",
//       };
//     }

//     return {
//       label: "Completed",
//       color: "bg-green-50 text-green-700",
//     };
//   }, [loading, today, punchState.phase]);

//   const loadToday = useCallback(async () => {
//     if (!employeeId) {
//       setToday(null);
//       return;
//     }

//     try {
//       const res = await api.get("/api/v1/get/today/attendence", {
//         params: {
//           employee_id: employeeId,
//         },
//       });

//       const record =
//         res?.data?.attendance ??
//         res?.data?.data?.attendance ??
//         res?.data?.data ??
//         (Array.isArray(res?.data) ? res.data[0] : null) ??
//         null;

//       setToday(record);
//     } catch (err) {
//       console.error("today load error", err);
//       setToday(null);
//     }
//   }, [employeeId]);

//   const loadHistory = useCallback(async () => {
//     if (!employeeId) {
//       setHistory([]);
//       return;
//     }

//     try {
//       const res = await api.get(
//         "/api/v1/get/attendence/history",
//         {
//           params: {
//             employee_id: employeeId,
//             page: 1,
//             page_size: 10,
//           },
//         }
//       );

//       setHistory(toHistoryList(res?.data));
//     } catch (err) {
//       console.error("history load error", err);
//       setHistory([]);
//     }
//   }, [employeeId]);

//   const refreshAll = useCallback(async () => {
//     setLoading(true);

//     await Promise.all([loadToday(), loadHistory()]);

//     setLoading(false);
//   }, [loadToday, loadHistory]);

//   useEffect(() => {
//     refreshAll();
//   }, [refreshAll]);

//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (
//         typeof window === "undefined" ||
//         !navigator.geolocation
//       ) {
//         reject(new Error("Geolocation not supported"));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//           });
//         },
//         (err) => {
//           reject(
//             new Error(
//               err?.code === 1
//                 ? "Location permission denied"
//                 : err?.code === 2
//                 ? "Location unavailable"
//                 : err?.code === 3
//                 ? "Location timeout"
//                 : "Unable to get location"
//             )
//           );
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 20000,
//           maximumAge: 0,
//         }
//       );
//     });

//   const handlePunch = async () => {
//     setError("");
//     setSuccess("");

//     if (!employeeId) {
//       setError("Employee ID missing");
//       return;
//     }

//     if (
//       punchState.buttonDisabled ||
//       !punchState.nextType
//     ) {
//       setError("Already completed for today");
//       return;
//     }

//     setPunching(true);

//     let location = null;

//     try {
//       location = await getLocation();
//       setLastLocation(location);
//     } catch (locationError) {
//       setError(locationError.message);
//       setPunching(false);
//       return;
//     }

//     try {
//       const payload = {
//         employee_id: employeeId,
//         punch_type: punchState.nextType,
//         punch_source: "web",
//         latitude: location.latitude,
//         longitude: location.longitude,
//         location_accuracy_meters: location.accuracy
//           ? Math.round(location.accuracy)
//           : null,
//         device_type: "web",
//         is_manual: false,
//         remarks: null,
//       };

//       const res = await api.post("/api/v1/add/punch", payload);

//       const attendanceFromServer =
//         res?.data?.attendance ||
//         res?.data?.data?.attendance ||
//         null;

//       if (attendanceFromServer) {
//         setToday(attendanceFromServer);
//       } else {
//         const now = new Date().toISOString();

//         if (punchState.nextType === "in") {
//           setToday((previous) => ({
//             ...(previous || {}),
//             first_punch_in: now,
//             status: "present",
//             last_punch_out: null,
//           }));
//         } else {
//           setToday((previous) => ({
//             ...(previous || {}),
//             last_punch_out: now,
//             status: "completed",
//           }));
//         }
//       }

//       setSuccess(
//         punchState.nextType === "in"
//           ? "Punched In successfully"
//           : "Punched Out successfully"
//       );

//       setTimeout(() => loadHistory(), 400);
//     } catch (err) {
//       console.error("PUNCH ERROR →", err?.response || err);
//       setError(formatApiError(err));
//     } finally {
//       setPunching(false);
//     }
//   };

//   const firstInTime = getFirstIn(today);
//   const lastOutTime = getLastOut(today);

//   const workHours =
//     today?.total_work_minutes != null
//       ? `${Math.floor(today.total_work_minutes / 60)}h ${
//           today.total_work_minutes % 60
//         }m`
//       : "—";

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-2xl">
//               🕒
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">
//                 Attendance
//               </h1>

//               <p className="mt-1 text-sm text-slate-500">
//                 {formatDate(new Date())} • {timezone || "Asia/Kolkata"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {!employeeId && (
//           <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//             Employee ID missing. Please login again.
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             ⚠️ {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//             ✅ {success}
//           </div>
//         )}

//         <div className="grid gap-5 lg:grid-cols-3">
//           {/* ===== PUNCH CARD ===== */}
//           <div className="lg:col-span-1">
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//               {/* Header */}
//               <div className="bg-slate-900 px-6 py-7 text-center text-white">
//                 <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
//                   Today
//                 </p>

//                 <div className="mt-3 flex justify-center">
//                   <span
//                     className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.color}`}
//                   >
//                     {statusInfo.label}
//                   </span>
//                 </div>

//                 <p className="mt-3 text-sm text-slate-400">
//                   {punchState.helper}
//                 </p>

//                 {lastLocation && (
//                   <p className="mt-1 text-[11px] text-slate-500">
//                     GPS ±{Math.round(lastLocation.accuracy || 0)}m
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-5 p-6">
//                 {/* In / Out Times */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div
//                     className={`rounded-xl px-3 py-4 text-center ${
//                       firstInTime
//                         ? "bg-green-50"
//                         : "bg-slate-50"
//                     }`}
//                   >
//                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
//                       Punch In
//                     </p>

//                     <p className="mt-1.5 text-lg font-semibold text-slate-900">
//                       {formatTime(firstInTime)}
//                     </p>
//                   </div>

//                   <div
//                     className={`rounded-xl px-3 py-4 text-center ${
//                       lastOutTime
//                         ? "bg-green-50"
//                         : "bg-slate-50"
//                     }`}
//                   >
//                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
//                       Punch Out
//                     </p>

//                     <p className="mt-1.5 text-lg font-semibold text-slate-900">
//                       {formatTime(lastOutTime)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 gap-3 text-center">
//                   <div className="rounded-xl bg-slate-50 px-3 py-3">
//                     <p className="text-[11px] text-slate-400">
//                       Work Hours
//                     </p>

//                     <p className="mt-1 font-semibold text-slate-800">
//                       {workHours}
//                     </p>
//                   </div>

//                   <div className="rounded-xl bg-slate-50 px-3 py-3">
//                     <p className="text-[11px] text-slate-400">
//                       Late By
//                     </p>

//                     <p className="mt-1 font-semibold text-slate-800">
//                       {today?.is_late
//                         ? `${today.late_minutes || 0} min`
//                         : "—"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Half Day Indicator */}
//                 {today?.is_half_day && (
//                   <div className="rounded-xl bg-purple-50 px-4 py-3 text-center text-sm font-medium text-purple-700">
//                     Marked as Half Day
//                   </div>
//                 )}

//                 {/* Punch Button */}
//                 <button
//                   type="button"
//                   onClick={handlePunch}
//                   disabled={
//                     punching ||
//                     loading ||
//                     !employeeId ||
//                     punchState.buttonDisabled
//                   }
//                   className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
//                     punchState.nextType === "out"
//                       ? "bg-slate-900 hover:bg-slate-800"
//                       : punchState.phase === "done"
//                       ? "bg-slate-400"
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {punching
//                     ? "Getting location & saving..."
//                     : punchState.buttonLabel}
//                 </button>

//                 <p className="text-center text-[11px] text-slate-400">
//                   {punchState.phase === "need_in" &&
//                     "One click → GPS + Punch In"}
//                   {punchState.phase === "need_out" &&
//                     "One click → GPS + Punch Out"}
//                   {punchState.phase === "done" &&
//                     "See you tomorrow"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ===== HISTORY ===== */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//               <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
//                 <h2 className="text-sm font-semibold text-slate-800">
//                   Recent Attendance
//                 </h2>

//                 <button
//                   type="button"
//                   onClick={refreshAll}
//                   className="text-xs font-medium text-slate-500 hover:text-red-600"
//                 >
//                   Refresh
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="py-16 text-center text-sm text-slate-500">
//                   Loading...
//                 </div>
//               ) : history.length === 0 ? (
//                 <div className="py-16 text-center text-sm text-slate-500">
//                   No records yet. Punch in to start.
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left text-sm">
//                     <thead>
//                       <tr className="border-b bg-slate-50">
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Date
//                         </th>

//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Status
//                         </th>

//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           In
//                         </th>

//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Out
//                         </th>

//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Hours
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {history.map((row, index) => {
//                         const isHalf =
//                           row.is_half_day ||
//                           (row.status || "").toLowerCase() ===
//                             "half_day";

//                         return (
//                           <tr
//                             key={
//                               row.attendance_id || index
//                             }
//                             className="hover:bg-slate-50"
//                           >
//                             <td className="px-5 py-3.5 whitespace-nowrap">
//                               {formatDate(
//                                 row.attendance_date
//                               )}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               <span
//                                 className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                                   isHalf
//                                     ? "bg-purple-50 text-purple-700"
//                                     : (
//                                         row.status ||
//                                         ""
//                                       ).toLowerCase() ===
//                                       "present"
//                                     ? "bg-green-50 text-green-700"
//                                     : "bg-slate-100 text-slate-600"
//                                 }`}
//                               >
//                                 {isHalf
//                                   ? "Half Day"
//                                   : String(
//                                       row.status || "—"
//                                     ).replace(/_/g, " ")}
//                               </span>
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {formatTime(getFirstIn(row))}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {formatTime(getLastOut(row))}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {row.total_work_minutes !=
//                               null
//                                 ? `${Math.floor(
//                                     row.total_work_minutes /
//                                       60
//                                   )}h ${
//                                     row.total_work_minutes %
//                                       60
//                                   }m`
//                                 : "—"}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, useCallback, useMemo, useRef } from "react";
// import { api } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";

// /* ---------- Helpers ---------- */

// const formatApiError = (err) => {
//   const detail = err?.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     return detail
//       .map((item) => {
//         const field = Array.isArray(item.loc) ? item.loc.slice(1).join(".") : "";
//         return field ? `${field}: ${item.msg}` : item.msg;
//       })
//       .join(" • ");
//   }

//   if (typeof detail === "string") return detail;

//   if (detail && typeof detail === "object") {
//     return detail.msg || detail.message || JSON.stringify(detail);
//   }

//   return err?.message || "Something went wrong";
// };

// const isPlainObject = (v) => v && typeof v === "object" && !Array.isArray(v);

// const toHistoryList = (payload) => {
//   if (!payload) return [];
//   if (Array.isArray(payload)) return payload;

//   const candidates = [
//     payload.data,
//     payload.attendance,
//     payload.attendances,
//     payload.history,
//     payload.items,
//     payload.records,
//     payload.results,
//     payload.rows,
//     payload.list,
//     payload?.data?.data,
//     payload?.data?.items,
//     payload?.data?.records,
//     payload?.data?.results,
//     payload?.data?.rows,
//     payload?.data?.attendance,
//     payload?.employees,
//   ];

//   for (const c of candidates) {
//     if (Array.isArray(c)) return c;
//   }
//   return [];
// };

// const pickTodayRecord = (payload) => {
//   if (!payload) return null;
//   if (Array.isArray(payload)) return payload[0] ?? null;

//   const candidates = [
//     payload.attendance,
//     payload?.data?.attendance,
//     payload.record,
//     payload?.data?.record,
//     payload.today,
//     payload?.data?.today,
//     payload.result,
//     payload?.data?.result,
//     payload.data,
//   ];

//   for (const c of candidates) {
//     if (Array.isArray(c)) return c[0] ?? null;
//     if (isPlainObject(c)) return c;
//   }

//   if (payload.attendance_id || payload.first_punch_in || payload.status) {
//     return payload;
//   }
//   return null;
// };

// const getFirstIn = (record) =>
//   record?.first_punch_in ||
//   record?.punch_in ||
//   record?.in_time ||
//   record?.first_in ||
//   null;

// const getLastOut = (record) =>
//   record?.last_punch_out ||
//   record?.punch_out ||
//   record?.out_time ||
//   record?.last_out ||
//   null;

// const minutesToHhMm = (minutes) => {
//   if (minutes == null) return "—";
//   const m = Number(minutes);
//   if (Number.isNaN(m)) return "—";
//   return `${Math.floor(m / 60)}h ${m % 60}m`;
// };

// const formatAllowedDateTime = (value, timezone) => {
//   if (!value) return "—";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "—";
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: timezone || "Asia/Kolkata",
//   });
// };

// const getPunchShift = (payload) =>
//   payload?.shift || payload?.data?.shift || payload?.result?.shift || null;

// const hasCalculatedPunchWindow = (shift) =>
//   Boolean(
//     shift?.punch_in_allowed_from &&
//       shift?.punch_in_allowed_till &&
//       shift?.punch_out_allowed_from &&
//       shift?.punch_out_allowed_till
//   );

// /* ---------- Component ---------- */

// export default function AttendanceTodayPage() {
//   const { user, timezone } = useAuthStore();

//   const tz = timezone || "Asia/Kolkata";

//   const [employeeId, setEmployeeId] = useState("");
//   const [resolvingEmployee, setResolvingEmployee] = useState(true);

//   const [today, setToday] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [punchWindow, setPunchWindow] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [punching, setPunching] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [lastLocation, setLastLocation] = useState(null);

//   const inFlight = useRef(false);

//   /* ---------- Resolve employee_id from user ---------- */

//   useEffect(() => {
//     async function resolveEmployeeId() {
//       setResolvingEmployee(true);
//       setError("");

//       // 1. Pehle auth store se try karo
//       const fromStore =
//         user?.employee_id ||
//         user?.employeeId ||
//         user?.emp_id ||
//         user?.employee?.employee_id ||
//         user?.employee?.id ||
//         user?.profile?.employee_id ||
//         user?.data?.employee_id ||
//         "";

//       if (fromStore) {
//         setEmployeeId(fromStore);
//         setResolvingEmployee(false);
//         return;
//       }

//       // 2. user_id se employees list mein dhundo
//       const userId = user?.user_id || user?.id || user?.sub || "";

//       if (!userId) {
//         setError("User not found. Please login again.");
//         setResolvingEmployee(false);
//         return;
//       }

//       try {
//         const res = await api.get("/api/v1/get/employees");
//         const list =
//           res?.data?.employees ||
//           res?.data?.data ||
//           res?.data?.list ||
//           (Array.isArray(res?.data) ? res.data : []) ||
//           [];

//         const me = list.find(
//           (e) =>
//             e.user_id === userId ||
//             e.userId === userId ||
//             String(e.user_id) === String(userId)
//         );

//         if (me?.employee_id) {
//           setEmployeeId(me.employee_id);

//           // Optional: auth store mein bhi save kar do taaki next time na dhundna pade
//           try {
//             const store = useAuthStore.getState();
//             if (store?.setUser && user) {
//               store.setUser({ ...user, employee_id: me.employee_id });
//             }
//           } catch (_) {}
//         } else {
//           setError(
//             "Employee profile not found for this user. Please contact admin."
//           );
//         }
//       } catch (err) {
//         console.error("Resolve employee error:", err?.response?.data || err);
//         setError(
//           "Could not resolve employee ID. " + formatApiError(err)
//         );
//       } finally {
//         setResolvingEmployee(false);
//       }
//     }

//     resolveEmployeeId();
//   }, [user]);

//   /* ---------- Formatters ---------- */

//   const formatTime = useCallback(
//     (value) => {
//       if (!value) return "—";
//       try {
//         const raw =
//           typeof value === "string" &&
//           !value.endsWith("Z") &&
//           !/[+-]\d{2}:\d{2}$/.test(value)
//             ? `${value}Z`
//             : value;

//         const date = new Date(raw);
//         if (Number.isNaN(date.getTime())) return "—";

//         return date.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//           timeZone: tz,
//         });
//       } catch {
//         return "—";
//       }
//     },
//     [tz]
//   );

//   const formatDate = useCallback(
//     (value) => {
//       if (!value) return "—";
//       try {
//         if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
//           const [y, m, d] = value.split("-").map(Number);
//           return new Date(y, m - 1, d).toLocaleDateString("en-US", {
//             weekday: "short",
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           });
//         }

//         const date = new Date(value);
//         if (Number.isNaN(date.getTime())) return "—";

//         return date.toLocaleDateString("en-US", {
//           weekday: "short",
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           timeZone: tz,
//         });
//       } catch {
//         return "—";
//       }
//     },
//     [tz]
//   );

//   /* ---------- Derived state ---------- */

//   const punchState = useMemo(() => {
//     const hasIn = Boolean(getFirstIn(today));
//     const hasOut = Boolean(getLastOut(today));

//     if (!hasIn) {
//       return {
//         phase: "need_in",
//         nextType: "in",
//         buttonLabel: "Punch In",
//         buttonDisabled: false,
//         helper: "Start your day",
//       };
//     }

//     if (hasIn && !hasOut) {
//       return {
//         phase: "need_out",
//         nextType: "out",
//         buttonLabel: "Punch Out",
//         buttonDisabled: false,
//         helper: "You are currently punched in",
//       };
//     }

//     return {
//       phase: "done",
//       nextType: null,
//       buttonLabel: "Completed for today",
//       buttonDisabled: true,
//       helper: "Both punches recorded",
//     };
//   }, [today]);

//   const statusInfo = useMemo(() => {
//     if (loading || resolvingEmployee) {
//       return { label: "Loading...", color: "bg-gray-100 text-gray-600" };
//     }

//     const status = (today?.status || "").toLowerCase();
//     const isHalfDay = today?.is_half_day || status === "half_day";
//     const isLate = today?.is_late;

//     if (punchState.phase === "need_in") {
//       return { label: "Not Punched In", color: "bg-amber-50 text-amber-700" };
//     }

//     if (punchState.phase === "need_out") {
//       return {
//         label: isLate ? "Punched In (Late)" : "Punched In",
//         color: isLate
//           ? "bg-orange-50 text-orange-700"
//           : "bg-blue-50 text-blue-700",
//       };
//     }

//     if (isHalfDay) {
//       return { label: "Half Day", color: "bg-purple-50 text-purple-700" };
//     }

//     if (status === "present" || punchState.phase === "done") {
//       return { label: "Present", color: "bg-green-50 text-green-700" };
//     }

//     if (status) {
//       return {
//         label: String(status).replace(/_/g, " "),
//         color: "bg-gray-100 text-gray-700",
//       };
//     }

//     return { label: "Completed", color: "bg-green-50 text-green-700" };
//   }, [loading, resolvingEmployee, today, punchState.phase]);

//   /* ---------- Data loading ---------- */

//   const loadToday = useCallback(async () => {
//     if (!employeeId) {
//       setToday(null);
//       return;
//     }

//     try {
//       const res = await api.get("/api/v1/get/today/attendence", {
//         params: { employee_id: employeeId },
//       });

//       if (process.env.NODE_ENV !== "production") {
//         console.log("TODAY RAW →", res?.data);
//       }

//       setToday(pickTodayRecord(res?.data));
//       const shift = getPunchShift(res?.data);
//       if (hasCalculatedPunchWindow(shift)) {
//         setPunchWindow((previous) => ({ ...previous, ...shift }));
//       }
//     } catch (err) {
//       console.error("today load error", err?.response?.data || err);
//       setToday(null);
//       setError(`Today attendance: ${formatApiError(err)}`);
//     }
//   }, [employeeId]);

//   const loadHistory = useCallback(async () => {
//     if (!employeeId) {
//       setHistory([]);
//       return;
//     }

//     try {
//       const res = await api.get("/api/v1/get/attendence/history", {
//         params: { employee_id: employeeId, page: 1, page_size: 10 },
//       });

//       if (process.env.NODE_ENV !== "production") {
//         console.log("HISTORY RAW →", res?.data);
//       }

//       setHistory(toHistoryList(res?.data));
//     } catch (err) {
//       console.error("history load error", err?.response?.data || err);
//       setHistory([]);
//       setError((currentError) =>
//         currentError || `Attendance history: ${formatApiError(err)}`
//       );
//     }
//   }, [employeeId]);

//   const refreshAll = useCallback(async () => {
//     if (!employeeId) return;
//     if (inFlight.current) return;

//     inFlight.current = true;
//     setLoading(true);
//     setError("");

//     try {
//       await Promise.all([loadToday(), loadHistory()]);
//     } finally {
//       setLoading(false);
//       inFlight.current = false;
//     }
//   }, [employeeId, loadToday, loadHistory]);

//   // employeeId milte hi data load karo
//   useEffect(() => {
//     if (employeeId && !resolvingEmployee) {
//       refreshAll();
//     }
//   }, [employeeId, resolvingEmployee, refreshAll]);

//   /* ---------- Geolocation ---------- */

//   const getLocation = () =>
//     new Promise((resolve, reject) => {
//       if (typeof window === "undefined" || !navigator.geolocation) {
//         reject(new Error("Geolocation not supported"));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//           });
//         },
//         (err) => {
//           reject(
//             new Error(
//               err?.code === 1
//                 ? "Location permission denied"
//                 : err?.code === 2
//                 ? "Location unavailable"
//                 : err?.code === 3
//                 ? "Location timeout"
//                 : "Unable to get location"
//             )
//           );
//         },
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
//       );
//     });

//   /* ---------- Punch ---------- */

//   const handlePunch = async () => {
//     setError("");
//     setSuccess("");

//     if (!employeeId) {
//       setError("Employee ID missing. Please wait or login again.");
//       return;
//     }

//     if (punchState.buttonDisabled || !punchState.nextType) {
//       setError("Already completed for today");
//       return;
//     }

//     setPunching(true);

//     let location = null;

//     try {
//       location = await getLocation();
//       setLastLocation(location);
//     } catch (locationError) {
//       setError(locationError.message);
//       setPunching(false);
//       return;
//     }

//     const nextType = punchState.nextType;

//     try {
//       const payload = {
//         employee_id: employeeId,
//         punch_type: nextType,
//         punch_source: "web",
//         latitude: location.latitude,
//         longitude: location.longitude,
//         location_accuracy_meters: location.accuracy
//           ? Math.round(location.accuracy)
//           : null,
//         device_type: "web",
//         is_manual: false,
//         remarks: null,
//       };

//       const res = await api.post("/api/v1/add/punch", payload);

//       if (process.env.NODE_ENV !== "production") {
//         console.log("PUNCH RESPONSE →", res?.data);
//       }

//       const shift = getPunchShift(res?.data);
//       if (hasCalculatedPunchWindow(shift)) {
//         setPunchWindow((previous) => ({ ...previous, ...shift }));
//       }

//       const attendanceFromServer = pickTodayRecord(res?.data);

//       if (attendanceFromServer) {
//         setToday(attendanceFromServer);
//       } else {
//         const now = new Date().toISOString();

//         setToday((previous) =>
//           nextType === "in"
//             ? {
//                 ...(previous || {}),
//                 first_punch_in: now,
//                 last_punch_out: null,
//                 status: "present",
//               }
//             : {
//                 ...(previous || {}),
//                 last_punch_out: now,
//                 status: previous?.status || "present",
//               }
//         );
//       }

//       setSuccess(
//         nextType === "in"
//           ? "Punched In successfully"
//           : "Punched Out successfully"
//       );

//       setTimeout(() => {
//         loadToday();
//         loadHistory();
//       }, 500);
//     } catch (err) {
//       console.error("PUNCH ERROR →", err?.response?.data || err);
//       setError(formatApiError(err));
//     } finally {
//       setPunching(false);
//     }
//   };

//   const firstInTime = getFirstIn(today);
//   const lastOutTime = getLastOut(today);
//   const workHours = minutesToHhMm(today?.total_work_minutes);

//   /* ---------- Render ---------- */

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
//       <div className="mx-auto max-w-6xl">
//         <div className="mb-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-2xl">
//               🕒
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
//               <p className="mt-1 text-sm text-slate-500">
//                 {formatDate(new Date())} • {tz}
//               </p>
//             </div>
//           </div>
//         </div>

//         {resolvingEmployee && (
//           <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
//             Resolving employee profile...
//           </div>
//         )}

//         {!resolvingEmployee && !employeeId && (
//           <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//             Employee ID missing. Please login again or contact admin.
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             ⚠️ {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//             ✅ {success}
//           </div>
//         )}

//         <div className="grid gap-5 lg:grid-cols-3">
//           {/* ===== PUNCH CARD ===== */}
//           <div className="lg:col-span-1">
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//               <div className="bg-slate-900 px-6 py-7 text-center text-white">
//                 <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
//                   Today
//                 </p>

//                 <div className="mt-3 flex justify-center">
//                   <span
//                     className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.color}`}
//                   >
//                     {statusInfo.label}
//                   </span>
//                 </div>

//                 <p className="mt-3 text-sm text-slate-400">
//                   {punchState.helper}
//                 </p>

//                 {lastLocation && (
//                   <p className="mt-1 text-[11px] text-slate-500">
//                     GPS ±{Math.round(lastLocation.accuracy || 0)}m
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-5 p-6">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div
//                     className={`rounded-xl px-3 py-4 text-center ${
//                       firstInTime ? "bg-green-50" : "bg-slate-50"
//                     }`}
//                   >
//                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
//                       Punch In
//                     </p>
//                     <p className="mt-1.5 text-lg font-semibold text-slate-900">
//                       {formatTime(firstInTime)}
//                     </p>
//                   </div>

//                   <div
//                     className={`rounded-xl px-3 py-4 text-center ${
//                       lastOutTime ? "bg-green-50" : "bg-slate-50"
//                     }`}
//                   >
//                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
//                       Punch Out
//                     </p>
//                     <p className="mt-1.5 text-lg font-semibold text-slate-900">
//                       {formatTime(lastOutTime)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 text-center">
//                   <div className="rounded-xl bg-slate-50 px-3 py-3">
//                     <p className="text-[11px] text-slate-400">Work Hours</p>
//                     <p className="mt-1 font-semibold text-slate-800">
//                       {workHours}
//                     </p>
//                   </div>

//                   <div className="rounded-xl bg-slate-50 px-3 py-3">
//                     <p className="text-[11px] text-slate-400">Late By</p>
//                     <p className="mt-1 font-semibold text-slate-800">
//                       {today?.is_late ? `${today.late_minutes || 0} min` : "—"}
//                     </p>
//                   </div>
//                 </div>

//                 {today?.is_half_day && (
//                   <div className="rounded-xl bg-purple-50 px-4 py-3 text-center text-sm font-medium text-purple-700">
//                     Marked as Half Day
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={handlePunch}
//                   disabled={
//                     punching ||
//                     loading ||
//                     resolvingEmployee ||
//                     !employeeId ||
//                     punchState.buttonDisabled
//                   }
//                   className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
//                     punchState.nextType === "out"
//                       ? "bg-slate-900 hover:bg-slate-800"
//                       : punchState.phase === "done"
//                       ? "bg-slate-400"
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {resolvingEmployee
//                     ? "Loading profile..."
//                     : punching
//                     ? "Getting location & saving..."
//                     : punchState.buttonLabel}
//                 </button>

//                 <p className="text-center text-[11px] text-slate-400">
//                   {punchState.phase === "need_in" &&
//                     "One click → GPS + Punch In"}
//                   {punchState.phase === "need_out" &&
//                     "One click → GPS + Punch Out"}
//                   {punchState.phase === "done" && "See you tomorrow"}
//                 </p>

//                 {punchWindow && (
//                   <div className="space-y-1 rounded-lg bg-slate-50 px-3 py-2 text-center text-[11px] text-slate-500">
//                     <p>
//                       Punch In: {formatAllowedDateTime(
//                         punchWindow.punch_in_allowed_from,
//                         tz
//                       )} - {formatAllowedDateTime(punchWindow.punch_in_allowed_till, tz)}
//                     </p>
//                     <p>
//                       Punch Out: {formatAllowedDateTime(
//                         punchWindow.punch_out_allowed_from,
//                         tz
//                       )} - {formatAllowedDateTime(
//                         punchWindow.punch_out_allowed_till,
//                         tz
//                       )}
//                     </p>
//                     <p className="text-slate-400">
//                       Late checkout buffer: {punchWindow.late_checkout_margin_minutes ?? 0} min
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ===== HISTORY ===== */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//               <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
//                 <h2 className="text-sm font-semibold text-slate-800">
//                   Recent Attendance
//                 </h2>

//                 <button
//                   type="button"
//                   onClick={refreshAll}
//                   disabled={loading || !employeeId}
//                   className="text-xs font-medium text-slate-500 transition hover:text-red-600 disabled:opacity-50"
//                 >
//                   {loading ? "Refreshing..." : "Refresh"}
//                 </button>
//               </div>

//               {loading || resolvingEmployee ? (
//                 <div className="py-16 text-center text-sm text-slate-500">
//                   Loading...
//                 </div>
//               ) : history.length === 0 ? (
//                 <div className="py-16 text-center text-sm text-slate-500">
//                   No records yet. Punch in to start.
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left text-sm">
//                     <thead>
//                       <tr className="border-b bg-slate-50">
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Date
//                         </th>
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Status
//                         </th>
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           In
//                         </th>
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Out
//                         </th>
//                         <th className="px-5 py-3 font-semibold text-slate-500">
//                           Hours
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-slate-100">
//                       {history.map((row, index) => {
//                         const isHalf =
//                           row.is_half_day ||
//                           (row.status || "").toLowerCase() === "half_day";

//                         return (
//                           <tr
//                             key={row.attendance_id || index}
//                             className="hover:bg-slate-50"
//                           >
//                             <td className="whitespace-nowrap px-5 py-3.5">
//                               {formatDate(
//                                 row.attendance_date ||
//                                   row.punch_date ||
//                                   row.date
//                               )}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               <span
//                                 className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                                   isHalf
//                                     ? "bg-purple-50 text-purple-700"
//                                     : (row.status || "").toLowerCase() ===
//                                       "present"
//                                     ? "bg-green-50 text-green-700"
//                                     : "bg-slate-100 text-slate-600"
//                                 }`}
//                               >
//                                 {isHalf
//                                   ? "Half Day"
//                                   : String(row.status || "—").replace(
//                                       /_/g,
//                                       " "
//                                     )}
//                               </span>
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {formatTime(getFirstIn(row))}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {formatTime(getLastOut(row))}
//                             </td>

//                             <td className="px-5 py-3.5">
//                               {minutesToHhMm(row.total_work_minutes)}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

/* ---------- Helpers ---------- */

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        const field = Array.isArray(item.loc) ? item.loc.slice(1).join(".") : "";
        return field ? `${field}: ${item.msg}` : item.msg;
      })
      .join(" • ");
  }

  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") {
    return detail.msg || detail.message || JSON.stringify(detail);
  }

  return err?.message || "Something went wrong";
};

const isPlainObject = (v) => v && typeof v === "object" && !Array.isArray(v);

const toHistoryList = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;

  const candidates = [
    payload.data,
    payload.attendance,
    payload.attendances,
    payload.history,
    payload.items,
    payload.records,
    payload.results,
    payload.rows,
    payload.list,
    payload?.data?.data,
    payload?.data?.items,
    payload?.data?.records,
    payload?.data?.results,
    payload?.data?.rows,
    payload?.data?.attendance,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) return c;
  }
  return [];
};

const pickTodayRecord = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload[0] ?? null;

  const candidates = [
    payload.attendance,
    payload?.data?.attendance,
    payload.record,
    payload?.data?.record,
    payload.today,
    payload?.data?.today,
    payload.result,
    payload?.data?.result,
    payload.data,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) return c[0] ?? null;
    if (isPlainObject(c)) return c;
  }

  if (payload.attendance_id || payload.first_punch_in || payload.status) {
    return payload;
  }
  return null;
};

const getFirstIn = (record) =>
  record?.first_punch_in || record?.punch_in || record?.in_time || record?.first_in || null;

const getLastOut = (record) =>
  record?.last_punch_out || record?.punch_out || record?.out_time || record?.last_out || null;

const minutesToHhMm = (minutes) => {
  if (minutes == null) return "—";
  const m = Number(minutes);
  if (Number.isNaN(m)) return "—";
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

const formatAllowedDateTime = (value, timezone) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: timezone || "Asia/Kolkata",
  });
};

const getPunchShift = (payload) =>
  payload?.shift || payload?.data?.shift || payload?.result?.shift || null;

const hasCalculatedPunchWindow = (shift) =>
  Boolean(
    shift?.punch_in_allowed_from &&
      shift?.punch_in_allowed_till &&
      shift?.punch_out_allowed_from &&
      shift?.punch_out_allowed_till
  );

/* ---------- Component ---------- */

export default function AttendanceTodayPage() {
  const { user, timezone } = useAuthStore();
  const tz = timezone || "Asia/Kolkata";

  const [employeeId, setEmployeeId] = useState("");
  const [resolvingEmployee, setResolvingEmployee] = useState(true);

  const [today, setToday] = useState(null);
  const [history, setHistory] = useState([]);
  const [punchWindow, setPunchWindow] = useState(null);

  const [loading, setLoading] = useState(true);
  const [punching, setPunching] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [lastLocation, setLastLocation] = useState(null);

  const inFlight = useRef(false);

  /* ---------- Resolve employee_id ---------- */
  useEffect(() => {
    async function resolveEmployeeId() {
      setResolvingEmployee(true);
      setError("");

      const fromStore =
        user?.employee_id ||
        user?.employeeId ||
        user?.emp_id ||
        user?.employee?.employee_id ||
        user?.employee?.id ||
        user?.profile?.employee_id ||
        user?.data?.employee_id ||
        "";

      if (fromStore) {
        setEmployeeId(fromStore);
        setResolvingEmployee(false);
        return;
      }

      const userId = user?.user_id || user?.id || user?.sub || "";
      if (!userId) {
        setError("User not found. Please login again.");
        setResolvingEmployee(false);
        return;
      }

      try {
        const res = await api.get("/api/v1/get/employees");
        const list =
          res?.data?.employees ||
          res?.data?.data ||
          res?.data?.list ||
          (Array.isArray(res?.data) ? res.data : []) ||
          [];

        const me = list.find(
          (e) =>
            e.user_id === userId ||
            e.userId === userId ||
            String(e.user_id) === String(userId)
        );

        if (me?.employee_id) {
          setEmployeeId(me.employee_id);
          try {
            const store = useAuthStore.getState();
            if (store?.setUser && user) {
              store.setUser({ ...user, employee_id: me.employee_id });
            }
          } catch (_) {}
        } else {
          setError("Employee profile not found for this user. Please contact admin.");
        }
      } catch (err) {
        setError("Could not resolve employee ID. " + formatApiError(err));
      } finally {
        setResolvingEmployee(false);
      }
    }

    resolveEmployeeId();
  }, [user]);

  /* ---------- Formatters ---------- */
  const formatTime = useCallback(
    (value) => {
      if (!value) return "—";
      try {
        const raw =
          typeof value === "string" &&
          !value.endsWith("Z") &&
          !/[+-]\d{2}:\d{2}$/.test(value)
            ? `${value}Z`
            : value;

        const date = new Date(raw);
        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: tz,
        });
      } catch {
        return "—";
      }
    },
    [tz]
  );

  const formatDate = useCallback(
    (value) => {
      if (!value) return "—";
      try {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const [y, m, d] = value.split("-").map(Number);
          return new Date(y, m - 1, d).toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";

        return date.toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: tz,
        });
      } catch {
        return "—";
      }
    },
    [tz]
  );

  /* ---------- Derived state ---------- */
  const punchState = useMemo(() => {
    const hasIn = Boolean(getFirstIn(today));
    const hasOut = Boolean(getLastOut(today));

    if (!hasIn) {
      return {
        phase: "need_in",
        nextType: "in",
        buttonLabel: "Punch In",
        buttonDisabled: false,
        helper: "Start your day",
      };
    }

    if (hasIn && !hasOut) {
      return {
        phase: "need_out",
        nextType: "out",
        buttonLabel: "Punch Out",
        buttonDisabled: false,
        helper: "You are currently punched in",
      };
    }

    return {
      phase: "done",
      nextType: null,
      buttonLabel: "Completed for today",
      buttonDisabled: true,
      helper: "Both punches recorded",
    };
  }, [today]);

  const statusInfo = useMemo(() => {
    if (loading || resolvingEmployee) {
      return { label: "Loading...", color: "bg-gray-100 text-gray-600" };
    }

    const status = (today?.status || "").toLowerCase();
    const isHalfDay = today?.is_half_day || status === "half_day";
    const isLate = today?.is_late;

    if (punchState.phase === "need_in") {
      return { label: "Not Punched In", color: "bg-amber-50 text-amber-700" };
    }

    if (punchState.phase === "need_out") {
      return {
        label: isLate ? "Punched In (Late)" : "Punched In",
        color: isLate ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700",
      };
    }

    if (isHalfDay) {
      return { label: "Half Day", color: "bg-purple-50 text-purple-700" };
    }

    if (status === "present" || punchState.phase === "done") {
      return { label: "Present", color: "bg-green-50 text-green-700" };
    }

    if (status) {
      return {
        label: String(status).replace(/_/g, " "),
        color: "bg-gray-100 text-gray-700",
      };
    }

    return { label: "Completed", color: "bg-green-50 text-green-700" };
  }, [loading, resolvingEmployee, today, punchState.phase]);

  /* ---------- Data loading ---------- */
  const loadToday = useCallback(async () => {
    if (!employeeId) {
      setToday(null);
      return;
    }

    try {
      const res = await api.get("/api/v1/get/today/attendence", {
        params: { employee_id: employeeId },
      });

      setToday(pickTodayRecord(res?.data));

      const shift = getPunchShift(res?.data);
      if (hasCalculatedPunchWindow(shift)) {
        setPunchWindow((prev) => ({ ...prev, ...shift }));
      }
    } catch (err) {
      setToday(null);
      setError(`Today attendance: ${formatApiError(err)}`);
    }
  }, [employeeId]);

  const loadHistory = useCallback(async () => {
    if (!employeeId) {
      setHistory([]);
      return;
    }

    try {
      const res = await api.get("/api/v1/get/attendence/history", {
        params: { employee_id: employeeId, page: 1, page_size: 10 },
      });
      setHistory(toHistoryList(res?.data));
    } catch (err) {
      setHistory([]);
      setError((prev) => prev || `Attendance history: ${formatApiError(err)}`);
    }
  }, [employeeId]);

  const refreshAll = useCallback(async () => {
    if (!employeeId || inFlight.current) return;

    inFlight.current = true;
    setLoading(true);
    setError("");

    try {
      await Promise.all([loadToday(), loadHistory()]);
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  }, [employeeId, loadToday, loadHistory]);

  useEffect(() => {
    if (employeeId && !resolvingEmployee) {
      refreshAll();
    }
  }, [employeeId, resolvingEmployee, refreshAll]);

  /* ---------- Geolocation (optional now) ---------- */
  const getLocation = () =>
    new Promise((resolve) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        () => {
          // Location fail → null bhejo, backend decide karega
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    });

  /* ---------- Punch ---------- */
  const handlePunch = async () => {
    setError("");
    setSuccess("");

    if (!employeeId) {
      setError("Employee ID missing. Please wait or login again.");
      return;
    }

    if (punchState.buttonDisabled || !punchState.nextType) {
      setError("Already completed for today");
      return;
    }

    setPunching(true);

    const location = await getLocation();
    if (location) setLastLocation(location);

    const nextType = punchState.nextType;

    try {
      const payload = {
        employee_id: employeeId,
        punch_type: nextType,
        punch_source: "web",
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        location_accuracy_meters: location?.accuracy
          ? Math.round(location.accuracy)
          : null,
        device_type: "web",
        is_manual: false,
        remarks: null,
      };

      const res = await api.post("/api/v1/add/punch", payload);

      const shift = getPunchShift(res?.data);
      if (hasCalculatedPunchWindow(shift)) {
        setPunchWindow((prev) => ({ ...prev, ...shift }));
      }

      const attendanceFromServer = pickTodayRecord(res?.data);

      if (attendanceFromServer) {
        setToday(attendanceFromServer);
      } else {
        const now = new Date().toISOString();
        setToday((prev) =>
          nextType === "in"
            ? {
                ...(prev || {}),
                first_punch_in: now,
                last_punch_out: null,
                status: "present",
              }
            : {
                ...(prev || {}),
                last_punch_out: now,
                status: prev?.status || "present",
              }
        );
      }

      setSuccess(
        nextType === "in" ? "Punched In successfully" : "Punched Out successfully"
      );

      setTimeout(() => {
        loadToday();
        loadHistory();
      }, 400);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setPunching(false);
    }
  };

  const firstInTime = getFirstIn(today);
  const lastOutTime = getLastOut(today);
  const workHours = minutesToHhMm(today?.total_work_minutes);

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-2xl">
              🕒
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
              <p className="mt-1 text-sm text-slate-500">
                {formatDate(new Date())} • {tz}
              </p>
            </div>
          </div>
        </div>

        {resolvingEmployee && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Resolving employee profile...
          </div>
        )}

        {!resolvingEmployee && !employeeId && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Employee ID missing. Please login again or contact admin.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            ✅ {success}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-3">
          {/* ===== PUNCH CARD ===== */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-900 px-6 py-7 text-center text-white">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Today
                </p>

                <div className="mt-3 flex justify-center">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-400">{punchState.helper}</p>

                {lastLocation && (
                  <p className="mt-1 text-[11px] text-slate-500">
                    GPS ±{Math.round(lastLocation.accuracy || 0)}m
                  </p>
                )}
              </div>

              <div className="space-y-5 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`rounded-xl px-3 py-4 text-center ${
                      firstInTime ? "bg-green-50" : "bg-slate-50"
                    }`}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      Punch In
                    </p>
                    <p className="mt-1.5 text-lg font-semibold text-slate-900">
                      {formatTime(firstInTime)}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl px-3 py-4 text-center ${
                      lastOutTime ? "bg-green-50" : "bg-slate-50"
                    }`}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                      Punch Out
                    </p>
                    <p className="mt-1.5 text-lg font-semibold text-slate-900">
                      {formatTime(lastOutTime)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <p className="text-[11px] text-slate-400">Work Hours</p>
                    <p className="mt-1 font-semibold text-slate-800">{workHours}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-3 py-3">
                    <p className="text-[11px] text-slate-400">Late By</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {today?.is_late ? `${today.late_minutes || 0} min` : "—"}
                    </p>
                  </div>
                </div>

                {today?.is_half_day && (
                  <div className="rounded-xl bg-purple-50 px-4 py-3 text-center text-sm font-medium text-purple-700">
                    Marked as Half Day
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePunch}
                  disabled={
                    punching ||
                    loading ||
                    resolvingEmployee ||
                    !employeeId ||
                    punchState.buttonDisabled
                  }
                  className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    punchState.nextType === "out"
                      ? "bg-slate-900 hover:bg-slate-800"
                      : punchState.phase === "done"
                      ? "bg-slate-400"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {resolvingEmployee
                    ? "Loading profile..."
                    : punching
                    ? "Saving..."
                    : punchState.buttonLabel}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  {punchState.phase === "need_in" && "One click → Punch In"}
                  {punchState.phase === "need_out" && "One click → Punch Out"}
                  {punchState.phase === "done" && "See you tomorrow"}
                </p>

                {punchWindow && (
                  <div className="space-y-1 rounded-lg bg-slate-50 px-3 py-2 text-center text-[11px] text-slate-500">
                    <p>
                      Punch In:{" "}
                      {formatAllowedDateTime(punchWindow.punch_in_allowed_from, tz)} -{" "}
                      {formatAllowedDateTime(punchWindow.punch_in_allowed_till, tz)}
                    </p>
                    <p>
                      Punch Out:{" "}
                      {formatAllowedDateTime(punchWindow.punch_out_allowed_from, tz)} -{" "}
                      {formatAllowedDateTime(punchWindow.punch_out_allowed_till, tz)}
                    </p>
                    <p className="text-slate-400">
                      Late checkout buffer:{" "}
                      {punchWindow.late_checkout_margin_minutes ?? 0} min
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== HISTORY ===== */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-slate-800">
                  Recent Attendance
                </h2>

                <button
                  type="button"
                  onClick={refreshAll}
                  disabled={loading || !employeeId}
                  className="text-xs font-medium text-slate-500 transition hover:text-red-600 disabled:opacity-50"
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </div>

              {loading || resolvingEmployee ? (
                <div className="py-16 text-center text-sm text-slate-500">
                  Loading...
                </div>
              ) : history.length === 0 ? (
                <div className="py-16 text-center text-sm text-slate-500">
                  No records yet. Punch in to start.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50">
                        <th className="px-5 py-3 font-semibold text-slate-500">Date</th>
                        <th className="px-5 py-3 font-semibold text-slate-500">Status</th>
                        <th className="px-5 py-3 font-semibold text-slate-500">In</th>
                        <th className="px-5 py-3 font-semibold text-slate-500">Out</th>
                        <th className="px-5 py-3 font-semibold text-slate-500">Hours</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {history.map((row, index) => {
                        const isHalf =
                          row.is_half_day ||
                          (row.status || "").toLowerCase() === "half_day";

                        return (
                          <tr key={row.attendance_id || index} className="hover:bg-slate-50">
                            <td className="whitespace-nowrap px-5 py-3.5">
                              {formatDate(row.attendance_date || row.punch_date || row.date)}
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  isHalf
                                    ? "bg-purple-50 text-purple-700"
                                    : (row.status || "").toLowerCase() === "present"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {isHalf
                                  ? "Half Day"
                                  : String(row.status || "—").replace(/_/g, " ")}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">{formatTime(getFirstIn(row))}</td>
                            <td className="px-5 py-3.5">{formatTime(getLastOut(row))}</td>
                            <td className="px-5 py-3.5">
                              {minutesToHhMm(row.total_work_minutes)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}