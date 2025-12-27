// src/components/InvoiceLayout.jsx
import React from "react";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import "../components/invoice.css";

const InvoiceLayout = () => {
  return (
    <div className="invoice-page">
      <div className="invoice-card">
        <div className="invoice-header">
          <div>
            <h1 className="brand-title">Invoice<span>Ninja</span></h1>
            <p className="brand-subtitle">Create Invoice</p>
          </div>
          <button className="ghost-btn">Do you need help?</button>
        </div>

        <div className="invoice-grid">
          <section className="invoice-section">
            <InvoiceForm />
          </section>

          <section className="preview-section">
            <InvoicePreview />
          </section>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLayout;
