import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../components/Hero";

global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Hero Component", () => {
  it("renders the Hero component with title and subtitle", () => {
    render(<Hero />);

    // Check for the title
    const titleElement = screen.getByText(
      /Feel the Freedom, Start the Journey!/i
    );
    expect(titleElement).toBeInTheDocument();

    // Check for the subtitle
    const subtitleElement = screen.getByText(
      /Are you ready for an unforgettable journey with gold standard service?/i
    );
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders the CustomButton and handles click", () => {
    render(<Hero />);
    // Check for the button
    const buttonElement = screen.getByRole("button", {
      name: /Discover the Cars/i,
    });
    expect(buttonElement).toBeInTheDocument();

    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    // Mock getElementById to return an element
    document.getElementById = jest.fn().mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    });

    // Click the button
    fireEvent.click(buttonElement);
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it("renders the motion image", () => {
    render(<Hero />);

    // Check for the image
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/hero.png");
  });
});
