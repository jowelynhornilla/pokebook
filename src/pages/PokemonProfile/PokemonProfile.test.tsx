import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PokemonProfile, dataElementNames } from ".";
import { usePromise } from "hooks/usePromise";

jest.mock("hooks/usePromise");

const mockUsePromise = usePromise as jest.MockedFunction<typeof usePromise>;

describe("GIVEN PokemonProfile", () => {
  it("THEN renders loader while fetching data", () => {
    mockUsePromise.mockReturnValue({
      fulfilled: false,
      rejected: false,
      pending: true,
      reason: undefined,
      call: () => new Promise(jest.fn()),
    });

    renderComponent();

    expect(screen.getByTestId(dataElementNames.loader)).toBeInTheDocument();
  });

  it("THEN renders Pokemon Name, Image, Type Badges, and Stats after data fetch", async () => {
    const mockPokemonData = {
      data: {
        name: "pokemon1",
        types: [
          {
            slot: "Slot A",
            type: {
              name: "Type Name",
            },
          },
        ],
        stats: [
          {
            stat: {
              name: "HP",
              base_stat: 100,
            },
          },
          {
            stat: {
              name: "DEF",
              base_stat: 200,
            },
          },
        ],
      },
    };

    mockUsePromise.mockReturnValue({
      fulfilled: true,
      rejected: false,
      pending: false,
      reason: undefined,
      value: mockPokemonData.data,
      call: () => new Promise(jest.fn()),
    });

    renderComponent();

    const name = screen.getByTestId(dataElementNames.name);
    const image = screen.getByTestId(dataElementNames.image);
    const types = screen.getAllByTestId(dataElementNames.type);
    const stats = screen.getByTestId(dataElementNames.stats);
    const stat = screen.getAllByTestId(dataElementNames.stat);

    expect(name).toHaveTextContent(mockPokemonData.data.name);
    expect(image).toBeInTheDocument();
    expect(types.length).toEqual(mockPokemonData.data.types.length);
    expect(stats).toBeInTheDocument();
    expect(stat.length).toEqual(mockPokemonData.data.stats.length);
  });
});

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <PokemonProfile />
    </BrowserRouter>
  );
};
