
import React from "react";

import { render } from "@testing-library/react";

import Display from "./Display";

//displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise
test('closed prop is true and displays "closed"', () => {
  const { getByText } = render(<Display closed={true} />);
  getByText(/closed/i);
});

test('closed prop is false and displays "open"', () => {
  const { getByText } = render(<Display closed={false} />);
  getByText(/open/i);
});

//displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise
test('locked is true and displays "Locked"', () => {
  const { getByText } = render(<Display closed={true} locked={true} />);
  getByText(/Locked/);
});

test('locked is false and displays "Unlocked"', () => {
  const { getByText } = render(<Display closed={true} locked={false} />);
  getByText(/Unlocked/);
});

//when `locked` or `closed` use the `red-led` class
test("when closed, use the red-led class", () => {
  const { getByText } = render(<Display closed={true} locked={false} />);
  const closed = getByText(/closed/i);

  expect(closed.className).toMatch(/red-led/);
});

test("when locked, use the red-led class", () => {
  const { getByText } = render(<Display closed={true} locked={true} />);
  const locked = getByText(/Locked/);

  expect(locked.className).toMatch(/red-led/);
});

//when `unlocked` or `open` use the `green-led` class
test("when unlocked, use the green-led class", () => {
  const { getByText } = render(<Display closed={false} locked={false} />);
  const unlocked = getByText(/unlocked/i);
  const open = getByText(/open/i);

  expect(unlocked.className).toMatch(/green-led/);
  expect(open.className).toMatch(/green-led/);
});
