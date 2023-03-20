import { Grid } from '@mui/material';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import React,{useContext} from 'react'
import {useSelector} from 'react-redux';
import { timesheet_completed_color, timesheet_disabled_color } from '../../../utils/constants';
import { checkDateInSelectedDateArray, isFutureDate, isTileDisabled } from "../helper";
import { CalendarContext } from './CalendarContext';

const CalendarDayNWeekLayout = (props:any) => {
    const { selectedWeekIndex, selectedWeek } = props;
    
    const { stateCalendar, setStateCalendar } = useContext(CalendarContext)
    const { selectedDate, layout, defaultEventDuration, draggingEventId } = stateCalendar
    const viewLayout = Array.from(Array(layout === "week" ? 7 : layout === "day" ? 1 : 0).keys())
    const timesheetData = useSelector((state: any) => state.timesheet);

    const selectedDateArray = timesheetData.timesheet;

    return (<div style={{display:'flex'}}>
        {viewLayout.map((index:any)=>{
            const day = layout === "week" ? selectedWeek[index] : selectedDate
            const isToday = format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy")
            const isDateDisabled = isTileDisabled({view:'month',date:day});
            const isDateFuture = isFutureDate(day);
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
              dayjs(day).format("YYYY-MM-DD")
            );
            return (
                <Grid
                    item
                    xs
                    id={`day${index + 1}`}
                    data-group='day-column'
                    data-date={day}
                    key={`board-day-column-${layout}-${selectedWeekIndex}-${day}-${index}`}
                    style={{
                        borderBottom: "1px solid #dadce0",
                        border: "1px solid #dadce0",
                        textAlign: "center",
                        borderRadius: 0,
                        minWidth: 64.38,
                        height: "100%",
                        padding: "20px",
                      }}
                      onClick={()=>{
                        if(!(isDateDisabled && isDateFuture)){
                          props.setSelectedDate(dayjs(day).format("YYYY-MM-DD"));
                          //props.setDateSelectedStatus(true);
                        }
      
                      }}
                      data-testid="calendar-tile"
                      sx={isDateDisabled || isDateFuture?{background:`${timesheet_disabled_color}`,cursor:"not-allowed",pointerEvents:'none'}:{cursor:"pointer"}}
                >
                    <span 
                    style={statusFormFilled?{cursor:"pointer",background:`${timesheet_completed_color}`,padding:'5px 10px',borderRadius:'50%'}:{cursor:"pointer"}}>
                      {day.getDate()}
                    </span>
                </Grid>
            )
        })}
        </div>
    )
}

export default CalendarDayNWeekLayout;