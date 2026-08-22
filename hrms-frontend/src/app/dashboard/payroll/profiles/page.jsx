"use client";

import { useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
}

export default function PayrollProfilesPage() {
  const [form, setForm] = useState({
    employee_id: "",
    bank_name: "",
    bank_account_number: "",
    ifsc_code: "",
    account_holder_name: "",
    account_type: "savings",
    payment_mode: "bank_transfer",
    uan_number: "",
    pf_number: "",
    esi_number: "",
    pan_number: "",
    tax_regime: "new",
    is_pf_applicable: true,
    is_esi_applicable: true,
    is_pt_applicable: true,
    is_tds_applicable: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/v1/payroll/profile", form);
      setSuccess("Payroll profile saved successfully");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Payroll Profile</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Bank details, UAN, PF, ESI and tax settings for employee</p>
      </div>

      {error && <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>}
      {success && <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      <div className="max-w-2xl rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Employee ID *</label>
            <input required value={form.employee_id} onChange={(e) => update("employee_id", e.target.value)} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
          </div>

          <h3 className="pt-2 text-sm font-semibold text-[#374151]">Bank Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="Bank Name" value={form.bank_name} onChange={(e) => update("bank_name", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="Account Number" value={form.bank_account_number} onChange={(e) => update("bank_account_number", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="IFSC Code" value={form.ifsc_code} onChange={(e) => update("ifsc_code", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="Account Holder Name" value={form.account_holder_name} onChange={(e) => update("account_holder_name", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <select value={form.account_type} onChange={(e) => update("account_type", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm">
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
            <select value={form.payment_mode} onChange={(e) => update("payment_mode", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm">
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <h3 className="pt-2 text-sm font-semibold text-[#374151]">Statutory Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="UAN Number" value={form.uan_number} onChange={(e) => update("uan_number", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="PF Number" value={form.pf_number} onChange={(e) => update("pf_number", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="ESI Number" value={form.esi_number} onChange={(e) => update("esi_number", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <input placeholder="PAN Number" value={form.pan_number} onChange={(e) => update("pan_number", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
            <select value={form.tax_regime} onChange={(e) => update("tax_regime", e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm">
              <option value="new">New Tax Regime</option>
              <option value="old">Old Tax Regime</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_pf_applicable} onChange={(e) => update("is_pf_applicable", e.target.checked)} />
              PF Applicable
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_esi_applicable} onChange={(e) => update("is_esi_applicable", e.target.checked)} />
              ESI Applicable
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_pt_applicable} onChange={(e) => update("is_pt_applicable", e.target.checked)} />
              PT Applicable
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_tds_applicable} onChange={(e) => update("is_tds_applicable", e.target.checked)} />
              TDS Applicable
            </label>
          </div>

          <button type="submit" disabled={loading} className="rounded-md bg-[#E42527] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60">
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}