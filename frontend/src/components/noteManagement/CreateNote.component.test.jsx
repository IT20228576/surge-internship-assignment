import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CreateNote from "./CreateNote.component";

test("renders the CreateNote button page", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
});

// ────────────────────────────────────────────────────────────────────────────────

test("Title input should have a type as text", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const Title = screen.getByPlaceholderText("Title");
  expect(Title).toHaveAttribute("type", "text");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Description input should have a type as text", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const Description = screen.getByPlaceholderText("Description");
  expect(Description).toHaveAttribute("type", "text");
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Description of the CreateNote page", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const element = screen.getByText("Description");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("renders the Title of the CreateNote page", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const element = screen.getByText("Title");
  expect(element).toBeInTheDocument();
});

// ────────────────────────────────────────────────────────────────────────────────

test("Title input should required", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const Title = screen.getByPlaceholderText("Title");
  expect(Title).toHaveAttribute("required");
});

// ────────────────────────────────────────────────────────────────────────────────

test("Description input should required", () => {
  render(
    <BrowserRouter>
      <CreateNote />
    </BrowserRouter>
  );
  const Description = screen.getByPlaceholderText("Description");
  expect(Description).toHaveAttribute("required");
});