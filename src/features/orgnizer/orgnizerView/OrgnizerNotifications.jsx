import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../app/config";
function OrgnizerNotifications(){
    const notifications1=useSelector(state=>state.user.notifications)
    const [notifications,setNotifications]=useState(notifications1)
    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/notifications/`, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        //setNotifications(response.data.data)
        }).catch((err)=>{
          console.log(err.message)
        })
        
        //dispatch(getOrgnizerTours(1))
    },[])
    const handelBack = () => {
        navigate('/orgnizer-home');
    }
    return(
        <div className="flex flex-col">
            <SmallHeader/>
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
            
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Notifications</div>
            </div>
            <div className="flex flex-row justify-center items-center p-10 ">
                <div className="flex flex-col items-center justify-start w-3/5 h-screen space-y-5 bg-post-bg-light  drop-shadow-xl rounded-2xl overflow-hidden hover:overflow-y-auto p-5">
                  {notifications.length!=0?notifications.map(notification=>{
                    return(
                        <div className="flex flex-row items-center justify-center relative w-11/12 bg-orgnizerbg-light border-solid border-2 border-title-light text-text-light  drop-shadow-[1px_1px_rgba(117,135,142)]  font-['Open_Sans']
                        xl:text-2xl xl:rounded-xl xl:h-24 xl:p-4
                        lg:text-xl lg:rounded-lg lg:h-20 lg:p-3
                        md:text-lg md:rounded-md md:h-16 md:p-2">
                            {notification}
                        </div>
                    )
                  }):
                   <div className="flex flex-row items-center justify-center font-['Open_Sans'] relative w-11/12 bg-orgnizerbg-light border-solid border-2 border-title-light text-text-light  drop-shadow-[1px_1px_rgba(117,135,142)] 
                   xl:text-3xl xl:rounded-xl xl:h-24 xl:p-4
                        lg:text-2xl lg:rounded-lg lg:h-20 lg:p-3
                        md:text-xl md:rounded-md md:h-16 md:p-2">
                    There is No Notifications
                    </div>}
                   
                </div>
            </div>
        </div>
    )
}

export default OrgnizerNotifications