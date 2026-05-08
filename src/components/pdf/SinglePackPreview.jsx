import React from "react";
import PDFHeader from "./PDFHeader";
import SupplierDetails from "./SupplierDetails";
import ExecutiveSummary from "./ExecutiveSummary";
import JobDetailsSection from "./JobDetailsSection";
import PaymentSummaryTable from "./PaymentSummaryTable";
import ConfidentialityBlock from "./ConfidentialityBlock";
import PDFFooter from "./PDFFooter";

export default function SinglePackPreview({ pack, settings = {} }) {
  const {
    showExecutiveSummary = true,
    showJobDetails = true,
    showPaymentSummary = true,
    showConfidentialityBlock = true,
    customHeaderEnabled = false,
    customHeaderText = "",
    customFooterEnabled = false,
    customFooterText = "",
  } = settings;

  return (
    <div
      className="bg-white shadow-xl mx-auto font-inter overflow-hidden"
      style={{ width: "210mm", minHeight: "297mm", boxSizing: "border-box" }}
    >
      {/* Custom header banner */}
      {customHeaderEnabled && customHeaderText && (
        <div className="bg-[#FEF3C7] border-b-2 border-[#F59E0B] px-10 py-3">
          <p className="text-[10px] font-semibold text-[#92400E] text-center">{customHeaderText}</p>
        </div>
      )}

      <PDFHeader pack={pack} />
      <SupplierDetails />
      {showExecutiveSummary && <ExecutiveSummary pack={pack} />}
      {showJobDetails && (
        <JobDetailsSection
          jobs={pack.jobs}
          alkimosJobs={pack.alkimosJobs}
          settings={settings}
        />
      )}
      {showPaymentSummary && <PaymentSummaryTable pack={pack} settings={settings} />}
      {showConfidentialityBlock && <ConfidentialityBlock />}

      {/* Custom footer note */}
      {customFooterEnabled && customFooterText && (
        <div className="px-10 pb-4">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-5 py-3">
            <p className="text-[10px] text-[#6B7280] text-center">{customFooterText}</p>
          </div>
        </div>
      )}

      <PDFFooter packId={pack.id} issueDate={pack.issueDate} />
    </div>
  );
}