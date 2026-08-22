"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const initialForm = {
  leave_policy_id: "",
  criteria_type: "department",
  criteria_value: "",
  is_exception: false,
};

const criteriaTypeOptions = [
  { value: "department", label: "Department" },
  { value: "location", label: "Location" },
  { value: "employment_type", label: "Employment Type" },
  { value: "gender", label: "Gender" },
  { value: "role", label: "Role" },
  { value: "employee_id", label: "Employee ID" },
];

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

export default function LeaveApplicabilityRulesPage() {
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
  const [leavePolicyId, setLeavePolicyId] = useState("");

  // Set leavePolicyId from URL params or parent component as needed
  // Example: const params = useSearchParams(); setLeavePolicyId(params.get("policy_id") || "");

  useEffect(() => {
    if (!leavePolicyId) return;
    fetchData();
  }, [page, search, leavePolicyId]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(
        `/api/v1/leave/applicability/rules/${leavePolicyId}`,
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
    setFormData({ ...initialForm, leave_policy_id: leavePolicyId });
    setError("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id || item.applicability_id);
    setFormData({
      ...initialForm,
      leave_policy_id: leavePolicyId,
      criteria_type: item.criteria_type || "department",
      criteria_value: item.criteria_value || "",
      is_exception: !!item.is_exception,
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
        leave_policy_id: leavePolicyId || formData.leave_policy_id,
        criteria_type: formData.criteria_type,
        criteria_value: formData.criteria_value,
        is_exception: !!formData.is_exception,
      };

      if (editId) {
        await api.put(
          `/api/v1/leave/applicability/rules/${editId}`,
          payload
        );
      } else {
        await api.post("/api/v1/leave/applicability/rules", payload);
      }
      setShowForm(false);
      setFormData({ ...initialForm, leave_policy_id: leavePolicyId });
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
            Leave Applicability Rules
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Configure which employees can access this leave policy
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21]"
        >
          + Add Rule
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
            placeholder="Search rules..."
            className="w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#E42527] focus:bg-white"
          />
          <span className="text-sm text-slate-500">{total} rules</span>
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
              No rules found
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-3 font-medium text-slate-500">#</th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Criteria Type
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Criteria Value
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500">
                    Exception
                  </th>
                  <th className="px-5 py-3 font-medium text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map((item, i) => (
                  <tr
                    key={item.id || item.applicability_id || i}
                    className="hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5 text-slate-500">
                      {(page - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800 capitalize">
                      {(item.criteria_type || "").replace(/_/g, " ")}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.criteria_value ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.is_exception ? (
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                          Yes
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                          No
                        </span>
                      )}
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
                {editId ? "Edit Applicability Rule" : "Add Applicability Rule"}
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
                      Leave Policy ID *
                    </label>
                    <input
                      required
                      value={formData.leave_policy_id || leavePolicyId}
                      onChange={(e) =>
                        handleChange("leave_policy_id", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Criteria Type *
                    </label>
                    <select
                      value={formData.criteria_type}
                      onChange={(e) =>
                        handleChange("criteria_type", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    >
                      {criteriaTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Criteria Value *
                    </label>
                    <input
                      required
                      value={formData.criteria_value}
                      onChange={(e) =>
                        handleChange("criteria_value", e.target.value)
                      }
                      placeholder={
                        formData.criteria_type === "gender"
                          ? "e.g. male, female, all"
                          : formData.criteria_type === "employment_type"
                          ? "e.g. permanent, contract, intern"
                          : "e.g. IT, Delhi, Manager, EMP123"
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={!!formData.is_exception}
                        onChange={(e) =>
                          handleChange("is_exception", e.target.checked)
                        }
                        className="rounded border-slate-300 text-[#E42527] focus:ring-[#E42527]"
                      />
                      <span className="font-medium">Is Exception</span>
                    </label>
                    <p className="mt-1 text-xs text-slate-500">
                      If checked, this rule will act as an exception (exclude
                      matching employees instead of including them).
                    </p>
                  </div>
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