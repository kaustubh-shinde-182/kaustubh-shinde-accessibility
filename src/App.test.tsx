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

  test("calculate button shows alert when clicked", async () => {
    render(<App />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Calculate" });
    await user.click(button);

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Make sure you enter numbers correctly!");
  });
});
