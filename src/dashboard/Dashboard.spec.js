// Test away
import React from "react";

import { render, fireEvent } from "@testing-library/react";

import Dashboard from "./Dashboard";

test("Dashboard renders without crashing", () => {
  render(<Dashboard />);
});

//show controls and display

test("controls and display are rendered", () => {
  const { getByText } = render(<Dashboard />);
  getByText(/unlocked/i);
  getByText(/open/i);
  getByText(/close gate/i);
  getByText(/lock gate/i);
});

//defaults to unlocked and open

test("defaults to unlocked and open", () => {
  const { getByText } = render(<Dashboard />);
  getByText(/Unlocked/);
  getByText(/Open/);
});

//cannot be closed or opened if locked (assuming the readme meant cannot be opened??? confusing.)
test("cannot be closed or opened if locked", () => {
  const { getByText } = render(<Dashboard />);
  const lock = getByText(/lock gate/i);
  const close = getByText(/close gate/i);

  fireEvent.click(close);
  fireEvent.click(lock);

  const open = getByText(/open gate/i);

  expect(open.disabled).toBe(true);
});

//displays if gate is open/closed and if it is locked/unlocked
test("displays if the gate is open/closed and if it is locked/unlocked", () => {
  const { getByText } = render(<Dashboard />);

  //default state, check if display shows open and unlocked
  getByText(/open/i);
  getByText(/unlocked/i);

  const closeGate = getByText(/close gate/i);
  const lockGate = getByText(/lock gate/i);

  //close and lock gate, check if display shows closed and locked
  fireEvent.click(closeGate);
  fireEvent.click(lockGate);

  getByText(/closed/i);
  getByText(/Locked/i);

  //
});

//buttons' text changes to reflect the state the door will be in if clicked
test("button text changes to reflect the state the door will be in if clicked", () => {
  const { getByText } = render(<Dashboard />);

  //when "Close Gate" is clicked, text on button changes to "Open Gate"
  const closeGate = getByText(/close gate/i);
  fireEvent.click(closeGate);
  getByText(/open gate/i);

  //when "Lock Gate" is clicked, text on button changes to "Unlock Gate"
  const lockGate = getByText(/Lock Gate/);
  fireEvent.click(lockGate);
  getByText(/unlock gate/i);

  //when "unlock gate is clicked, text on button changes to "Lock Gate"
  const unlockGate = getByText(/unlock gate/i);
  fireEvent.click(unlockGate);
  getByText(/Lock Gate/);

  //when "Open Gate" is clicked, text on button changes to "Close Gate"
  const openGate = getByText(/open gate/i);
  fireEvent.click(openGate);
  getByText(/close gate/i);
});
