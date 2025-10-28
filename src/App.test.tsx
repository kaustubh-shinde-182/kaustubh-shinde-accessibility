import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Functionality", () => {
  test("renders string calculator heading", () => {
    render(<App />);
    const heading = screen.getByText("String Calculator");
    expect(heading).toBeInTheDocument();
  });

  test("user can type in textarea", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    await user.type(textarea, "1,2,3");

    expect(textarea).toHaveValue("1,2,3");
  });

  // test("calculate button shows alert when clicked", async () => {
  //   render(<App />);
  //   const user = userEvent.setup();

  //   const button = screen.getByRole("button", { name: "Calculate" });
  //   await user.click(button);

  //   const alert = await screen.findByRole("alert");
  //   expect(alert).toBeInTheDocument();
  //   expect(alert).toHaveTextContent("Make sure you enter numbers correctly!");
  // });

  test("calculate button shows result for valid input", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    await user.type(textarea, "1,2,3");
    await user.click(button);

    const result = await screen.findByText("Result: 6");
    expect(result).toBeInTheDocument();
  });

  test("calculate button shows error for negative numbers", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const button = screen.getByRole("button", { name: "Calculate" });

    await user.type(textarea, "1,-2,3");
    await user.click(button);

    const errorAlert = await screen.findByRole("alert");
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(/negative numbers not allowed/i);
  });

  test("clear button resets the form", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByLabelText(/enter numbers/i);
    const clearButton = screen.getByRole("button", { name: "Clear" });

    await user.type(textarea, "1,2,3");
    await user.click(clearButton);

    expect(textarea).toHaveValue("");
    expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
  });
});
