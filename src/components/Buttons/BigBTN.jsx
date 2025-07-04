import './BigBTN.css';

export default function BigBTN({
  TextForButton,
  otherStyles = {},
  onClick,
  className = "",
  noInlineStyles = false,
}) {
  let mergedClassName = `big-btn ${className}`;
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
