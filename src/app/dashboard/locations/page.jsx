"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

function getErrorMessage(err) {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((i) => i?.msg || "Error").join(", ");
  }
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") {
    return detail.msg || detail.message || "Request failed";
  }
  return err?.message || "Something went wrong";
}

function toArray(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;

  const candidates = [];
  if (payload && typeof payload === "object") {
    candidates.push(payload.data, payload.locations, payload.results, payload.items, payload.result, payload.records, payload.list);
    if (payload.data && typeof payload.data === "object") {
      candidates.push(payload.data.locations, payload.data.results, payload.data.items, payload.data.result, payload.data.records, payload.data.list);
    }
    if (payload.details && typeof payload.details === "object") {
      candidates.push(payload.details, payload.details.data, payload.details.locations, payload.details.results);
    }
  }

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  if (payload && typeof payload === "object") {
    const values = Object.values(payload);
    for (const value of values) {
      if (Array.isArray(value)) return value;
      if (value && typeof value === "object") {
        const nested = toArray(value);
        if (nested.length) return nested;
      }
    }
  }

  return [];
}

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationPinCode, setLocationPinCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/api/v1/get/location/master");
      const payload = res?.data ?? res;
      console.log("LOCATIONS RESPONSE:", payload);
      setLocations(toArray(payload));
    } catch (err) {
      console.error("Locations fetch error:", err?.response || err);
      setError(getErrorMessage(err));
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }

  async function addLocation(e) {
    e.preventDefault();
    if (!locationName.trim()) return;

    setError("");
    setSubmitting(true);
    try {
      await api.post("/api/v1/create/location/master", {
        location_name: locationName.trim(),
        location_description: locationDescription.trim() || null,
        location_pin_code: locationPinCode.trim() || null,
      });

      setLocationName("");
      setLocationDescription("");
      setLocationPinCode("");
      setShowAddForm(false);
      await fetchLocations();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  function closeModal() {
    setShowAddForm(false);
    setError("");
    setLocationName("");
    setLocationDescription("");
    setLocationPinCode("");
  }

  const list = Array.isArray(locations) ? locations : [];
  const filteredLocations = list.filter((loc) => {
    const name = (loc?.location_name || loc?.name || loc?.title || "").toLowerCase();
    return name.includes((search || "").toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f5f6f8] p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Locations</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Manage location master data for your organization
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowAddForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c91f21]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Location
        </button>
      </div>

      {error && !showAddForm && (
        <div className="mb-4 rounded-md bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
          {error}
        </div>
      )}

      {/* Card */}
      <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#e5e7eb] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locations..."
              className="w-full rounded-md border border-[#d1d5db] bg-white py-2 pl-9 pr-3 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
            />
          </div>
          <div className="text-sm text-[#6b7280]">
            {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-[#6b7280]">Loading locations...</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-[#374151]">No locations found</p>
              <p className="mt-1 text-sm text-[#6b7280]">
                {search ? "Try a different search term" : "Add your first location"}
              </p>
              {!search && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-sm font-medium text-[#E42527] hover:underline"
                >
                  + Add Location
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb] bg-[#f9fafb]">
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Location Name</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Description</th>
                  <th className="px-5 py-3 font-medium text-[#6b7280]">Pin Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6]">
                {filteredLocations.map((location, index) => (
                  <tr
                    key={location?.location_id || location?.id || index}
                    className="hover:bg-[#fafafa]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fef2f2] text-xs font-semibold text-[#E42527]">
                          {(location?.location_name || location?.name || "L")[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-[#1a1a1a]">
                          {location?.location_name || location?.name || `Location ${index + 1}`}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-[#6b7280]">
                      {location?.location_description || location?.description || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-[#6b7280]">
                      {location?.location_pin_code || location?.pin_code || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Location</h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded p-1 text-[#9ca3af] hover:bg-[#f3f4f6]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={addLocation} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Location Name <span className="text-[#E42527]">*</span>
                  </label>
                  <input
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                    autoFocus
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                    placeholder="e.g. Head Office"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Description
                  </label>
                  <textarea
                    value={locationDescription}
                    onChange={(e) => setLocationDescription(e.target.value)}
                    rows={2}
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                    placeholder="Optional description"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                    Pin Code
                  </label>
                  <input
                    value={locationPinCode}
                    onChange={(e) => setLocationPinCode(e.target.value)}
                    className="w-full rounded-md border border-[#d1d5db] px-3 py-2.5 text-sm focus:border-[#E42527] focus:outline-none focus:ring-1 focus:ring-[#E42527]"
                    placeholder="e.g. 110001"
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-[#fef2f2] px-3 py-2.5 text-sm text-[#b91c1c]">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !locationName.trim()}
                  className="rounded-md bg-[#E42527] px-4 py-2 text-sm font-medium text-white hover:bg-[#c91f21] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}