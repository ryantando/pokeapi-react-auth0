import React from "react";
import Home from "../Home";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(() => ({
    isLoading: false,
    isAuthenticated: true,
    getAccessTokenSilently: jest.fn(() => Promise.resolve("access-token")),
  })),
  withAuthenticationRequired: jest.fn(),
}));

jest.mock("../../config", () => ({
  getConfig: jest.fn(() => ({
    domain: "test-domain.com",
    clientId: "123",
    apiOrigin: "http://localhost:3001",
    audience: "test-audience",
  })),
}));

describe("The Home", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders", () => {
    render(<Home />);
  });

  it("Click random and make a loading", async () => {
    fetch.mockResponseOnce(JSON.stringify({ msg: "This is the API result" }));

    render(<Home />);
    const getButton = screen.getByTestId("random-btn")
    fireEvent.click(getButton);

    await waitFor(() => screen.getByTestId("card-image"));
    
    const title = screen.getByTestId('card-title').textContent

    expect(title).toBe('Loading...')
  });
});