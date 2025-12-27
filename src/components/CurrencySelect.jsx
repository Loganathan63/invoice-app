import React from "react";
import ReactCountryFlag from "react-country-flag";
import "../components/invoice.css";

const OPTIONS = [
  { countryCode: "IN", currency: "INR", label: "Indian Rupee" },
  { countryCode: "US", currency: "USD", label: "United States Dollar" },
  { countryCode: "GB", currency: "GBP", label: "British Pound" },
  { countryCode: "EU", currency: "EUR", label: "Euro" },
  { countryCode: "JP", currency: "JPY", label: "Japanese Yen" },
  { countryCode: "AU", currency: "AUD", label: "Australian Dollar" },
  { countryCode: "CA", currency: "CAD", label: "Canadian Dollar" },
  { countryCode: "SG", currency: "SGD", label: "Singapore Dollar" },
];

const CurrencySelect = ({ value, onChange }) => {
  const selected =
    OPTIONS.find((o) => o.currency === value) || OPTIONS[0];

  const handleChange = (e) => {
    const code = e.target.value;
    const opt = OPTIONS.find((o) => o.currency === code);
    if (opt && onChange) onChange(opt);
  };

  return (
    <div className="currency-select">
      <div className="currency-select-flag">
        <ReactCountryFlag
          countryCode={selected.countryCode}
          svg
          style={{
            width: "1.4rem",
            height: "1.4rem",
            borderRadius: "999px",
          }}
        />
      </div>
      <select
        className="select-input currency-select-input"
        value={selected.currency}
        onChange={handleChange}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.currency} value={opt.currency}>
            {opt.currency} - {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
