import './css/style.css'
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import PokemonList from "./PokemonList";
const Details = lazy(() => import("./Details"));
const FOURohFour = () => <h1>Recourse not found </h1>
const App = () => {
  return (
    <Suspense fallback={<h1>loading route …</h1>}>
    <header>
      <Link to="/">Home</Link>
    </header>
      <Router>
        <PokemonList path="/" />
        <Details path="/details/:id/:name" />
        <FOURohFour default/>
      </Router>
    </Suspense>
  );

};

ReactDOM.render(<App />, document.getElementById("root"));
