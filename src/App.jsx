// src/App.jsx
import React, { useState, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import "./components/invoice.css";

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className="video-bg-wrapper">
      {/* keep your video + overlay if you use them */}
      {/* <video ... /> */}
      {/* <div className="video-overlay" /> */}

      <div className="invoice-page">
        <div className="invoice-card">
          <div className="invoice-header">
            <div>
              <h1 className="brand-title">InvoiceNinja</h1>
              <p className="brand-subtitle">Create Invoice</p>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <button className="ghost-btn">Do you need help?</button>

              {/* theme toggle */}
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>
          </div>

          <div className="invoice-grid">
            <section className="invoice-section">
              <InvoiceForm onChange={setInvoiceData} />
            </section>
            <section className="preview-section">
              <InvoicePreview data={invoiceData} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
