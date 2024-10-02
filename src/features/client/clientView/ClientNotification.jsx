import SmallHeader from "../../layout/SmallHeader"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import backButton from "../../../assets/images/backButton.svg"
import NotificationRoad from '../../../assets/images/NotificationRoad.svg'
import NotificationDesigns from '../../../assets/images/NotificationDesigns.svg'
import { API_URL } from "../../../app/config";
import axios from "axios";



function ClientNotification() {
    const state = useSelector(state => state.user)
    var notifications1 = state.notifications
    const [notifications,setNotifications]=useState(notifications1)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(async()=>{
      var token = localStorage.getItem('accessToken');
      var res=axios.get(`${API_URL}/api/notifications/`,{ headers: {
        Authorization: `JWT ${token}`,
      }}).then((res) => 
        {setNotifications(res.data.data)
         }
      ).catch((err)=>{
        console.log(err.message)
      })
    },[])
    const handleBack = () => {
        navigate('/user-home-page');
      };

  return (
    <div>
    <img src={NotificationRoad} className="absolute h-svh top-0 right-0" />
    <div className="relative z-10">
        <SmallHeader />
        <div className="flex flex-col space-y-12">
        <div className="flex flex-row float-start items-center xl:mt-10 lg:mt-10 md:mt-10
                xl:space-x-10 xl:px-28 
                lg:space-x-8 lg:px-24
                md:space-x-6 md:px-20">
            <img src={backButton} onClick={handleBack} className=" hover:cursor-pointer 
                        xl:w-12 xl:h-12
                        lg:w-10 lg:h-10
                        md:w-8 md:h-8" />
            <div className=" text-title-light font-['Georgia'] xl:text-3xl lg:text-2xl md:text-xl">Notifications</div>
        </div>
        <div className="flex flex-col rounded-sm 
            bg-clientbg-light bg-opacity-15  
            border border-inputLabelShadow-light/20 shadow-inputLabelShadow-light/50 drop-shadow-sm shadow-sm 
            xl:mx-40 xl:py-5 xl:px-2 xl:w-3/5 
            lg:mx-20 lg:py-5 lg:px-2  lg:w-1/2
            md:mx-10 md:py-5 md:px-2 md:w-1/2
            ">
             <img src={NotificationDesigns} className="xl:h-28 lg:h-24 md:h-28" />
             <div className="flex flex-col space-y-10 overflow-hidden hover:overflow-y-auto  xl:h-52 lg:h-52  md:h-52 ">
            
            {notifications.length>0 && notifications.map((notification,index) => (
             <div className="flex font-['Open_Sans'] 
             relative bg-clientbg-light text-text-light drop-shadow-[1px_1px_rgba(117,135,142)] 
                   xl:text-2xl xl:rounded-xl xl:h-24 xl:p-4
                   lg:text-xl lg:rounded-lg lg:h-20 lg:p-4
                   md:text-lg md:rounded-md md:h-16 md:p-2">
            {notification}
            </div>
            ))}
            {notifications.length==0 &&
                 <div className="flex font-['Open_Sans'] 
                 relative  text-text-light drop-shadow-[1px_1px_rgba(117,135,142)] 
                       xl:text-2xl xl:rounded-xl xl:h-24 xl:p-4
                       lg:text-xl lg:rounded-lg lg:h-20 lg:p-4
                       md:text-lg md:rounded-md md:h-16 md:p-2">There is no notification yet ...</div>
            }
            </div>
            </div>
            </div>
    </div>
</div>
  )
}

export default ClientNotification
