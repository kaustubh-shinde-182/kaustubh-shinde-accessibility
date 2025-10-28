import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders string calculator heading", () => {
    render(<App />);
    const heading = screen.getByText("String Calculator");
    expect(heading).toBeInTheDocument();
  });
  test("image has alt text for accessibility", () => {
    render(<App />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt");
    expect(image.getAttribute("alt")).not.toBe("");
  });

  test("calculate button is accessible with button role", () => {
    render(<App />);
    const button = screen.getByText("Calculate");
    expect(button).toBeInTheDocument();
    // This test will fail initially - div doesn't have button role
    expect(button).toHaveAttribute("role", "button");
  });
});
