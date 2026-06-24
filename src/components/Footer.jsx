import React from 'react';

export default function Footer({ developerName, developerEmail }) {
  return (
    <footer className="app-footer glass-panel" id="app-footer">
      {/* Developer Details Text Spans */}
      <div className="author-placeholder">
        <div className="author-field">
          <span className="author-field-label">Developer :</span>
          <span>{developerName || "[ Your Name Here ]"}</span>
        </div>

        <div className="author-field">
          <span className="author-field-label">Email :</span>
          <span>{developerEmail || "[ Your Email Here ]"}</span>
        </div>
      </div>

      {/* Mandatory Sponsor Button linking to Digital Heroes */}
      <a
        id="btn-sponsor"
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-hero"
      >
        Built for Digital Heroes
      </a>
    </footer>
  );
}
