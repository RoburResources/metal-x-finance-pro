import React, { useState } from "react";
import { paymentPacks } from "@/lib/paymentPackData";
import PackSelector from "@/components/pdf/PackSelector";
import SinglePackPreview from "@/components/pdf/SinglePackPreview";
import GrandSummaryPreview from "@/components/pdf/GrandSummaryPreview";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";

export default function PaymentPackPreview() {
  const [selectedPackId, setSelectedPackId] = useState("00103");
  const selectedPack = paymentPacks.find((p) => p.id === selectedPackId);

  const handlePrint = () => {
    window.print();
  };

  // Download PDF: use the browser's built-in print-to-PDF dialog,
  // which correctly handles page breaks via CSS (page-break-inside: avoid).
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      {/* Print styles injected into <head> via a style tag */}
      <style>{`
        @media print {
          /* Hide everything except the preview */
          body > * { display: none !important; }
          #print-root { display: block !important; }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          /* Each job card must not split across pages */
          .pdf-job-card {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Each top-level section should avoid splitting */
          .pdf-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Force a page break before the payment summary */
          .pdf-page-break-before {
            page-break-before: always;
            break-before: always;
          }

          /* Remove shadows/overflow for print */
          .shadow-xl { box-shadow: none !important; }

          /* Ensure images render */
          img { max-width: 100% !important; }
        }

        @media screen {
          #print-root { display: block; }
        }
      `}</style>

      <div className="min-h-screen bg-[#F4F7FB] font-inter">
        {/* Top bar */}
        <div className="sticky top-0 z-50 bg-[#08111F] border-b border-[#12305C] print:hidden">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#1E4D99] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-[13px] font-bold text-white tracking-wide">
                    METAL X PAYMENT PACKS
                  </h1>
                  <p className="text-[10px] text-[#6F7472]">
                    Owens For Scrap — Preview & Download
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="text-[11px] border-[#12305C] text-[#D9DEE7] bg-transparent hover:bg-[#12305C] hover:text-white"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5" />
                  Print
                </Button>
                <Button
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="text-[11px] bg-[#1E4D99] hover:bg-[#12305C] text-white"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pack selector */}
        <div className="print:hidden">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <PackSelector
              selectedPackId={selectedPackId}
              onSelect={(id) => setSelectedPackId(id)}
              onSelectGrand={() => setSelectedPackId("grand")}
            />
          </div>
        </div>

        {/* Preview area */}
        <div id="print-root" className="max-w-[1400px] mx-auto px-6 pb-12 print:max-w-none print:px-0 print:pb-0">
          {selectedPackId === "grand" ? (
            <GrandSummaryPreview />
          ) : selectedPack ? (
            <SinglePackPreview pack={selectedPack} />
          ) : null}
        </div>
      </div>
    </>
  );
}