import React ,{useState} from 'react';
import { Provider } from 'react-redux';
import {render,screen,fireEvent, waitFor} from '@testing-library/react'
import { store } from '../../../app/store';
import Calendar from '../calendar/Calendar';

jest.mock("axios", () => ({
  get: jest.fn(() => {}),
  default: jest.fn(() => {}),
}));

describe("Calendar renders properly",()=>{
  it('should render calendar component', () => {
    render(<Provider store={store}><Calendar /></Provider>);

    const getMonthName = screen.getByText("March 2023");
    const getMonthName1 = screen.getByTestId("month-name");

    expect(getMonthName).toBeInTheDocument();
    expect(getMonthName1).toHaveTextContent("March 2023");
  });

  it('render calendar and click on month view button',()=>{
    render(<Provider store={store}><Calendar /></Provider>);
    
    const monthBtn = screen.getByTestId('month-view');
    fireEvent.click(monthBtn);

    const getTilesOfWeek = screen.getAllByTestId("calendar-tile");
    expect(getTilesOfWeek).toHaveLength(42);
  });

  it('render calendar and click on week view button',()=>{
    render(<Provider store={store}><Calendar /></Provider>);
    
    const weekBtn = screen.getByTestId('week-view');
    fireEvent.click(weekBtn);

    const getTilesOfWeek = screen.getAllByTestId("calendar-tile");
    expect(getTilesOfWeek).toHaveLength(7);
  });
  
  it('render calendar, click on month view button and then on prev button ',()=>{
    render(<Provider store={store}><Calendar /></Provider>);
    
    const monthBtn = screen.getByTestId('month-view');
    fireEvent.click(monthBtn);
    const getMonthName = screen.getByTestId("month-name");

    const prevBtn = screen.getByTestId('prev-btn');
    fireEvent.click(prevBtn);
    const getTilesOfWeek = screen.getAllByTestId("calendar-tile");
    
    expect(getMonthName).toHaveTextContent("February 2023");
    expect(getTilesOfWeek).toHaveLength(42);

  });

  it('render calendar, click on month view button and then on next button',()=>{
    render(<Provider store={store}><Calendar /></Provider>);
    
    const monthBtn = screen.getByTestId('month-view');
    fireEvent.click(monthBtn);
    const getTilesOfWeek = screen.getAllByTestId("calendar-tile");
    
    const nextBtn = screen.getByTestId('next-btn');
    fireEvent.click(nextBtn);
    const getMonthName = screen.getByTestId("month-name");

    expect(getTilesOfWeek).toHaveLength(42);
    expect(getMonthName).toHaveTextContent("April 2023");
  });

  it('render calendar in week view and then click on prev button',()=>{
    render(<Provider store={store}><Calendar /></Provider>);
    
    const weekBtn = screen.getByTestId('week-view');
    fireEvent.click(weekBtn);
    const getTilesOfWeek = screen.getAllByTestId("calendar-tile");

    const prevBtn = screen.getByTestId('prev-btn');
    fireEvent.click(prevBtn);
    const getTilesOfPrevWeek = screen.getAllByTestId("calendar-tile");
    
    expect(getTilesOfWeek).toHaveLength(7);
    expect(getTilesOfPrevWeek).toHaveLength(7);
  });
  

})

