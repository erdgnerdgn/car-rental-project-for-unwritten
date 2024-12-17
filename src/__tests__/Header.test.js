import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

test("renders Sign up button", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check for the Sign up button
  const buttonElement = screen.getByText(/Sign up/i);
  expect(buttonElement).toBeInTheDocument();
});

test("renders logo image", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Check for the logo image
  const logoElement = screen.getByAltText(/BMW Logo/i);
  expect(logoElement).toBeInTheDocument();
});

test("renders CustomButton with correct props", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  // Check for the CustomButton
  const buttonElement = screen.getByRole("button", { name: /Sign up/i });
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass(
    "bg-primary-blue rounded-full text-white min-w-[130px] hover:bg-blue-800"
  );
});
