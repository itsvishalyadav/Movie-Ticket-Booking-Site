export default function MovieTile({movieTile,className={}}) {
  return <img className={className} style={{height:"12.5rem",borderRadius:"0.625rem"}} src={movieTile} alt="" />;
}
