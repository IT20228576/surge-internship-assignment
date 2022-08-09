import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register.component";

test("renders the Register button page", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("password input should have a type as password", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const password = screen.getByPlaceholderText("Password");
  expect(password).toHaveAttribute("type", "password");
});

// ────────────────────────────────────────────────────────────────────────────────

test("email input should have a type as email", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const email = screen.getByPlaceholderText("E-mail");
  expect(email).toHaveAttribute("type", "email");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the email of the Register page", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const element = screen.getByText("E-mail");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the password of the Register page", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const element = screen.getByText("Password");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("Date Of Birth input should have a type as password", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const DateOfBirth = screen.getByPlaceholderText("Date Of Birth");
  expect(DateOfBirth).toHaveAttribute("type", "date");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Password Verify input should have a type as password", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const element = screen.getByPlaceholderText("Password Verify");
  expect(element).toHaveAttribute("type", "password");
});

// ────────────────────────────────────────────────────────────────────────────────

test("First Name input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const FirstName = screen.getByPlaceholderText("First Name");
  expect(FirstName).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Last Name input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const LastName = screen.getByPlaceholderText("Last Name");
  expect(LastName).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Date Of Birth input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const DateOfBirth = screen.getByPlaceholderText("Date Of Birth");
  expect(DateOfBirth).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Mobile input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const Mobile = screen.getByPlaceholderText("Mobile");
  expect(Mobile).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("E-mail input should disabled", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const Email = screen.getByPlaceholderText("E-mail");
  expect(Email).toHaveAttribute("disabled");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Password input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const Password = screen.getByPlaceholderText("Password");
  expect(Password).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Password Verify input should required", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const PasswordVerify = screen.getByPlaceholderText("Password Verify");
  expect(PasswordVerify).toHaveAttribute("required");
});