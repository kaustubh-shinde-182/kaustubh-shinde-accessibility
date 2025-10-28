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

    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("String Calculator");

    const subHeading = screen.getByRole("heading", { level: 2 });
    expect(subHeading).toHaveTextContent("Enter numbers");
  });

  test("form has proper labels and associations", () => {
    render(<App />);

    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toHaveAttribute("id", "numbers-input");

    const label = screen.getByText(/enter numbers/i);
    expect(label).toHaveAttribute("for", "numbers-input");
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

  test("alert is properly announced to screen readers", async () => {
    render(<App />);

    // Initially, no alert should be present
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Trigger the alert
    const button = screen.getByRole("button", { name: "Calculate" });
    await userEvent.click(button);

    // Alert should now be present and visible
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Make sure you enter numbers correctly!");
  });

  test("keyboard navigation works correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    // Start from textarea
    await user.tab();
    expect(textarea).toHaveFocus();

    // Tab to button
    await user.tab();
    expect(button).toHaveFocus();

    // Shift+Tab back to textarea
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(textarea).toHaveFocus();
  });

  test("form can be submitted with keyboard", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    // Focus textarea and use Ctrl+Enter
    await user.click(textarea);
    await user.keyboard("{Control>}{Enter}{/Control}");

    // Alert should appear
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  test("instructions are properly associated with textarea", () => {
    render(<App />);

    const textarea = screen.getByLabelText(/enter numbers/i);
    expect(textarea).toHaveAttribute("aria-describedby", "input-instructions");

    const instructions = screen.getByText(/enter numbers separated by commas/i);
    expect(instructions).toHaveAttribute("id", "input-instructions");
  });
});
