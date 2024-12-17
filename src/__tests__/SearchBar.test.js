import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

// Mock useSearchParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

const mockSetSearchParams = jest.fn();

beforeEach(() => {
  useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
});

// Mock window.alert
beforeAll(() => {
  window.alert = jest.fn();
});

test("renders SearchBar with input and button", () => {
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  );
  // Check for the input element
  const inputElement = screen.getByPlaceholderText(/Civic/i);
  expect(inputElement).toBeInTheDocument();

  // Check for the search buttons
  const buttonElements = screen.getAllByRole("button");
  expect(buttonElements.length).toBe(3); // There are three SearchButton components
});

test("handles input change", () => {
  render(
    <BrowserRouter>
      <SearchBar />
    </BrowserRouter>
  );

  // Check for the input element
  const inputElement = screen.getByPlaceholderText(/Civic/i);
  fireEvent.change(inputElement, { target: { value: "test" } });
  expect(inputElement.value).toBe("test");
});
