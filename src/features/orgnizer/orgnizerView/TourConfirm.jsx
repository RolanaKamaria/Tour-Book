import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  setFinalTourDetails } from "../orgnizerSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../app/config";
function TourConfirm() {
    const state = useSelector(state => state.orgnizer)
    const [seatPrice, setSeatPrice] = useState(0)
    const [transportCost, setTransportCost] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [externalCost, setExternalCost] = useState(0)
    const [porfit, setPorfit] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [numOfSeats, setNumOfSeats] = useState(0)
    const [notes, setNotes] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tourPoints=useSelector(state=>state.orgnizer.tour.tourPoints)

     //define required schema with required condition
     const requiredSchema = Yup.object().shape({
        seatPrice: Yup.number()
            .required("Required"),
        transportCost: Yup.number()
            .required("Required"),
        startDate: Yup.date().required("Required"),
        numOfSeats: Yup.number().required("Required")

    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(requiredSchema),
    });

    useEffect(()=>{
        const selectedPoint= tourPoints.filter(point=>point.select==true)
 
        var prices= selectedPoint.map(p=>
           {var  offerId= p.offerRequest.offerId
            var quantity=p.offerRequest.quantity
            var offer=p.offers.filter(o=>o.id==offerId)
            var price=quantity*offer[0].pricePerOne
             return(
            price)
           })
     
        var tot=parseInt( transportCost)+parseInt(externalCost)+prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        var porfit=parseInt(numOfSeats)*parseInt(seatPrice)-tot
        setTotalCost(tot)
        setPorfit(porfit)
    },[seatPrice,transportCost,externalCost,numOfSeats])


    const handelBack = () => {
        navigate('/make-special-tour/edit-itenrary');
    }
    
    const handelCancel = () => {
        navigate('/orgnizer-home')
    }

   
    const createTour=()=>{
        var attach=[]
        state.tour.tourAttachment.forEach(element=>{
          attach.push({
            attachment:{
              file:element.attachment
            }
          })
        })
        var points=[]
        state.tour.tourPoints.forEach(element=>{
       
          points.push({
            title: element.name,
            axis_y:element.lng,
            axis_x:element.lat,
            position:2147483647,
            leaving_time:element.leavingTime,
            arrival_time:element.arrivalTime,
            description:element.description,
            offer_request:{
              num_of_seat:element.offerRequest.quantity,
              description:element.offerRequest.description
            }
          })
        })
  
        var data={
          title: state.tour.title,
          description:state.tour.description,
          starting_place: state.tour.startingPlace,
          reaction: [
            0
          ],
          seat_num: state.tour.numOfSeat,
          seat_cost:state.tour.seatCost,
          transportation_cost: state.tour.transportationCost,
          extra_cost:state.tour.extraCost,
          x_starting_place:state.tour.XstartingPlace,
          y_starting_place: state.tour.YstartingPlace,
          start_date: state.tour.startDate,
          end_date:state.tour.endDate,
          note: state.tour.note,
          posted: false,
          posted_at: "2024-08-11T18:59:14.463Z",
          tour_attachments: attach,
          tour_points: points
        }
        console.log(data)
        var token=  localStorage.getItem('accessToken');
        var response=axios.post(`${API_URL}/api/tours/`, {
       ...data
        },{
          headers: {       
            Accept: 'application/json',
            Authorization: `JWT ${token}`,
          }
        }).then((res) => 
          {
           console.log( res.data)
           }
        ) .catch((error) => {
           console.error('Error:', error);
         });
       
    
    }

    // handle form submission
    const onSubmit = (data) => {
        var tour = {}
        tour.seatPrice = data.seatPrice,
            tour.transportCost = data.transportCost,
            tour.externalCost = externalCost,
            tour.totalCost = totalCost,
            tour.numOfSeats = data.numOfSeats,
            tour.startDate = data.startDate,
            tour.startTime = startTime,
            tour.notes = notes
        dispatch(setFinalTourDetails(tour))
        createTour()
        navigate('/orgnizer-home')
    };
    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Confirm Tour</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row justify-center p-10 mb-5 xl:gap-x-28 lg:gap-x-16 md:gap-x-8">

                    <div className="flex flex-col justify-center ">

                        <div className="container flex flex-col items-start drop-shadow-[2px_2px_rgba(125,143,154,0.5)] h-fit w-fit bg-post-bg-light border-solid border-2 border-text-light  space-y-10
                xl:px-16 xl:rounded-3xl xl:py-10
                lg:px-10 lg:rounded-3xl lg:mr-10 lg:py-8
                md:px-6 md:rounded-2xl  md:mr-10 md:py-5">
                            <div className="flex flex-row justify-between pt-5">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Seat Price :</span>
                                <input type="text"   {...register('seatPrice')} onChange={(e)=>{setSeatPrice(e.target.value)}}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                            </div>
                            {errors.seatPrice && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.seatPrice.message}</div>}
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Transport Cost :</span>
                                <input type="text"   {...register('transportCost')} onChange={(e)=>setTransportCost(e.target.value)}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                            </div>
                            {errors.transportCost && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.transportCost.message}</div>}
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">External Cost :</span>
                                <input type="text" value={externalCost} onChange={(e) => { setExternalCost(e.target.value) }}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Total Cost :</span>
                                <input type="text" disabled value={totalCost}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Producted Porfit :</span>
                                <input type="text" disabled value={porfit}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64  xl:mb-8
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56 lg:mb-6
                            md:rounded-md md:text-base md:h-8 md:w-48 md:mb-4" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="container flex flex-col items-start drop-shadow-[2px_2px_rgba(125,143,154,0.5)] h-fit w-fit bg-post-bg-light border-solid border-2 border-text-light space-y-5
                xl:px-16 xl:rounded-3xl xl:py-5
                lg:px-10 lg:rounded-3xl  lg:mr-10 lg:py-3
                md:px-6 md:rounded-2xl md:mr-10 md:py-2">
                            <div className="flex flex-row justify-between pt-5">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                           xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Distance (KM) :</span>
                                <input type="text" disabled value={state.tour.KMdistance}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Distance (H) :</span>
                                <input type="text" disabled value={state.tour.HMdistance}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-orgnizerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Date :</span>
                                <input type="date"   {...register('startDate')}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-48" />
                            </div>
                            {errors.startDate && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.startDate.message}</div>}
                            <div className="flex flex-row justify-between">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Start Time :</span>
                                <input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }}
                                    className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-20  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-16 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-12 md:h-8 md:w-48" />
                            </div>
                            <div className="flex flex-row justify-start space-x-24">
                                <span className="flex flex-col text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Number of Seats :</span>
                                <input type="number"   {...register('numOfSeats')} onChange={(e)=>setNumOfSeats(e.target.value)}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-16
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-12
                            md:rounded-md md:text-base md:h-8 md:w-8" />
                            </div>
                            {errors.numOfSeats && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.numOfSeats.message}</div>}
                            <div className="flex flex-row justify-between space-x-6">
                                <span className="flex flex-col text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-40
                            lg:text-xl lg:w-36
                            md:text-lg md:w-32">Notes :</span>
                                <textarea type="text" value={notes} onChange={(e) => { setNotes(e.target.value) }}
                                    className="drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1 text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-60 xl:mb-8
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 lg:mb-6
                                    md:h-16 md:rounded-md md:ml-2 md:text-base md:mb-4" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-start pb-10 xl:gap-6 lg:gap-4 md:gap-2">
                    <button
                        type="submit"
                        className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8">Save</button>
                    <button
                        onClick={handelCancel}
                        className="flex flex-col justify-center items-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light 
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                             xl:w-28 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10
                            md:text-lg md:rounded-md  md:w-20 md:h-8">Leave</button>

                </div>
                <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] 
             xl:rounded xl:left-44 xl:w-56 xl:h-10 xl:top-56 
             lg:rounded-md lg:left-40 lg:w-48 lg:h-8 lg:top-56
             md:rounded-sm md:left-36  md:w-44 md:h-8 md:top-48 ">
                    <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">Financial Details</span>
                </div>
                <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] 
             xl:rounded xl:right-96 xl:w-56 xl:h-10 xl:top-56 
             lg:rounded-md lg:right-80 lg:w-48 lg:h-8 lg:top-56
             md:rounded-sm md:right-72  md:w-44 md:h-8 md:top-48 ">
                    <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">Tour Details</span>
                </div>
            </form>
        </div>
    )
}
export default TourConfirm