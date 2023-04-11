import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
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
import { getTokenToGetUserInfo } from "../../utils/commonAPI";
import { getUserLoggedInManager } from "../timesheet-page/helper";

function ApprovalPage() {
  
  const getProjectInfo = useSelector((state: any) => state.projects);
  const pId = KeyCloakService.CallUserProject();
  const loggedInUserId = KeyCloakService.CallUserId();
  const proj = getProjectInfo?.filter((proje: any) => proje.id === pId );
  const manager_info = useSelector((state:any)=>state.userInfo.managerList);
  const [projectDropdown,setProjectDropdown] = useState([]);

  const getProjectsBasedOnManager=(projectDetails:any,managerInfo:any)=>{
    const updatedProjectDropdowdownList = projectDetails.filter((projectDetailsItem:any)=>{
      return projectDetailsItem.managerId === managerInfo[0]?.managerId
    })
    return updatedProjectDropdowdownList;
  }

  const amIManagerOfProject = (userId:string)=>{
    const listOfProjects = getProjectInfo.filter((project_info:any)=>{
        return project_info.managerId === userId.slice(0,36)
      })
    return listOfProjects;
  }
  const [select, setSelect] = useState("WEEK_APPROVALS");
  const [userId, setUserId] = useState(loggedInUserId);
  const [projectSelected, setProjectSelected] = useState("");

  const handleSortChange = (event: any) => {
    setSelect(event.target.value);
  };

  const getUsersInfoWithToken = async(token:string)=>{
    const {data} = await axios.get('https://143.110.248.171:8443/admin/realms/Augmento/users',{
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':`Bearer ${token}`
      }
    })
    return data;
  }
  const user_info = useSelector((state:any)=>state.userInfo.userList);
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
    if(!!userId){
      const projectListBasedOnManager = amIManagerOfProject(userId);
      if(projectListBasedOnManager.length>0){
        setProjectDropdown(projectListBasedOnManager);
      }
    }

  },[projectSelected])


  useEffect(()=>{
    setUserId("");
  },[projectSelected])

  const userFilteredLength = user_info.filter((user_info_item:any)=>{
    return (Object.keys(user_info_item?.attributes).length===2)&&(user_info_item?.attributes?.['Project Id'][0] === projectSelected.slice(0,1).toString())   
  }).length

  return (
    <Box sx={{marginLeft:{xs:0,sm:`calc(${DRAWER_WIDTH}px)`,md:`calc(${DRAWER_WIDTH}px)`}}}>
      <Box sx={projectSelected==='' && userId===""?{display:'flex',flexDirection:"column",justifyContent:"flex-start",alignItems:"center",marginTop:'5rem'}:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
      <Typography variant="h2" textAlign="left" color="#2196f3" sx={{p  :2}}>
        {" "}
        Approvals
      </Typography>
        <Box sx={{display:'flex',flexDirection:{xs:"column",md:"row"}}}>
          {select === "WEEK_APPROVALS" && <FormControl sx={{ width: {sm:"10rem",lg:"22rem",} }}>
            <Select displayEmpty sx={{marginBottom:'10px',mr:1}} value={projectSelected} onChange={(event:any)=>{setProjectSelected(event.target.value);setUserId("")}}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Please Select a Project</span>;
                }else{
                  return <span>{selected.slice(1).toUpperCase()}</span>;
                }
              }}>
              <MenuItem disabled={projectDropdown.length===0} sx={projectDropdown.length!==0?{display:'none'}:{}} value="">
                No Project Found
              </MenuItem>
              {projectDropdown.length>0 && projectDropdown.map((project_info_item:any)=>{
                return <MenuItem key={project_info_item.name} value={`${project_info_item.id}${project_info_item.name}`}>{project_info_item.name.toUpperCase()}</MenuItem>
              })}
            </Select>
          </FormControl>}
          {select === "WEEK_APPROVALS" && projectSelected!==""  && <FormControl sx={{  width: {sm:"10rem",lg:"22rem",}}}>
            <Select displayEmpty sx={{marginBottom:'10px'}} value={userId} onChange={(event:any)=>{setUserId(event.target.value)}}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Please Select an Employee</span>;
                }else{
                  return <span>{selected.slice(36).toUpperCase()}</span>;
                }
              }}>
              <MenuItem disabled={userFilteredLength==0} sx={userFilteredLength!==0?{display:'none'}:{}} value="">
                No Employee Found
              </MenuItem>
              {user_info.length>0  && user_info.map((user_info_item:any)=>{
                return (Object.keys(user_info_item?.attributes).length===2)&&(user_info_item?.attributes?.['Project Id'][0] === projectSelected.slice(0,1).toString()) ?<MenuItem key={user_info_item.id} value={`${user_info_item.id}${user_info_item.firstName}`}>{user_info_item.firstName.toUpperCase()}</MenuItem>:null  
              })}
            </Select>
          </FormControl>}
        </Box>
      </Box>
      {/* {select === "GET_APPROVALS" && <Tablee />}
      {select === "GET_APPROVALS_WEEK" && <WeekTable />}
      {select === "USER_APPROVALS" && <TimesheetManager />} */}
      {select === "WEEK_APPROVALS" && projectSelected!=='' && userId!=="" &&<WeeklyApprovalPage userId={userId?.slice(0,36)} />}

    </Box>
  );
}

export default ApprovalPage;
