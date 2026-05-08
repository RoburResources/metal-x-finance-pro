import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Renders the #print-root element to a PDF and triggers download.
 * @param {string} packId - Used for the filename.
 */
export async function generatePackPDF(packId) {
  const element = document.getElementById("print-root");
  if (!element) return;

  // Temporarily expand the element so nothing is clipped
  const originalStyle = element.getAttribute("style") || "";
  element.style.maxWidth = "none";
  element.style.padding = "0";

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  // Restore
  element.setAttribute("style", originalStyle);

  const imgData = canvas.toDataURL("image/jpeg", 0.95);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 mm
  const pageHeight = 297;
  const pxPerMm = canvas.width / pageWidth;
  const totalHeightMm = canvas.height / pxPerMm;

  let yOffset = 0;
  let page = 0;

  while (yOffset < totalHeightMm) {
    if (page > 0) pdf.addPage();

    // Slice of the canvas for this page
    const sliceHeightMm = Math.min(pageHeight, totalHeightMm - yOffset);
    const sliceHeightPx = sliceHeightMm * pxPerMm;

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = Math.round(sliceHeightPx);

    const ctx = sliceCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      Math.round(yOffset * pxPerMm),
      canvas.width,
      Math.round(sliceHeightPx),
      0,
      0,
      canvas.width,
      Math.round(sliceHeightPx)
    );

    const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
    pdf.addImage(sliceData, "JPEG", 0, 0, pageWidth, sliceHeightMm);

    yOffset += pageHeight;
    page++;
  }

  pdf.save(`MetalX_PaymentPack_${packId}.pdf`);
}