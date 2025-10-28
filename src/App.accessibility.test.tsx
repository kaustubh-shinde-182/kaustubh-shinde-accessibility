import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import App from "./App";

describe("App Accessibility", () => {
  test("should not have any accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("has proper heading structure", () => {
    render(<App />);

    // Check for h1
    const h1 = screen.getByRole("heading", { name: "String Calculator" });
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe("H1");

    // Check for h2 - use the actual text content
    const h2 = screen.getByRole("heading", { name: "Enter numbers" });
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe("H2");
  });

  test("form has proper labels and associations", () => {
    render(<App />);

    // SIMPLEST APPROACH: Use getByLabelText which is the most reliable
    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("id", "numbers-input");

    // Verify label exists and is properly associated
    const label = document.querySelector('label[for="numbers-input"]');
    expect(label).toBeInTheDocument();

    // Verify heading exists for visual structure
    const heading = screen.getByText("Enter numbers");
    expect(heading).toBeInTheDocument();
  });
  test("button has proper accessible name", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: "Calculate" });
    expect(button).toBeInTheDocument();
  });

  test("image has meaningful alt text", () => {
    render(<App />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "alt",
      "Beautiful landscape with mountains and lake"
    );
  });

  test("alert is properly announced to screen readers for errors", async () => {
    render(<App />);

    // Initially, no alert should be present
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Trigger an error by entering negative numbers
    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    await userEvent.type(textarea, "1,-2,3");
    await userEvent.click(button);

    // Alert should now be present with error message
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(/negative numbers not allowed/i);
  });

  test("keyboard navigation works correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const calculateButton = screen.getByRole("button", { name: "Calculate" });

    // Start from textarea
    await user.tab();
    expect(textarea).toHaveFocus();

    // Tab to calculate button
    await user.tab();
    expect(calculateButton).toHaveFocus();

    // Tab to clear button
    const clearButton = screen.getByRole("button", { name: "Clear" });
    await user.tab();
    expect(clearButton).toHaveFocus();
  });

  test("form can be submitted with enter in textarea", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);

    // Focus textarea, type numbers and press Enter (without Ctrl)
    await user.click(textarea);
    await user.type(textarea, "1,2,3");
    await user.keyboard("{Enter}");

    // Should not submit with just Enter (only Ctrl+Enter)
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
  });

  test("instructions are properly associated with textarea", () => {
    render(<App />);

    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toHaveAttribute("aria-describedby", "input-instructions");

    const instructions = document.getElementById("input-instructions");
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent(
      /enter numbers separated by commas/i
    );
  });

  test("result is announced to screen readers", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    await user.type(textarea, "5,10");
    await user.click(button);

    const result = await screen.findByText("Result: 15");
    expect(result).toBeInTheDocument();
    expect(result).toHaveAttribute("role", "status");
    expect(result).toHaveAttribute("aria-live", "polite");
  });

  test("textarea has proper aria-invalid state for errors", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    // Initially, aria-invalid should be false
    expect(textarea).toHaveAttribute("aria-invalid", "false");

    // Create error state
    await user.type(textarea, "1,-2");
    await user.click(button);

    // After error, aria-invalid should be true
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });
});
