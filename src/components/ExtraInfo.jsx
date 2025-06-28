export default function ExtraInfo({ info }) {
  return (
    <p>
      {Object.entries(info).map(([key, value]) => (
        <span style={{ margin: "0px 10px", color: " #f9ab00" ,fontStyle:"italic"}}>{value}</span>
      ))}
    </p>
  );
}
