import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ShowPokes from "./ShowPokes";

//It seems React.stricmode have issues with the styeld compnent
// So I disabled it for now.

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const SearchElements = styled.div`
  flex-basis: 20%;
  margin: 10px;
`;
const PokemonList = () => {
  const [pokes, setPokes] = useState({});
  const [mode, setMode] = useState("Show All");
  const [searchRes, setSearchRes] = useState("");
  const [local,setLocal] = useState([])
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(({ data }) => {
        //console.log(data.results)
        const res = data.results;

        const pokes = res.map((poke, index) => {
          return {
            index: index,
            name: poke.name
          };
        });
        setPokes(pokes);
      });
    
      const LocalKeys = Object.keys(localStorage)
      let i = LocalKeys.length
      let temp = []
      while (i--){
        temp.push({
         name:LocalKeys[i],
         index:localStorage.getItem(LocalKeys[i]) 
        })
      }
      setLocal(temp)
      
  }, []);

  const toggleMode = opt => {
    setMode(opt);
  };
  const searchPoke = e => {
    if (e.target.value !== "") {
      toggleMode("Show Seach");
    } else {
      toggleMode("Show All");
    }
    let temp = [];
    pokes.forEach(poke => {
      if (poke.name.search(e.target.value) !== -1) {
        temp.push(poke);
      }
    });

    setSearchRes(temp);
  };

  return (
    <div>
      <SearchContainer>
        <SearchElements>
          <button onClick={() => toggleMode("Show Save")}>Bag</button>
          <button onClick={() => toggleMode("Show All")}>Show All</button>
        </SearchElements>
        <SearchElements>
          <input placeholder="search" onChange={e => searchPoke(e)} />
        </SearchElements>
      </SearchContainer>

      {mode === "Show All" ? <ShowPokes pokes={pokes} /> : null}
      {mode === "Show Seach" ? (
        <ShowPokes pokes={searchRes} IsSearch={true} />
      ) : null}
      {mode === "Show Save"?
    (
      <ShowPokes pokes={local}/>
    ):null  }
    </div>
  );
};

export default PokemonList;
