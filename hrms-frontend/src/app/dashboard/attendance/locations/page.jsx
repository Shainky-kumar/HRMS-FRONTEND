

// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api";

// const formatApiError = (err) => {
//   const detail = err?.response?.data?.detail;
//   if (Array.isArray(detail)) return detail.map((e) => e.msg || "Error").join(" • ");
//   if (typeof detail === "string") return detail;
//   return err?.message || "Something went wrong";
// };

// const toArray = (p) => {
//   if (!p) return [];
//   if (Array.isArray(p)) return p;
//   if (Array.isArray(p?.location)) return p.location;   // backend key
//   if (Array.isArray(p?.locations)) return p.locations;
//   if (Array.isArray(p?.data)) return p.data;
//   return [];
// };

// export default function AttendanceLocationsPage() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState({
//     location_name: "",
//     address: "",
//     latitude: "",
//     longitude: "",
//     radius_meters: "200",
//     is_active: true,
//   });

//   const fetchList = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await api.get("/api/v1/get/attendence/locations", {
//         params: { page: 1, page_size: 50 },
//       });
//       setList(toArray(res?.data));
//     } catch (err) {
//       setError(formatApiError(err));
//       setList([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   const openAdd = () => {
//     setEditId(null);
//     setForm({
//       location_name: "",
//       address: "",
//       latitude: "",
//       longitude: "",
//       radius_meters: "200",
//       is_active: true,
//     });
//     setShowForm(true);
//     setError("");
//     setSuccess("");
//   };

//   const openEdit = (row) => {
//     setEditId(row.location_id);
//     setForm({
//       location_name: row.location_name || "",
//       address: row.address || "",
//       latitude: String(row.latitude ?? ""),
//       longitude: String(row.longitude ?? ""),
//       radius_meters: String(row.radius_meters ?? 200),
//       is_active: row.is_active !== false,
//     });
//     setShowForm(true);
//     setError("");
//     setSuccess("");
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess("");
//     try {
//       const payload = {
//         location_name: form.location_name,
//         address: form.address || null,
//         latitude: Number(form.latitude),
//         longitude: Number(form.longitude),
//         radius_meters: Number(form.radius_meters),
//         is_active: form.is_active,
//       };

//       if (editId) {
//         await api.put(`/api/v1/attendence/location/${editId}`, payload);
//         setSuccess("Location updated successfully");
//       } else {
//         await api.post("/api/v1/add/attendence/location", payload);
//         setSuccess("Location added successfully");
//       }

//       setShowForm(false);
//       fetchList();
//     } catch (err) {
//       setError(formatApiError(err));
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-3.5rem)] bg-[#f5f6f8] p-6">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Geo Locations</h1>
//           <p className="mt-1 text-sm text-[#6b7280]">Office / client fence points</p>
//         </div>
//         <button
//           onClick={openAdd}
//           className="rounded-lg bg-[#E42527] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#c91f21]"
//         >
//           + Add Location
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
//       )}
//       {success && (
//         <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
//       )}

//       <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="py-16 text-center text-sm text-[#6b7280]">Loading...</div>
//           ) : list.length === 0 ? (
//             <div className="py-16 text-center text-sm text-[#6b7280]">No locations found</div>
//           ) : (
//             <table className="w-full min-w-[800px] text-left text-sm">
//               <thead>
//                 <tr className="border-b bg-[#f9fafb]">
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Name</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Latitude</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Longitude</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Radius (m)</th>
//                   <th className="px-5 py-3 font-medium text-[#6b7280]">Active</th>
//                   <th className="px-5 py-3 text-right font-medium text-[#6b7280]">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {list.map((row) => (
//                   <tr key={row.location_id} className="hover:bg-[#fafafa]">
//                     <td className="px-5 py-3.5 font-medium">{row.location_name}</td>
//                     <td className="px-5 py-3.5">{row.latitude}</td>
//                     <td className="px-5 py-3.5">{row.longitude}</td>
//                     <td className="px-5 py-3.5">{row.radius_meters}</td>
//                     <td className="px-5 py-3.5">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                           row.is_active
//                             ? "bg-green-50 text-green-700"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {row.is_active ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3.5 text-right">
//                       <button
//                         onClick={() => openEdit(row)}
//                         className="text-xs font-medium text-[#6b7280] hover:text-[#E42527]"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b px-5 py-4">
//               <h2 className="font-semibold">
//                 {editId ? "Edit Location" : "Add Location"}
//               </h2>
//               <button onClick={() => setShowForm(false)}>✕</button>
//             </div>
//             <form onSubmit={submit} className="space-y-3 p-5">
//               <input
//                 required
//                 placeholder="Location name *"
//                 value={form.location_name}
//                 onChange={(e) => setForm((p) => ({ ...p, location_name: e.target.value }))}
//                 className="w-full rounded-lg border px-3 py-2.5 text-sm"
//               />
//               <input
//                 placeholder="Address"
//                 value={form.address}
//                 onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
//                 className="w-full rounded-lg border px-3 py-2.5 text-sm"
//               />
//               <input
//                 required
//                 type="number"
//                 step="any"
//                 placeholder="Latitude *"
//                 value={form.latitude}
//                 onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
//                 className="w-full rounded-lg border px-3 py-2.5 text-sm"
//               />
//               <input
//                 required
//                 type="number"
//                 step="any"
//                 placeholder="Longitude *"
//                 value={form.longitude}
//                 onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
//                 className="w-full rounded-lg border px-3 py-2.5 text-sm"
//               />
//               <input
//                 required
//                 type="number"
//                 placeholder="Radius (meters)"
//                 value={form.radius_meters}
//                 onChange={(e) => setForm((p) => ({ ...p, radius_meters: e.target.value }))}
//                 className="w-full rounded-lg border px-3 py-2.5 text-sm"
//               />
//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={form.is_active}
//                   onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
//                 />
//                 Active
//               </label>
//               <div className="flex justify-end gap-2 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="rounded-lg border px-4 py-2 text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
//                 >
//                   {saving ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//  ya yha sa location current daalta hi lognitute or latitude la laga 

"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((e) => e.msg || "Error").join(" • ");
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
};

