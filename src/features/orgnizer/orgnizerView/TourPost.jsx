import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import ImageIcon from "../../../assets/images/imageIcon.svg"
import DeleteIcon from "../../../assets/images/deleteIcon.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editPost } from "../orgnizerSlice"
import axios from "axios"
import { API_URL } from "../../../app/config"

function TourPost() {
    const tour = useSelector(state => state.orgnizer.tour)
    const tourOrgnizer = useSelector(state => state.orgnizer)
    const user = useSelector(state => state.user.login.data)
    const [title, setTitle] = useState(tour.title)
    const [reservation, setReservation] = useState(tour.description)
    const [note, setNote] = useState(tour.note)
    const [images, setImages] = useState([{ id: 1, src: image1 }, { id: 2, src: image2 }, { id: 3, src: image3 }])
    const [checkError,setCheckError]=useState(false)
    const [msg,setMsg]=useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const handelPost =()=>{
        var tour1={title,reservation,note,images}
        //dispatch(editPost({tour1}))
   


        var attach=[]
        tour.tourAttachment.forEach(element=>{
          attach.push({
            attachment:{
              file:element.attachment
            }
          })
        })

        var points=[]
        tour.tourPoints.forEach(element=>{
       
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

        var orgnizer={
            id: tourOrgnizer.id,
            user: {
                id: user.id,
                email: user.email,
                username: user.userName,
                phone: user.phone,
                role: "O",
                avatar:user.avatar
             },
            address: tourOrgnizer.address,
            evaluation: tourOrgnizer.evaluation,
            logo:user.avatar,

        }

        var data={
          id:tour.id,
          title: tour.title,
          description:tour.description,
          starting_place: tour.startingPlace,
          reaction: [
            0
          ],
          comments_num:tour.comments.length,
          seat_num: tour.numOfSeat,
          seat_cost:tour.seatCost,
          transportation_cost:tour.transportationCost,
          total_cost:tour.totalCost,
          extra_cost:tour.extraCost,
          x_starting_place:tour.XstartingPlace,
          y_starting_place: tour.YstartingPlace,
          start_date: tour.startDate,
          end_date:tour.endDate,
          note: tour.note,
          posted: true,
          posted_at: Date.now(),
          tour_attachments: attach,
          tour_points: points,
          tour_organizer:orgnizer
        }
        console.log(data)

        var token=  localStorage.getItem('accessToken');
        var response=axios.post(`${API_URL}/api/tours/`+tour.id+`/post`, {
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
        )  .catch((error) => {
           setCheckError(true)
           
           if (error.response && error.response.data) {
            const errorData = error.response.data;
            
            if (typeof errorData === 'string') {
 
              setMsg(errorData.errors);
            }else {

              setMsg(JSON.stringify(errorData.errors));
            }
          } else {
            setMsg('An unknown error occurred');
          }
            console.error('Error:', error);
          });
       
    
    

        navigate("/orgnizer-home")

    }

    const handelBack = () => {
        navigate('/my-tour');
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

                <div className="flex flex-col justify-start space-y-10 w-full  xl:px-20 lg:px-14 md:px-10">
                    <div className="flex flex-row justify-start items-center ">
                        <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Tour Itenrary :</span>
                        <div className="flex flex-col justify-between drop-shadow-[1px_1px_rgba(117,135,142)] bg-offerbg-light border-solid border-2 border-title-light text-center 
                      xl:rounded-xl xl:text-xl xl:p-5
                         lg:rounded-lg lg:text-lg lg:p-3
                        md:rounded-md md:text-base md:p-2">
                            <div className="grid grid-cols-5 ">
                                {
                                    tour.tourPoints.slice(0, -1).map((point, index) => {
                                        return (

                                            <span key={index} className=" font-['sans-serif']  w-fit 
                            xl:text-2xl 
                            lg:text-xl 
                            md:text-lg ">{point.name}  <span className="text-title-light font-semibold pl-5">  &gt;</span> </span>

                                        )
                                    })}
                                      <span key={0} className=" font-['sans-serif']  w-fit
                            xl:text-2xl 
                            lg:text-xl 
                            md:text-lg ">{tour.tourPoints.at(-1).name} </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-center xl:space-x-60 lg:space-x-52 md:space-x-44">
                        <div className="flex flex-col justify-start space-y-10">
                            <div className="flex flex-row xl:space-x-20 lg:space-x-16 md:space-x-12 ">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-32
                            lg:text-xl lg:w-28
                            md:text-lg md:w-24">Title :</span>
                                <input type="text" defaultValue={title} onChange={(e) => { setTitle(e.target.value) }}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-60
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
                        <div className="flex flex-col justify-center items-center space-y-10">

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
                            {
            checkError&& <div className="flex flex-row justify-start  text-error-light font-['Open_Sans']  pb-10
            xl:text-xl lg:text-lg  md:text-base">{msg}
                </div>
           } 
                            <div className="flex flex-row justify-start items-start space-x-10">
                        <button onClick={handelPost}
                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-add-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                                md:text-lg md:rounded-md  md:w-20 md:h-8">Post</button>
                                </div>

                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default TourPost