// Test away!

import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Controls from "./Controls";

//provide buttons to toggle the `closed` and `locked` states.

test("there is a button that toggles the closed state", () => {
  const toggleClosed = jest.fn();
  const { getByText } = render(
    <Controls closed={false} locked={false} toggleClosed={toggleClosed} />
  );
  const closeGate = getByText(/close gate/i);

  fireEvent.click(closeGate);
  expect(toggleClosed).toBeCalled();
});

test("there is a button that toggles the locked state", () => {
  const toggleLocked = jest.fn();
  const { getByText } = render(
    <Controls closed={true} locked={false} toggleLocked={toggleLocked} />
  );
  const lockGate = getByText(/Lock Gate/);

  fireEvent.click(lockGate);
  expect(toggleLocked).toBeCalled();
});

test("the closed button is disabled if the gate is locked", () => {
  const { getByText } = render(<Controls locked={true} closed={true} />);
  const openGate = getByText(/open gate/i);
  expect(openGate.disabled).toBe(true);
});

//the locked toggle button is disabled if the gate is open
test("the locked button is disabled if the gate is open", () => {
  const { getByText } = render(<Controls locked={false} closed={false} />);
  const lockGate = getByText(/lock gate/i);
  expect(lockGate.disabled).toBe(true);
});
