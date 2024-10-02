import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PositionComponent from "./PositionComponent"
import { useDispatch } from "react-redux"
import { deleteTour } from "../orgnizerSlice"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../../../app/config"
function TourDetails() {
    const tour1=useSelector(state=>state.orgnizer.tour)
   const [tour,setTour]=useState(tour1)
    //sum number of reserved seats from total number of seats minus the number of required seats in each accepted request
    const resrvedSeats= tour.clientRequest.filter(req=> req.status=='accept').reduce((sum, order) => sum + order.numOfSeat, 0);
    const [images, setImages] = useState([{ id: 2, src: image2 }, { id: 3, src: image3 }])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/tours/`+tour.id+'/', { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        var item={
            title:response.data.title,
            attachment:response.data.tour_attachments,
            
        }
        
        }).catch((err)=>{
          console.log(err.message)
        }) },[])


    const handelSave = ()=>{
        navigate('/my-tour')
    }

    const handelEdit = ()=>{
        navigate('/my-tour/edit')
    }

    const handelDelete = ()=>{
        if (window.confirm('Are you sure you want to delete this tour?')) {
            dispatch(deleteTour(tour.id))
            navigate('/my-tour');
        }   
    }

    const handelBack = () => {
        navigate('/my-tour');
    }

    return (
        <div className="flex flex-col space-y-10 pb-5">
            <SmallHeader />
            <div className="flex flex-row justify-between items-center  xl:px-40 lg:px-20 md:px-16">
                <div className="flex flex-col justify-center items-center space-y-10">

                    <div className="flex flex-row justify-start items-center 
                    xl:space-x-10 
                    lg:space-x-8  
                    md:space-x-6  ">
                        <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                                xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">{tour.title}</div>
                    </div>
                    <div className="flex flex-row justify-start items-center space-x-5
                    xl:space-x-10
                    lg:space-x-8  
                    md:space-x-6 ">
                        <span className="flex flex-col text-text-light font-['sans-serif']  w-fit
                            xl:text-2xl 
                            lg:text-xl
                            md:text-lg ">Number of available seats :</span>

                        <span className="flex flex-col text-text-light font-['sans-serif']  border-solid border-2 border-text-light p-2 rounded bg-post-bg-light
                            xl:text-2xl 
                            lg:text-xl 
                            md:text-lg ">{tour.numOfSeat-resrvedSeats}</span>

                    </div>
                    <div className="flex flex-row justify-start items-center space-x-5
                    xl:space-x-10 
                    lg:space-x-8 
                    md:space-x-6">
                        <span className="flex flex-col text-text-light font-['sans-serif']  w-fit
                            xl:text-2xl 
                            lg:text-xl
                            md:text-lg ">Number of reserved seats :</span>

                        <span className="flex flex-col text-text-light font-['sans-serif']  border-solid border-2 border-text-light p-2 rounded bg-post-bg-light
                            xl:text-2xl 
                            lg:text-xl 
                            md:text-lg ">{resrvedSeats}</span>

                    </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-10">
                    <div className="flex flex-row justify-center items-center">
                        <div className="grid grid-cols-3 gap-4 items-center justify-center">
                                    {images.map((image, index) => {
                                        return (
                                            <div key={index} className="rounded-lg shadow-lg overflow-hidden relative flex-shrink-0">

                                                <img
                                                    src={image.src}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-full max-h-32 object-cover"
                                                />
                                            </div>
                                        )
                                    })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-start items-start xl:px-40 lg:px-20 md:px-16">
            <span className="flex flex-col text-title-light font-['sans-serif']  w-fit
                            xl:text-3xl 
                            lg:text-2xl
                            md:text-xl ">Tour Itenrary :</span>
            <div className=" grid grid-cols-3 gap-y-5 gap-x-10 ">
                {tour.tourPoints.map((point,index)=>{
                    return <PositionComponent key={index} point={point} index={index}/>
                })}
            </div>
            </div>
            <div className="flex flex-row justify-center items-center xl:space-x-20 lg:space-x-16 md:space-x-12">
                                            {/* <button    onClick={handelSave}
                                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10  
                                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Save</button> */}
                                            <button onClick={handelEdit}
                                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light 
                                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10  
                                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Edit</button>
                                            <button onClick={handelDelete}
                                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-delete-button-light text-button-text-light 
                                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10  
                                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Delete</button>
            </div>
        </div>
    )
}

export default TourDetails