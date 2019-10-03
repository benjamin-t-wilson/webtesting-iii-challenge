// Test away!
import React from "react";
import Controls from "./Controls.js";
import { render, fireEvent } from "@testing-library/react";

test("Component renders", () => {
  //renders the controls component
  render(<Controls />);
});

test("Provides buttons to toggle states", () => {
  //destructures getByText to check the rendered image of Controls
  const { getByText } = render(<Controls />);

  //Grabs the element (button) with text "close gate"
  const closeGate = getByText(/close gate/i);
  const lockGate = getByText(/lock gate/i);

  //expects both variables to be present
  expect(closeGate).toBeDefined();
  expect(lockGate).toBeDefined();
});

test("open button text changes to reflect state the door will be in if clicked", () => {
  //establishing values for props passed in real component
  const locked = false;
  const closed = false;
  const toggleClosed = jest.fn(); // fake function :)

  //destructure to have getByText and findByText to check Controls
  const { getByText, findByText } = render(
    <Controls locked={locked} closed={closed} toggleClosed={toggleClosed} />
  );

  //finds the button by the text
  const closeBtn = getByText(/close gate/i);

  //clicks the button, which runs the toggle function in the real component
  fireEvent.click(closeBtn);

  //finds the button by the new text
  const openBtn = findByText(/open gate/i);

  //expects the updated button to be present, and the toggle function to have been called
  expect(openBtn).toBeDefined();
  expect(toggleClosed).toHaveBeenCalled();
});

//nearly identical to previous test, check comments on that one
test("lock button text changes to reflect state the door will be in if clicked", () => {
  const locked = false;
  const closed = true;
  const toggleLocked = jest.fn();
  const { getByText, findByText } = render(
    <Controls locked={locked} closed={closed} toggleLocked={toggleLocked} />
  );

  const lockBtn = getByText(/lock gate/i);

  fireEvent.click(lockBtn);

  const unlockBtn = findByText(/unlock gate/i);

  expect(unlockBtn).toBeDefined();
  expect(toggleLocked).toHaveBeenCalled();
});

test("the closed toggle button is disabled if gate is locked", () => {
  //establishes variables for props passed in real component
  const locked = true;
  const closed = true;
  const toggleClosed = jest.fn();

  //destructure to have getByText and findByText to check Controls
  const { getByText } = render(
    <Controls locked={locked} closed={closed} toggleClosed={toggleClosed} />
  );

  //finds button by text on it
  const openBtn = getByText(/open gate/i);

  //fires the toggle function
  fireEvent.click(openBtn);

  //expects function to be unable to run
  expect(toggleClosed).not.toHaveBeenCalled();
});

//nearly identical to previous test, check comments there
test("the locked toggle button is disabled if gate is open", () => {
  const locked = false;
  const closed = false;
  const toggleLocked = jest.fn();
  const { getByText } = render(
    <Controls locked={locked} closed={closed} toggleLocked={toggleLocked} />
  );

  const lockBtn = getByText(/lock gate/i);

  fireEvent.click(lockBtn);

  expect(toggleLocked).not.toHaveBeenCalled();
});
