// src/components/Booking/LanguageFormatSelector.jsx
import React from "react";
import styles from "./LanguageFormatSelector.module.css";
import { useState , useEffect} from "react";

export default function LanguageFormatSelector({ liveInfo, setLiveInfo}) {

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selector}>
        <label className={styles.label}>Language</label>
        <select
          value={liveInfo.language || ""}
          onChange={
            (e) => 
              {
                const formats = [];
                for (const theater of liveInfo.theatres) {
                  for (const timing of theater.timings) {
                    if (timing.language === e.target.value && !formats.includes(timing.format)) {
                      formats.push(timing.format);
                    }
                  }
                }
                setLiveInfo((curr) => ({ ...curr, language: e.target.value , formats: formats, format: formats[0] }));
              }
          }
          className={styles.dropdown}
        >
          {liveInfo.languages.map((lang) => (
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
          onChange={
            (e) => 
              setLiveInfo((curr) => ({ ...curr, format: e.target.value }))
          }
          className={styles.dropdown}
        >
          {liveInfo.formats.map((fmt) => (
            <option className={styles.opt} key={fmt} value={fmt}>
              {fmt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
