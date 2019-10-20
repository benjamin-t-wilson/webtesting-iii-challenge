// Test away!
import React from "react";
import Dashboard from "./Dashboard.js";
import { render } from "@testing-library/react";

//renders the component
test("Component renders", () => {
  render(<Dashboard />);
});

test("shows controls and display", () => {
  //destructures getByText to check dashboard by default
    const { getByText } = render(<Dashboard />);

    //checks the image for the text open or closed
    const display = getByText(/open/i)
    const controls = getByText(/close gate/i)

    //expects both elements to be present
    expect(display).toBeDefined();
    expect(controls).toBeDefined();
})