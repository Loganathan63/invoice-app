// src/App.jsx
import React, { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import "./components/invoice.css";

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleFormChange = (data) => setInvoiceData(data);

  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <div className="invoice-header">
          <div>
            <h1 className="brand-title">InvoiceNinja</h1>
            <p className="brand-subtitle">Create Invoice</p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <button className="ghost-btn">Do you need help?</button>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>

        <div className={`invoice-grid ${showPreview ? "" : "invoice-grid-collapsed"}`}>
          {/* Left: form */}
          <section className="invoice-section">
            <InvoiceForm onChange={handleFormChange} />
          </section>

          {/* Center toggle chevron */}
          <button
            type="button"
            className="preview-toggle-btn"
            onClick={() => setShowPreview((v) => !v)}
            aria-label={showPreview ? "Hide preview" : "Show preview"}
          >
            {showPreview ? "<" : ">"}
          </button>

          {/* Right: preview, only when showPreview is true */}
          {showPreview && (
            <section className="preview-section">
              <InvoicePreview data={invoiceData} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
