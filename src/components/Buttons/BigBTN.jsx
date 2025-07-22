import styles from './BigBTN.module.css';

export default function BigBTN({
  TextForButton,
  otherStyles = {},
  onClick,
  className = "",
  noInlineStyles = false,
}) {
  let mergedClassName = `${styles["big-btn"]} ${className}`;
  return (
    <button
      onClick={onClick}
      style={noInlineStyles ? undefined : otherStyles}
      className={mergedClassName}
    >
      {TextForButton}
    </button>
  );
}
