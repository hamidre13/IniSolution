import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DetailsLeft = styled.div`
  flex-basis: 30%;
  margin: 10px;
  margin-left: 10%;
`;
const DetailsRight = styled.div`
  flex-basis: 70%;
  margin: 10px;
`;
const PokeWrapper = styled.div`
  flex-basis: 20%;
  margin-bottom: 25px;
`;
const ImgCaption = styled.div`
  text-align: center;
  padding: 10px 20px;
`;
const Details = props => {
  const [poke, setPoke] = useState({});
  const [url, SetUrl] = useState("");
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.id}`).then(res => {
      setPoke(res.data);
      SetUrl(res.data.sprites.front_default);
    });
  }, []);
  useEffect(() => {
      if(poke.id){

          axios
          .get(`https://api.craft-demo.net/pokemon/${poke.id}`, {
            method: 'GET',
            mode: 'no-cors',
              headers: {
                  "x-api-key": process.env.API_KEY,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,POST",
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
            })
            .then(loc => {
                console.log(loc);
            });
        }
  }, [poke]);
  return (
    <React.Fragment>
      {!poke ? (
        <h1>Loading ...</h1>
      ) : (
        <DetailsWrapper>
          <DetailsLeft>
            <PokeWrapper key={poke.name}>
              <ImgCaption>
                <img src={url} />
                <p>{poke.name}</p>
              </ImgCaption>
              <p>
                Height: {poke.height}
                <br />
                <br />
                weight: {poke.weight}
                <br />
                <br />
                In Bag:
                <input type="checkbox" />
              </p>
            </PokeWrapper>
          </DetailsLeft>
          <DetailsRight />
        </DetailsWrapper>
      )}
    </React.Fragment>
  );
};
export default Details;
