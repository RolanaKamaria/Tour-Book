import Title from "./Title"
import Girl from "../../../../assets/images/contactGirl.png"
import Car from "../../../../assets/images/mainCar.png"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
function ContactUs() {
    const [enable,setEnable]=useState(true)
     //define required schema with required condition
     const requiredSchema = Yup.object().shape({
        name: Yup.string()
            .required("Required"),
        email: Yup.string().required("Required")
        .matches(
            "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
            'Invalid email address'
        ),
        phone: Yup.number().required("Required").typeError('Value must be a number'),
        subject: Yup.string().required("Required")

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(requiredSchema),
    });

    // handle form submission
    const onSubmit = (data) => {
           // api for submit subject
            setEnable(false)
    };
    return (
        <div className="flex flex-row justify-center items-center " id="contact">
            <div className="flex flex-col justify-center items-center space-y-10">
                <Title text="Contact Us" style=" xl:px-52 xl:py-10 lg:px-44 lg:py-7 md:px-36 md:py-5 " />
                <div className="flex flex-row justify-center items-center w-full ">
                    <div className="flex flex-col justify-center items-center bg-offerbg-light border-solid border-2 border-text-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] w-2/3 rounded-lg space-y-5
                        xl:py-16  lg:py-12 md:py-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-row space-x-20">
                            
                            <div className="flex flex-col items-center justify-center space-y-5">
                                <div className="flex flex-row justify-center items-center space-x-5">
                                    <span className="flex flex-col  text-title-light font-['sans-serif']  
                           xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Your Name :</span>
                                    <input type="text" placeholder="enter yor name .."  {...register('name')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                                </div>
                                {errors.name && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.name.message}</div>}
                                <div className="flex flex-row justify-center items-center space-x-5">
                                    <span className="flex flex-col  text-title-light font-['sans-serif']  
                           xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Your Email :</span>
                                    <input type="text"  placeholder="******@gmail.com"  {...register('email')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                                </div>
                                {errors.email && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.email.message}</div>}
                                <div className="flex flex-row justify-center items-center space-x-5">
                                    <span className="flex flex-col  text-title-light font-['sans-serif']  
                           xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Your Phone :</span>
                                    <input type="text"  placeholder="0963****"  {...register('phone')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                                </div>
                                {errors.phone && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.phone.message}</div>}
                                <div className="flex flex-row justify-center items-center space-x-5">
                                    <span className="flex flex-col  text-title-light font-['sans-serif']  
                           xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Subject :</span>
                                    <textarea type="text"  placeholder="explane what do you want"  {...register('subject')}
                                        className="drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light py-1 text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-64 xl:mb-8
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 lg:mb-6
                                    md:h-16 md:rounded-md md:text-base md:w-48 md:mb-4 md:ml-2" />
                                </div>
                                
                                {errors.subject && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.subject.message}</div>}
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-5">
                                    {enable?
                                <button type="submit"
                                    className="flex flex-row justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                                xl:text-2xl xl:rounded-md xl:h-16 xl: px-10
                                lg:text-xl lg:rounded-md lg:h-12 lg:px-8 
                                md:text-lg md:rounded-md md:h-8 md:px-5">Send</button>
                                    :  
                                    <div className="flex flex-row justify-center items-center  text-save-button-light font-['Georgia'] 
                                    xl:text-3xl 
                                    lg:text-2xl
                                    md:text-xl ">Send Succefully</div>}
                                <img src={Car} className="flex flex-row xl:w-full xl:h-full lg:w-52 lg:h-40 md:w-32 md:h-20" />
                            </div>
                           
                        </div>
                         </form>
                    </div>
                </div>
                <div className="flex flex-row justify-center items center">
                    <img src={Girl} className="flex flex-col justify-start items-start h-11/12 w-1/6 " />
                    <div className="flex flex-col  justify-center items-end w-1/2 text-text-light font-['sans-serif']  
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
                        To learn more about TourBook, visit our About page.
                        If you still have questions, you can get in touch and we'll
                        get back to you as soon as we can.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactUs