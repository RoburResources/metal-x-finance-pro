import React, { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

function roundTo2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function validateJob(job) {
  const issues = [];

  if (job._type !== "weighed") return issues;

  // 1. Gross value = payableTonnes × rate (only for fixed-rate jobs)
  if (job.rate) {
    const expectedGross = roundTo2(job.payableTonnes * job.rate);
    if (Math.abs(expectedGross - job.grossValue) > 0.02) {
      issues.push({
        field: "Gross Value",
        expected: expectedGross,
        actual: job.grossValue,
        formula: `${job.payableTonnes.toFixed(3)} t × $${job.rate}/t = $${expectedGross.toFixed(2)}`,
      });
    }
  }

  // 2. Net payable = grossValue − transportDeduction
  const expectedNet = roundTo2(job.grossValue - job.transportDeduction);
  if (Math.abs(expectedNet - job.netPayable) > 0.02) {
    issues.push({
      field: "Net Payable",
      expected: expectedNet,
      actual: job.netPayable,
      formula: `$${job.grossValue.toFixed(2)} − $${job.transportDeduction.toFixed(2)} = $${expectedNet.toFixed(2)}`,
    });
  }

  // 3. Payable tonnes = net − deduction
  const expectedPayable = roundTo2(job.net - job.deduction);
  if (Math.abs(expectedPayable - job.payableTonnes) > 0.001) {
    issues.push({
      field: "Payable Tonnes",
      expected: expectedPayable,
      actual: job.payableTonnes,
      formula: `${job.net.toFixed(3)} t net − ${job.deduction.toFixed(3)} t deduction = ${expectedPayable.toFixed(3)} t`,
    });
  }

  // 4. Net weight = gross − tare
  const expectedNetWeight = roundTo2(job.gross - job.tare);
  if (Math.abs(expectedNetWeight - job.net) > 0.001) {
    issues.push({
      field: "Net Weight",
      expected: expectedNetWeight,
      actual: job.net,
      formula: `${job.gross.toFixed(3)} t gross − ${job.tare.toFixed(3)} t tare = ${expectedNetWeight.toFixed(3)} t`,
    });
  }

  return issues;
}

const fmt = (v) =>
  typeof v === "number" && v > 10
    ? `$${v.toLocaleString("en-AU", { minimumFractionDigits: 2 })}`
    : v?.toFixed ? v.toFixed(3) + " t" : String(v);

export default function ValidationBanner({ pack }) {
  const [expanded, setExpanded] = React.useState(true);

  const allJobs = useMemo(() => {
    if (!pack) return [];
    return [
      ...pack.jobs.map((j) => ({ ...j, _type: "weighed" })),
      ...pack.alkimosJobs.map((j) => ({ ...j, _type: "alkimos" })),
    ];
  }, [pack]);

  const jobIssues = useMemo(() => {
    return allJobs
      .map((job) => ({ job, issues: validateJob(job) }))
      .filter(({ issues }) => issues.length > 0);
  }, [allJobs]);

  // Also validate pack-level summary totals
  const summaryIssues = useMemo(() => {
    if (!pack) return [];
    const s = pack.summary;
    const issues = [];

    // calculated net = material value − transport − alkimos
    const expectedNet = roundTo2(s.totalMaterialValue - s.totalTransportDeductions - s.alkimosServiceCharges);
    if (Math.abs(expectedNet - s.calculatedNetPayable) > 0.02) {
      issues.push({
        field: "Calculated Net Payable",
        expected: expectedNet,
        actual: s.calculatedNetPayable,
        formula: `$${s.totalMaterialValue.toFixed(2)} − $${s.totalTransportDeductions.toFixed(2)} − $${s.alkimosServiceCharges.toFixed(2)} = $${expectedNet.toFixed(2)}`,
      });
    }

    return issues;
  }, [pack]);

  const totalIssues = jobIssues.reduce((acc, { issues }) => acc + issues.length, 0) + summaryIssues.length;

  if (totalIssues === 0) {
    return (
      <div className="flex items-center gap-2 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl px-4 py-3 print:hidden">
        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
        <p className="text-[11px] font-semibold text-[#166534]">
          All calculations verified — no discrepancies found.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[#FCA5A5] bg-[#FFF5F5] rounded-xl overflow-hidden print:hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
          <p className="text-[11px] font-bold text-[#DC2626]">
            {totalIssues} Calculation Discrepanc{totalIssues === 1 ? "y" : "ies"} Detected
          </p>
          <span className="text-[9px] text-[#9CA3AF] ml-1">— click to {expanded ? "collapse" : "expand"}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[#DC2626]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#DC2626]" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-[#FCA5A5]/50">
          {jobIssues.map(({ job, issues }) => (
            <div key={job.jobRef} className="mt-3">
              <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.08em] mb-2">
                {job.jobRef}
              </p>
              {issues.map((issue, i) => (
                <IssueRow key={i} issue={issue} />
              ))}
            </div>
          ))}

          {summaryIssues.length > 0 && (
            <div className="mt-3">
              <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.08em] mb-2">
                Pack Summary
              </p>
              {summaryIssues.map((issue, i) => (
                <IssueRow key={i} issue={issue} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function IssueRow({ issue }) {
  return (
    <div className="bg-white border border-[#FCA5A5]/60 rounded-lg px-3 py-2.5 mb-1.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold text-[#991B1B]">{issue.field} mismatch</p>
          <p className="text-[9px] text-[#6B7280] mt-0.5 font-mono">{issue.formula}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] text-[#6B7280]">Source docket</p>
          <p className="text-[10px] font-bold text-[#DC2626]">{fmt(issue.actual)}</p>
        </div>
      </div>
    </div>
  );
}