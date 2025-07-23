import styles from './Plot.module.css';
export default function Plot({ plot }) {
  return (
    <div className={styles['plot-container']}>
      <p className={styles['plot-title']}>PLOT:-</p>
      <p className={styles['plot-content']}>{plot}</p>
    </div>
  );
}
