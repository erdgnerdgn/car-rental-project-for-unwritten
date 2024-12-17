import React from "react";
import { render, screen } from "@testing-library/react";
import CustomButton from "../components/CustomButton";

// Test case to check if the CustomButton component renders correctly with the given title and styling
test("renders CustomButton with correct title and styling", () => {
  // Define the props for the CustomButton component
  const title = "Click Me"; 
  const btnType = "button"; 
  const designs = "bg-primary-blue rounded-full text-white"; 

  // Render the CustomButton component with the defined props
  render(<CustomButton title={title} btnType={btnType} designs={designs} />);
  
  const buttonElement = screen.getByRole("button", { name: /Click Me/i });
  expect(buttonElement).toBeInTheDocument(); 

  // Check if the button has the correct CSS classes applied
  expect(buttonElement).toHaveClass(designs); 
});


