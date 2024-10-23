import SortFields from "../SortFields";
import Card from "../Card";
import { useEffect, useState } from "react";
import "./style.scss";
import Spinner from "../Spinner";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Premier rendu de l'App, le tableau est vide
  const [pokemons, setPokemons] = useState([]);

  // les states de mes champs contrôlés (je les place ici)
  const [formSearch, setFormSearch] = useState("");
  const [formType, setFormType] = useState("all"); // valeur par défaut

  console.log(`formType : ${formType}`);

  // Pourquoi ? parce que la variable ici sera recalculée automatiquement lorsqu'on
  // modifiera une valeur dans un des state

  const filteredPokemons = pokemons.filter((pokemon) => {
    // Pour chaque pokémon du filtre, (parcouru dans la liste)
    // > si je retourne true, je rajoute le pokémon dans filteredPokemons
    // > sinon, je ne le rajoute pas (return false)

    if (pokemon.name.toLowerCase().includes(formSearch.toLowerCase()) === false)
      return false;
    if (formType !== "all" && pokemon.types.includes(formType) === false)
      return false;

    return true;
  });

  const getPokemons = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://api.pokemontcg.io/v2/cards?pageSize=14"
    );
    const data = await response.json();
    // attention, après analyse, avec console.log, je récupère un objet
    // dans cet objet, je peux obtenir les pokémons (tableau) dans la clé data de cet objet
    setPokemons(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <>
      {/* Formulaire de recherche */}
      <SortFields
        formSearch={formSearch}
        setFormSearch={setFormSearch}
        formType={formType}
        setFormType={setFormType}
      />

      {/* Liste des cartes pokémons 
                - 1- récupérer les données de l'API avec un useEffect()
                - 2- On peut déclarer un state qui va accueillir les données de l'API
                - 3- on rajoute des props dans le composant Card
                - 4- on fait la boucle (map) pour afficher les data
            */}
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="cards-list">
          {filteredPokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
//Amelioré pour le referencememnt
//lien d'evitemement
//titre de document sur la page
// faire un bouton fixe sur la page pour scrool
