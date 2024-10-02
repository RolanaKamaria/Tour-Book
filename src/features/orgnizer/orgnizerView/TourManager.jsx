import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import acceptIcon from "../../../assets/images/acceptIcon.svg"
import refuseIcon from "../../../assets/images/refuseIcon.svg"
import { useDispatch, useSelector } from "react-redux"
import { Orders } from "../../../assets/data/tempData"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
function TourManager() {
    const state=useSelector(state=>state.orgnizer)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const tour=state.tour
    const [orders,setOrders]=useState(Orders)
    // Get accepted order
    const acceptedOrders = orders.filter(order=>order.status=='accept')
    // Get waited order
    const waitingOrders = orders.filter(order=>order.status=='wait')
    // Get refused order
    const refusedOrders =orders.filter(order=>order.status=='refuse')
    // Calculate number of reserved seats 
    const numberReserved = acceptedOrders.reduce((sum, order) => sum + order.numOfSeat, 0);
    const acceptOrder =(id)=>{
        setOrders(
            orders.map((item) =>
              item.id === id ? { ...item, status:'accept'} : item
            )
          );
    }
    const refuseOrder=(id)=>{
        setOrders(
            orders.map((item) =>
              item.id === id ? { ...item, status:'refuse'} : item
            )
          );
    }
    const handelBack = () => {
        navigate('/my-tour');
    }
    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">{tour.title}</div>
            </div>
            <div className="flex flex-row justify-center py-5 mb-5 xl:gap-x-48 lg:gap-x-40 md:gap-x-32">
                <div className="flex flex-col justify-start items-start space-y-7">
                    <div className="flex flex-row text-text-light xl:text-2xl lg:text-xl md:text-base font-['serif'] justify-between items-center space-x-4">
                        <span className="flex flex-col">Number of reserved Seats :</span>
                        <span className="flex flex-col border-solid border-2 border-text-light rounded-xl p-2">{numberReserved}</span>
                    </div>
                    <div className="container flex flex-col items-start space-y-5 drop-shadow-[2px_2px_rgba(125,143,154,0.5)] w-fit bg-post-bg-light border-solid border-2 border-text-light overflow-hidden hover:overflow-y-auto h-96 
                xl:px-16 xl:rounded-3xl xl:py-7 
                lg:px-10 lg:rounded-3xl lg:mr-10 lg:py-5
                md:px-6 md:rounded-2xl  md:mr-10 md:py-3">
                        {acceptedOrders.map((order)=>{
                            return(
                        <div className="flex flex-row" key={order.id}>
                            <div className="flex flex-col">
                                <div className="flex flex-row text-title-light xl:text-2xl lg:text-xl md:text-base font-['Georgia']">{order.client.name+' '+order.client.lastName}</div>
                                <div className="flex flex-row text-text-light xl:text-xl lg:text-base md:text-sm font-['Open_Sans'] "> {order.numOfSeat} seats - {order.client.mobile}</div>
                            </div>
                        </div> )
                        })}
                       
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start space-y-7">
                    <div className="flex flex-row text-text-light xl:text-2xl lg:text-xl md:text-base font-['serif'] justify-between items-center space-x-4">
                        <span className="flex flex-col">Number of available Seats :</span>
                        <span className="flex flex-col border-solid border-2 border-text-light rounded-xl p-2">{tour.numOfSeat-numberReserved}</span>
                    </div>
                    <div className="container flex flex-col items-start drop-shadow-[2px_2px_rgba(125,143,154,0.5)] w-fit bg-post-bg-light border-solid border-2 border-text-light  space-y-5 overflow-hidden hover:overflow-y-auto h-96
                xl:px-16 xl:rounded-3xl xl:py-10 
                lg:px-10 lg:rounded-3xl lg:mr-10 lg:py-8
                md:px-6 md:rounded-2xl  md:mr-10 md:py-5">
                        
                        {
                            waitingOrders.map(order=>{
                                return(<div className="flex flex-row  bg-offerbg-light justify-between items-center border-solid border-2 text-title-light space-x-14 p-3 
                                    xl:rounded-lg xl:w-96
                                    lg:rounded lg:w-72
                                    md:rounded-sm md:w-64" key={order.id}>
                                        <div className="flex flex-col space-y-1 items-center">
                                            <div className="flex flex-row text-title-light xl:text-xl lg:text-base md:text-sm font-['Georgia']">{order.client.name+' '+order.client.lastName}</div>
                                            <div className="flex flex-row text-text-light xl:text-xl lg:text-base md:text-sm font-['Open_Sans'] ">ask for {order.numOfSeat} seats </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row space-x-3 items-center">
                                                <img src={acceptIcon} onClick={()=>acceptOrder(order.id)}
                                                className="hover:cursor-pointer  
                                                xl:w-10 xl:h-10
                                                lg:w-8 lg:h-8
                                                md:w-6 md:h-6" />
                                                <img src={refuseIcon} onClick={()=>refuseOrder(order.id)}
                                                className="hover:cursor-pointer 
                                                xl:w-10 xl:h-10
                                                lg:w-8 lg:h-8
                                                md:w-6 md:h-6" />
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] 
             xl:rounded xl:left-72 xl:w-44 xl:h-8 xl:top-72
             lg:rounded-md lg:left-48 lg:w-36 lg:h-7 lg:top-72
             md:rounded-sm md:left-44  md:w-28 md:h-6 md:top-64 ">
                    <span className="xl:text-2xl lg:text-xl md:text-base font-['serif']">Financial Details</span>
                </div>
                <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] 
             xl:rounded xl:right-1/3 xl:w-40 xl:h-8 xl:top-72 
             lg:rounded-md lg:right-1/3 lg:w-32 lg:h-7 lg:top-72
             md:rounded-sm md:right-1/3  md:w-24 md:h-6 md:top-64 ">
                    <span className="xl:text-2xl lg:text-xl md:text-base font-['serif']">Tour Details</span>
                </div>
        </div>
    )
}
export default TourManager