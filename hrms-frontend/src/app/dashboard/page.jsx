"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

function normalizeData(response) {
  if (!response) return [];
  return response.data?.data ?? response.data ?? [];
}

export default function DashboardPage() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setError("");
    setLoading(true);

    try {
      const [deptRes, desigRes, locRes, empRes] = await Promise.all([
        api.get("/api/v1/get/departments"),
        api.get("/api/v1/get/designations"),
        api.get("/api/v1/get/location/master"),
        api.get("/api/v1/get/employees"),
      ]);

      setDepartments(normalizeData(deptRes));
      setDesignations(normalizeData(desigRes));
      setLocations(normalizeData(locRes));
      setEmployees(normalizeData(empRes));
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">HRMS Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Summary cards only — use the sidebar to add departments, designations, locations, and employees.</p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
            Loading summary data...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700 shadow-sm">{error}</div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-slate-500">Departments</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{departments.length}</p>
              <p className="mt-2 text-sm text-slate-500">Total departments created.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-slate-500">Designations</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{designations.length}</p>
              <p className="mt-2 text-sm text-slate-500">Total job roles defined.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-slate-500">Locations</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{locations.length}</p>
              <p className="mt-2 text-sm text-slate-500">Total locations defined.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-slate-500">Employees</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{employees.length}</p>
              <p className="mt-2 text-sm text-slate-500">Total employees registered.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
