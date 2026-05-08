import React, { useState, useRef } from "react";
import { paymentPacks } from "@/lib/paymentPackData";
import PackSelector from "@/components/pdf/PackSelector";
import SinglePackPreview from "@/components/pdf/SinglePackPreview";
import GrandSummaryPreview from "@/components/pdf/GrandSummaryPreview";
import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function PaymentPackPreview() {
  const [selectedPackId, setSelectedPackId] = useState("00103");
  const previewRef = useRef(null);
  const [generating, setGenerating] = useState(false);

  const selectedPack = paymentPacks.find((p) => p.id === selectedPackId);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setGenerating(true);

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#FFFFFF",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yOffset = 0;
    let page = 0;

    while (yOffset < imgHeight) {
      if (page > 0) pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        -yOffset,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      yOffset += pageHeight;
      page++;
    }

    const fileName =
      selectedPackId === "grand"
        ? "MetalX_Owens_GrandSummary_08052026.pdf"
        : `MetalX_Owens_Pack${selectedPackId}_08052026.pdf`;

    pdf.save(fileName);
    setGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-inter">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#08111F] border-b border-[#12305C] print:hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
                disabled={generating}
                className="text-[11px] bg-[#1E4D99] hover:bg-[#12305C] text-white"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                {generating ? "Generating…" : "Download PDF"}
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
      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        <div ref={previewRef}>
          {selectedPackId === "grand" ? (
            <GrandSummaryPreview />
          ) : selectedPack ? (
            <SinglePackPreview pack={selectedPack} />
          ) : null}
        </div>
      </div>
    </div>
  );
}