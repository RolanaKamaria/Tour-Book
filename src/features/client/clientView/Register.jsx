import React, { useState } from 'react'
import SmallHeader from '../../layout/SmallHeader'
import backButton from "../../../assets/images/backButton.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register1 from '../../../assets/images/Register1.svg'
import Register2 from '../../../assets/images/Register2.svg'
import Register3 from '../../../assets/images/Register3.svg'
import {setNumberOfSeats} from '../clientSlice'
function Register() {
    const state = useSelector(state => state.client)
    const state1 = useSelector(state => state.user)
    const state2 = useSelector(state => state.orgnizer)
    const FirstName = state.name;
    const LastName= state.lastName;
    const UserName = state1.login.data.userName;
    const phoneNumber = state.mobile;
    const organizerNumber = state2.mobile;
    const [seats, setSeats] = useState("1");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/user-home-page');
      };
    const handleChange = (e) =>{
        setSeats(e.target.value)
    };
    const handleRegister = (e) =>{
       dispatch(setNumberOfSeats(seats));
        navigate('/user-home-page');
    };
    
  return (
    <div className="w-full max-h-full">
    <SmallHeader />
    <div className='flex flex-col'>
    <div className="flex flex-row space-x-6 xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9 ">
      <img
        src={backButton}
        onClick={handleBack}
        alt="Back"
        className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
      />
      <span className="text-title-light font-['sans-serif'] xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
       Register
      </span>
    </div>
    <div className='flex flex-col items-center mb-10 xl:space-y-4 lg:space-y-20 md:space-y-32'>
    <div className="flex flex-row rounded-2xl bg-orgnizerbg-light/5 my-10 w-fit text-text-light
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-20 xl:space-x-52
                 lg:py-8 lg:px-8   lg:space-x-52
                 md:py-8 md:px-4   md:space-x-10
                  
        ">
            <div className='flex flex-row space-x-14'>
             <div className='flex flex-col space-y-16 font-semibold'>
             <label>First Name:</label>
             <label>Last Name:</label>
             <label>User Name:</label>
             </div>
             <div className='flex flex-col space-y-16'>
             <label>{FirstName}</label>
             <label>{LastName}</label>
             <label>{UserName}</label>
             </div>
            </div>
            <div className='flex flex-row space-x-14 '>
             <div className='flex flex-col space-y-16 font-semibold'>
             <label>Phone Number:</label>
             <label>Number Of Seats:</label>
             <label>Organizer Number:</label>
             </div>
             <div className='flex flex-col space-y-14'>
             <label>{phoneNumber}</label>
             <label>
                <input type='number' value={seats} onChange={handleChange} min={1}
                       className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                                  xl:h-10 xl:w-20 xl:rounded-xl xl:pl-3 xl:text-lg 
                                  lg:h-10 lg:w-16 lg:rounded-lg lg:pl-2 lg:text-base
                                  md:h-8 md:w-14 md:rounded-md md:pl-1 md:text-sm"
                />
                
            </label>
             <label>{organizerNumber}</label>
             </div>
            </div>
     </div>
     <button onClick={handleRegister}
          className="flex flex-col font-['sans-serif'] items-center justify-center content-center 
            drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
            bg-add-button-light text-button-text-light
            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light 
            xl:text-2xl xl:rounded-md xl:w-28 xl:h-10 
            lg:text-xl lg:rounded-md lg:w-24 lg:h-10  
            md:text-md md:rounded-md md:w-20 md:h-10 ">Register</button> 
    </div>
    </div>
             <img src={Register3} className='absolute  w-72 h-72 xl:bottom-0 lg:bottom-0 md:bottom-0 xl:left-20 lg:left-2 md:-left-10'/>
             <img src={Register2} className='absolute  w-36 h-36 xl:bottom-0 lg:bottom-0 md:bottom-0 xl:left-72 lg:left-52 md:left-40'/>
             <img src={Register1} className='absolute  xl:w-80 xl:h-80 lg:w-80 lg:h-80 md:w-72 md:h-72 xl:bottom-0 lg:bottom-0 md:bottom-0 xl:right-10  lg:right-16  md:right-8 '/> 
    </div>
  )
}

export default Register
