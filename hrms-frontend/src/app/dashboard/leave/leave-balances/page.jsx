"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const initialForm = {
  employee_id: "",
  leave_type_id: "",
  leave_policy_id: "",
  company_id: "",
  year: new Date().getFullYear(),
  total_leaves: 0,
  leaves_taken: 0,
  leaves_pending: 0,
  leaves_remaining: 0,
  carried_forward: 0,
  encashed: 0,
  lapsed: 0,
};

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail
      .map((e) =>
        Array.isArray(e.loc) ? `${e.loc.slice(1).join(".")}: ${e.msg}` : e.msg
      )
      .join(" • ");
  }
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
};

export default function EmployeeLeaveBalancePage() {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [employeeId, setEmployeeId] = useState("");

  // Set employeeId from URL params or parent component as needed
  // Example: const params = useSearchParams(); setEmployeeId(params.get("employee_id") || "");

  useEffect(() => {
    if (!employeeId) return;
    fetchData();
  }, [page, search, employeeId]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `/api/v1/leave/balance/${employeeId}`,
        {
          params: { page, page_size: pageSize, search },
        }
      );
      const data = res.data?.data ?? res.data ?? [];
      const items = Array.isArray(data) ? data : data?.items ?? data?.results ?? [];
      setList(items);
      setTotal(res.data?.total ?? res.data?.count ?? items.length);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openAdd = () => {
    setEditId(null);
    setFormData({ ...initialForm, employee_id: employeeId });
    setError("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id || item.balance_id);
    setFormData({
      ...initialForm,
      employee_id: item.employee_id || employeeId,
      leave_type_id: item.leave_type_id || "",
      leave_policy_id: item.leave_policy_id || "",
      company_id: item.company_id || "",
      year: item.year ?? new Date().getFullYear(),
      total_leaves: item.total_leaves ?? 0,
      leaves_taken: item.leaves_taken ?? 0,
      leaves_pending: item.leaves_pending ?? 0,
      leaves_remaining: item.leaves_remaining ?? 0,
      carried_forward: item.carried_forward ?? 0,
      encashed: item.encashed ?? 0,
      lapsed: item.lapsed ?? 0,
    });
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        employee_id: employeeId || formData.employee_id,
        leave_type_id: formData.leave_type_id,
        leave_policy_id: formData.leave_policy_id,
        company_id: formData.company_id,
        year: Number(formData.year) || new Date().getFullYear(),
        total_leaves: Number(formData.total_leaves) || 0,
        leaves_taken: Number(formData.leaves_taken) || 0,
        leaves_pending: Number(formData.leaves_pending) || 0,
        leaves_remaining: Number(formData.leaves_remaining) || 0,
        carried_forward: Number(formData.carried_forward) || 0,
        encashed: Number(formData.encashed) || 0,
        lapsed: Number(formData.lapsed) || 0,
      };

      if (editId) {
        await api.put(`/api/v1/leave/balance/${editId}`, payload);
      } else {
        await api.post("/api/v1/leave/balance", payload);
      }
      setShowForm(false);
      setFormData({ ...initialForm, employee_id: employeeId });
      setEditId(null);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Employee Leave Balance
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            View and update leave balances for this employee
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21]"
        >
          + Add Balance Record
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by leave type or year..."
            className="w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#E42527] focus:bg-white"
          />
          <span className="text-sm text-slate-500">{total} records</span>
        </div>

        {error && !showForm && (
          <div className="mx-4 mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-sm text-slate-500">
              Loading...
            </div>
          ) : list.length === 0 ? (
            <div className="py-20 text-center text-sm text-slate-500">
              No balance records found
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-3 font-medium text-slate-500">#</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Year</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Leave Type</th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Total
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Taken
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Pending
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Remaining
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    CF
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Encashed
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Lapsed
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map((item, i) => (
                  <tr
                    key={item.id || item.balance_id || i}
                    className="hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5 text-slate-500">
                      {(page - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">
                      {item.year ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.leave_type_id ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.total_leaves ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.leaves_taken ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.leaves_pending ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.leaves_remaining ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.carried_forward ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.encashed ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.lapsed ?? 0}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
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

        {totalPages > 1 && (
          <div className="flex justify-between border-t border-slate-100 px-4 py-3">
            <span className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Prev
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 pt-10 backdrop-blur-[2px]">
          <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-800">
                {editId ? "Edit Leave Balance" : "Add Leave Balance"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto px-5 py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Employee ID *
                    </label>
                    <input
                      required
                      value={formData.employee_id || employeeId}
                      onChange={(e) =>
                        handleChange("employee_id", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Company ID *
                    </label>
                    <input
                      required
                      value={formData.company_id}
                      onChange={(e) =>
                        handleChange("company_id", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Leave Policy ID *
                    </label>
                    <input
                      required
                      value={formData.leave_policy_id}
                      onChange={(e) =>
                        handleChange("leave_policy_id", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Leave Type ID *
                    </label>
                    <input
                      required
                      value={formData.leave_type_id}
                      onChange={(e) =>
                        handleChange("leave_type_id", e.target.value)
                      }
                      placeholder="e.g. CL, PL, SL"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Year *
                    </label>
                    <input
                      required
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    ["total_leaves", "Total"],
                    ["leaves_taken", "Taken"],
                    ["leaves_pending", "Pending"],
                    ["leaves_remaining", "Remaining"],
                    ["carried_forward", "Carried Forward"],
                    ["encashed", "Encashed"],
                    ["lapsed", "Lapsed"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        {label}
                      </label>
                      <input
                        type="number"
                        value={formData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                      />
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#E42527] px-5 py-2 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60"
                >
                  {saving ? "Saving..." : editId ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}