import React from "react";
import axios from "axios";
import styled from "styled-components";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

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
  align-self: center;
`;
const PokeWrapper = styled.div`
  flex-basis: 20%;
  margin-bottom: 25px;
`;
const ImgCaption = styled.div`
  text-align: center;
  padding: 10px 20px;
`;
const MapWithMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 32.724143, lng: -117.137424 }}
    >
      {props.locations.length
        ? props.locations.map(loc => (
            <Marker
              key={loc}
              position={{
                lat: +loc.split(",")[0],
                lng: +loc.split(",")[1]
              }}
            />
          ))
        : null}
    </GoogleMap>
  ))
);
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poke: {},
      url: "",
      locations: [],
      saved: false
    };
  }
  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.props.id}`)
      .then(res => {
        let saved = false;

        if (localStorage.getItem(res.data.name)) {
          saved = true;
        }
        this.setState({
          poke: res.data,
          url: res.data.sprites.front_default,
          saved: saved
          //   locations:[
          //     "32.734778,-117.152630",
          //     "32.734196,-117.139709",
          //     "32.833744,-117.067149",
          //     "32.819219,-117.029244",
          //     "32.907707,-116.797917"
          // ]
        });
      });

    axios
      .get(`https://api.craft-demo.net/pokemon/${this.props.id}`, {
        headers: {
          "x-api-key": process.env.API_KEY,
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(loc => {
        this.setState({ locations: loc.data.locations });
      });
  }
  handleSave = e => {
    if (e.target.checked) {
      //assumming that there will be support for local storage
      localStorage.setItem(this.state.poke.name, this.state.poke.id);
      this.setState({ saved: true });
    } else {
      localStorage.removeItem(this.state.poke.name);
      this.setState({ saved: false });
    }
  };
  render() {
    const { poke, url, locations, saved } = this.state;

    return (
      <React.Fragment>
        {!poke.id ? (
          <h1 data-testid="load-mode">Loading ...</h1>
        ) : (
          <DetailsWrapper>
            <DetailsLeft>
              <PokeWrapper key={poke.name}>
                <ImgCaption>
                  <img src={url} alt="Pokemon" />
                  <p data-testid="detail-name">{poke.name}</p>
                </ImgCaption>
                <p>
                  Height: {poke.height}
                  <br />
                  <br />
                  weight: {poke.weight}
                  <br />
                  <br />
                  In Bag:
                  <input
                    type="checkbox"
                    onChange={this.handleSave}
                    checked={saved}
                  />
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  A scelerisque purus semper eget duis at. Mattis rhoncus urna
                  neque viverra justo. Aliquam sem fringilla ut morbi tincidunt.
                  Gravida rutrum quisque non tellus orci. Neque ornare aenean
                  euismod elementum nisi quis eleifend. Quam vulputate dignissim
                  suspendisse in est ante in nibh mauris. Feugiat in fermentum
                  posuere urna nec. Quis hendrerit dolor magna eget est lorem
                  ipsum. Ultrices tincidunt arcu non sodales neque. Tempus
                  iaculis urna id volutpat lacus laoreet. Aliquam ut porttitor
                  leo a diam sollicitudin tempor id. Volutpat maecenas volutpat
                  blandit aliquam etiam erat. Nisl condimentum id venenatis a
                  condimentum vitae. Massa sapien faucibus et molestie ac
                  feugiat sed lectus. In tellus integer feugiat scelerisque
                  varius morbi enim. Habitant morbi tristique senectus et.
                  Malesuada fames ac turpis egestas maecenas. Varius quam
                  quisque id diam.
                </p>
                {poke.abilities ? (
                  <React.Fragment>
                    <h2>Abilities</h2>
                    <ul>
                      {poke.abilities.map(ab => (
                        <li key={ab.ability.name}>{ab.ability.name}</li>
                      ))}
                    </ul>
                  </React.Fragment>
                ) : null}
              </PokeWrapper>
            </DetailsLeft>
            <DetailsRight>
              <MapWithMarker
                locations={locations}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.MAPS_API
                }&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </DetailsRight>
          </DetailsWrapper>
        )}
      </React.Fragment>
    );
  }
}
export default Details;
