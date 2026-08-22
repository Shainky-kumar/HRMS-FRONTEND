"use client";

import { useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
}

export default function DeductionRulesPage() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    calculation_type: "percentage",
    deducted_value: "",
    wage_ceiling: "",
    is_employer_contribution: false,
    effective_from: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/v1/create/deduction-rule", {
        ...form,
        deducted_value: form.deducted_value ? Number(form.deducted_value) : null,
        wage_ceiling: form.wage_ceiling ? Number(form.wage_ceiling) : null,
        effective_to: "9999-12-31",
      });
      setSuccess("Deduction rule created successfully");
      setForm({
        name: "",
        code: "",
        calculation_type: "percentage",
        deducted_value: "",
        wage_ceiling: "",
        is_employer_contribution: false,
        effective_from: "",
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Deduction Rules</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Configure PF, ESI, PT, Tax and other statutory deductions</p>
      </div>

      {error && <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>}
      {success && <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      <div className="max-w-xl rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Rule Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" placeholder="e.g. Employee PF" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Code *</label>
            <input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" placeholder="e.g. PF" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Calculation Type</label>
            <select value={form.calculation_type} onChange={(e) => setForm({ ...form, calculation_type: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm">
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
              <option value="slab">Slab</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Value (%)</label>
            <input type="number" value={form.deducted_value} onChange={(e) => setForm({ ...form, deducted_value: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" placeholder="e.g. 12" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Wage Ceiling (optional)</label>
            <input type="number" value={form.wage_ceiling} onChange={(e) => setForm({ ...form, wage_ceiling: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" placeholder="e.g. 15000" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Effective From *</label>
            <input required type="date" value={form.effective_from} onChange={(e) => setForm({ ...form, effective_from: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_employer_contribution} onChange={(e) => setForm({ ...form, is_employer_contribution: e.target.checked })} />
            Employer Contribution
          </label>
          <button type="submit" disabled={loading} className="rounded-md bg-[#E42527] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60">
            {loading ? "Saving..." : "Create Rule"}
          </button>
        </form>
      </div>
    </div>
  );
}