import React from "react";
import { render, screen } from "@testing-library/react";
import SearchButton from "../components/SearchBar/SearchButton";

test("renders SearchButton with correct styling", () => {
  const styling = "custom-styling";
  render(<SearchButton styling={styling} />);

  // Check for the button with correct styling
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass(`ml-3 z-10 ${styling}`);
});

test("renders magnifying glass image", () => {
  const styling = "custom-styling";
  render(<SearchButton styling={styling} />);

  // Check for the magnifying glass image
  const imgElement = screen.getByRole("img");
  expect(imgElement).toHaveAttribute("src", "/magnifying-glass.svg");
  expect(imgElement).toHaveAttribute("width", "40");
  expect(imgElement).toHaveAttribute("height", "40");
});
