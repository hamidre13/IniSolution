import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import PokemonList from "../PokemonList";

import { readFileSync } from "fs";
import path from "path";
import { Exception } from "handlebars";

const pokes = JSON.parse(readFileSync(path.join(__dirname, "/res.json")));

afterEach(cleanup);

describe("Testing the functionality of main page", () => {
  test("Pokemon List items", async () => {
    const { container, getByTestId, getByText } = render(<PokemonList />);
    const AllPoke = await waitForElement(() => getByTestId("poke-container"));
    expect(AllPoke.children.length).toEqual(pokes.results.length);
  });
  xtest("Testing to match the design", async () => {
    const { container, getByTestId, getByText } = render(<PokemonList />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-bxivhb dlOnjD"
        >
          <div
            class="sc-ifAKCX goxUWy"
          >
            <button>
              Bag
            </button>
            <button>
              Show All
            </button>
          </div>
          <div
            class="sc-ifAKCX goxUWy"
          >
            <input
              placeholder="search"
            />
          </div>
        </div>
        <div
          class="sc-bdVaJa gxzDak"
        >
          <h1>
            Loading ....
          </h1>
        </div>
      </div>
    `);
  });
});
