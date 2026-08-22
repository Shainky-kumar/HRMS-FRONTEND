"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((i) => i?.msg || "Error").join(", ");
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return detail.msg || detail.message || "Request failed";
  return err?.message || "Something went wrong";
}

function toArray(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function ComponentsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    component_name: "",
    component_type: "earning",
    is_taxable: true,
    is_statutory: false,
    is_active: true,
  });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/v1/get/components/list");
      setList(toArray(res?.data ?? res));
    } catch (err) {
      setError(getErrorMessage(err));
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.component_name.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/api/v1/create/component", form);
      setShowForm(false);
      setForm({ component_name: "", component_type: "earning", is_taxable: true, is_statutory: false, is_active: true });
      await fetchList();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = list.filter((item) =>
    (item?.component_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Salary Components</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Manage earning & deduction components</p>
        </div>
        <button
          onClick={() => { setError(""); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21]"
        >
          + Add Component
        </button>
      </div>

      {error && !showForm && (
        <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>
      )}

      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-3.5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="w-full max-w-xs rounded-md border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#E42527] focus:outline-none"
          />
          <span className="text-sm text-[#6b7280]">{filtered.length} items</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">No components found</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <th className="px-5 py-3 font-medium text-[#6b7280]">Name</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Type</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Taxable</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Statutory</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {filtered.map((item) => (
                <tr key={item.salary_component_id || item.component_name} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3.5 font-medium text-[#1a1a1a]">{item.component_name}</td>
                  <td className="px-5 py-3.5 capitalize text-[#6b7280]">{item.component_type}</td>
                  <td className="px-5 py-3.5 text-[#6b7280]">{item.is_taxable ? "Yes" : "No"}</td>
                  <td className="px-5 py-3.5 text-[#6b7280]">{item.is_statutory ? "Yes" : "No"}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.is_active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-semibold">Add Component</h2>
              <button onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-medium">Component Name *</label>
                <input
                  required
                  value={form.component_name}
                  onChange={(e) => setForm({ ...form, component_name: e.target.value })}
                  className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Type</label>
                <select
                  value={form.component_type}
                  onChange={(e) => setForm({ ...form, component_type: e.target.value })}
                  className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm"
                >
                  <option value="earning">Earning</option>
                  <option value="deduction">Deduction</option>
                  <option value="reimbursement">Reimbursement</option>
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_taxable} onChange={(e) => setForm({ ...form, is_taxable: e.target.checked })} />
                  Taxable
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_statutory} onChange={(e) => setForm({ ...form, is_statutory: e.target.checked })} />
                  Statutory
                </label>
              </div>
              {error && <div className="rounded-md bg-[#fef2f2] px-3 py-2 text-sm text-[#b91c1c]">{error}</div>}
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
                <button type="submit" disabled={submitting} className="rounded-md bg-[#E42527] px-4 py-2 text-sm text-white disabled:opacity-60">
                  {submitting ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}