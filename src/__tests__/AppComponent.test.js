import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

// Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

test("renders App component with header and main page", () => {
  render(<App />);

  // Check for the header
  const headerElement = screen.getByRole("banner");
  expect(headerElement).toBeInTheDocument();

  // Check for the main page content
  const mainPageContent = screen.getByText(
    /Feel the Freedom, Start the Journey!/i
  );
  expect(mainPageContent).toBeInTheDocument();
});
