
export default function MovieTile({movieTile,className={}}) {
  return <img className={className} style={{height:"200px",borderRadius:"10px"}} src={movieTile} alt="" />;
}
