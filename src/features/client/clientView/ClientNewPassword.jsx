
import Travel from "../../../assets/images/travel.svg"
import Header from "../../layout/Header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPassword, setConfirmPassword } from "../../user/userSlice"
import { useLocation, useNavigate } from "react-router-dom"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios"
import { API_URL, CONFIG } from "../../../app/config"
function ClientNewPassword() {
    const state = useSelector(state => state.user)
    const [checkError, setCheckError] = useState(false)
    const [msg, setMsg] = useState('')
    const location = useLocation();
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate();

    //to get token & uid from url
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const uidParam = params.get('uid');
        const tokenParam = params.get('token');
        setUid(uidParam);
        setToken(tokenParam);
    }, [location]);

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
    const onSubmit = async (data) => {
        const response = await axios.post(`${API_URL}/auth/users/reset_password_confirm/`, {
            uid: uid,
            token: token,
            new_password: data.password,
            re_new_password: data.confirm
        }, CONFIG).then((response) => {
            dispatch(setToken({ uid, token }));
            navigate('/login')
        })
            // .catch((error) => {
            //     setCheckError(true)

            //     if (error.response && error.response.data) {
            //         const errorData = error.response.data;

            //         if (typeof errorData === 'string') {
            //             setMsg(errorData);
            //         } else {
            //             setMsg(JSON.stringify(errorData));
            //         }
            //     } else {
            //         setMsg('An unknown error occurred');
            //     }
            //     console.error('Error:', error);
            // });



    };
    return (
        <div className=" w-full h-screen max-h-full">
            <Header />
            <img src={Travel} className="absolute h-full w-5/12  right-0 " />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container flex flex-row items-center relative pt-52 ">
                    <div className="bg-presenterPostDetails-light bg-opacity-40  drop-shadow-[2px_4px_rgba(125,143,154,0.5)] h-fit w-2/5 xl:mx-64 xl:rounded-3xl lg:mx-64 lg:rounded-3xl md:mx-56 md:rounded-2xl mb-10">
                        <div className="flex flex-col items-center justify-start mx-auto text-text-light font-['Arial'] gap-1 px-2 xl:text-2xl xl:my-12 lg:text-xl lg:my-16 md:text-lg md:my-20">
                            {
                                checkError && <div className="flex flex-row justify-start  text-error-light font-['Open_Sans']  pb-10
            xl:text-xl lg:text-lg  md:text-base">{msg}
                                </div>
                            }
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
                                    className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light justify-center items-center
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                                xl:text-2xlxl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Save</button>
                                <button type="button" onClick={() => { navigate('/user-home-page') }}
                                    className="flex flex-col text-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light justify-center items-center
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                            xl:w-28 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Cancel</button>

                            </div>
                        </div>
                    </div>
                    <div className="bg-presenterPostDetails-light bg-opacity-40  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] xl:rounded xl:left-80 xl:top-48 xl:w-56 xl:h-10 lg:rounded-md lg:left-72 lg:top-48 lg:w-48 lg:h-8 md:rounded-sm md:left-64 md:top-48 md:w-44 md:h-8 ">
                        <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">New Password</span>
                    </div>

                </div>
            </form>

        </div>)
}
export default ClientNewPassword