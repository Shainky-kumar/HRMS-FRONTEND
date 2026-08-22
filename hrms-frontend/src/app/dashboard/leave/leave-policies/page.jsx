"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const initialForm = {
  leave_type_id: "",
  policy_name: "",
  entitlement_type: "annual",
  total_leaves: 0,
  accrual_type: "monthly",
  per_month_limit: 0,
  max_applications_per_year: 0,
  min_leave_count_for_request: 1,
  grant_min_days: 1,
  grant_max_days: 30,
  grant_reusable_after_days: 0,
  grant_extension_as_lop: false,
  carry_forward_allowed: false,
  carry_forward_max: 0,
  carry_forward_expiry_months: 0,
  encashment_allowed: false,
  encashment_max_days: 0,
  mark_excess_as_lop: false,
  max_negative_balance: 0,
  min_notice_days: 0,
  document_required_after_days: 0,
  min_service_days: 0,
  applicable_gender: "all",
  sandwich_enabled: false,
  sandwich_limit_days: 0,
  sandwich_weekends_mode: "include",
  sandwich_holidays_mode: "include",
  allow_half_day: true,
  effective_from: "",
  effective_to: "",
  is_active: true,
  leave_added_by: "",
  reason: "",
};

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((e) => (Array.isArray(e.loc) ? `${e.loc.slice(1).join(".")}: ${e.msg}` : e.msg)).join(" • ");
  }
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
};

export default function LeavePoliciesPage() {
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

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/v1/leave/policies", {
        params: { page, page_size: pageSize, search },
      });
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
    setFormData(initialForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id || item.leave_policy_id);
    setFormData({ ...initialForm, ...item, effective_from: item.effective_from || "", effective_to: item.effective_to || "" });
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...formData,
        total_leaves: Number(formData.total_leaves) || 0,
        per_month_limit: Number(formData.per_month_limit) || 0,
        max_applications_per_year: Number(formData.max_applications_per_year) || 0,
        min_leave_count_for_request: Number(formData.min_leave_count_for_request) || 1,
        grant_min_days: Number(formData.grant_min_days) || 1,
        grant_max_days: Number(formData.grant_max_days) || 30,
        grant_reusable_after_days: Number(formData.grant_reusable_after_days) || 0,
        carry_forward_max: Number(formData.carry_forward_max) || 0,
        carry_forward_expiry_months: Number(formData.carry_forward_expiry_months) || 0,
        encashment_max_days: Number(formData.encashment_max_days) || 0,
        max_negative_balance: Number(formData.max_negative_balance) || 0,
        min_notice_days: Number(formData.min_notice_days) || 0,
        document_required_after_days: Number(formData.document_required_after_days) || 0,
        min_service_days: Number(formData.min_service_days) || 0,
        sandwich_limit_days: Number(formData.sandwich_limit_days) || 0,
        effective_to: formData.effective_to || null,
      };

      if (editId) {
        await api.put(`/api/v1/leave/policies/${editId}`, payload);
      } else {
        await api.post("/api/v1/create/leave/policy", payload);
      }
      setShowForm(false);
      setFormData(initialForm);
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
          <h1 className="text-xl font-semibold text-slate-800">Leave Policies</h1>
          <p className="mt-0.5 text-sm text-slate-500">Configure leave types and policy rules</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21]">
          + Add Policy
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search policies..."
            className="w-full max-w-xs rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#E42527] focus:bg-white"
          />
          <span className="text-sm text-slate-500">{total} policies</span>
        </div>

        {error && !showForm && (
          <div className="mx-4 mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
        )}

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 text-center text-sm text-slate-500">Loading...</div>
          ) : list.length === 0 ? (
            <div className="py-20 text-center text-sm text-slate-500">No policies found</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-3 font-medium text-slate-500">#</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Policy Name</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Total Leaves</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Accrual</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Status</th>
                  <th className="px-5 py-3 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map((item, i) => (
                  <tr key={item.id || item.leave_policy_id || i} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3.5 text-slate-500">{(page - 1) * pageSize + i + 1}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{item.policy_name || "—"}</td>
                    <td className="px-5 py-3.5 text-slate-600">{item.total_leaves ?? "—"}</td>
                    <td className="px-5 py-3.5 text-slate-600 capitalize">{item.accrual_type || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => openEdit(item)} className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100">
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
            <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Prev</button>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 pt-10 backdrop-blur-[2px]">
          <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-800">{editId ? "Edit Leave Policy" : "Add Leave Policy"}</h2>
              <button onClick={() => { setShowForm(false); setError(""); }} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto px-5 py-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Policy Name *</label>
                    <input required value={formData.policy_name} onChange={(e) => handleChange("policy_name", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Leave Type ID *</label>
                    <input required value={formData.leave_type_id} onChange={(e) => handleChange("leave_type_id", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Total Leaves</label>
                    <input type="number" value={formData.total_leaves} onChange={(e) => handleChange("total_leaves", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Entitlement Type</label>
                    <select value={formData.entitlement_type} onChange={(e) => handleChange("entitlement_type", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]">
                      <option value="annual">Annual</option>
                      <option value="monthly">Monthly</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Accrual Type</label>
                    <select value={formData.accrual_type} onChange={(e) => handleChange("accrual_type", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Per Month Limit</label>
                    <input type="number" value={formData.per_month_limit} onChange={(e) => handleChange("per_month_limit", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Grant Min Days</label>
                    <input type="number" value={formData.grant_min_days} onChange={(e) => handleChange("grant_min_days", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Grant Max Days</label>
                    <input type="number" value={formData.grant_max_days} onChange={(e) => handleChange("grant_max_days", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Effective From *</label>
                    <input required type="date" value={formData.effective_from} onChange={(e) => handleChange("effective_from", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Effective To</label>
                    <input type="date" value={formData.effective_to} onChange={(e) => handleChange("effective_to", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
                    <select value={formData.applicable_gender} onChange={(e) => handleChange("applicable_gender", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]">
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Added By</label>
                    <input value={formData.leave_added_by} onChange={(e) => handleChange("leave_added_by", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#E42527]" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[
                    ["carry_forward_allowed", "Carry Forward"],
                    ["encashment_allowed", "Encashment"],
                    ["allow_half_day", "Half Day"],
                    ["sandwich_enabled", "Sandwich"],
                    ["mark_excess_as_lop", "Excess as LOP"],
                    ["is_active", "Active"],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" checked={!!formData[key]} onChange={(e) => handleChange(key, e.target.checked)} className="rounded border-slate-300 text-[#E42527] focus:ring-[#E42527]" />
                      {label}
                    </label>
                  ))}
                </div>

                {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-lg bg-[#E42527] px-5 py-2 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60">
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