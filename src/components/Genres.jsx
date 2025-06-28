import SmallBTN from "./SmallBTN";
export default function Genres({ genres }) {
  let styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  };
  return (
    <div style={styles}>
      {genres.map((genre, index) => (
        <SmallBTN key={index} TextForButton={genre} />
      ))}
    </div>
  );
}
