import SmallHeader from "../../layout/SmallHeader"
import HomePeople from "../../../assets/images/homePeople.png"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import Tour from "./Tour"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../../app/config"
function ClientHomePage() {

    const tours1 = useSelector(state => state.client.tours)
    const [tours,setTours]=useState(tours1)
    const navigate=useNavigate()

    
    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/tours/?page=`+1, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        var data=[]
        
        response.data.results.forEach(element=>{
            data.push({
                id:element.id,
                startTime:"2:00 P.M",
                startDate:element.start_date,
                title:element.title,
                description:element.description,
                images:element.tour_attachments,
                like:element.like_counter,
                dislike:element.dislike_counter,
                comments:element.comments_num,
            })
        })
        //setTours(response.data.result)
        }).catch((err)=>{
          console.log(err.message)
        })
    },[])


    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row  justify-between items-center
            xl:py-12 xl:px-20 xl:space-x-5
            lg:py-10 lg:px-8 lg:space-x-4
            md:py-8 md:px-12 md:space-x-3">
                <div className="flex flex-row  text-text-light  font-['sans-serif']  hover:cursor-pointer 
                            xl:text-xl  xl:space-x-6
                            lg:text-lg  lg:space-x-4 lg:pl-5
                            md:text-base ">
                    <div className="flex flex-col justify-center items-center bg-loginButtonVia-light text-title-light   px-3 rounded" >
                        <span>Home</span></div>
                    <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                        onClick={() => { navigate('/client/client-profile') }}><span>Profile</span></div>
                      
                    <div className="flex flex-col justify-center items-center w-fit px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                        onClick={() => { navigate("/client/client-tours-requests") }}><span>My Tour</span></div>
                    <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                        onClick={() => { navigate('/client/client-notification') }}><span>Notification</span></div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center pb-10  ">
                <div className="flex flex-col items-start justify-start w-11/12 h-screen space-y-5 bg-clientbg-light bg-opacity-15   drop-shadow-[1px_1px_rgba(117,135,142)] rounded-2xl overflow-hidden hover:overflow-y-auto p-10">
                    {tours.map(tour => {
                        return (
                          <Tour tour={tour} key={tour.id}/>
                        )
                    })}

                </div>
                <div className="flex flex-col justify-end items-end absolute xl:right-20 lg:right-16 md:right-12">
                    <img src={HomePeople} className="xl:h-full xl:w-full lg:h-80 lg:w-64 md:h-64 md:w-52" />
                </div>
            </div>
        </div>
    )
}

export default ClientHomePage