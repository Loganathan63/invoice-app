import React, { useState } from "react";
import "../components/invoice.css";
import CurrencySelect from "./CurrencySelect";

const emptyItem = {
  particulars: "",
  hsn: "",
  qty: 1,
  rate: 0,
};

const defaultForm = {
  clientName: "",
  clientEmail: "",
  subject: "",
  dueDate: "",
  currency: "INR",
  countryCode: "IN",
  currencyLabel: "INR - Indian Rupee",
  items: [emptyItem],
  hasCoupon: false,
  couponCode: "",
  couponAmount: 0,
  hasDiscount: false,
  discountAmount: 0,
};

const InvoiceForm = ({ onChange }) => {
  const [form, setForm] = useState(defaultForm);

  const updateForm = (patch) => {
    const next = { ...form, ...patch };
    setForm(next);
    if (onChange) onChange(next);
  };

  const handleItemChange = (index, field, value) => {
    const items = form.items.map((it, i) =>
      i === index ? { ...it, [field]: value } : it
    );
    updateForm({ items });
  };

  const addItem = () => updateForm({ items: [...form.items, emptyItem] });

  const removeItem = (index) => {
    if (form.items.length === 1) return;
    updateForm({ items: form.items.filter((_, i) => i !== index) });
  };

  const effectiveCurrency = form.currency || "INR";

  const lineAmount = (item) =>
    Number(item.qty || 0) * Number(item.rate || 0);

  const subtotal = form.items.reduce(
    (sum, it) => sum + lineAmount(it),
    0
  );

  const taxTotal = 0; // no per-line tax now

  const coupon = form.hasCoupon ? Number(form.couponAmount || 0) : 0;
  const discount = form.hasDiscount ? Number(form.discountAmount || 0) : 0;

  const total = subtotal + taxTotal - coupon - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onChange) {
      onChange({
        ...form,
        subtotal,
        taxTotal,
        coupon,
        discount,
        total,
        currencyLabel: form.currencyLabel,
      });
    }
  };

  const handleCancel = () => {
    setForm(defaultForm);
    if (onChange) onChange(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">Invoice details</h2>

      {/* Client info */}
      <div className="field-row">
        <div className="field">
          <label>People *</label>
          <input
            type="text"
            placeholder="Client name"
            value={form.clientName}
            onChange={(e) => updateForm({ clientName: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Client email"
            value={form.clientEmail}
            onChange={(e) => updateForm({ clientEmail: e.target.value })}
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Subject</label>
          <input
            type="text"
            placeholder="Service for June 2025"
            value={form.subject}
            onChange={(e) => updateForm({ subject: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Due date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => updateForm({ dueDate: e.target.value })}
          />
        </div>
      </div>

      {/* Currency */}
      <div className="field">
        <label>Currency</label>
        <CurrencySelect
          value={form.currency}
          onChange={(opt) =>
            updateForm({
              currency: opt.currency,
              countryCode: opt.countryCode,
              currencyLabel: `${opt.currency} - ${opt.label}`,
            })
          }
        />
      </div>

      {/* Product table */}
      <h3 className="section-title" style={{ marginTop: "1.2rem" }}>
        Product
      </h3>

      <div className="items-card">
        <div className="items-header">
          <span>S.No</span>
          <span>Particulars</span>
          <span>HSN Code</span>
          <span>Qty</span>
          <span>Rate</span>
          <span>Amount</span>
          <span></span>
        </div>

        {form.items.map((item, index) => {
          const amount = lineAmount(item);

          return (
            <div className="items-row" key={index}>
              {/* S.No */}
              <span className="items-sno">{index + 1}</span>

              {/* Particulars */}
              <input
                type="text"
                placeholder="Product / service name"
                value={item.particulars}
                onChange={(e) =>
                  handleItemChange(index, "particulars", e.target.value)
                }
              />

              {/* HSN Code */}
              <input
                type="text"
                placeholder="HSN / SAC"
                value={item.hsn}
                onChange={(e) =>
                  handleItemChange(index, "hsn", e.target.value)
                }
              />

              {/* Qty */}
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  handleItemChange(index, "qty", e.target.value)
                }
              />

              {/* Rate */}
              <input
                type="number"
                min="0"
                value={item.rate}
                onChange={(e) =>
                  handleItemChange(index, "rate", e.target.value)
                }
              />

              {/* Amount (read-only) */}
              <span className="items-amount">
                {effectiveCurrency} {amount.toFixed(2)}
              </span>

              {/* Remove button */}
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeItem(index)}
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* Total row at bottom */}
        <div className="items-footer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="items-footer-label">Total</span>
          <span className="items-footer-amount">
            {effectiveCurrency} {subtotal.toFixed(2)}
          </span>
          <span></span>
        </div>
      </div>

      <button
        type="button"
        className="add-item-btn"
        onClick={addItem}
      >
        + Add new line
      </button>

      {/* Coupon */}
      <div style={{ marginTop: "1rem" }}>
        <label style={{ fontSize: "0.8rem", color: "#4b5563" }}>
          <input
            type="checkbox"
            checked={form.hasCoupon}
            onChange={(e) =>
              updateForm({
                hasCoupon: e.target.checked,
                ...(e.target.checked
                  ? {}
                  : { couponCode: "", couponAmount: 0 }),
              })
            }
            style={{ marginRight: "0.4rem" }}
          />
          Add coupon
        </label>

        {form.hasCoupon && (
          <div className="field-row" style={{ marginTop: "0.5rem" }}>
            <div className="field">
              <label>Coupon</label>
              <select
                value={form.couponCode}
                onChange={(e) => updateForm({ couponCode: e.target.value })}
              >
                <option value="">Select coupon</option>
                <option value="SUMMER10">SUMMER10</option>
                <option value="WELCOME5">WELCOME5</option>
                <option value="VIP20">VIP20</option>
              </select>
            </div>
            <div className="field">
              <label>Coupon amount</label>
              <input
                type="number"
                min="0"
                value={form.couponAmount}
                onChange={(e) =>
                  updateForm({ couponAmount: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Discount */}
      <div style={{ marginTop: "0.7rem" }}>
        <label style={{ fontSize: "0.8rem", color: "#4b5563" }}>
          <input
            type="checkbox"
            checked={form.hasDiscount}
            onChange={(e) =>
              updateForm({
                hasDiscount: e.target.checked,
                ...(e.target.checked ? {} : { discountAmount: 0 }),
              })
            }
            style={{ marginRight: "0.4rem" }}
          />
          Add discount
        </label>

        {form.hasDiscount && (
          <div className="field" style={{ marginTop: "0.5rem" }}>
            <label>Discount amount</label>
            <input
              type="number"
              min="0"
              value={form.discountAmount}
              onChange={(e) =>
                updateForm({ discountAmount: e.target.value })
              }
            />
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="totals" style={{ marginTop: "1rem" }}>
        <div className="totals-row">
          <span>Subtotal</span>
          <span>
            {effectiveCurrency} {subtotal.toFixed(2)}
          </span>
        </div>
        {coupon > 0 && (
          <div className="totals-row">
            <span>Coupon</span>
            <span>
              - {effectiveCurrency} {coupon.toFixed(2)}
            </span>
          </div>
        )}
        {discount > 0 && (
          <div className="totals-row">
            <span>Discount</span>
            <span>
              - {effectiveCurrency} {discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="totals-row total">
          <span>Total</span>
          <span>
            {effectiveCurrency} {total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" className="ghost-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
