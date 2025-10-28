import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("App", () => {
  test("renders string calculator heading", () => {
    render(<App />);
    const heading = screen.getByText("String Calculator");
    expect(heading).toBeInTheDocument();
  });
});
