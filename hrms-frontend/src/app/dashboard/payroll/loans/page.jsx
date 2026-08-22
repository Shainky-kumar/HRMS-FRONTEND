"use client";

import { useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
}

function toArray(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function LoansPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [loans, setLoans] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    loan_type: "personal",
    principal_amount: "",
    interest_rate: "0",
    tenure_months: "",
    emi_amount: "",
    start_month: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function fetchLoans() {
    if (!employeeId) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/v1/get/loan/${employeeId}`);
      setLoans(toArray(res?.data ?? res));
    } catch (err) {
      setError(getErrorMessage(err));
      setLoans([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/v1/create/loan", {
        ...form,
        principal_amount: Number(form.principal_amount),
        interest_rate: Number(form.interest_rate),
        tenure_months: Number(form.tenure_months),
        emi_amount: Number(form.emi_amount),
      });
      setSuccess("Loan created successfully");
      setShowForm(false);
      setForm({
        employee_id: "",
        loan_type: "personal",
        principal_amount: "",
        interest_rate: "0",
        tenure_months: "",
        emi_amount: "",
        start_month: "",
        notes: "",
      });
      if (employeeId) await fetchLoans();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Employee Loans</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Create loans and view EMI schedule</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21]">
          + Create Loan
        </button>
      </div>

      {error && <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>}
      {success && <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      <div className="mb-4 flex gap-3">
        <input
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Employee ID"
          className="rounded-md border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#E42527] focus:outline-none"
        />
        <button onClick={fetchLoans} className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm hover:bg-[#f9fafb]">
          Load Loans
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">Loading...</div>
        ) : loans.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">No loans found</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <th className="px-5 py-3 font-medium text-[#6b7280]">Loan Type</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Principal</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">EMI</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Tenure</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Outstanding</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {loans.map((loan) => (
                <tr key={loan.loan_id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3.5 capitalize">{loan.loan_type}</td>
                  <td className="px-5 py-3.5">₹ {Number(loan.principal_amount || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5">₹ {Number(loan.emi_amount || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5">{loan.tenure_months} months</td>
                  <td className="px-5 py-3.5">₹ {Number(loan.outstanding_amount || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${loan.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {loan.status}
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
              <h2 className="text-lg font-semibold">Create Loan</h2>
              <button onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 p-5">
              <input required placeholder="Employee ID" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <select value={form.loan_type} onChange={(e) => setForm({ ...form, loan_type: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm">
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="vehicle">Vehicle</option>
                <option value="advance">Advance</option>
              </select>
              <input required type="number" placeholder="Principal Amount" value={form.principal_amount} onChange={(e) => setForm({ ...form, principal_amount: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <input type="number" placeholder="Interest Rate %" value={form.interest_rate} onChange={(e) => setForm({ ...form, interest_rate: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <input required type="number" placeholder="Tenure (months)" value={form.tenure_months} onChange={(e) => setForm({ ...form, tenure_months: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <input required type="number" placeholder="EMI Amount" value={form.emi_amount} onChange={(e) => setForm({ ...form, emi_amount: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <input required type="date" placeholder="Start Month" value={form.start_month} onChange={(e) => setForm({ ...form, start_month: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" />
              <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm" rows={2} />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-md border px-4 py-2 text-sm">Cancel</button>
                <button type="submit" disabled={loading} className="rounded-md bg-[#E42527] px-4 py-2 text-sm text-white disabled:opacity-60">
                  {loading ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}