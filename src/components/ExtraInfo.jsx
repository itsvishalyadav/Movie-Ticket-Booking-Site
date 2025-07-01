import './ExtraInfo.css';
export default function ExtraInfo({ info }) {
  return (
    <p>
      {Object.entries(info).map(([key, value]) => (
        <span className="extra-info-value">{value}</span>
      ))}
    </p>
  );
}
