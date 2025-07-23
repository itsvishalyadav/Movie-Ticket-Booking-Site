import styles from "./ExtraInfo.module.css";
export default function ExtraInfo({ info }) {
  return (
    <p>
      {Object.entries(info).map(([key, value]) => (
        <span className={styles["extra-info-value"]} key={key}>
          {key === "length" && `⏱ ${value}`}
          {key === "languages" && (
            <>
              💬{" "}
              {value.map((lang, idx) => (
                <a href="#" key={lang}>
                  {lang}
                  {idx < value.length - 1 ? ", " : ""}
                </a>
              ))}
            </>
          )}
          {key === "format" && (
            <>
              ☆{" "}
              {value.map((fmt, idx) => (
                <a href="#" key={fmt}>
                  {fmt}
                  {idx < value.length - 1 ? ", " : ""}
                </a>
              ))}
            </>
          )}
        </span>
      ))}
    </p>
  );
}