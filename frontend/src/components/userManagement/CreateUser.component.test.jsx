import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CreateUser from "./CreateUser.component";

test("renders the CreateUser button page", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("Date Of Birth input should have a type as email", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const DateOfBirth = screen.getByPlaceholderText("Date Of Birth");
  expect(DateOfBirth).toHaveAttribute("type", "date");
});

// ────────────────────────────────────────────────────────────────────────────────

test("email input should have a type as email", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("E-mail");
  expect(email).toHaveAttribute("type", "email");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Email of the CreateUser page", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const element = screen.getByText("E-mail *");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Account Type of the CreateUser page", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const element = screen.getByText("Account Type *");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("Date Of Birth input should have a type as password", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const DateOfBirth = screen.getByPlaceholderText("Date Of Birth");
  expect(DateOfBirth).toHaveAttribute("type", "date");
});

// ────────────────────────────────────────────────────────────────────────────────

test("E-mail input should required", () => {
  render(
    <BrowserRouter>
      <CreateUser />
    </BrowserRouter>
  );
  const Email = screen.getByPlaceholderText("E-mail");
  expect(Email).toHaveAttribute("required");
});
