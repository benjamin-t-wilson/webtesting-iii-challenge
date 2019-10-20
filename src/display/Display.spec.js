// Test away!
import React from "react";
import Display from "./Display.js";
import { render } from "@testing-library/react";

//tests if component runs
test("Component renders", () => {
  render(<Display />);
});

test("displays if gate is open/closed and if it is locked/unlocked", () => {
  //destructures getByText to check dashboard by default
  const { getByText } = render(<Display />);

  //finds the divs by text to see if they are present
  const open = getByText(/open/i);
  const locked = getByText(/unlocked/i);

  //asserts that both elements are present
  expect(open).toBeDefined();
  expect(locked).toBeDefined();
});

test("displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise", () => {
    //create a variable to hold boolean value
  var toggled = true;

  //create a function to change boolean value
  const toggler = () => {
    toggled = false;
  };

  //destructures getByText and findByText to check dashboard by default
  const { getByText, findByText } = render(<Display closed={toggled} />);

  //finds element by text of closed
  const closed = getByText(/closed/i);

  //assert that it is present
  expect(closed).toBeDefined();

  //run function to change boolean value
  toggler();

  //finds element by text
  const open = findByText(/open/i);

  //asserts that the text has changed
  expect(open).toBeDefined();
});

//almost identical to previous test, check comments there
test("displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise", () => {
  var toggled = true;
  const toggler = () => {
    toggled = false;
  };
  const { getByText, findByText } = render(<Display locked={toggled} />);

  const locked = getByText(/locked/i);

  expect(locked).toBeDefined();

  toggler();

  const unlocked = findByText(/unlocked/i);

  expect(unlocked).toBeDefined();
});

test("when `locked` or `closed` use the `red-led` class", () => {
    //allows me to check the image of display with values of props passed
  const { container } = render(<Display locked={true} closed={true} />);

  //creates a nodelist of items with the class of .red-led
  const redLeds = container.querySelectorAll(".red-led");

  //length of nodelist should be 2
  expect(redLeds.length).toBe(2);
});

//almost identical to previous test, check that
test("when `unlocked` or `open` use the `green-led` class", () => {
  const { container } = render(<Display locked={false} closed={false} />);
  const greenLeds = container.querySelectorAll(".green-led");
  expect(greenLeds.length).toBe(2);
});
