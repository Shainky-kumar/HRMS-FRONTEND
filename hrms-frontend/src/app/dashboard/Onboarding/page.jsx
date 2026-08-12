"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  Official_Email: "",
  Official_Mobile: "",
  aadhaar_number: "",
  pan_number: "",
  photo: "",
  joining_date: "",
  tentative_joining_date: "",
  permanent_address: {
    address_line: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  },
  current_address: {
    address_line: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
  },
  experience: "",
  source_of_hire: "",
  title: "",
  Skill_set: "",
  highest_qualification: "",
  additional_info: "",
  current_salary: "",
  department: "",
  education_details: "",
  experience_details: "",
  company_id: "",
  uploaded_documents: [],
};

const formatApiError = (err) => {
  const detail = err?.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail
      .map((e) => {
        const field = Array.isArray(e.loc) ? e.loc.slice(1).join(".") : "";
        return field ? `${field}: ${e.msg}` : e.msg;
      })
      .join(" • ");
  }

  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") return JSON.stringify(detail);

  return err?.message || "Something went wrong";
};

export default function CandidatesPage() {
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
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/api/v1/onboarding/employees", {
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

  const handleAddressChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const openAdd = () => {
    setEditId(null);
    setFormData(initialForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id || item._id || item.onboarding_id);
    setFormData({
      ...initialForm,
      ...item,
      permanent_address: item.permanent_address || initialForm.permanent_address,
      current_address: item.current_address || initialForm.current_address,
      Skill_set: Array.isArray(item.Skill_set)
        ? item.Skill_set.join(", ")
        : item.Skill_set || "",
      joining_date: item.joining_date || "",
      tentative_joining_date: item.tentative_joining_date || "",
    });
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...formData,
        experience: formData.experience ? Number(formData.experience) : null,
        current_salary: formData.current_salary
          ? Number(formData.current_salary)
          : null,
        Skill_set: formData.Skill_set
          ? formData.Skill_set.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        joining_date: formData.joining_date || null,
        tentative_joining_date: formData.tentative_joining_date || null,
        permanent_address: formData.permanent_address,
        current_address: formData.current_address,
      };

      if (editId) {
        await api.put(`/api/v1/onboarding/employees/${editId}`, payload);
      } else {
        await api.post("/api/v1/onboarding/employees", payload);
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
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f8fafc] p-5 md:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Candidates</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage employee onboarding records
          </p>
        </div>

        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] focus:outline-none focus:ring-2 focus:ring-[#E42527]/30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Candidates
        </button>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, mobile..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#E42527] focus:bg-white focus:ring-1 focus:ring-[#E42527]/30"
            />
          </div>

          <div className="text-sm text-slate-500">
            {total} employee{total !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <svg className="h-5 w-5 animate-spin text-[#E42527]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading Candidates...
              </div>
            </div>
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-700">No Candidates found</p>
              <p className="mt-1 text-sm text-slate-500">
                {search ? "Try a different search term" : "Get started by adding your first employee"}
              </p>
              {!search && (
                <button
                  onClick={openAdd}
                  className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
                >
                  + Add Candidate
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-3 font-medium text-slate-500">#</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Name</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Email</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Mobile</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Department</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Joining Date</th>
                  <th className="px-5 py-3 font-medium text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map((item, index) => (
                  <tr
                    key={item.id || item._id || index}
                    className="group transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5 text-slate-500">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">
                      {item.first_name} {item.last_name}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.email || item.Official_Email || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.mobile || item.Official_Mobile || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.department || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {item.joining_date || item.tentative_joining_date || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 opacity-0 transition hover:bg-slate-100 group-hover:opacity-100"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 pt-10 backdrop-blur-[2px]">
          <div className="mb-10 w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="text-base font-semibold text-slate-800">
                {editId ? "Edit Employee" : "Add Employee"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setError("");
                  setFormData(initialForm);
                  setEditId(null);
                }}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] space-y-6 overflow-y-auto px-5 py-5">
                {/* Basic Info */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        First Name <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        value={formData.first_name}
                        onChange={(e) => handleChange("first_name", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Last Name <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        value={formData.last_name}
                        onChange={(e) => handleChange("last_name", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Personal Email <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Personal Mobile <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        value={formData.mobile}
                        onChange={(e) => handleChange("mobile", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Official Email <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.Official_Email}
                        onChange={(e) => handleChange("Official_Email", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Official Mobile <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        value={formData.Official_Mobile}
                        onChange={(e) => handleChange("Official_Mobile", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Identity */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Identity & Documents</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Aadhaar Number</label>
                      <input
                        value={formData.aadhaar_number}
                        onChange={(e) => handleChange("aadhaar_number", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">PAN Number</label>
                      <input
                        value={formData.pan_number}
                        onChange={(e) => handleChange("pan_number", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Job Info */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Job Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Department</label>
                      <input
                        value={formData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Title / Designation</label>
                      <input
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Joining Date</label>
                      <input
                        type="date"
                        value={formData.joining_date}
                        onChange={(e) => handleChange("joining_date", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Tentative Joining Date</label>
                      <input
                        type="date"
                        value={formData.tentative_joining_date}
                        onChange={(e) => handleChange("tentative_joining_date", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Experience (Years)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Current Salary</label>
                      <input
                        type="number"
                        value={formData.current_salary}
                        onChange={(e) => handleChange("current_salary", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Source of Hire</label>
                      <input
                        value={formData.source_of_hire}
                        onChange={(e) => handleChange("source_of_hire", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Company ID <span className="text-[#E42527]">*</span>
                      </label>
                      <input
                        required
                        value={formData.company_id}
                        onChange={(e) => handleChange("company_id", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Skills & Education */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Skills & Education</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Skill Set <span className="font-normal text-slate-400">(comma separated)</span>
                      </label>
                      <input
                        value={formData.Skill_set}
                        onChange={(e) => handleChange("Skill_set", e.target.value)}
                        placeholder="React, Node.js, Python"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Highest Qualification</label>
                      <input
                        value={formData.highest_qualification}
                        onChange={(e) => handleChange("highest_qualification", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Permanent Address */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Permanent Address</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Address Line</label>
                      <input
                        value={formData.permanent_address.address_line}
                        onChange={(e) => handleAddressChange("permanent_address", "address_line", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
                      <input
                        value={formData.permanent_address.country}
                        onChange={(e) => handleAddressChange("permanent_address", "country", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
                      <input
                        value={formData.permanent_address.state}
                        onChange={(e) => handleAddressChange("permanent_address", "state", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
                      <input
                        value={formData.permanent_address.city}
                        onChange={(e) => handleAddressChange("permanent_address", "city", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Pincode</label>
                      <input
                        value={formData.permanent_address.pincode}
                        onChange={(e) => handleAddressChange("permanent_address", "pincode", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Current Address */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Current Address</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Address Line</label>
                      <input
                        value={formData.current_address.address_line}
                        onChange={(e) => handleAddressChange("current_address", "address_line", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
                      <input
                        value={formData.current_address.country}
                        onChange={(e) => handleAddressChange("current_address", "country", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
                      <input
                        value={formData.current_address.state}
                        onChange={(e) => handleAddressChange("current_address", "state", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">City</label>
                      <input
                        value={formData.current_address.city}
                        onChange={(e) => handleAddressChange("current_address", "city", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Pincode</label>
                      <input
                        value={formData.current_address.pincode}
                        onChange={(e) => handleAddressChange("current_address", "pincode", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                      />
                    </div>
                  </div>
                </section>

                {/* Additional */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Additional Info</h3>
                  <textarea
                    value={formData.additional_info}
                    onChange={(e) => handleChange("additional_info", e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#E42527] focus:ring-1 focus:ring-[#E42527]/30"
                    placeholder="Any extra notes..."
                  />
                </section>

                {error && (
                  <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
                    {error}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                    setFormData(initialForm);
                    setEditId(null);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#E42527] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21] disabled:cursor-not-allowed disabled:opacity-60"
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