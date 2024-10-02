
import Flower from "../../../assets/images/flower.png"
import Header from "../../layout/Header"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPassword, setConfirmPassword } from "../../user/userSlice"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
function OrgnizerNewPassword() {
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    //define password schema with required condition
    const passwordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Required")
            .matches(
                "^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
                "your password not strong!!"
            )
            .min(8, "Too Short, a password with at least 8 letters is required!"),
        confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(passwordSchema),
    });
    // handle form submission
    const onSubmit = (data) => {
        dispatch(setPassword(data.password))
        dispatch(setConfirmPassword(data.confirm))
        navigate('/orgnizer-home')
        console.log(data);
    };
    return (
        <div className=" w-full h-screen max-h-full">
            <Header />
            <img src={Flower} className="absolute h-screen w-5/12  right-0 " />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container flex flex-row items-center relative pt-52 ">
                    <div className="bg-offerbg-light  drop-shadow-[2px_4px_rgba(125,143,154,0.5)] h-fit w-2/5 xl:mx-64 xl:rounded-3xl lg:mx-64 lg:rounded-3xl md:mx-56 md:rounded-2xl ">
                        <div className="flex flex-col items-center justify-start mx-auto text-text-light font-['Arial'] gap-1 px-2 xl:text-2xl xl:my-12 lg:text-xl lg:my-16 md:text-lg md:my-20">
                            <div className="flex flex-col xl:gap-3 lg:gap-2 md:gap-2">
                                <span>new password :</span>
                                <input type="text"
                                    {...register('password')}
                                    name="password"
                                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light xl:h-10 xl:rounded-xl xl:pl-3 xl:text-xl lg:h-8 lg:rounded-lg lg:pl-2 lg:text-lg md:h-6 md:rounded-md md:pl-1 md:text-base" />
                                {errors.password && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.password.message}</div>}
                                <span className="xl:pt-7 lg:pt-5 md:pt-5">confirm password :</span>
                                <input type="password"
                                    {...register('confirm')}
                                    name="confirm"
                                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light xl:h-10 xl:rounded-xl xl:pl-3 xl:text-xl lg:h-8 lg:rounded-lg lg:pl-2 lg:text-lg md:h-6 md:rounded-md md:pl-1 md:text-base" />
                            </div>
                            {errors.confirm && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.confirm.message}</div>}
                            <div className="flex flex-row justify-between items-start pt-10 xl:gap-6 lg:gap-4 md:gap-2">
                                <button
                                    type="submit"
                                    className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-add-button-light text-button-text-light justify-center items-center
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
                                xl:text-2xlxl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Save</button>
                                <button 
                                onClick={()=>{navigate('/orgnizer-home')}} type="button" 
                                className="flex flex-col text-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light justify-center items-center
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                            xl:w-28 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Cancel</button>

                            </div>
                        </div>
                    </div>
                    <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] xl:rounded xl:left-80 xl:top-48 xl:w-56 xl:h-10 lg:rounded-md lg:left-72 lg:top-48 lg:w-48 lg:h-8 md:rounded-sm md:left-64 md:top-48 md:w-44 md:h-8 ">
                        <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">New Password</span>
                    </div>

                </div>
            </form>

        </div>)
}
export default OrgnizerNewPassword