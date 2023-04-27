import axios from "axios";

export const getTokenToGetUserInfo = async() : Promise<any>=>{
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