const toArray = (p) => {
  if (!p) return [];
  if (Array.isArray(p)) return p;
  if (Array.isArray(p?.location)) return p.location;
  if (Array.isArray(p?.locations)) return p.locations;
  if (Array.isArray(p?.data)) return p.data;
  return [];
};

export default function AttendanceLocationsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    location_name: "",
    address: "",
    latitude: "",
    longitude: "",
    radius_meters: "200",
    is_active: true,
  });

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/v1/get/attendence/locations", {
        params: { page: 1, page_size: 50 },
      });
      setList(toArray(res?.data));
    } catch (err) {
      setError(formatApiError(err));
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // ✅ Current location lene ka function
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this browser");
      return;
    }

    setGettingLocation(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setGettingLocation(false);
        setSuccess("Current location fetched successfully");
        setTimeout(() => setSuccess(""), 2500);
      },
      (err) => {
        setGettingLocation(false);
        let msg = "Unable to get location";
        if (err.code === 1) msg = "Location permission denied. Please allow location.";
        if (err.code === 2) msg = "Location unavailable. Try again.";
        if (err.code === 3) msg = "Location request timed out. Try again.";
        setError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      location_name: "",
      address: "",
      latitude: "",
      longitude: "",
      radius_meters: "200",
      is_active: true,
    });
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEdit = (row) => {
    setEditId(row.location_id);
    setForm({
      location_name: row.location_name || "",
      address: row.address || "",
      latitude: String(row.latitude ?? ""),
      longitude: String(row.longitude ?? ""),
      radius_meters: String(row.radius_meters ?? 200),
      is_active: row.is_active !== false,
    });
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        location_name: form.location_name,
        address: form.address || null,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        radius_meters: Number(form.radius_meters),
        is_active: form.is_active,
      };

      if (editId) {
        await api.put(`/api/v1/attendence/location/${editId}`, payload);
        setSuccess("Location updated successfully");
      } else {
        await api.post("/api/v1/add/attendence/location", payload);
        setSuccess("Location added successfully");
      }

      setShowForm(false);
      fetchList();
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f5f6f8] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Geo Locations</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Office / client fence points
          </p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-lg bg-[#E42527] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#c91f21]"
        >
          + Add Location
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-sm text-[#6b7280]">Loading...</div>
          ) : list.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#6b7280]">
              No locations found
            </div>
          ) : (
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b bg-[#f9fafb]">
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Name</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Latitude</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Longitude</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Radius (m)</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Active</th>
                  <th className="px-5 py-3 text-right font-medium text-[#6b7280]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {list.map((row) => (
                  <tr key={row.location_id} className="hover:bg-[#fafafa]">
                    <td className="px-5 py-3.5 font-medium">{row.location_name}</td>
                    <td className="px-5 py-3.5">{row.latitude}</td>
                    <td className="px-5 py-3.5">{row.longitude}</td>
                    <td className="px-5 py-3.5">{row.radius_meters}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          row.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {row.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openEdit(row)}
                        className="text-xs font-medium text-[#6b7280] hover:text-[#E42527]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-semibold">
                {editId ? "Edit Location" : "Add Location"}
              </h2>
              <button onClick={() => setShowForm(false)}>✕</button>
            </div>

            <form onSubmit={submit} className="space-y-3 p-5">
              <input
                required
                placeholder="Location name *"
                value={form.location_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location_name: e.target.value }))
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
              />

              <input
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
              />

              {/* Latitude + Longitude + Get Location button */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="number"
                  step="any"
                  placeholder="Latitude *"
                  value={form.latitude}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, latitude: e.target.value }))
                  }
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
                <input
                  required
                  type="number"
                  step="any"
                  placeholder="Longitude *"
                  value={form.longitude}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, longitude: e.target.value }))
                  }
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>

              {/* ✅ Current Location Button */}
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={gettingLocation}
                className="w-full rounded-lg border border-[#E42527] py-2.5 text-sm font-medium text-[#E42527] hover:bg-red-50 disabled:opacity-60"
              >
                {gettingLocation
                  ? "Getting location..."
                  : "📍 Use Current Location"}
              </button>

              <input
                required
                type="number"
                placeholder="Radius (meters)"
                value={form.radius_meters}
                onChange={(e) =>
                  setForm((p) => ({ ...p, radius_meters: e.target.value }))
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, is_active: e.target.checked }))
                  }
                />
                Active
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}