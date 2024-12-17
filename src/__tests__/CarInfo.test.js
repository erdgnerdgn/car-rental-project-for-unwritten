import React from "react";
import { render, screen } from "@testing-library/react";
import CarInfo from "../components/Card/CarInfo";

test("renders CarInfo with icon and title", () => {
  const icon = "/path/to/icon.png";
  const title = "Car Title";

  render(<CarInfo icon={icon} title={title} />);

  // Check for the image element
  const imgElement = screen.getByRole("img");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute("src", icon);

  // Check for the title element
  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveClass("text-[14px]");
});
