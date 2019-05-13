import React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import { readFileSync } from "fs";
import path from "path";
import Details from "../Details";

const pokes = JSON.parse(readFileSync(path.join(__dirname, "/res.json")));

afterEach(cleanup);

describe("Testing details page functionality", () => {
  test("Detail page id and name should match the id and name of the url", async () => {
    const name = "pidgeotto";
    const id = "17";
    const { getByTestId } = render(<Details name={name} id={id} />);
    const resName = await waitForElement(() => getByTestId("detail-name"));
    
    expect(resName.textContent).toMatch(name);
  });
  xtest("Detail page general structure", async () => {
    const name = "pidgeotto";
    const id = "17";
    const { container } = render(<Details name={name} id={id} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-bdVaJa NFzwl"
      >
        <div
          class="sc-bwzfXH ezOasw"
        >
          <div
            class="sc-bxivhb latxlp"
          >
            <div
              class="sc-ifAKCX hpaQcN"
            >
              <img
                alt="Pokemon"
                src=""
              />
              <p
                data-testid="detail-name"
              />
            </div>
            <p>
              Height: 
              <br />
              <br />
              weight: 
              <br />
              <br />
              In Bag:
              <input
                type="checkbox"
              />
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A scelerisque purus semper eget duis at. Mattis rhoncus urna neque viverra justo. Aliquam sem fringilla ut morbi tincidunt. Gravida rutrum quisque non tellus orci. Neque ornare aenean euismod elementum nisi quis eleifend. Quam vulputate dignissim suspendisse in est ante in nibh mauris. Feugiat in fermentum posuere urna nec. Quis hendrerit dolor magna eget est lorem ipsum. Ultrices tincidunt arcu non sodales neque. Tempus iaculis urna id volutpat lacus laoreet. Aliquam ut porttitor leo a diam sollicitudin tempor id. Volutpat maecenas volutpat blandit aliquam etiam erat. Nisl condimentum id venenatis a condimentum vitae. Massa sapien faucibus et molestie ac feugiat sed lectus. In tellus integer feugiat scelerisque varius morbi enim. Habitant morbi tristique senectus et. Malesuada fames ac turpis egestas maecenas. Varius quam quisque id diam.
            </p>
          </div>
        </div>
        <div
          class="sc-htpNat kKeqVu"
        >
          <div
            style="height: 100%;"
          />
        </div>
      </div>
    `);
  });
});
