import React from "react";
import { render, screen } from "@testing-library/react";
import CustomButton from "../components/CustomButton";

// Test case to check if the CustomButton component renders correctly with the given title and styling
test("renders CustomButton with correct title and styling", () => {
  // Define the props for the CustomButton component
  const title = "Click Me"; // The text to be displayed on the button
  const btnType = "button"; // The type of the button
  const designs = "bg-primary-blue rounded-full text-white"; // The CSS classes to be applied to the button

  // Render the CustomButton component with the defined props
  render(<CustomButton title={title} btnType={btnType} designs={designs} />);
  // Check if the button with the correct title is rendered
  const buttonElement = screen.getByRole("button", { name: /Click Me/i });
  expect(buttonElement).toBeInTheDocument(); // Assert that the button is in the document

  // Check if the button has the correct CSS classes applied
  expect(buttonElement).toHaveClass(designs); // Assert that the button has the specified classes
});
