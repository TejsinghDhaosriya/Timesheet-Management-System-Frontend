import React, { useState } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
//import KeyCloakService from './security/keycloakService';
import TimesheetPage from "../TimesheetPage";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { store } from "../../../app/store";

jest.mock("axios", () => ({
  get: jest.fn(() => {}),
  default: jest.fn(() => {}),
}));

jest.spyOn(React, "useEffect");

describe("Timesheet Page renders correctly",()=>{
  it("render timesheet page and check calendar renders", () => {
    render(
      <Provider store={store}>
        <TimesheetPage />
      </Provider>
    );
  
    const getMonthNameByText = screen.getByText("March 2023");
    const getMonthNameById = screen.getByTestId("month-name");
  
    expect(getMonthNameByText).toBeInTheDocument();
    expect(getMonthNameById).toHaveTextContent("March 2023");
  });
  
  it("render timesheet page and check form-modal renders", () => {
  
    render(
      <Provider store={store}>
        <TimesheetPage />
      </Provider>
    );
  
    const calendarTile = screen.getAllByTestId("calendar-tile");
    act(() => {
      fireEvent.click(calendarTile[1]); // 27-02-2023
    });
  
    const date = screen.getByTestId("date") as HTMLInputElement;
    expect(date).toHaveClass("Mui-disabled");
  });
})

