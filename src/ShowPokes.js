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
  return (
    <ListWrapper>
      {!pokes.length ? (
        <h1>{txtAlert}</h1>
      ) : (
        pokes.map(poke => (
          <PokeWrapper to={`/details/${poke.name}`} key={poke.name}>
            <ImgCaption>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  poke.index
                }.png`}
              />
              <p>{poke.name}</p>
            </ImgCaption>
          </PokeWrapper>
        ))
      )}
    </ListWrapper>
  );
};

export default ShowPokes;
