import React, { useState } from "react";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimesheetPage from "../TimesheetPage";
import axios from "axios";
import TimesheetForm from "../TimesheetForm";
import { store } from "../../../app/store";
import dayjs from "dayjs";

jest.mock("axios", () => ({
  get: jest.fn(() => {}),
  default: jest.fn(() => {}),
}));

describe("TimesheetForm renders properly", () => {
  it("should render timesheet form with header and input elements", () => {
    render(
      <Provider store={store}>
        <TimesheetForm />
      </Provider>
    );

    const headerElement = screen.getByText("Time Sheet Information");
    const projectField = screen.getByLabelText("Project Name");
    const descriptionField = screen.getByTestId("description");
    const dateField = screen.getByLabelText("Date");
    const totalHoursField = screen.getByTestId("totalHours");
    const cancelModalButton = screen.getByTestId("cancel-modal");

    expect(headerElement).toBeInTheDocument();
    expect(projectField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(dateField).toBeInTheDocument();
    expect(totalHoursField).toBeInTheDocument();
    expect(cancelModalButton).toBeInTheDocument();
  });

  it("render timesheet form and check date field as disabled with date ", () => {
    render(
      <Provider store={store}>
        <TimesheetForm dateSelected={new Date()} />
      </Provider>
    );

    const date = screen.getByTestId("date") as HTMLInputElement;
    const expectedDate = dayjs(date.value).format("YYYY-MM-DD");
    const actualDate = dayjs(new Date()).format("YYYY-MM-DD");

    expect(expectedDate).toBe(actualDate);
    expect(date).toHaveClass("Mui-disabled");
  });

  it("render timesheet form and check project field as disabled with project name ", () => {
    render(
      <Provider store={store}>
        <TimesheetForm dateSelected={new Date()}/>
      </Provider>
    );

    const projectName = screen.getByTestId("projectName") as HTMLInputElement;

    expect(projectName.value).toBe("<some_project_name>");
    expect(projectName).toHaveClass("Mui-disabled");
  });

  it("render timesheet form and submit empty form", () => {
    render(
      <Provider store={store}>
        <TimesheetForm dateSelected={new Date()} />
      </Provider>
    );
    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const getErrorTextOfDesc = screen.getByText("You must enter a description");
    const getErrorTextOfTotalHours = screen.getByText(
      "You must enter your total hours spent"
    );

    expect(getErrorTextOfDesc).toBeInTheDocument();
    expect(getErrorTextOfTotalHours).toBeInTheDocument();
  });

  it("render timesheet form and submit only with description as input", () => {
    render(
      <Provider store={store}>
        <TimesheetForm dateSelected={new Date()} />
      </Provider>
    );

    const descriptionField = screen.getByTestId("description");
    fireEvent.change(descriptionField, { target: { value: "my description" } });
    const submitBtn = screen.getByTestId("submit-btn");
    fireEvent.click(submitBtn);

    const getErrorTextOfTotalHours = screen.getByText(
      "You must enter your total hours spent"
    );
    expect(getErrorTextOfTotalHours).toBeInTheDocument();
  });
});
