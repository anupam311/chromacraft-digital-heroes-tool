import React, { useState } from "react";

export default function ExportModal({
  colors,
  onClose,
}) {
  const [format, setFormat] = useState("hex");

  const getExportText = () => {
    switch (format) {
      case "css":
        return (
          ":root {\n" +
          colors
            .map(
              (color, index) =>
                `  --color-${index + 1}: ${color.hex};`
            )
            .join("\n") +
          "\n}"
        );

      case "json":
        return JSON.stringify(
          colors.map((color) => color.hex),
          null,
          2
        );

      default:
        return colors
          .map((color) => color.hex)
          .join("\n");
    }
  };

  const exportText = getExportText();

  const copyExport = async () => {
    await navigator.clipboard.writeText(exportText);
    alert("Palette copied!");
  };

  const downloadExport = () => {
    const blob = new Blob(
      [exportText],
      { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = `palette.${format === "json"
      ? "json"
      : "txt"}`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay">

      <div className="export-modal">

        <h2>Export Palette</h2>

        <div className="export-tabs">

          <button
          className={format==="hex"?"active":""}
          onClick={()=>setFormat("hex")}
          >
            HEX
          </button>

          <button
          className={format==="css"?"active":""}
          onClick={()=>setFormat("css")}
          >
           CSS
          </button>

          <button
          className={format==="json"?"active":""}
          onClick={()=>setFormat("json")}
          >
            JSON
          </button>
        </div>

        <div className="preview-strip">

          {colors.map((color)=>

          <div
          key={color.hex}
          style={{backgroundColor:color.hex}}
          />

          )}

        </div>

        <textarea
          readOnly
          value={exportText}
        />

        <div className="modal-buttons">

          <button
            onClick={copyExport}
          >
            Copy
          </button>

          <button
            onClick={downloadExport}
          >
            Download
          </button>

          <button
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}