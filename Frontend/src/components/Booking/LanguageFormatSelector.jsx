// src/components/Booking/LanguageFormatSelector.jsx
import React from "react";
import styles from "./LanguageFormatSelector.module.css";

const languages = ["Hindi", "English"];
const formats = ["2D", "3D", "4K"];

export default function LanguageFormatSelector({ liveInfo, setLiveInfo }) {
  const updateField = (field) => (e) =>
    setLiveInfo((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selector}>
        <label className={styles.label}>Language</label>
        <select
          value={liveInfo.language || ""}
          onChange={updateField("language")}
          className={styles.dropdown}
        >
          {languages.map((lang) => (
            <option className={styles.opt} key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selector}>
        <label className={styles.label}>Format</label>
        <select
          value={liveInfo.format || ""}
          onChange={updateField("format")}
          className={styles.dropdown}
        >
          {formats.map((fmt) => (
            <option className={styles.opt} key={fmt} value={fmt}>
              {fmt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
