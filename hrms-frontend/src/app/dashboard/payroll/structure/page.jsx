"use client";

import { useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return err?.message || "Something went wrong";
}

export default function SalaryStructurePage() {
  const [employeeId, setEmployeeId] = useState("");
  const [structureName, setStructureName] = useState("");
  const [annualCtc, setAnnualCtc] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [components, setComponents] = useState([{ component_id: "", amount: "", is_variable: false }]);
  const [viewData, setViewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function addRow() {
    setComponents([...components, { component_id: "", amount: "", is_variable: false }]);
  }

  function updateRow(index, field, value) {
    const updated = [...components];
    updated[index][field] = value;
    setComponents(updated);
  }

  function removeRow(index) {
    setComponents(components.filter((_, i) => i !== index));
  }

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/api/v1/create/salary/structure", {
        employee_id: employeeId,
        structure_name: structureName,
        annual_ctc: Number(annualCtc),
        effective_from: effectiveFrom,
        effective_to: "9999-12-31",
        components: components.map((c) => ({
          component_id: c.component_id,
          amount: Number(c.amount),
          is_variable: c.is_variable,
        })),
      });
      setSuccess("Salary structure created successfully");
      setStructureName("");
      setAnnualCtc("");
      setComponents([{ component_id: "", amount: "", is_variable: false }]);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleView() {
    if (!employeeId) return;
    setLoading(true);
    setError("");
    setViewData(null);
    try {
      const res = await api.get(`/api/v1/get/structure/${employeeId}`);
      setViewData(res?.data ?? res);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Salary Structure</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Create or view employee salary structure</p>
      </div>

      {error && <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>}
      {success && <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>}

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Employee ID"
          className="rounded-md border border-[#d1d5db] px-3 py-2 text-sm focus:border-[#E42527] focus:outline-none"
        />
        <button onClick={handleView} className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm hover:bg-[#f9fafb]">
          View Structure
        </button>
      </div>

      {viewData && (
        <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-[#1a1a1a]">{viewData?.structure?.structure_name || "Structure"}</h3>
          <p className="mt-1 text-sm text-[#6b7280]">CTC: ₹ {viewData?.structure?.annual_ctc}</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-[#f9fafb]">
                  <th className="px-3 py-2 text-left font-medium text-[#6b7280]">Component ID</th>
                  <th className="px-3 py-2 text-right font-medium text-[#6b7280]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(viewData?.components || []).map((c, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-3 py-2">{c.component_id}</td>
                    <td className="px-3 py-2 text-right">₹ {Number(c.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Create New Structure</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Employee ID *</label>
              <input required value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Structure Name *</label>
              <input required value={structureName} onChange={(e) => setStructureName(e.target.value)} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Annual CTC *</label>
              <input required type="number" value={annualCtc} onChange={(e) => setAnnualCtc(e.target.value)} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Effective From *</label>
              <input required type="date" value={effectiveFrom} onChange={(e) => setEffectiveFrom(e.target.value)} className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Components</label>
              <button type="button" onClick={addRow} className="text-sm text-[#E42527] hover:underline">+ Add Row</button>
            </div>
            {components.map((row, index) => (
              <div key={index} className="mb-2 flex flex-wrap gap-2">
                <input
                  placeholder="Component ID"
                  value={row.component_id}
                  onChange={(e) => updateRow(index, "component_id", e.target.value)}
                  className="flex-1 rounded-md border border-[#d1d5db] px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={row.amount}
                  onChange={(e) => updateRow(index, "amount", e.target.value)}
                  className="w-32 rounded-md border border-[#d1d5db] px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={row.is_variable} onChange={(e) => updateRow(index, "is_variable", e.target.checked)} />
                  Variable
                </label>
                {components.length > 1 && (
                  <button type="button" onClick={() => removeRow(index)} className="text-sm text-red-500">Remove</button>
                )}
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="rounded-md bg-[#E42527] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60">
            {loading ? "Saving..." : "Create Structure"}
          </button>
        </form>
      </div>
    </div>
  );
}