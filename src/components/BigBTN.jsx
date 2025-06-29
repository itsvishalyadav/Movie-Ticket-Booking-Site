const Styles = {
  borderRadius: "10px",
  height: "56px",
  padding: "20px 25px",
  backgroundColor: " #f9ab00",
  fontSize: "20px",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #f9ab00",
};

export default function BigBTN({
  TextForButton,
  otherStyles = {},
  onClick,
  className = "",
  noInlineStyles = false,
}) {
  let mergedStyles = { ...Styles, ...otherStyles };
  return (
    <button
      onClick={onClick}
      style={noInlineStyles ? undefined : mergedStyles}
      className={className}
    >
      {TextForButton}
    </button>
  );
}
