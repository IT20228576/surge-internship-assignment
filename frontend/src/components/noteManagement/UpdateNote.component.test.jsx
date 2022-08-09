import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import UpdateNote from "./UpdateNote.component";

test("renders the UpdateNote page", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("Title input should have a type as text", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const Title = screen.getByPlaceholderText("Title");
  expect(Title).toHaveAttribute("type", "text");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Description input should have a type as text", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const Description = screen.getByPlaceholderText("Description");
  expect(Description).toHaveAttribute("type", "text");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Description of the UpdateNote page", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const element = screen.getByText("Description");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Title of the UpdateNote page", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const element = screen.getByText("Title");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("Title input should required", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const Title = screen.getByPlaceholderText("Title");
  expect(Title).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Description input should required", () => {
  render(
    <BrowserRouter>
      <UpdateNote />
    </BrowserRouter>
  );
  const Description = screen.getByPlaceholderText("Description");
  expect(Description).toHaveAttribute("required");
});