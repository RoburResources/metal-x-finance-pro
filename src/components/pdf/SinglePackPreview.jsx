import React from "react";
import PDFHeader from "./PDFHeader";
import SupplierDetails from "./SupplierDetails";
import ExecutiveSummary from "./ExecutiveSummary";
import JobDetailsSection from "./JobDetailsSection";
import PaymentSummaryTable from "./PaymentSummaryTable";
import EvidenceSection from "./EvidenceSection";
import ConfidentialityBlock from "./ConfidentialityBlock";
import PDFFooter from "./PDFFooter";

export default function SinglePackPreview({ pack }) {
  return (
    <div
      className="bg-white shadow-xl mx-auto font-inter"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm 18mm 16mm 18mm",
        boxSizing: "border-box",
      }}
    >
      <PDFHeader pack={pack} />
      <SupplierDetails />
      <ExecutiveSummary pack={pack} />
      <JobDetailsSection jobs={pack.jobs} alkimosJobs={pack.alkimosJobs} />
      <PaymentSummaryTable pack={pack} />
      <EvidenceSection pack={pack} />
      <ConfidentialityBlock />
      <PDFFooter packId={pack.id} issueDate={pack.issueDate} />
    </div>
  );
}