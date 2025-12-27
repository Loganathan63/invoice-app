import React, { useState } from "react";
import "../components/invoice.css";
import CurrencySelect from "./CurrencySelect";

const emptyItem = { description: "", quantity: 1, price: 0, tax: 0 };

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

  // totals
  const subtotal = form.items.reduce(
    (sum, it) => sum + Number(it.quantity || 0) * Number(it.price || 0),
    0
  );
  const taxTotal = form.items.reduce(
    (sum, it) =>
      sum +
      Number(it.quantity || 0) *
        Number(it.price || 0) *
        Number(it.tax || 0) /
        100,
    0
  );

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

      {/* Items */}
      <h3 className="section-title" style={{ marginTop: "1.2rem" }}>
        Product
      </h3>

      <div className="items-card">
        <div className="items-header">
          <span>Item</span>
          <span>Qty</span>
          <span>Unit price</span>
          <span>Tax %</span>
          <span></span>
        </div>

        {form.items.map((item, index) => (
          <div className="items-row" key={index}>
            <input
              type="text"
              placeholder="Item name"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <input
              type="number"
              min="0"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", e.target.value)
              }
            />
            <input
              type="number"
              min="0"
              max="100"
              value={item.tax}
              onChange={(e) =>
                handleItemChange(index, "tax", e.target.value)
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeItem(index)}
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}
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
        <div className="totals-row">
          <span>Tax</span>
          <span>
            {effectiveCurrency} {taxTotal.toFixed(2)}
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

      {/* Buttons same width */}
      <div className="form-actions">
        <button type="button" className="ghost-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="primary-btn">
          Submit Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
