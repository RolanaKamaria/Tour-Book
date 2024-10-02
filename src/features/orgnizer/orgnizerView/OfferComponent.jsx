import { useSelector } from 'react-redux'
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/Cake.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/Burger.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/Chicken.png'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectOffer } from '../orgnizerSlice';
function OfferComponent(props) {
    const images = [image1, image2, image3, image1]
    var presenterId=useSelector(state=>state.orgnizer.selected.presenterId)
    const [arrivalTime,setArrivalTime]=useState(null)
    const [leaveTime,setLeaveTime]=useState(null)
    const [errorLeave,setErrorLeave]=useState(false)
    const [errorArrive,setErrorArrive]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
 //define requestOffer schema with required condition
 const requestOfferSchema = Yup.object().shape({
    note: Yup.string(),
    requiredSeats: Yup.number()
        .required("Required"),
        startDate: Yup.date().required("Required"),
        endDate:   Yup.date().required("Required"),

});
const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm({
    resolver: yupResolver(requestOfferSchema),
});
// handle form submission
const onSubmit = (data) => {
    
    if(arrivalTime==null)
        setErrorArrive(true)
    else if(leaveTime==null)
        setErrorLeave(true)
    else{
        var offer={}
        offer.description=data.note
        offer.quantity=data.requiredSeats
        offer.arriveTime=arrivalTime
        offer.leaveTime=leaveTime
        offer.id=props.id
        offer.status=true
        offer.startDate=data.startDate.toISOString()
        offer.endDate=data.endDate.toISOString()
        var tourPoint=presenterId
        dispatch(selectOffer({tourPoint,offer}))
        navigate('/make-special-tour')
    }
};
    return (
        <div className="flex flex-row justify-center items-center relative w-11/12 pt-5" >
            <div className="flex flex-row justify-center items-center w-full bg-orgnizerbg-light border-solid border-2 border-title-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl p-5 space-x-5">
                <div className="flex flex-col justify-center items-center space-y-5">
                    <div className="flex-row xl:text-3xl lg:text-2xl md:text-xl text-title-light font-['Georgia'] font-semibold">
                        {props.offer.title}
                    </div>
                    <div className="flex flex-row justify-center items-center w-fit bg-post-bg-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl">
                        <div className="flex flex-col items-center justify-center space-y-3 p-5 font-['serif'] text-text-light
                            xl:text-2xl lg:text-xl md:text-base">
                            <div className='flex-row'>{props.offer.startTime} - {props.offer.endTime} </div>
                            <div className='flex-row'>{props.offer.startDate} - {props.offer.endDate}</div>
                            <div className='flex-row space-x-3'>
                                <span className=" text-title-light">Include : </span><span>{props.offer.description}</span>
                            </div>

                        </div>
                    </div>
                    <div className="flex-row xl:text-2xl lg:text-xl md:text-base text-title-light font-['Georgia'] font-semibold">
                        {props.offer.pricePerOne} $ for seat
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => {
                            return (
                                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                                    <a target="_blank" href={image}> <img
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        className="w-full max-h-32 object-cover"
                                    /></a>
                                </div>
                            )
                        })}

                    </div>
                </div> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center space-y-10">

                        <div className="flex flex-row w-fit bg-post-bg-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl">
                            <div className="flex flex-col items-start justify-center space-y-3 p-5 font-['serif'] text-text-light
                            xl:text-2xl lg:text-xl md:text-base">
                                <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Arrival Time : </span>
                                    <input type="time" onChange={(e)=>{setArrivalTime(e.target.value); setErrorArrive(false)}}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-32
                            lg:rounded-lg lg:text-lg lg:h-7 lg:w-28
                            md:rounded-md md:text-base md:h-6 md:w-24" />

                                </div>
                                {errorArrive && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">arrival time is required</div>}
                                <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Leave Time : </span>
                                    <input type="time" onChange={(e)=>{setLeaveTime(e.target.value); setErrorLeave(false)}}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-32
                            lg:rounded-lg lg:text-lg lg:h-7 lg:w-28
                            md:rounded-md md:text-base md:h-6 md:w-24" />

                                </div>
                                {errorLeave && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">leave time is required</div>}
                                 <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Arrival Date : </span>
                                    <input type="date" {...register('startDate')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-36
                            lg:rounded-lg lg:text-lg lg:h-7 lg:w-32
                            md:rounded-md md:text-base md:h-6 md:w-28" />

                                </div>
                                {errors.startDate && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.startDate.message}</div>}
                                <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Leave Date : </span>
                                    <input type="date" {...register('endDate')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-36
                            lg:rounded-lg lg:text-lg lg:h-7 lg:w-32
                            md:rounded-md md:text-base md:h-6 md:w-28" />

                                </div>
                                {errors.endDate && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.endDate.message}</div>}
                                <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Required Seats : </span>
                                    <input type="number" {...register('requiredSeats')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-12
                            lg:rounded-lg lg:text-lg lg:h-7 lg:w-10
                            md:rounded-md md:text-base md:h-6 md:w-8" />

                                </div>
                                {errors.requiredSeats && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.requiredSeats.message}</div>}
                                <div className='flex flex-row items-start justify-start space-x-3'>
                                    <span className="flex flex-col text-title-light
                                xl:w-40 lg:w-36 md:w-32 ">Note : </span>
                                    <textarea type="text" {...register('note')}
                                        className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-20 xl:w-32 
                            lg:rounded-lg lg:text-lg lg:h-16 lg:w-28
                            md:rounded-md md:text-base md:h-12 md:w-24" />

                                </div>
                                {errors.note && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.note.message}</div>}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-start">
                            <button
                                type="submit"
                                className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-add-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8">Choose</button>

                        </div>

                    </div> </form>
            </div>

        </div>
    )
}

export default OfferComponent