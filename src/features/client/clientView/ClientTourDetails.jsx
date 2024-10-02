import React from 'react'
import SmallHeader from '../../layout/SmallHeader'
import backButton from "../../../assets/images/backButton.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import activityIcon from '../../../assets/images/activityIcon.svg'
import leaveIcon from '../../../assets/images/leaveIcon.svg'
import arriveIcon from '../../../assets/images/arriveIcon.svg'
import reqIcon from '../../../assets/images/reqIcon.svg'
import UpArrow from '../../../assets/images/UpArrow.svg'
import DownArrow from '../../../assets/images/DownArrow.svg'
import TourDetailsUnivars from '../../../assets/images/TourDetailsUnivars.svg'
import profileDesign2 from '../../../assets/images/profileDesign2.svg'
import TourDetailsCar from '../../../assets/images/TourDetailsCar.svg'
import TourDetailsGirl from '../../../assets/images/TourDetailsGirl.svg'

function ClientTourDetails() {
    
    const state = useSelector(state => state.client)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/user-home-page');
      };
      const handleNext = () => {
        navigate('/client/register');
      };
     var TourDetails = {}
         TourDetails= state.clientTours.filter(tour => parseInt(tour.id) == parseInt(state.selected.tourId));
    
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
                 {TourDetails[0].title}
                 </span> 

      </div>
      <div className='flex flex-col space-y-10 items-center my-10 mx-5 '>
      <div className='flex flex-col bg-button-text-light/75
      rounded-lg border border-inputLabelShadow-light/40 
       space-y-10 xl:px-20 xl:py-10 lg:px-6 lg:py-8 md:px-8 md:py-6
       w-3/4
       
       '>
      <div className="overflow-hidden hover:overflow-x-auto">

         <div className='flex flex-row space-x-20 text-text-light '>
         <div className='flex flex-col space-y-4'>
          <div className='flex flex-row space-x-2'>
          <label>Meeting Point:</label>
          <label>{TourDetails[0].meetingPoint}</label>
          </div>
          <div className='flex flex-row space-x-2'>
          <label>Date: </label>
          <label>{TourDetails[0].startDate} | {TourDetails[0].endDate} </label>
          </div>
          </div>
          <div className='flex flex-row space-x-2'>
          <label>Meeting Time: </label>
          <label>{TourDetails[0].meetingTime}</label>
          </div>
          <div className='flex flex-col space-y-4'>
          <div className='flex flex-row space-x-2'>
          <label>Total Time:</label>
          <label>{TourDetails[0].totalTime}</label>
          </div>
          <div className='flex flex-row space-x-2'>
          <label>Price:</label>
          <label>{TourDetails[0].price}</label>
          </div>
          </div>
         </div>
         <div className="bg-gradient-to-br from-clientBackgroundFrom-light from-3% via-clientBackgroundVia-light via-10% to-clientBackgroundTo-light to-80%
       text-text-light font-semibold font-['Georgia'] text-xl mt-10
        border-solid border-text-light border-2 rounded-full w-fit px-4 h-fit py-4 justify-center content-center">
         <label>Iternary:</label>
         </div>
        <div className='flex flex-row space-x-10 py-10'>
       {TourDetails[0].tourPoints.map((position,index) => (
         <div className='flex flex-col space-y-0'>
          {index%2 == 0 ?
           ( 
            <div className='flex flex-col space-y-0'>
            <div className="flex flex-col space-y-4 rounded-2xl bg-orgnizerbg-light justify-center content-center items-center
           shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
           xl:py-10 xl:px-10 w-fit
           lg:py-8 lg:px-8
           md:py-8 md:px-4">
        <div className='text-text-light font-semibold text-xl'>{position.name}</div>
         <div className='flex flex-row space-x-10'>
           <div className='flex flex-row space-x-3'>
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
           <img src={DownArrow} className='w-32 h-32 ml-40'/>
           </div>
            ):
           (
            <div className='flex flex-col space-y-0'> 
           <img src={UpArrow} className='w-32 h-32 ml-40'/> 
            <div className="flex flex-col space-y-4 rounded-2xl bg-orgnizerbg-light justify-center content-center items-center
           shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
           xl:py-10 xl:px-10 w-fit
           lg:py-8 lg:px-8
           md:py-8 md:px-4">
        <div className='text-text-light font-semibold text-xl'>{position.name}</div>
         <div className='flex flex-row space-x-10'>
           <div className='flex flex-row space-x-3'>
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
            {position.requirement.map(req=>
            {return(
              <li className='list-disc text-text-light'> {req.title}</li>
            )})} 
            </ul>
             </div>
             <div className='flex flex-row items-center space-x-6'>
            <img src={activityIcon} className='w-8 h-8'/>
            <ul>
            {position.activity.map(act=> 
            {return( 
            <li className='list-disc text-text-light'> {act.title}</li> 
            )})} 
            </ul>
             </div>
           </div>
           </div> 
           </div>

        
        )}
        
</div>

       ))}
                   <div className='flex flex-col space-y-0' >
         <div className="xl:w-56 xl:h-56 lg:w-40 lg:h-40 md:w-32 md:h-32">
         <img src={TourDetailsUnivars}  />
         </div>

     </div>  

     </div>
      </div>
      </div>
      <button onClick={handleNext}
          className="flex flex-col font-['sans-serif'] items-center justify-center content-center 
            drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
            bg-add-button-light text-button-text-light
            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light 
            xl:text-2xl xl:rounded-md xl:w-28 xl:h-10 
            lg:text-xl lg:rounded-md lg:w-24 lg:h-10  
            md:text-md md:rounded-md md:w-20 md:h-10 ">Next</button> 
      </div>
      <img src={TourDetailsCar} className='absolute -left-20 w-96 h-96 -bottom-80'/>
      <img src={TourDetailsGirl} className='absolute right-5 w-72 h-72 -bottom-80'/>
  </div>
  
  )
}

export default ClientTourDetails
