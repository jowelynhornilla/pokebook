import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PokemonCards, dataElementNames } from ".";
import { usePromise } from "hooks/usePromise";

jest.mock("hooks/usePromise");

const mockUsePromise = usePromise as jest.MockedFunction<typeof usePromise>;

describe("GIVEN PokemonCards", () => {
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

  it("THEN renders Pokemon cards after data fetch", async () => {
    const mockPokemonData = {
      data: {
        count: 10,
        results: [
          { name: "pokemon1" },
          { name: "pokemon2" },
          { name: "pokemon3" },
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

    const cards = screen.getAllByTestId(dataElementNames.card);

    expect(cards.length).toEqual(mockPokemonData.data.results.length);
  });
});

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <PokemonCards />
    </BrowserRouter>
  );
};
