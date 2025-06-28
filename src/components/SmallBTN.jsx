let Styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A191F",
  border: "2px solid #f9ab00",
  borderRadius: "5px",
  height: "30px",
  padding: "5px 15px",
  cursor: "pointer",
};

export default function SmallBTN({ TextForButton, otherStyles = {},onClick }) {
  let mergedStyles = { ...Styles, ...otherStyles };
  return <button onClick={onClick} style={mergedStyles}>{TextForButton}</button>;
}
