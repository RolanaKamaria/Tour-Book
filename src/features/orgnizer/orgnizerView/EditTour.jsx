import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import RightRow from "../../../assets/images/rightRow.png"
import ImageIcon from "../../../assets/images/imageIcon.svg"
import DeleteIcon from "../../../assets/images/deleteIcon.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editTour } from "../orgnizerSlice"
function EditTour() {
    const tour = useSelector(state => state.orgnizer.tour)
    const [images, setImages] = useState([{ id: 1, src: image1 }, { id: 2, src: image2 }, { id: 3, src: image3 }])
    const [title, setTitle] = useState(tour.title)
    const [cost, setCost] = useState(tour.totalCost)
    const [seatPrice, setSeatPrice] = useState(tour.seatCost)
    const [startTime, setStartTime] = useState(tour.startTime)
    const [endTime, setEndTime] = useState(tour.endTime)
    const [startDate, setStartDate] = useState(tour.startDate)
    const [endDate, setEndDate] = useState(tour.endDate)
    const [reservation, setReservation] = useState(tour.description)
    const [note,setNote] = useState(tour.note)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handelSave = () =>{
        var tour={
            title,cost,seatPrice,startDate,endDate,startTime,endTime,reservation,note,images
        }
        dispatch(editTour({tour})) 
        navigate("/orgnizer-home")
    }

    const handelDeleteImage = (id) => {
        var newImages = images.filter(image => image.id != id);
        console.log(newImages)
        setImages(newImages)
    }

    const handelAddImage = (e) => {
        setImages([...images,
        {
            id: Math.random().toString(36).substring(2, 10),
            src: e.target.value
        }
        ])
    }

    const handelBack = () => {
        navigate('/my-tour');
    }

    const handelLeave = () =>{
        navigate("/orgnizer-home")
    }


    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">{tour.title}</div>
            </div>

            <div className="flex flex-row justify-center p-10 mb-5 xl:gap-x-28 lg:gap-x-16 md:gap-x-8">

                <div className="flex flex-col justify-start space-y-10">
                    <div className="flex flex-row justify-between ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Title :</span>
                        <input type="text" defaultValue={title} onChange={(e) => { setTitle(e.target.value) }}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                    </div>
                    <div className="flex flex-row justify-between ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Total Cost :</span>
                        <input type="text" defaultValue={cost} onChange={(e) => { setCost(e.target.value) }}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                    </div>
                    <div className="flex flex-row justify-between ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Seat Price :</span>
                        <input type="text" defaultValue={seatPrice} onChange={(e) => { setSeatPrice(e.target.value) }}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                    </div>
                    <div className="flex flex-row xl:space-x-20 lg:space-x-16 md:space-x-12 ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Reservation :</span>
                        <textarea type="text" defaultValue={reservation} onChange={(e) => { setReservation(e.target.value) }}
                            className="drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-60 
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 
                                    md:h-16 md:rounded-md md:ml-2 md:text-base " />
                    </div> 
                    <div className="flex flex-row xl:space-x-20 lg:space-x-16 md:space-x-12 ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Description :</span>
                        <textarea type="text" defaultValue={note} onChange={(e) => { setNote(e.target.value) }}
                            className="drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-60 
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 
                                    md:h-16 md:rounded-md md:ml-2 md:text-base " />
                    </div>
                    

                </div>

                <div className="flex flex-col justify-start items-center space-y-10">
                    <div className="flex flex-row space-x-5 ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-12">Date :</span>
                        <input type="date" defaultValue={startDate} onChange={(e) => { setStartDate(e.target.value) }}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light  border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-56" />
                        <img src={RightRow} className="xl:w-16 xl:h-10 lg:w-12 lg:h-8 md:w-10 md:h-6" />
                        <input type="date" defaultValue={endDate} onChange={(e) => { setEndDate(e.target.value) }}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light  border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-56" />

                    </div>
                    <div className="flex flex-row space-x-5 ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-12">Time :</span>
                        <input type="time" defaultValue={startTime} onChange={(e) => { setStartTime(e.target.value) }}
                            className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-20  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-16 lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:px-12 md:h-8 md:w-56" />
                        <img src={RightRow} className="xl:w-16 xl:h-10 lg:w-12 lg:h-8 md:w-10 md:h-6" />
                        <input type="time" defaultValue={endTime} onChange={(e) => { setEndTime(e.target.value) }}
                            className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-20  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-16 lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:px-12 md:h-8 md:w-56" />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="grid grid-cols-2 gap-4 items-center justify-center">
                            {images.map((image, index) => {
                                return (
                                    <div key={index} className="rounded-lg shadow-lg overflow-hidden relative flex-shrink-0">

                                        <img
                                            src={image.src}
                                            alt={`Image ${index + 1}`}
                                            className="w-full max-h-32 object-cover"
                                        />
                                        <img src={DeleteIcon} className="hover:cursor-pointer px-1.5 absolute top-1 right-1
                                  xl:w-10 xl:h-10 lg:w-8 lg:h-8 md:h-6 md:w-6" onClick={() => { handelDeleteImage(image.id) }} />

                                    </div>
                                )
                            })}

                            <input type="file" id="custom-file-input" onChange={(e) => { handelAddImage(e) }}
                                style={{ display: 'none' }}
                                className=" drop-shadow-[2px_4px_rgba(125,143,154,0.5)]
                            lg:rounded-full lg:h-9 lg:w-56
                            md:rounded-full md:h-8 md:w-48" />
                            <label htmlFor="custom-file-input">
                                <img src={ImageIcon} alt="Choose Image Button"
                                    className="rounded-full drop-shadow-[1px_1px_rgba(117,135,142)] hover:cursor-pointer
                                xl:w-28 xl:h-28
                                lg:w-24 lg:h-24
                                md:w-20 md:h-20"/>
                            </label>

                        </div>
                    </div>

                    <div className="flex flex-row justify-start items-start space-x-10">
                        <button onClick={handelSave}
                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8">Save</button>
                        <button onClick={handelLeave}
                            className="flex flex-col justify-center items-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light 
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                             xl:w-28 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10
                            md:text-lg md:rounded-md  md:w-20 md:h-8">Leave</button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default EditTour