import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import PokemonList from "./PokemonList";
import Details from "./Details";

const App = () => {
  
  
  return (
      <Router>
        <PokemonList path="/" />
        <Details path="/details/:id" />
      </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
