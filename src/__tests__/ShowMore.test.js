import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSearchParams } from "react-router-dom";
import ShowMore from "../components/ShowMore";

// Mock useSearchParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
}));

describe("ShowMore Component", () => {
  it("renders the CustomButton when isNext is true", () => {
    useSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);

    render(<ShowMore limit={5} isNext={true} />);

    // Check for the button
    const buttonElement = screen.getByRole("button", { name: /More/i });
    expect(buttonElement).toBeInTheDocument();
  });
  it("does not render the CustomButton when isNext is false", () => {
    useSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);

    render(<ShowMore limit={5} isNext={false} />);

    // Check that the button is not rendered
    const buttonElement = screen.queryByRole("button", { name: /More/i });
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("updates the URL parameters when the button is clicked", () => {
    const setParamsMock = jest.fn();
    useSearchParams.mockReturnValue([new URLSearchParams(), setParamsMock]);

    render(<ShowMore limit={5} isNext={true} />);

    // Check for the button
    const buttonElement = screen.getByRole("button", { name: /More/i });
    expect(buttonElement).toBeInTheDocument();

    // Click the button
    fireEvent.click(buttonElement);

    // Check that setParams was called with the updated parameters
    expect(setParamsMock).toHaveBeenCalledWith(new URLSearchParams("limit=10"));
  });
});
