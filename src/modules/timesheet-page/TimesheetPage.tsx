import { useEffect, useState } from "react";
import dayjs from "dayjs";
import FormModal from "../../components/FormModal";
import { Box } from "@mui/system";
import Calendar from "./calendar/Calendar";
import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Typography, Tooltip } from "@mui/material";
import { checkDateInSelectedDateArray } from "./helper";
import { GET_TIMESHEETS } from "./actions/timesheetTypes";
import { useDispatch, useSelector } from "react-redux";
import KeyCloakService from "../../security/keycloakService";
import {
  DRAWER_WIDTH,
  approval_completed_color,
  approval_pending_color,
  approval_rejected_color,
  timesheet_completed_color,
  timesheet_disabled_color,
} from "../../utils/constants";
import UserCard from "../../components/HomePage";
import { GET_PROJECTS } from "../projects-page/actions/projectTypes";

export default function TimesheetPage(props:any) {
  const ts = useSelector((state: any) => state.timesheet);
  const dispatch = useDispatch();
  const userId = KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();

  useEffect((): any => {
    dispatch({
      type: GET_TIMESHEETS,
      timesheeet: { userId: userId, organizationId: orgId },
    });

    dispatch({ type: GET_PROJECTS });

  }, []);

  const getSelectedDateArray = ts.timesheet;

  const [date, setDate] = useState<Date>(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [dateSelectedStatus, setDateSelectedStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateArray, setSelectedDateArray] =
    useState<any>(getSelectedDateArray);

  useEffect(() => {
    setSelectedDateArray(getSelectedDateArray);
  }, [getSelectedDateArray]);

  return (
    <Box sx={{ marginLeft:{xs:0,sm:`calc(${DRAWER_WIDTH}px)`,md:`calc(${DRAWER_WIDTH}px)`},marginTop: "30px" }} className="time-sheet-page-container">
      <Box
        sx={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
        {/* <Calendar
          onChange={(value: Date) => {
            setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
            setDateSelectedStatus(true);
          }}
          value={date}
          tileClassName="react-calendar-tile-class"
          onClickDay={(date, event: any) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
              dayjs(date).format("YYYY-MM-DD")
            );
            if (statusFormFilled) {
              event.target
                .closest(
                  "button.react-calendar__tile.react-calendar__month-view__days__day.react-calendar-tile-class"
                )
                .classList.add("timesheet-filled");
            }
          }}
          tileContent={({ date }) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
              dayjs(date).format("YYYY-MM-DD")
            );
            return statusFormFilled ? (
              <Tooltip arrow title="Time sheet filled" placement="bottom">
                <p> </p>
              </Tooltip>
            ) : null;
          }}
          tileDisabled={isTileDisabled}
        /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <UserCard />
          <Box sx={{display:'flex',flexDirection:{xs:"column",sm:"row"}}}>
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_completed_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Approved</span>
          </Box>
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_rejected_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Rejected</span>
          </Box>
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_pending_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Pending</span>
          </Box>
          </Box>
        </Box>
        <Calendar
          setSelectedDate={setSelectedDate}
          setDateSelectedStatus={setDateSelectedStatus}
          {...props}
          layout="month"
          module="timesheet"
        />
      </Box>
      <FormModal
        dateSelectedStatus={dateSelectedStatus}
        dateSelected={selectedDate}
        setDateSelectedStatus={(value: boolean) => setDateSelectedStatus(value)}
        formattedDate={formatedDate}
        setSelectedDateArray={setSelectedDateArray}
        selectedDateArray={selectedDateArray}
        setSelectedDate={(value: string) => {setSelectedDate(value);}}
        module="timesheet"
      />
    </Box>
  );
}
