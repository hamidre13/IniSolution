//import React, { lazy, Suspense } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import PokemonList from "./PokemonList";
import Details from "./Details";
// const Details = lazy(() => import("./Details"));

const App = () => {
  // return (
  //   <Suspense fallback={<h1>loading route …</h1>}>
  //     <Router>
  //       <PokemonList path="/" />
  //       <Details path="/details/:id" />
  //     </Router>
  //   </Suspense>
  // );
  return (
    <Router>
      <PokemonList path="/" />
      <Details path="/details/:id" />
    </Router>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
