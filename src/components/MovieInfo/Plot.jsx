import './Plot.css';
export default function Plot({ plot }) {
  return (
    <div className='plot-container'>
      <p className="plot-title">PLOT:-</p>
      <p className="plot-content">{plot}</p>
    </div>
  );
}
