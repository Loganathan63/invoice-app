// src/components/InvoicePreview.jsx
import React from "react";
import "../components/invoice.css";
import {
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineCreditCard,
} from "react-icons/hi";

const InvoicePreview = ({ data }) => {
  const form = data || {};
  const currency =
    form.currencyLabel?.split(" - ")[0] ||
    form.currency ||
    "INR";

  const items = form.items || [];

  const subtotal =
    form.subtotal ??
    items.reduce(
      (sum, it) => sum + Number(it.quantity || 0) * Number(it.price || 0),
      0
    );
  const taxTotal =
    form.taxTotal ??
    items.reduce(
      (sum, it) =>
        sum +
        Number(it.quantity || 0) *
          Number(it.price || 0) *
          Number(it.tax || 0) /
          100,
      0
    );
  const coupon = form.coupon || 0;
  const discount = form.discount || 0;
  const total = form.total ?? subtotal + taxTotal - coupon - discount;

  return (
    <>
      {/* Header with action buttons */}
      <div className="preview-header">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Preview
        </h2>
        <div className="preview-actions">
          <button className="preview-pill primary">
            <HiOutlineDocumentText className="preview-pill-icon" />
            <span>PDF</span>
          </button>
          <button className="preview-pill">
            <HiOutlineMail className="preview-pill-icon" />
            <span>Email</span>
          </button>
          <button className="preview-pill">
            <HiOutlineCreditCard className="preview-pill-icon" />
            <span>Payment page</span>
          </button>
        </div>
      </div>

      {/* Main invoice card */}
      <div className="preview-inner">
        {/* top row */}
        <div className="preview-top">
          <div>
            <h3 className="preview-logo">
              InvoiceNinja
            </h3>
            <p className="preview-muted">Invoice</p>
          </div>
          <div className="preview-meta">
            <p>
              <span className="preview-meta-label">Invoice ID:</span>
              INV-{new Date().getFullYear()}-001
            </p>
            <p>
              <span className="preview-meta-label">Due date:</span>
              {form.dueDate || "—"}
            </p>
            <p>
              <span className="preview-meta-label">Subject:</span>
              {form.subject || "—"}
            </p>
          </div>
        </div>

        {/* billed to */}
        <div className="preview-billing">
          <div>
            <p className="preview-label">Billed to</p>
            <p className="preview-client">
              {form.clientName || "Client name"}
            </p>
            <p className="preview-muted">
              {form.clientEmail || "client@email.com"}
            </p>
          </div>
          <div className="preview-right">
            <p className="preview-label">Currency</p>
            <p className="preview-client">{currency}</p>
          </div>
        </div>

        {/* items table */}
        <div className="preview-table">
          <div className="preview-table-head">
            <span>Description</span>
            <span>Qty</span>
            <span>Unit price</span>
            <span>Amount</span>
          </div>

          {items.length === 0 ? (
            <p className="preview-muted preview-empty">
              Add items on the left to see them here.
            </p>
          ) : (
            items.map((item, idx) => {
              const amount =
                Number(item.quantity || 0) * Number(item.price || 0);
              return (
                <div className="preview-table-row" key={idx}>
                  <span>{item.description || "—"}</span>
                  <span>{item.quantity || 0}</span>
                  <span>
                    {currency} {Number(item.price || 0).toFixed(2)}
                  </span>
                  <span>
                    {currency} {amount.toFixed(2)}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* totals */}
        <div className="preview-summary">
          <div />
          <div className="preview-summary-box">
            <div className="preview-summary-row">
              <span>Subtotal</span>
              <span>
                {currency} {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="preview-summary-row">
              <span>Tax</span>
              <span>
                {currency} {taxTotal.toFixed(2)}
              </span>
            </div>
            {coupon > 0 && (
              <div className="preview-summary-row">
                <span>Coupon</span>
                <span>
                  - {currency} {coupon.toFixed(2)}
                </span>
              </div>
            )}
            {discount > 0 && (
              <div className="preview-summary-row">
                <span>Discount</span>
                <span>
                  - {currency} {discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="preview-summary-row total">
              <span>Total</span>
              <span>
                {currency} {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePreview;
