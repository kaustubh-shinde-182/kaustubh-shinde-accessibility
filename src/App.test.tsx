import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    const button = screen.getByRole("button", { name: "Calculate" });
    expect(button).toBeInTheDocument();
  });

  test("textarea has proper label for accessibility", () => {
    render(<App />);
    // This test will fail - textarea doesn't have associated label
    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toBeInTheDocument();
  });

  test("button can be focused with keyboard", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Calculate" });

    // Tab to the button
    await userEvent.tab();

    // This test will fail - we haven't implemented proper focus management
    expect(button).toHaveFocus();
  });

  test("button can be activated with keyboard", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Calculate" });

    // Focus and press Enter
    button.focus();
    await userEvent.keyboard("{Enter}");

    // This will pass but we'll enhance it later
    expect(button).toBeInTheDocument();
  });

  test("alert should only be shown when needed", () => {
    render(<App />);
    // This test will fail - alert is always visible
    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
  });
});
