import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallHeader from '../../layout/SmallHeader'
import backButton from '../../../assets/images/backButton.svg';
import createAccountGirl from '../../../assets/images/createAccountGirl.svg'
import createAccountCar from '../../../assets/images/createAccountCar.svg'
import arrowDesign from '../../../assets/images/arrowDesign.svg'
import { setPassword, setEmail, setConfirmPassword, setUserName } from '../../user/userSlice'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {registerUser} from "../clientSlice"
import axios from "axios";
import { API_URL, CONFIG } from "../../../app/config";
function CreateAccount() {


  const [accountType, setAccountType] = useState('client');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [checkError,setCheckError]=useState(false)
  const [msg,setMsg]=useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();


 

  const handleAccountType = (e) => {

    setAccountType(e.target.value);
  }
  const handleBirthday = (e) => {

    setBirthday(e.target.value);
  }
  const handleGender = (e) => {

    setGender(e.target.value);
  }

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string()
      .required("Required")
      .matches(
        "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
        'Invalid email address'
      ),
    mobile: Yup.string().required("Required"),
    password: Yup.string().required("Required")
      .matches(
        "^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
        "your password not strong!!"
      ),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });


  const  onSubmit = async(data) => {
    if (accountType == '') {
      setError(true)
      return
    }
    setError(false)
    var user = {
      ...data, accountType, birthday, gender
    }
   
      const response = await axios.post(`${API_URL}/auth/register/`, {
        email:user.email,
        username:  user.username,
        phone:user.mobile,
        password:user.password,
        role: "C",
        re_password: user.confirm
      
      },CONFIG).then((response) => {
        console.log(response.data);
        dispatch(registerUser({ user }));
        navigate('/register/done')
      })
      .catch((error) => {
       setCheckError(true)
       if(Array.isArray(error.response.data))
        setMsg(error.response.data[0])
       else
        setMsg(error.response.data)
        console.error('Error:', error);
      });
    

   
    //dispatch(setEmail(data.email));
    //dispatch(setPassword(data.password));
    //dispatch(setConfirmPassword(data.confirm));
    //dispatch(setUserName(data.username));

     
  };

  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="w-full max-h-full">
      <SmallHeader />
     
      <div className="flex flex-col space-y-10 pb-10">
        <div className="flex flex-row space-x-6 
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="cursor-pointer 
            xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
          />
          <span className="text-title-light font-['sans-serif'] 
          xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
            Create Account
          </span>
        </div>
        {checkError&& <div className="flex flex-row justify-start  text-error-light font-['Open_Sans'] 
                              xl:ml-32 xl:text-lg lg:ml-28 lg:text-base  md:ml-24 md:text-sm">{msg}
                                  </div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-10">

            <div className="flex flex-row justify-center
        xl:space-x-32 lg:space-x-10 md:space-x-10">
              <div className="flex flex-col space-y-10 rounded-2xl bg-orgnizerbg-light/5  
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4
        ">
                <div className="flex flex-row space-x-10 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">First Name:</label>
                  <input
                    name="firstname" {...register('firstname')}
                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                  />
                </div>
                {errors.firstname && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.firstname.message}</div>}
                <div className="flex flex-row space-x-10 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Last Name:</label>
                  <input
                    name="lastname" {...register('lastname')}
                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                  />
                </div>
                {errors.lastname && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.lastname.message}</div>}
                <div className="flex flex-row space-x-10 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">User Name:</label>
                  <input
                    name="username" {...register('username')}
                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                  />
                </div>
                {errors.username && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.username.message}</div>}
              </div>
              <div className="bg-orgnizerbg-light/5 flex flex-col space-y-7 rounded-2xl
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10 xl:px-8 
                 lg:py-8 lg:px-8
                 md:py-8 md:px-4
        ">
                <div className="flex flex-row space-x-20 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Email: </label>
                  <input
                    name="email" {...register('email')}
                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                  />
                </div>
                {errors.email && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.email.message}</div>}
                <div className="flex flex-row space-x-5 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Phone Number:</label>
                  <input
                    name="mobile" {...register('mobile')}
                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                  />
                </div>
                {errors.mobile && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.mobile.message}</div>}
                <div className="flex flex-row space-x-10 pl-10">
                  <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Account Type:</label>
                  <div className="flex flex-col text-text-light">
                    <div className="flex flex-row space-x-11">
                      <span>Client</span>
                      <input
                        type="radio"
                        name="account-type"
                        value="client"
                        checked={accountType === "client"}
                        onChange={handleAccountType}
                      />
                    </div>
                    <div className="flex flex-row space-x-4">
                      <span>Presenter</span>
                      <input disabled
                        type="radio"
                        name="account-type"
                        value="presenter"
                        checked={accountType === "presenter"}
                        onChange={handleAccountType}
                      />
                    </div>
                    <div className="flex flex-row space-x-4">
                      <span>Organizer</span>
                      <input disabled
                        type="radio"
                        name="account-type"
                        value="orgnizer"
                        checked={accountType === "orgnizer"}
                        onChange={handleAccountType}
                      />
                    </div>
                    {error && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">Requirde</div>}
                  </div>
                </div>
              </div>
            </div>

            <img src={createAccountGirl} className="absolute top-80
         xl:mr-72  xl:w-52 xl:h-52
         lg:mr-40 lg:w-40 lg:h-48
         md:right-96 md:w-36 md:h-36"/>
            <div className="flex flex-row justify-start content-center
          xl:space-x-20 xl:px-28 lg:space-x-16 lg:px-14 md:space-x-12 md:px-10   ">
              <img src={createAccountCar} className=" xl:w-96 xl:h-96 lg:w-72 lg:h-72 md:w-52 md:h-52" />
              <div className="flex flex-col">
                <div className="bg-orgnizerbg-light/10 flex flex-col space-y-10 rounded-2xl h-fit items-center
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md border border-inputLabelShadow-light/40
                 xl:py-10  xl:px-10
                 lg:py-8 lg:px-10
                 md:py-8 md:px-4
        ">
                  <div className="flex flex-row xl:space-x-24 lg:space-x-24 md:space-x-20">
                    <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Password: </label>
                    <input type="password"
                      name="password" {...register('password')}
                      className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                    />
                  </div>
                  {errors.password && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.password.message}</div>}
                  <div className="flex flex-row space-x-10">
                    <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm
            ">Confirm Password: </label>
                    <input type="password"
                      name="confirm" {...register('confirm')}
                      className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                    />
                  </div>
                  {errors.confirm && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.confirm.message}</div>}
                  <div className="flex flex-row space-x-32">
                    <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm">Gender:</label>
                    <select onChange={handleGender}
                      className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="flex flex-row space-x-32">
                    <label className="text-text-light
            xl:text-lg  lg:text-base md:text-sm">Birthday:</label>
                    <input
                      type="date"
                      onChange={handleBirthday}
                      className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-10 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
                    />
                  </div>
                </div>

              </div>
              <div className="flex flex-col xl:pt-32 lg:pt-20 md:pt-16">
                <img src={arrowDesign} className="rotate-90 xl:w-28 xl:h-28 lg:w-28 lg:h-28 md:w-24 md:h-24" />
                <button
                  type="submit"

                  className="font-['sans-serif'] items-center justify-center
              drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
              bg-add-button-light text-button-text-light
              hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
              xl:text-xl xl:rounded-md xl:w-28 xl:h-10 ml-16
              lg:text-lg lg:rounded-md lg:w-20 lg:h-10
              md:text-md md:rounded-md md:w-16 md:h-10 "
                >
                  Create
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount
