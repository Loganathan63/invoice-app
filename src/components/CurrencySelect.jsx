// src/components/CurrencySelect.jsx
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import "../components/invoice.css";

const CURRENCIES = [
  { currency: "INR", label: "Indian Rupee", countryCode: "IN" },
  { currency: "USD", label: "United States Dollar", countryCode: "US" },
  { currency: "GBP", label: "British Pound", countryCode: "GB" },
  { currency: "EUR", label: "Euro", countryCode: "EU" },
  { currency: "JPY", label: "Japanese Yen", countryCode: "JP" },
  { currency: "AUD", label: "Australian Dollar", countryCode: "AU" },
  { currency: "CAD", label: "Canadian Dollar", countryCode: "CA" },
  { currency: "SGD", label: "Singapore Dollar", countryCode: "SG" },
];

const CurrencySelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected =
    CURRENCIES.find((c) => c.currency === value) || CURRENCIES[0];

  const filtered = CURRENCIES.filter(
    (c) =>
      c.currency.toLowerCase().includes(search.toLowerCase()) ||
      c.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange?.(option);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="currency-select-wrapper">
      {/* visible pill */}
      <button
        type="button"
        className="currency-select-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="currency-trigger-flag">
          <ReactCountryFlag
            svg
            countryCode={selected.countryCode}
            style={{ width: "18px", height: "18px", borderRadius: "999px" }}
          />
        </span>
        <span className="currency-trigger-label">
          {selected.currency} - {selected.label}
        </span>
        <span className="currency-trigger-arrow">▾</span>
      </button>

      {/* dropdown panel */}
      {open && (
        <div className="currency-dropdown">
          <div className="currency-search">
            <input
              type="text"
              placeholder="Type currency or country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="currency-list">
            {filtered.map((opt) => (
              <button
                key={opt.currency}
                type="button"
                className="currency-option"
                onClick={() => handleSelect(opt)}
              >
                <span className="currency-option-flag">
                  <ReactCountryFlag
                    svg
                    countryCode={opt.countryCode}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "999px",
                    }}
                  />
                </span>
                <div className="currency-option-text">
                  <span className="currency-option-main">
                    {opt.label}
                  </span>
                  <span className="currency-option-sub">
                    {opt.currency}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
