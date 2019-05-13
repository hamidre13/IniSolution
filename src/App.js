import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import PokemonList from "./PokemonList";

const Details = lazy(() => import("./Details"));

const App = () => {
  return (
    <Suspense fallback={<h1>loading route …</h1>}>
      <Router>
        <PokemonList path="/" />
        <Details path="/details/:id" />
      </Router>
    </Suspense>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
