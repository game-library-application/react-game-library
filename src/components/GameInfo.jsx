function GameInfo(props) {
  return (
    <div>
      <h1>{props.game.title}</h1>
      <p>{props.game.description}</p>
      <img src={props.game.image_url} />
      <p>{props.game.rating}/10</p>
      <p>{props.game.price}€</p>
      <p>{props.game.genre}</p>
      <p>{props.game.platform}</p>
      {props.game.free === true && (<p>Free</p>) || props.game.free !== true && (<p>Paid</p>)}
    </div>
  );
}

export default GameInfo;
