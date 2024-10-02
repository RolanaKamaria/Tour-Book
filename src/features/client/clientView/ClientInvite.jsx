import inviteRoad from '../../../assets/images/inviteRoad.svg'
import invite from '../../../assets/images/invite.svg'
import backButton from "../../../assets/images/backButton.svg"
import SmallHeader from "../../layout/SmallHeader"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ClientInvite() {
    const [email, setEmail] = useState('');
      const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleEmail = (e) =>{
        setEmail(e.target.value);
      }
      const handleBack = () => {
        navigate('/user-home-page');
      };
      const handleInvite = () => {
        navigate('/user-home-page');
      };
  return (
    <div className="w-full max-h-full">
    <SmallHeader />
    <div className="flex flex-col space-y-10 pb-10">
      <div className="flex flex-row space-x-6 xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
        <img
          src={backButton}
          onClick={handleBack}
          alt="Back"
          className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
        />
        <span className="text-title-light font-['sans-serif'] xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
          Invite Friends
        </span>
      </div>
      <div className='flex flex-row space-x-20'>
       <img src={invite} className='xl:mx-20 lg:mx-20 md:mx-10 xl:w-fit xl:h-fit lg:w-80 lg:h-80 md:w-72 md:h-72'/>
       <div className='flex flex-col space-y-0'>
        <img src={inviteRoad} className='mr-20 xl:w-fit xl:h-96 lg:w-72 lg:h-60 md:w-60 md:h-60'  />
        <div className="flex flex-col space-y-10 rounded-2xl content-center items-center justify-center bg-clientInvite-light/75
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-14 xl:px-10
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4 
        ">
        <div className="flex flex-col space-y-2 pl-10">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Enter Your Friend’s Email :  </label>
            <input
              type="email"
              onChange={handleEmail}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-11 xl:w-56 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <button onClick={handleInvite}
          className="flex flex-col font-['sans-serif'] items-center justify-center
            drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
            bg-add-button-light text-button-text-light
            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light 
            xl:text-2xl xl:rounded-md xl:w-28 xl:h-10 xl:mt-72
            lg:text-xl lg:rounded-md lg:w-24 lg:h-10  lg:mt-52
            md:text-md md:rounded-md md:w-20 md:h-10  md:mt-64">Invite</button>
          </div>
       </div>
      </div>
      
    </div>
    </div>
  )
}

export default ClientInvite
