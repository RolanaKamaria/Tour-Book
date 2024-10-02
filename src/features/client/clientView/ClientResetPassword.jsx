
import Evel from "../../../assets/images/Evel.svg"
import Header from "../../layout/Header"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPassword, setConfirmPassword } from "../../user/userSlice"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
function ClientResetPassword() {
    const state = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //define setPassword schema with required condition
    const setPasswordSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Required").oneOf([state.login.data.password], 'Old Password must match'),
        newPassword: Yup.string()
            .required("Required")
            .matches(
                "^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$",
                "your password not strong!!"
            ),
        confirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(setPasswordSchema),
    });
    // save new password when submission
    const onSubmit = (data) => {
        dispatch(setPassword(data.newPassword))
        dispatch(setConfirmPassword(data.confirm))
    };
    const handleCancel = () =>{
        navigate("/user-home-page")
    }
    return (
        <div className=" w-full h-full max-h-full">
            <Header />
            <img src={Evel} className="absolute h-screen w-5/12  right-10" />
            <form onSubmit={handleSubmit(onSubmit)}>     
                <div className="container flex flex-row items-center relative pt-48 p-5">

                <div className="bg-presenterPostDetails-light bg-opacity-40   drop-shadow-[2px_4px_rgba(125,143,154,0.5)] h-fit w-2/5 xl:mx-40 xl:rounded-3xl lg:mx-32 lg:rounded-3xl md:mx-24 md:rounded-2xl mb-10">
                    <div className="flex flex-col items-center justify-start mx-auto text-text-light font-['Arial'] gap-1 px-2  xl:text-2xl xl:my-12 lg:text-xl lg:my-14 md:text-lg md:my-16">
                        <div className="flex flex-col xl:gap-4 lg:gap-3 md:gap-3">
                            <span>old password :</span>
                            <input type="password"
                                name="oldPassword" {...register('oldPassword')}
                                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light xl:h-10 xl:rounded-xl xl:pl-3 xl:text-xl lg:h-8 lg:rounded-lg lg:pl-2 lg:text-lg md:h-6 md:rounded-md md:pl-1 md:text-base" />
                            {errors.oldPassword && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.oldPassword.message}</div>}
                            <span>new password :</span>
                            <input type="text"
                                name="newPassword" {...register('newPassword')}
                                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light xl:h-10 xl:rounded-xl xl:pl-3 xl:text-xl lg:h-8 lg:rounded-lg lg:pl-2 lg:text-lg md:h-6 md:rounded-md md:pl-1 md:text-base" />
                            {errors.newPassword && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.newPassword.message}</div>}
                            <span>confirm password :</span>
                            <input type="password"
                                name="confirm" {...register('confirm')}
                                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light xl:h-10 xl:rounded-xl xl:pl-3 xl:text-xl lg:h-8 lg:rounded-lg lg:pl-2 lg:text-lg md:h-6 md:rounded-md md:pl-1 md:text-base" />
                        </div>
                        {errors.confirm && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.confirm.message}</div>} <div className="flex flex-row justify-between items-start pt-10 xl:gap-6 lg:gap-4 md:gap-3">
                            <button
                                type="submit"
                                className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light justify-center items-center
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                                xl:text-2xl  xl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Change</button>
                            <button type="button"
                            onClick={handleCancel}
                            className="flex flex-col text-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light justify-center items-center
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                             xl:w-28 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Cancel</button>

                        </div>
                    </div>
                </div>

                <div className="bg-presenterPostDetails-light bg-opacity-40   text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] xl:rounded xl:left-64 xl:top-44 xl:w-56 xl:h-10 lg:rounded-md lg:left-52 lg:top-44 lg:w-48 lg:h-8 md:rounded-sm md:left-36 md:top-44 md:w-44 md:h-8 ">
                    <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">Reset Password</span>
                </div>

            </div></form>
        </div>)
}
export default ClientResetPassword