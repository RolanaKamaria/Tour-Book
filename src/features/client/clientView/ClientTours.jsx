import React from 'react'
import SmallHeader from '../../layout/SmallHeader'
import backButton from "../../../assets/images/backButton.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import acceptIcon from '../../../assets/images/acceptIcon.svg'
import refuseIcon from '../../../assets/images/refuseIcon.svg'
import waitingIcon from '../../../assets/images/waitingIcon.svg'
import activityIcon from '../../../assets/images/activityIcon.svg'
import leaveIcon from '../../../assets/images/leaveIcon.svg'
import arriveIcon from '../../../assets/images/arriveIcon.svg'
import reqIcon from '../../../assets/images/reqIcon.svg'
import ToursDes1 from '../../../assets/images/ToursDes1.svg'
import ToursDes2 from '../../../assets/images/ToursDes2.svg'
import ToursDes3 from '../../../assets/images/ToursDes3.svg'

import {cancelTour} from '../clientSlice'

function ClientTours() {
  const state = useSelector(state => state.client)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/user-home-page');
      };
     const handleCancellation = (id) =>{
      if (window.confirm('Are you sure you want to cancel this request?')) {
        dispatch(cancelTour({id}))
      }
     
     }
  return (
    <div className="w-full max-h-full">
      <SmallHeader />
      <div className="flex flex-row space-x-6 xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
        <img
          src={backButton}
          onClick={handleBack}
          alt="Back"
          className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
        />
        <span className="text-title-light font-['sans-serif'] xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
         My Tours
        </span>
      </div>
      <div className='flex flex-col justify-center content-center items-center my-10'>
      <div className="flex flex-col space-y-10 rounded-2xl bg-orgnizerbg-light/5  w-fit 
                     overflow-hidden hover:overflow-y-scroll h-96
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4
        ">
    

               <div className='flex flex-col space-y-20'>
               {state.clientTours.length == 0 ? (<div className='bg-title-light/20
                  rounded-lg border border-inputLabelShadow-light/40 
                  space-y-10 xl:px-12 xl:py-10 lg:px-6 lg:py-8 md:px-8 md:py-6
               content-center justify-center items-center mx-20 my-20'> 
                <label className="text-text-light text-xl"> No Request Yet!</label></div>) :
                state.clientTours.map((clientTour, index) => (
                  <div key={clientTour.id} className="flex flex-col bg-button-text-light/75 
                  rounded-lg border border-inputLabelShadow-light/40 
                  space-y-10 xl:px-12 xl:py-10 lg:px-6 lg:py-8 md:px-8 md:py-6">
              <div className='flex flex-row space-x-40 items-center content-center justify-center'> 
                <div className='flex flex-row space-x-2'>
              <div className="flex flex-col rounded-full border-solid border-2 border-text-light 
               items-center justify-center text-text-light 
               bg-gradient-to-br from-clientBackgroundFrom-light from-3% via-clientBackgroundVia-light via-10% to-clientBackgroundTo-light to-80%
                               xl:w-14 xl:h-14 xl:text-2xl 
                               lg:w-12 lg:h-12
                               md:w-10 md:h-10">
                {index+1}
                </div> 
                <label className="pt-4 text-title-light font-semibold font-['Georgia'] text-xl">{clientTour.title}</label>
                </div>  
                <div className='flex flex-row space-x-2'> 
                  <label className='text-text-light xl:text-xl pt-1'>status:</label>
                  {clientTour.status === 'accepted' && <img src={acceptIcon} className='w-10 h-10'/>}
                  {clientTour.status === 'refused' && <img src={refuseIcon} className='w-10 h-10'/>}
                  {clientTour.status === 'wait' && <img src={waitingIcon} className='w-10 h-10'/>}
                   </div>
                   <button onClick={() => handleCancellation(clientTour.id)}
                  className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-delete-button-light text-button-text-light justify-center items-center 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-32 xl:h-10
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                md:text-lg md:rounded-md  md:w-20 md:h-8 "
                  >Cancellation</button>
                </div>
                <div className='flex flex-row space-x-40 px-10' >
                <div className='flex flex-row space-x-4' >
                <div className='flex flex-col space-y-10' >
                  <label>Meeting Point:</label>
                  <label>Date:</label>
                  <label>Number of seats:</label>
                  </div>  
                <div className='flex flex-col space-y-10' >
                <label>{clientTour.meetingPoint}</label>
                  <label>{clientTour.startDate} | {clientTour.endDate}</label>
                  <label>{clientTour.numberOfSeats}</label>
                  </div> 
                </div> 
                <div className='flex flex-row space-x-4' >
                <div className='flex flex-col space-y-10' >
                <label>Meeting Time:</label> 
                  <label>Total Time:</label>
                  <label>Price:</label>
                  </div>  
                <div className='flex flex-col space-y-10' >
                <label>{clientTour.meetingTime}</label>
                  <label>{clientTour.totalTime}</label>
                  <label>{clientTour.price}</label>
                  </div> 
                </div> 
                </div>
                <label className=" text-text-light font-semibold font-['Georgia'] text-xl px-10">Iternary:</label>
        
                 <div className='px-12 bg-clientBackgroundFrom-light/20 w-fit rounded-xl py-20 ml-20
                grid grid-cols-2 gap-y-5 gap-x-10'> 
                {clientTour.tourPoints.map((position,index) => (
                  <div key={position.id} className="flex flex-col space-y-10 rounded-2xl bg-orgnizerbg-light justify-center content-center items-center
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8 
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4"> 
                 <div className='text-text-light font-semibold text-xl'>{position.position}</div>
               <div className='flex flex-row space-x-10'>
                 <div className='flex flex-row space-x-4'>
                  <img src={arriveIcon} />
                  <label>{position.arrivalTime}</label>
                   </div>
                   <div className='flex flex-row'>
                  <img src={leaveIcon} />
                  <label>{position.leavingTime}</label>
                   </div>
                 </div>
                 <div className='flex flex-row space-x-10' >
                 <div className='flex flex-row space-x-6'>
                  <img src={reqIcon} />
                  <ul>
                 {position.requirement.map((req,index)=>
                 {return(
                   <li className='list-disc text-text-light'> {req.title}</li>
                  )})}
                  </ul>
                   </div>
                   <div className='flex flex-row space-x-6'>
                  <img src={activityIcon} />
                  <ul>
                 {position.activity.map((act,index)=>
                 {return(
                   <li className='list-disc text-text-light'> {act.title}</li>
                  )})}
                  </ul>
                   </div>
                 </div>
                 </div>
                ))}
                 </div>
            </div>
                ))}
             </div>
       <div>
       </div>
       </div>
      </div>
      <img src={ToursDes1} className='absolute left-2 bottom-0 w-60 h-60'/>
      <img src={ToursDes2} className='absolute right-32 bottom-0 w-52 h-52'/>
      <img src={ToursDes3} className='absolute right-0 bottom-10 w-40 h-40'/>
    </div>
  )
}

export default ClientTours
