import React,{useState,useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components'

//It seems React.stricmode have issues with the styeld compnent
// So I disabled it for now.
const ListWrapper = styled.div`
color:blue;
display:flex;
flex:row;
flex-wrap:wrap;
justify-content:center;
align-items:center;
align-content:center;
`;
const PokeWrapper =styled.div`
flex-basis:20%;
`
const PokemonList = ()=>{
const [pokes,setPokes]= useState([])
useEffect(()=>{
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151").then(({data})=>{
        //console.log(data.results)
        setPokes(data.results)
    })
},[]);

return (
    <ListWrapper>
    {!pokes.length  ? (<h1>Loading ....</h1>):(
        pokes.map((poke,index)=> 
            <PokeWrapper key={poke.name}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}/>
            <span>{poke.name}</span>
            </PokeWrapper>
         )

    )}
    </ListWrapper>
    
)
}

export default PokemonList;