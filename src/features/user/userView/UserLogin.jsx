import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import icon from "../../../assets/images/icon.svg";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchUsers } from "../userSlice";

function PresenterLogin() {
  const state = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const error=state.login.rejected
  const msg=state.login.error
  //define login schema with required condition
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handelForgetPassword=()=>{
    navigate('/client/client-forget-password')
  }
  
  // handle form submission
  const onSubmit = async(data) => {
    //Authenticate user and get the user id 
    var username=data.username
    var password=data.password
    const response=await dispatch(fetchUsers({username,password}))
   
    var id= 2
    if(id==3){
      navigate('/presenter-home-page')
    }
    else if(id==2){
      navigate('/orgnizer-home')
    }else if(id==1){
      navigate('/user-home-page')
    }
  };
  return (
    <div className=" w-full h-screen max-h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex flex-row container items-center relative w-3/4 h-3/4 mx-auto xl:p-10 lg:p-8 md:p-6
                 bg-gradient-to-b from-loginBackgroundFrameFrom-light from-20% to-loginBackgroundFrameTo-light to-50%
                 shadow-inputLabelShadow-light/50 drop-shadow-md shadow-md
                 xl:rounded-3xl xl:mt-20 xl:h-3/4 
                 lg:rounded-2xl lg:mt-28 lg:h-3/5 
                 md:rounded-xl  md:mt-36 md:h-96"
        >
          <div
            className="flex flex-col text-text-light font-['Arial'] items-center justify-start
                        xl:text-2xl xl:space-y-8 xl:mt-1 xl:ml-36
                        lg:text-xl  lg:space-y-8 lg:mt-1 lg:ml-16
                        md:text-lg  md:space-y-8 md:mt-1 md:ml-8"
          >
                  {error&& <div className="flex flex-row justify-start  text-error-light font-['Open_Sans'] 
                              xl:ml-32 xl:text-lg lg:ml-28 lg:text-base  md:ml-24 md:text-sm">{msg}
                                  </div>}
            <div className="flex flex-col xl:space-y-3 lg:space-y-2 md:space-y-1">
              <span className="xl:pt-7 lg:pt-5 md:pt-5">User Name:</span>
              <input
                type="text"
                {...register('username')}
                name="username"
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-inputLabel-light
                   xl:h-12 xl:w-72 xl:rounded-xl xl:pl-3 xl:text-xl 
                   lg:h-10 lg:w-60 lg:rounded-lg lg:pl-2 lg:text-lg 
                   md:h-8 md:w-48 md:rounded-md md:pl-1 md:text-base"
              />
              {errors.username && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.username.message}</div>}
            </div>
            <div className="flex flex-col xl:space-y-3 lg:space-y-2 md:space-y-1">
              <span className="xl:pt-7 lg:pt-5 md:pt-5 ">Password:</span>
              <input
                {...register('password')}
                name="password" type="password"
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-inputLabel-light
                   xl:h-12 xl:w-72 xl:rounded-xl xl:pl-3 xl:text-xl 
                   lg:h-10 lg:w-60 lg:rounded-lg lg:pl-2 lg:text-lg 
                   md:h-8 md:w-48 md:rounded-md md:pl-1 md:text-base"
              /> {errors.password && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
              xl:text-lg lg:text-base md:text-sm">{errors.password.message}</div>}
            </div>
            <a
            onClick={handelForgetPassword}
              className="xl:text-base xl:font-light lg:text-s lg:font-normal md:text-xs md:font-normal cursor-pointer">
              {" "}
              Did you forget your password?
            </a>
            <button
              type="submit"
              className="text-center  font-['sans-serif'] text-loginButtonText-light flex
          bg-gradient-to-br from-loginButtonFrom-light via-loginButtonVia-light to-loginButtonTo-light 
          drop-shadow-[3px_6px_rgba(117,135,142,0.5)] rounded-md 
          hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-gradient-to-br hover:from-loginButtonVia-light hover:via-loginButtonVia-light hover:to-loginButtonVia-light
          xl:text-2xl xl:w-28 xl:h-10 xl:pl-7 xl:pt-1 
          lg:text-xl  lg:w-24 lg:h-10 lg:pl-7 lg:pt-1
          md:text-lg  md:w-20 md:h-8  md:pl-5 md:pt-0 "
            >
              Login
            </button>
          </div>
          <img src={icon} className="w-1/2 h-3/4 ml-auto right-0" />
        </div>
        <div
          className="text-center pt-2.5 absolute bg-loginBackgroundFrameFrom-light text-text-light rounded-md 
        drop-shadow-[2px_2px_rgba(230,190,105,0.6)]
        xl:left-56 xl:top-12 xl:w-36 xl:h-16 
        lg:left-48 lg:top-20 lg:w-36 lg:h-16
        md:left-36 md:top-32 md:w-24 md:h-10 "
        >
          <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default PresenterLogin;
