import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import PokemonList from "./PokemonList";

const App = () => {
  return (
    <Router>
      <PokemonList path="/" />
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
