import { useEffect, useState } from "react";
import "./style.scss";

const SortFields = ({ formSearch, setFormSearch, formType, setFormType }) => {
  // je créer la fonction pour alimenter les types du formulaire de recherche

  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    const response = await fetch("https://api.pokemontcg.io/v2/types");
    const data = await response.json();
    setTypes(data.data);
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <form className="sort-form">
      <div className="sort-form__fields">
        <fieldset className="sort-form__field">
          <label htmlFor="sort-form__search">Carte</label>
          <input
            type="text"
            id="sort-form__search"
            placeholder="Rechercher une carte"
            value={formSearch}
            onChange={(e) => setFormSearch(e.target.value)}
          />
        </fieldset>

        <fieldset className="sort-form__field">
          <label htmlFor="sort-form__type">Type</label>
          <select
            name="sort-form__type"
            id="sort-form__type"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            <option value="all">tous</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="sort-form__field">
          <label htmlFor="sort-form__rarity">Rareté</label>
          <select name="sort-form__rarity" id="sort-form__rarity">
            <option value="all">Toutes</option>
          </select>
        </fieldset>
        <fieldset className="sort-form__field">
          <label htmlFor="sort-order">Trier par</label>
          <select name="sort-order" id="sort-order">
            <option value="name">nom (A - Z)</option>
          </select>
        </fieldset>
      </div>
      <div className="form-buttons">
        <button type="submit">{">"} Valider</button>
        <button type="reset" className="sort-form__reset">
          {">"} Réinitialiser
        </button>
      </div>
    </form>
  );
};

export default SortFields;
