import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyCloakService from "../../security/keycloakService";
import { DRAWER_WIDTH } from "../../utils/constants";
import { GET_PROJECTS } from "../projects-page/actions/projectTypes";
import TimesheetManager from "../timesheet-page/TimesheetManager";
import { GET_APPROVALS, SET_USER_INFO } from "./actions/approvalTypes";
import WeekTable from "./ApprovalTable";
import { setUsersInfo } from "./reducers/userSlice";
import Tablee from "./Table";
import WeeklyApprovalPage from "./WeeklyApprovalPage";

function ApprovalPage() {
  
  const getProjectInfoo = useSelector((state: any) => state.projects);
  const pId = KeyCloakService.CallUserProject();
  const proj = getProjectInfoo?.filter((proje: any) => proje.id === pId );

  const [select, setSelect] = useState("WEEK_APPROVALS");
  const [userId, setUserId] = useState("");
  const [projectSelected, setProjectSelected] = useState("");

  const handleSortChange = (event: any) => {
    setSelect(event.target.value);
  };

  const getTokenToGetUserInfo = async() : Promise<any>=>{
    const {data} = await axios.post('https://143.110.248.171:8443/realms/master/protocol/openid-connect/token',{
      username: "admin",
      password: 'al@123',
      grant_type: 'password',
      client_id: 'admin-cli'
    },{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return data.access_token;
  }
  const getUsersInfoWithToken = async(token:string)=>{
    const {data} = await axios.get('https://143.110.248.171:8443/admin/realms/Augmento/users',{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':`Bearer ${token}`
      }
    })
    return data;
  }
  const user_info = useSelector((state:any)=>state.userInfo);
  const dispatch = useDispatch();
  const fetchUserInfo = async()=>{
    const access_token  = await getTokenToGetUserInfo();
    const userInfo_data = await getUsersInfoWithToken(access_token);
    //console.log("fetchUserInfo data: ",userInfo_data); 
    dispatch({type:SET_USER_INFO,data:userInfo_data})
  }
  useEffect(()=>{
    fetchUserInfo();
    dispatch({ type: GET_PROJECTS });
  },[])


  useEffect(()=>{
    setUserId("");
  },[projectSelected])

  const userFilteredLength = user_info.filter((user_info_item:any)=>{
    return (Object.keys(user_info_item?.attributes).length===2)&&(user_info_item?.attributes?.['Project Id'][0] === projectSelected.slice(0,1).toString())   
  }).length

  return (
    <Box sx={{marginLeft:{xs:0,sm:`calc(${DRAWER_WIDTH}px)`,md:`calc(${DRAWER_WIDTH}px)`}}}>
      <Typography variant="h2" textAlign="center" color="#D5D5D5" sx={{p  :2}}>
        {" "}
        Approvals
      </Typography>
      <FormControl>
        <Select sx={{marginBottom:'10px'}} value={select} onChange={handleSortChange}>
          <MenuItem value={"WEEK_APPROVALS"}>Weekly Approvals</MenuItem>  
        </Select>
      </FormControl>
      {select === "WEEK_APPROVALS" && <FormControl sx={{ minWidth: 220 }}>
        <Select displayEmpty sx={{marginBottom:'10px',ml:1}} value={projectSelected} onChange={(event:any)=>{setProjectSelected(event.target.value);setUserId("")}}
           renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Please Select a Project</span>;
            }else{
              return <span>{selected.slice(1).toUpperCase()}</span>;
            }
          }}>
          {getProjectInfoo.length>0 && getProjectInfoo.map((project_info_item:any)=>{
            return <MenuItem key={project_info_item.name} value={`${project_info_item.id}${project_info_item.name}`}>{project_info_item.name.toUpperCase()}</MenuItem>
          })}
        </Select>
      </FormControl>}
      {select === "WEEK_APPROVALS" && projectSelected!==""  && <FormControl sx={{ minWidth: 120 }}>
        <Select displayEmpty sx={{marginBottom:'10px',ml:1}} value={userId} onChange={(event:any)=>{setUserId(event.target.value)}}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Please Select a User</span>;
            }else{
              return <span>{selected.slice(36).toUpperCase()}</span>;
            }
          }}>
          <MenuItem disabled={userFilteredLength==0} sx={userFilteredLength!==0?{display:'none'}:{}} value="">
            No User Found
          </MenuItem>
          {user_info.length>0  && user_info.map((user_info_item:any)=>{
            return (Object.keys(user_info_item?.attributes).length===2)&&(user_info_item?.attributes?.['Project Id'][0] === projectSelected.slice(0,1).toString()) ?<MenuItem key={user_info_item.id} value={`${user_info_item.id}${user_info_item.firstName}`}>{user_info_item.firstName.toUpperCase()}</MenuItem>:null  
          })}
        </Select>
      </FormControl>}
      {/* {select === "GET_APPROVALS" && <Tablee />}
      {select === "GET_APPROVALS_WEEK" && <WeekTable />}
      {select === "USER_APPROVALS" && <TimesheetManager />} */}
      {select === "WEEK_APPROVALS" && projectSelected!=='' && userId!=="" &&<WeeklyApprovalPage userId={userId.slice(0,36)} />}

    </Box>
  );
}

export default ApprovalPage;
