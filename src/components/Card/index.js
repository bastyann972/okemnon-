import "./style.scss";

const Card = ({ pokemon }) => {
  // Vérification si la carte a un prix disponible
  const price = pokemon.cardmarket?.prices?.trendPrice || "N/A";
  const marketUrl = pokemon.cardmarket?.url || "#"; // URL du marché si disponible

  return (
    <div className="card">
      <img
        className="card__picture"
        src={pokemon.images.small}
        alt={pokemon.name}
      />
      <div className="card__mask"></div>
      <p className="card__name">{pokemon.name}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={marketUrl} // URL vers le marché de la carte
        className="card__price"
      >
        <span className="price trendPrice">{price} €</span>
      </a>
    </div>
  );
};

export default Card;
