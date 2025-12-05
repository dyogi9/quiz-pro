import React from "react";
import QRCode from "react-qr-code";

export default function QRPanel({ url, label = "Scan to join" }) {
  return (
    <div className="bg-white/90 shadow-lg rounded-xl p-4 w-full max-w-xs">
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      <div className="p-3 bg-white rounded-md flex justify-center">
        <QRCode value={url} size={160} />
      </div>
      <div className="mt-3 text-xs break-all text-gray-700">{url}</div>
    </div>
  );
}
