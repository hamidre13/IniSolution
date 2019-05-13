import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const ListWrapper = styled.div`
  color: blue;
  display: flex;
  flex: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
const PokeWrapper = styled(Link)`
  flex-basis: 20%;
  margin-bottom: 25px;
`;
const ImgCaption = styled.div`
  text-align: center;
  padding: 10px 20px;
`;
const ShowPokes = props => {
  const { pokes, IsSearch } = props;
  let txtAlert = "Loading ....";
  if (IsSearch) txtAlert = "No Result";
  if (!pokes.length) {
    return (
      <ListWrapper>
        <h1>{txtAlert}</h1>
      </ListWrapper>
    );
  } else {
    return (
      <ListWrapper data-testid="poke-container">
        {pokes.map(poke => (
          <PokeWrapper
            to={`/details/${poke.index}`}
            key={poke.name}
          >
            <ImgCaption>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  poke.index
                }.png`}
                alt="Pokemon"
              />
              <p>{poke.name}</p>
            </ImgCaption>
          </PokeWrapper>
        ))}
      </ListWrapper>
    );
  }
};

export default ShowPokes;
