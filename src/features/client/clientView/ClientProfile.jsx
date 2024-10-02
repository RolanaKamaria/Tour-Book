
import SmallHeader from "../../layout/SmallHeader"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Person from "../../../assets/images/nan.jpg"
import profileDesign1 from '../../../assets/images/profileDesign1.svg'
import profileDesign2 from '../../../assets/images/profileDesign2.svg'
import profileDesign3 from '../../../assets/images/profileDesign3.svg'
import {editRegisterInfo} from "../clientSlice";
import { setUserInformation}  from '../../user/userSlice'
import backButton from "../../../assets/images/backButton.svg"



function ClientProfile() {
  const state = useSelector(state => state.client)
  const state1 = useSelector(state => state.user)
  const [name, setName] = useState(state.name);
  const [lastName, setLastName] = useState(state.lastName);
  const [userName, setUserName] = useState(state1.login.data.userName );
  const [email, setEmail] = useState(state1.login.data.email);
  const [mobile, setMobile] = useState(state.mobile);
  const [birthday, setBirthday] = useState(state.birthday);    
  const [selectedFile, setSelectedFile] = useState(null);
 const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const handleFirstName = (e) =>{
  setName(e.target.value);
  }
  const handleLastName = (e) =>{
      setLastName(e.target.value);
  }
  const handleUserName = (e) =>{
      setUserName(e.target.value);
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }
  const handleMobile= (e) =>{
      setMobile(e.target.value);
  }


  const handleBirthday= (e) =>{
    setBirthday(e.target.value);
  }


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
    }
    
  };
 const handleSaveInfo = () =>{
  var clientInfo = {name,lastName,mobile,birthday}
  var userInfo = {email,userName}
  dispatch(editRegisterInfo({clientInfo}))
  dispatch(setUserInformation({userInfo}))
  navigate('/user-home-page')
 }
 const handleChangePass = () =>{
  navigate('/client/client-reset-password')
 }
 const handleBack = () => {
  navigate('/user-home-page');
};
  return (
    <div className="flex flex-col xl:mx-10 lg:mx-10 md:mx-5 mb-10">
    <SmallHeader />
    <div className="flex flex-row  justify-between items-center
    xl:py-12 xl:px-20 xl:space-x-5
    lg:py-10 lg:px-8 lg:space-x-4
    md:py-8 md:px-12 md:space-x-3">
        <div className="flex flex-row  text-text-light  font-['sans-serif']  hover:cursor-pointer 
                    xl:text-xl  xl:space-x-6
                    lg:text-lg  lg:space-x-4 lg:pl-5
                    md:text-base ">
           <img src={backButton} onClick={handleBack} className=" hover:cursor-pointer 
             xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                onClick={() => { navigate('/user-home-page') }}><span>Home</span></div>
            <div className="flex flex-col justify-center items-center bg-loginButtonVia-light text-title-light   px-3 rounded" >
                <span>Profile</span></div>
            
            <div className="flex flex-col justify-center items-center w-fit px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                onClick={() => { navigate('/client/client-tours-requests') }}><span>My Tour</span></div>
            <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-loginButtonVia-light  hover:text-title-light"
                onClick={() => { navigate('/client/client-notification') }}><span>Notification</span></div>
        </div>
        
        <div className="flex flex-row justify-center items-center space-x-8">
                        <span className="flex flex-col text-text-light xl:text-2xl lg:text-xl md:text-base font-['Georgia'] ">Choose new image</span>
                        <input type="file"  id="custom-file-input" onChange={(e)=>handleFileChange(e)} style={{ display: 'none' }}
                            className="flex flex-col drop-shadow-[2px_4px_rgba(125,143,154,0.5)]
                            lg:rounded-full lg:h-9 lg:w-56
                            md:rounded-full md:h-8 md:w-48" />
                             <label htmlFor="custom-file-input">
                                <img src={selectedFile?URL.createObjectURL(selectedFile):
                                //user.login.data.avatar? user.login.data.avatar: 
                                Person} alt="Choose Image Button" 
                                className="rounded-full drop-shadow-[1px_1px_rgba(117,135,142)] hover:cursor-pointer
                                xl:w-28 xl:h-28
                                lg:w-28 lg:h-28
                                md:w-24 md:h-24"/>
                            </label>
                   </div>

    </div>
    <div className="flex flex-row space-x-20 content-center justify-center items-center">
    
    <div className="flex flex-col space-y-10">
            <div className="flex flex-row">
              <img src={profileDesign1} className="xl:w-64 xl:h-64 lg:w-56 lg:h-56 md:w-40 md:h-40"/>
              <img src={profileDesign2} className=" xl:w-52 xl:h-52 lg:w-40 lg:h-40 md:w-32 md:h-32 xl:mt-10 lg:mt-10 md:mt-6"/>
            </div>
            <div className="flex flex-col space-y-10 rounded-2xl bg-orgnizerbg-light/5  
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4
        ">
        <div className="flex flex-row xl:space-x-10 lg:space-x-7 md:space-x-12 xl:pl-10 lg:pl-2 md:pl-2">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">First Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleFirstName}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-row xl:space-x-10 lg:space-x-7  md:space-x-12 xl:pl-10 lg:pl-2 md:pl-1">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Last Name:</label>
            <input
            value={lastName}
              type="text"
              onChange={handleLastName}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-row xl:space-x-10 lg:space-x-7 md:space-x-12 xl:pl-10 lg:pl-2 md:pl-2">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={handleUserName}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-10 rounded-2xl bg-orgnizerbg-light/5  
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4
        ">
        <div className="flex flex-row space-x-28 pl-10">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Email: </label>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-row space-x-10 pl-10">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Phone Number: </label>
            <input
              type="number"
              value={mobile}
              onChange={handleMobile}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-row space-x-24 pl-10">
            <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Birthday:</label>
            <input
              type="date"
              value={birthday}
              onChange={handleBirthday}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
            </div>
            
          </div>
          <div className="flex flex-row space-x-10">
              <img src={profileDesign3} className="xl:w-72 xl:h-72 lg:w-64 lg:h-64 md:w-44 md:h-44"/>
              <div className="flex flex-col space-y-6 content-center items-center justify-center">
              <button onClick={handleSaveInfo}
                    className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-32 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-32 lg:h-10  
                                md:text-lg md:rounded-md  md:w-32 md:h-8">Save</button>
              <button onClick={handleChangePass}
                    className="flex flex-col justify-center items-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light 
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                             xl:w-48 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-44 lg:h-10
                            md:text-lg md:rounded-md  md:w-40 md:h-8">Change Password</button>
                            </div>
              
            </div>
        </div>
        </div>
    </div>
  )
}

export default ClientProfile
