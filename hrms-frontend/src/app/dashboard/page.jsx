"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Briefcase,
  MapPin,
  Users,
  ClipboardCheck,
  CalendarDays,
  Clock,
  Workflow,
  AlertTriangle,
  CheckCircle2,
  UserCheck2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

// ---------------------- Helpers ----------------------

function normalizeData(response) {
  if (!response) return [];
  return response.data?.data ?? response.data ?? [];
}

function normalizeTotal(response, fallbackList) {
  return (
    response?.data?.total ??
    (Array.isArray(fallbackList) ? fallbackList.length : 0)
  );
}

// ---------------------- Dummy Data ----------------------

const DUMMY_DATA = {
  departments: [
    { department_id: "D001", name: "Engineering" },
    { department_id: "D002", name: "Human Resources" },
    { department_id: "D003", name: "Sales" },
    { department_id: "D004", name: "Finance" },
    { department_id: "D005", name: "Marketing" },
    { department_id: "D006", name: "Operations" },
  ],
  designations: [
    { designation_id: "DS01", title: "Software Engineer" },
    { designation_id: "DS02", title: "Senior Software Engineer" },
    { designation_id: "DS03", title: "HR Executive" },
    { designation_id: "DS04", title: "Sales Manager" },
    { designation_id: "DS05", title: "Financial Analyst" },
    { designation_id: "DS06", title: "Marketing Lead" },
    { designation_id: "DS07", title: "Operations Manager" },
  ],
  locations: [
    { location_id: "L001", name: "Gurugram HQ" },
    { location_id: "L002", name: "Bengaluru Office" },
    { location_id: "L003", name: "Mumbai Office" },
    { location_id: "L004", name: "Remote" },
  ],
  employees: [
    { employee_id: "E001", first_name: "Rahul", last_name: "Sharma", department_name: "Engineering" },
    { employee_id: "E002", first_name: "Priya", last_name: "Nair", department_name: "Engineering" },
    { employee_id: "E003", first_name: "Amit", last_name: "Verma", department_name: "Engineering" },
    { employee_id: "E004", first_name: "Sneha", last_name: "Iyer", department_name: "Human Resources" },
    { employee_id: "E005", first_name: "Karan", last_name: "Mehta", department_name: "Human Resources" },
    { employee_id: "E006", first_name: "Divya", last_name: "Rao", department_name: "Sales" },
    { employee_id: "E007", first_name: "Vikram", last_name: "Singh", department_name: "Sales" },
    { employee_id: "E008", first_name: "Anjali", last_name: "Gupta", department_name: "Sales" },
    { employee_id: "E009", first_name: "Rohit", last_name: "Kumar", department_name: "Finance" },
    { employee_id: "E010", first_name: "Neha", last_name: "Joshi", department_name: "Finance" },
    { employee_id: "E011", first_name: "Arjun", last_name: "Reddy", department_name: "Marketing" },
    { employee_id: "E012", first_name: "Pooja", last_name: "Desai", department_name: "Marketing" },
    { employee_id: "E013", first_name: "Sanjay", last_name: "Pillai", department_name: "Operations" },
    { employee_id: "E014", first_name: "Meera", last_name: "Krishnan", department_name: "Operations" },
  ],
  holidays: [
    { holiday_id: "H001", holiday_name: "Independence Day", holiday_message: "National holiday", date: "2026-08-15" },
    { holiday_id: "H002", holiday_name: "Ganesh Chaturthi", holiday_message: "Regional holiday", date: "2026-09-14" },
    { holiday_id: "H003", holiday_name: "Gandhi Jayanti", holiday_message: "National holiday", date: "2026-10-02" },
    { holiday_id: "H004", holiday_name: "Diwali", holiday_message: "Festival of lights — office closed", date: "2026-11-08" },
    { holiday_id: "H005", holiday_name: "Christmas", holiday_message: "Public holiday", date: "2026-12-25" },
  ],
  shifts: [
    { shift_id: "S001", Shift_name: "General Shift", shift_timing: "09:00 - 18:00" },
    { shift_id: "S002", Shift_name: "Morning Shift", shift_timing: "06:00 - 15:00" },
    { shift_id: "S003", Shift_name: "Evening Shift", shift_timing: "14:00 - 23:00" },
    { shift_id: "S004", Shift_name: "Night Shift", shift_timing: "22:00 - 07:00" },
  ],
  acknowledgements: [
    { asset_acknowledgement_id: "A001", acknowledged_by_name: "Rahul Sharma", acknowledged_by_id: "E001", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-01T10:00:00Z" },
    { asset_acknowledgement_id: "A002", acknowledged_by_name: "Priya Nair", acknowledged_by_id: "E002", status: "acknowledged", acknowledgement_type: "initial", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-06-15T09:30:00Z" },
    { asset_acknowledgement_id: "A003", acknowledged_by_name: "Amit Verma", acknowledged_by_id: "E003", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-05T11:15:00Z" },
    { asset_acknowledgement_id: "A004", acknowledged_by_name: "Divya Rao", acknowledged_by_id: "E006", status: "acknowledged", acknowledgement_type: "transfer", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-07-20T14:00:00Z" },
    { asset_acknowledgement_id: "A005", acknowledged_by_name: "Vikram Singh", acknowledged_by_id: "E007", status: "rejected", acknowledgement_type: "return", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-05-10T16:45:00Z" },
    { asset_acknowledgement_id: "A006", acknowledged_by_name: "Rohit Kumar", acknowledged_by_id: "E009", status: "pending", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-08-10T08:20:00Z" },
    { asset_acknowledgement_id: "A007", acknowledged_by_name: "Neha Joshi", acknowledged_by_id: "E010", status: "cancelled", acknowledgement_type: "initial", financial_year: "2025-2026", quarter: "Q1", created_at: "2026-04-18T12:00:00Z" },
    { asset_acknowledgement_id: "A008", acknowledged_by_name: "Arjun Reddy", acknowledged_by_id: "E011", status: "acknowledged", acknowledgement_type: "annual", financial_year: "2025-2026", quarter: "Q2", created_at: "2026-07-28T10:30:00Z" },
  ],
  workflowRequests: [
    { workflow_request_id: "W001", transaction_number: "TXN-2026-0451", requested_by_name: "Sneha Iyer", status: "pending", request_type: "Leave" },
    { workflow_request_id: "W002", transaction_number: "TXN-2026-0452", requested_by_name: "Karan Mehta", status: "approved", request_type: "Attendance Correction" },
    { workflow_request_id: "W003", transaction_number: "TXN-2026-0453", requested_by_name: "Anjali Gupta", status: "pending", request_type: "Shift Change" },
    { workflow_request_id: "W004", transaction_number: "TXN-2026-0454", requested_by_name: "Sanjay Pillai", status: "rejected", request_type: "Leave" },
    { workflow_request_id: "W005", transaction_number: "TXN-2026-0455", requested_by_name: "Meera Krishnan", status: "approved", request_type: "Onboarding" },
  ],
};

// ---------------------- Colors & Labels ----------------------

const STATUS_COLORS = {
  pending: "#f59e0b",
  acknowledged: "#10b981",
  rejected: "#E42527",
  cancelled: "#94a3b8",
};

const STATUS_LABELS = {
  pending: "Pending",
  acknowledged: "Acknowledged",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

// ---------------------- UI Primitives ----------------------

function KpiCard({
  icon: Icon,
  label,
  value,
  subtext,
  tone = "default",
}) {
  const toneClasses =
    tone === "success"
      ? "text-emerald-600"
      : tone === "warning"
      ? "text-amber-600"
      : tone === "danger"
      ? "text-red-600"
      : "text-slate-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
        <div className="rounded-lg bg-slate-50 p-2">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
      </div>
      <p className={`mt-3 text-3xl font-semibold ${toneClasses}`}>{value}</p>
      {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  action,
  children,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="py-8 text-center text-xs text-slate-400">{label}</div>
  );
}

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

// ---------------------- Dashboard Page ----------------------

export default function HrmsDashboardPage() {
  // Initialize from dummy data only
  const departments = normalizeData({ data: DUMMY_DATA.departments });
  const designations = normalizeData({ data: DUMMY_DATA.designations });
  const locations = normalizeData({ data: DUMMY_DATA.locations });
  const employees = normalizeData({ data: DUMMY_DATA.employees });
  const holidays = normalizeData({ data: DUMMY_DATA.holidays });
  const shifts = normalizeData({ data: DUMMY_DATA.shifts });

  const ackList = normalizeData({ data: DUMMY_DATA.acknowledgements });
  const acknowledgements = ackList;
  const acknowledgementsTotal = normalizeTotal(
    { data: DUMMY_DATA.acknowledgements },
    ackList
  );

  const workflowList = normalizeData({ data: DUMMY_DATA.workflowRequests });
  const workflowRequests = workflowList;
  const workflowTotal = normalizeTotal(
    { data: DUMMY_DATA.workflowRequests },
    workflowList
  );

  // Derived: department headcount
  const departmentChartData = useMemo(() => {
    const counts = {};
    employees.forEach((emp) => {
      const key = emp.department_name || emp.department || "Unassigned";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [employees]);

  // Derived: acknowledgement status (for donut)
  const acknowledgementChartData = useMemo(() => {
    const counts = { pending: 0, acknowledged: 0, rejected: 0, cancelled: 0 };
    acknowledgements.forEach((ack) => {
      const key = (ack.status || "").toLowerCase();
      if (key in counts) counts[key] += 1;
    });
    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([key, value]) => ({
        key,
        name: STATUS_LABELS[key],
        value,
        color: STATUS_COLORS[key],
      }));
  }, [acknowledgements]);

  // Derived: pending acknowledgements (action list)
  const pendingAcknowledgements = useMemo(
    () =>
      acknowledgements
        .filter((a) => (a.status || "").toLowerCase() === "pending")
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .slice(0, 6),
    [acknowledgements]
  );

  // Derived: upcoming holidays
  const upcomingHolidays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return holidays
      .filter((h) => h.date && new Date(h.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, [holidays]);

  // Derived: pending workflow requests
  const pendingWorkflows = useMemo(
    () =>
      workflowRequests
        .filter((w) => (w.status || "").toLowerCase() === "pending")
        .slice(0, 6),
    [workflowRequests]
  );

  // Simple attendance simulation (dummy trend for last 7 days)
  const attendanceTrendData = useMemo(() => {
    const days = 7;
    const base = employees.length;
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-IN", { weekday: "short" });
      // Fake variation: 85–100% present
      const present = Math.max(
        0,
        Math.min(base, Math.floor(base * (0.85 + Math.random() * 0.15)))
      );
      const absent = base - present;
      data.push({ day: label, present, absent });
    }
    return data;
  }, [employees.length]);

  const pendingAckCount =
    acknowledgementChartData.find((d) => d.key === "pending")?.value ?? 0;
  const pendingWorkflowCount = pendingWorkflows.length;

  return (
    <div className="min-h-screen bg-slate-50 py-6">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">
            HRMS Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Overview of headcount, attendance, acknowledgements, and workflow activity.
          </p>
        </div>

        {/* Row 1: KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard
            icon={Users}
            label="Total Employees"
            value={employees.length}
            subtext="Active employees"
          />
          <KpiCard
            icon={Building2}
            label="Departments"
            value={departments.length}
            subtext="Defined departments"
          />
          <KpiCard
            icon={Briefcase}
            label="Designations"
            value={designations.length}
            subtext="Job roles"
          />
          <KpiCard
            icon={MapPin}
            label="Locations"
            value={locations.length}
            subtext="Office locations"
          />
          <KpiCard
            icon={ClipboardCheck}
            label="Acknowledgements"
            value={acknowledgementsTotal}
            subtext={`${pendingAckCount} pending`}
            tone={pendingAckCount > 0 ? "warning" : "success"}
          />
          <KpiCard
            icon={Workflow}
            label="Workflow Requests"
            value={workflowTotal}
            subtext={`${pendingWorkflowCount} pending`}
            tone={pendingWorkflowCount > 0 ? "warning" : "success"}
          />
        </div>

        {/* Row 2: Charts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionCard
              title="Headcount by Department"
              subtitle="Distribution of employees across departments"
            >
              {departmentChartData.length === 0 ? (
                <EmptyState label="No employee data yet" />
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: "#64748b" }}
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#64748b" }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          border: "1px solid #e2e8f0",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </SectionCard>
          </div>

          <SectionCard
            title="Acknowledgement Status"
            subtitle="Breakdown of all acknowledgement requests"
          >
            {acknowledgementChartData.length === 0 ? (
              <EmptyState label="No acknowledgement data yet" />
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={acknowledgementChartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {acknowledgementChartData.map((entry) => (
                        <Cell key={entry.key} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={32}
                      formatter={(value) => (
                        <span className="text-xs text-slate-600">{value}</span>
                      )}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Row 3: Attendance trend + quick stats */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionCard
              title="Attendance Trend (Last 7 Days)"
              subtitle="Present vs absent employees"
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={32}
                      formatter={(value) => (
                        <span className="text-xs text-slate-600">{value}</span>
                      )}
                    />
                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      name="Present"
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                      name="Absent"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>

          <SectionCard
            title="At a Glance"
            subtitle="Quick organizational stats"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-slate-700">
                    Avg. attendance (7 days)
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                  ~{Math.round(
                    attendanceTrendData.reduce((acc, d) => acc + d.present, 0) /
                      attendanceTrendData.length
                  )}{" "}
                  / {employees.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-slate-700">
                    Pending acknowledgements
                  </span>
                </div>
                <span className="text-sm font-medium text-amber-700">
                  {pendingAckCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-slate-700">
                    Pending workflow requests
                  </span>
                </div>
                <span className="text-sm font-medium text-indigo-700">
                  {pendingWorkflowCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-700">
                    Upcoming holidays (next 30 days)
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {upcomingHolidays.length}
                </span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Row 4: Action lists */}
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Pending Acknowledgements"
            subtitle="Requests waiting on employee action"
            action={
              pendingAcknowledgements.length > 0 && (
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  View all
                </button>
              )
            }
          >
            {pendingAcknowledgements.length === 0 ? (
              <EmptyState label="Nothing pending — all caught up" />
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingAcknowledgements.map((ack) => (
                  <div
                    key={ack.asset_acknowledgement_id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {ack.acknowledged_by_name || ack.acknowledged_by_id}
                      </p>
                      <p className="text-xs text-slate-500">
                        {ack.acknowledgement_type} •{" "}
                        {ack.financial_year || "—"}
                        {ack.quarter ? ` ${ack.quarter}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Pending
                      </span>
                      <button className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700">
                        Remind
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Pending Workflow Requests"
            subtitle="Approvals waiting in the pipeline"
            action={
              pendingWorkflows.length > 0 && (
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  View all
                </button>
              )
            }
          >
            {pendingWorkflows.length === 0 ? (
              <EmptyState label="No pending workflow requests" />
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingWorkflows.map((wf, i) => (
                  <div
                    key={wf.workflow_request_id || i}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {wf.transaction_number}
                      </p>
                      <p className="text-xs text-slate-500">
                        {wf.request_type || "Request"} •{" "}
                        {wf.requested_by_name || wf.requested_by_id || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Pending
                      </span>
                      <button className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700">
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Row 5: Holidays + Shifts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Upcoming Holidays"
            subtitle="Next holidays on the calendar"
            action={
              upcomingHolidays.length > 0 && (
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                  View calendar
                </button>
              )
            }
          >
            {upcomingHolidays.length === 0 ? (
              <EmptyState label="No upcoming holidays scheduled" />
            ) : (
              <div className="divide-y divide-slate-100">
                {upcomingHolidays.map((holiday, i) => (
                  <div
                    key={holiday.holiday_id || i}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {holiday.holiday_name}
                      </p>
                      {holiday.holiday_message && (
                        <p className="text-xs text-slate-500 max-w-[220px] truncate">
                          {holiday.holiday_message}
                        </p>
                      )}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {formatDate(holiday.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Active Shifts"
            subtitle="Shift configurations currently in use"
            action={
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {shifts.length} total
              </span>
            }
          >
            {shifts.length === 0 ? (
              <EmptyState label="No shifts configured yet" />
            ) : (
              <div className="divide-y divide-slate-100">
                {shifts.slice(0, 6).map((shift, i) => (
                  <div
                    key={shift.shift_id || i}
                    className="flex items-center justify-between py-3"
                  >
                    <p className="text-sm font-medium text-slate-800">
                      {shift.Shift_name}
                    </p>
                    <span className="text-xs text-slate-500">
                      {shift.shift_timing || "No timing linked"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}