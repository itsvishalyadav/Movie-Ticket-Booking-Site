let Styles = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#1A191F",
  border: "2px solid #f9ab00",
  borderRadius: "5px",
  height: "30px",
  padding: "5px 15px",
  cursor: "pointer",

};

export default function SmallBTN({ TextForButton, otherStyles = {} }) {
  let mergedStyles = { ...Styles, ...otherStyles };
  return <button /*onClick={fn}*/ style={mergedStyles}>{TextForButton}</button>;
}
