import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallHeader from '../../layout/SmallHeader';
import backButton from '../../../assets/images/backButton.svg';
import Potato from '../../../assets/images/Potato.png';
import Burger from '../../../assets/images/Burger.png';
import { acceptOrder, refuseOrder } from '../presenterSlice';
import AcceptSign from '../../../assets/images/AcceptSign.svg';
import RefuseSign from '../../../assets/images/RefuseSign.svg';
import { Orders } from "../../../assets/data/tempData";
import Cake from '../../../assets/images/Cake.png'
function OfferDetails() {
    const state = useSelector(state => state.presenter);
    const offerRequest = useSelector(state => state.presenter.offerRequest);
    const offer = useSelector(state => state.presenter.offer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orders, setOrders] = useState(Orders);
    const [dateInput, setDateInput] = useState('');
    const [filterdAcceptedOrders, setFilterdAcceptedOrders] = useState(orders.filter(order => order.status === 'accept'));
// Get accepted order
const acceptedOrders = orders.filter(order=>order.status=='accept');
    // Calculate number of reserved seats
    const reservedSeats = acceptedOrders.reduce((sum, order) => sum + order.numOfSeat, 0);

    const handleAcceptOrder = (orderId) => {
        dispatch(acceptOrder({ orderId }));
    };

    const handleRefuseOrder = (orderId) => {
        dispatch(refuseOrder({ orderId }));
    };


  const handleDate = (e) => {
    setDateInput(e.target.value);
    // Filter orders based on selected date
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      const selectedDate = new Date(e.target.value);
      return order.status === 'accept' 
        && orderDate.getDate() === selectedDate.getDate()
        && orderDate.getMonth() === selectedDate.getMonth()
        && orderDate.getFullYear() === selectedDate.getFullYear();
    });
    setFilterdAcceptedOrders(filteredOrders);
  };

    const handleBack = () => {
        navigate("/presenter-home-page");
    };

    return (
      <div className='w-full max-h-full'>
        <SmallHeader />
        <div className="flex flex-col space-y-10 pb-10">
        <div className="flex flex-row space-x-6 
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
            <img
              src={backButton}
              onClick={handleBack}
              alt="Back"
              className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
            />
            <span className="text-title-light font-['sans-serif'] 
            xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
            {offer.title}
            </span>
          </div>
          <div className="flex flex-row xl:space-x-10 lg:space-x-10 md:space-x-2
          xl:mx-28 lg:mx-12 md:mx-4">
          <div className="flex flex-col space-y-10
           shadow-inputLabelShadow-light/50 drop-shadow-sm shadow-sm border border-inputLabelShadow-light/40
          bg-button-text-light/75 rounded-lg 
          xl:px-12 xl:py-10 xl:ml-10 lg:ml-10 lg:px-6 lg:py-6 md:ml-10 md:px-6 md:py-6 ">
          <span className="text-offerTitle-light font-['BlinkMacSystemFont'] font-bold text-center
                               xl:text-4xl lg:text-3xl md:text-2xl">{offer.title}</span>
          <div className="flex flex-row space-x-10">
                    {/* {offer.offerAttatchment.attachment == null ? (
                    <div className="text-text-light mt-16 px-2 content-center">There are no images to show</div>
               ) : ( */}
                 {/* offer.offerAttatchment.map((attachment, index) => (
                   <div className="relative" key={index}>
                    <a key={attachment.id} target="_blank" href={attachment.attachment}>
                               <img
                                 src={attachment.attachment}
                                 alt="Offer Attachment"
                                 className="rounded-xl drop-shadow-[2px_3px_rgba(117,135,142,0.8)]
                                  xl:w-52 xl:h-44 lg:w-48 lg:h-36 md:w-40 md:h-30"
                               />
                    </a>
                   </div>
                 )) */}
               {/* )} */}
               <div className="flex flex-row space-x-4" >
                    <a target="_blank" href={Burger}>
                               <img
                                 src={Burger}
                                 alt="Offer Attachment"
                                 className="rounded-xl drop-shadow-[2px_3px_rgba(117,135,142,0.8)]
                                  xl:w-52 xl:h-44 lg:w-48 lg:h-36 md:w-40 md:h-30"
                               />
                               </a>
                              <a target="_blank" href={Cake}>
                               <img
                                 src={Cake}
                                 alt="Offer Attachment"
                                 className="rounded-xl drop-shadow-[2px_3px_rgba(117,135,142,0.8)] 
                                 xl:w-52 xl:h-44 lg:w-48 lg:h-36 md:w-40 md:h-30"
                               />
                    </a>
                   </div>
               
                     </div>
                     <div className="flex  bg-presenterPostDetails-light text-text-light rounded-xl 
                           shadow-inputLabelShadow-light/50 drop-shadow-md shadow-sm 
                             xl:pl-20 xl:pt-7 xl:pb-3 xl:space-x-7 lg:pl-14 lg:pt-7 lg:pb-3 lg:space-x-7 md:pl-10 md:pt-10 md:pb-3 md:space-x-4">
                    <div className="flex flex-col space-y-4">
                      <span>Date:</span>
                      <span>Time:</span>
                      <span>Price:</span>
                      <span>Include:</span>
                      <span>Address:</span>
                    </div>
                    <div className="bg-presenterbg-light  text-text-light absolute text-center content-center
                  drop-shadow-[2px_2px_rgba(211,168,76,0.6)] 
                  xl:rounded    xl:w-24 xl:h-8 xl:-mt-11 xl:left-5 
                  lg:rounded-md lg:w-24 lg:h-8 lg:-mt-11 lg:left-3 
                  md:rounded-sm md:w-20 md:h-8 md:-mt-12 md:left-1">
                      <span className="font-['serif'] xl:text-xl lg:text-lg md:text-base">Details</span>
                  </div>
                    <div className="flex flex-col space-y-4">
                      <span>{offer.startDate} - {offer.endDate}</span>
                      <span>{offer.startTime} - {offer.endTime}</span>
                      <span>{offer.pricePerOne}</span>
                      <span>{offer.description}</span>
                      <span>{offer.address}</span>
                    </div>
                  </div>
              </div>
              <div className="flex flex-col">
                  <div className="flex flex-row space-x-8 items-center justify-start bg-post-bg-light 
                    rounded-xl overflow-hidden hover:overflow-y-scroll 
                    shadow-inputLabelShadow-light/50 drop-shadow-sm shadow-sm border border-inputLabelShadow-light/40
                    xl:py-10 xl:pr-3 xl:w-fit xl:h-72
                    lg:py-6 lg:pr-3 lg:w-fit lg:h-64
                    md:py-6 md:pr-3 md:w-fit md:h-64"> 
                  <div className="flex flex-col space-y-8 ml-5">
                  <div className="flex flex-row bg-presenterPostDetails-light text-text-light rounded-lg 
                           shadow-inputLabelShadow-light/50 drop-shadow-md shadow-sm 
                            space-x-7 xl:text-xl xl:p-2 lg:text-xl lg:p-2 md:text-lg md:p-2">
                              <span>Date:</span>
                            <input type="date"  className="bg-presenterPostDetails-light" onChange={handleDate}/>
                            </div>
  
                  <div className="flex flex-row bg-presenterPostDetails-light text-text-light rounded-xl 
                           shadow-inputLabelShadow-light/50 drop-shadow-md shadow-sm 
                           space-x-5 xl:text-xl xl:p-2 lg:text-xl lg:p-2 md:text-lg md:p-2">
                           <span>Available seat :</span> 
                     <span>{offer.offerSize-reservedSeats}</span> 
                     </div>
                  </div>
                  <div className="container flex flex-col items-start bg-presenterPostDetails-light
                   shadow-inputLabelShadow-light/50 drop-shadow-md shadow-sm  
                   overflow-hidden hover:overflow-y-auto  
                   w-fit mr-5 space-y-5
                   xl:h-52 xl:px-8 xl:rounded-xl xl:py-7 
                   lg:h-52 lg:px-8 lg:rounded-lg lg:mr-10 lg:py-5
                   md:h-52 md:px-4 md:rounded-md  md:mr-10 md:py-3">
                      <span className="text-offerTitle-light font-bold xl:text-xl lg:text-xl md:text-base font-['Georgia']">Reserve seat :</span>
                          {filterdAcceptedOrders.map((order)=>{
                              return(
                              <div className="flex flex-row space-x-10" key={order.id}>
                                  <div className="flex flex-row text-text-light  xl:text-xl lg:text-lg md:text-base font-['Georgia']">{order.client.name+' '+order.client.lastName} :</div>
                                  <div className="flex flex-row text-text-light xl:text-xl lg:text-lg md:text-base font-['Open_Sans'] "> {order.numOfSeat} seats </div>
                              </div>
                        )
                          })}
                         
                      </div>
                  </div>
                  <div className="flex flex-row justify-center items-center mb-0 mt-10">
                  <div className="flex flex-col items-center justify-start bg-post-bg-light
                    rounded-2xl overflow-hidden hover:overflow-y-scroll space-y-5
                    shadow-inputLabelShadow-light/50 drop-shadow-sm shadow-sm border border-inputLabelShadow-light/40
                    xl:w-fit xl:h-72 xl:pt-10 xl:pb-10 xl:px-8
                    lg:w-fit lg:h-60 lg:pt-8 lg:pb-8 lg:px-8
                    md:w-fit md:h-60 md:pt-10 md:pb-10 md:px-8
                    ">
                    {offerRequest.length !==0 ? offerRequest.map(order=>{
                      return(
                          <div key={order.id} className="flex flex-row items-center justify-center relative 
                          w-11/12 bg-presenterPostDetails-light 
                          border-solid border-2 border-offerTitle-light 
                          xl:space-x-4 xl:rounded-xl xl:h-24 xl:p-4
                          lg:space-x-3 lg:rounded-lg lg:h-20 lg:p-3
                          md:space-x-1 md:rounded-md md:h-20 md:p-3">
                              <div className=" font-['Open_Sans'] text-text-light 
                                xl:text-lg lg:text-base md:text-sm"> {order.description} </div>
                              {order.offerState === 'Accepted' ? (<div className='text-save-button-light font-bold bg-presenterbg-light'> Accepted </div>)
                               : order.offerState === 'Refused' ? (<div className='text-error-light font-bold bg-presenterbg-light'> Refused </div>):(
                              <div className='flex flex-row space-x-3'>
                              <img src={AcceptSign} className='w-9 h-9 cursor-pointer'  onClick={() => handleAcceptOrder(order.id)}/>
                              <img src={RefuseSign} className='w-9 h-9 cursor-pointer'  onClick={() => handleRefuseOrder(order.id)}/> 
                              </div>
                          )}
                          </div>
                      )
                    }):
                     <div className="flex flex-row items-center justify-center content-center
                     w-11/12 bg-presenterPostDetails-light 
                     border-solid border-2 border-offerTitle-light text-xl
                    xl:rounded-xl xl:h-24 xl:p-4
                      lg:rounded-lg lg:h-20 lg:p-10 lg:px-20 lg:pt-10
                     md:rounded-md md:h-16 md:p-2">
                      There is No Notifications
                      </div>}
                     
                  </div>
              </div>
              </div>
          </div>
      </div>
      </div>
    )
  }
  
  export default OfferDetails