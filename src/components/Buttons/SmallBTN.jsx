import './SmallBTN.css';

export default function SmallBTN({
  TextForButton,
  otherStyles = {},
  onClick,
  className = "",
  noInlineStyles = false,
}) {
  let mergedClassName = `small-btn ${className}`;
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
