"use client";

import { useEffect, useState } from "react";
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

export default function PayrollListPage() {
  const now = new Date();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [status, setStatus] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    setError("");
    try {
      const params = { year, month, page: 1, page_size: 50 };
      if (status) params.status = status;
      const res = await api.get("/api/v1/get/list/payroll", { params });
      setList(toArray(res?.data ?? res));
    } catch (err) {
      setError(getErrorMessage(err));
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(payrollId) {
    setActionLoading(payrollId);
    try {
      await api.post("/api/v1/approve/payroll", { payroll_ids: [payrollId] });
      await fetchList();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading(null);
    }
  }

  async function handlePay(payrollId) {
    setActionLoading(payrollId);
    try {
      await api.post(`/api/v1/mark_payroll/paid/${payrollId}`);
      await fetchList();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Payroll List</h1>
          <p className="mt-1 text-sm text-[#6b7280]">View, approve and mark payroll as paid</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-24 rounded-md border border-[#d1d5db] px-3 py-2 text-sm"
          placeholder="Year"
        />
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2 text-sm">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(2000, i, 1).toLocaleString("default", { month: "short" })}</option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-[#d1d5db] px-3 py-2 text-sm">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="paid">Paid</option>
        </select>
        <button onClick={fetchList} className="rounded-md bg-[#E42527] px-4 py-2 text-sm text-white hover:bg-[#c91f21]">
          Filter
        </button>
      </div>

      {error && <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">{error}</div>}

      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">Loading...</div>
        ) : list.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#6b7280]">No payroll records found</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                <th className="px-5 py-3 font-medium text-[#6b7280]">Employee</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Period</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Present / LOP</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Earnings</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Deductions</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Net Pay</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Status</th>
                <th className="px-5 py-3 font-medium text-[#6b7280]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {list.map((row) => (
                <tr key={row.payroll_id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-3.5 font-medium">{row.employee_id}</td>
                  <td className="px-5 py-3.5 text-[#6b7280]">
                    {row.pay_period_start} → {row.pay_period_end}
                  </td>
                  <td className="px-5 py-3.5 text-[#6b7280]">
                    {row.days_present} / {row.lop_days}
                  </td>
                  <td className="px-5 py-3.5">₹ {Number(row.total_earnings || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5">₹ {Number(row.total_deductions || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5 font-semibold">₹ {Number(row.net_pay || 0).toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize
                      ${row.status === "paid" ? "bg-green-50 text-green-700" :
                        row.status === "approved" ? "bg-blue-50 text-blue-700" :
                        "bg-yellow-50 text-yellow-700"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      {row.status === "pending" && (
                        <button
                          disabled={actionLoading === row.payroll_id}
                          onClick={() => handleApprove(row.payroll_id)}
                          className="rounded bg-blue-600 px-2.5 py-1 text-xs text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          Approve
                        </button>
                      )}
                      {row.status === "approved" && (
                        <button
                          disabled={actionLoading === row.payroll_id}
                          onClick={() => handlePay(row.payroll_id)}
                          className="rounded bg-green-600 px-2.5 py-1 text-xs text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          Mark Paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}