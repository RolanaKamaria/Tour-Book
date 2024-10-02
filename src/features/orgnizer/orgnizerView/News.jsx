import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import PlusIcon from "../../../assets/images/PlusIcon.png"
import MinusIcon from "../../../assets/images/minus.png"
import likeIcon from "../../../assets/images/filledLikeIcon.svg"
import disLikeIcon from "../../../assets/images/filledDislikeIcon.svg"
import commentIcon from "../../../assets/images/filledCommentIcon.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import CommentModal from "./CommentModal"
import axios from "axios"
import { API_URL } from "../../../app/config"
function News(){
    const tours1 = useSelector(state => state.orgnizer.allTours)
    const [tours,setTours]=useState(tours1)
    const images = [image1, image2, image3, image1, image2, image3]
    const [showFullGallery, setShowFullGallery] = useState({ id: null, value: false });
    const [hideSubGallery, setHideSubGallery] = useState({ id: null, value: true })
    const [showAllText, setShowAllText] = useState({ id: null, value: false })
    const [showCommentsModal, setShowCommentsModal] = useState({ id: null, value: false });
    const navigate = useNavigate()

    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/tours/?page=`+1, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        setTours(response.data.result)
        }).catch((err)=>{
          console.log(err.message)
        })
    },[])
    //to show box image if number of image less than 4 else will show them as Gallery
    const handlePhotoClick = (id) => {
        setShowFullGallery((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }));
        setHideSubGallery((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }))
    };
    //to clamp text depending on what client choose
    const handleShowAllTextClick = (id) => {
        setShowAllText((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }))
    }
    //to show tour's comment modal when click on it
    const handleShowCommentModal = (id) => {
        setShowCommentsModal((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }))
    }
    const handelBack = () => {
        navigate('/orgnizer-home');
    }
    return(
        <div className="flex flex-col">
            <SmallHeader/>
            <div className="flex flex-row items-center justify-start
                    xl:space-x-64 xl:px-28 xl:mx-10 xl:mt-10 
                    lg:space-x-52 lg:px-24 lg:mx-8 lg:mt-6 
                    md:space-x-36 md:px-20 md:mx-6 md:mt-6 ">
                <img src={backButton} onClick={handelBack} className="flex flex-col hover:cursor-pointer 
                                xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className="flex flex-col w-1/2 text-center text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">News</div>
            </div>
            <div className="flex flex-row justify-center items-center pb-10 xl:p-10 lg:pt-20 md:pt-32">
                <div className="flex flex-col items-center justify-start w-3/5 h-screen space-y-5 bg-post-bg-light   drop-shadow-[1px_1px_rgba(117,135,142)] rounded-2xl overflow-hidden hover:overflow-y-auto p-10">
                {
                        !tours&&<div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia'] text-center py-40">No Tours Yet ...</div>
                    } 
                    
                {tours&&tours.map(tour => {
                        return (
                            <div className="flex flex-row justify-center items-center relative w-11/12 pt-5" key={tour.id}>
                                <div className="flex flex-col w-full bg-orgnizerbg-light border-solid border-2 border-title-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl p-5 space-y-5">
                                    <div className="flex flex-row justify-between items-center text-title-light px-5 xl:text-lg lg:text-base md:text-sm">
                                        <div className="flex flex-col justify-start items-center">{tour.startDate} - {tour.startTime}</div>  
                                    </div>
                                    <div className={`flex flex-row justify-start items-center text-text-light px-5 xl:text-xl lg:text-lg md:text-base ${showAllText[tour.id] ? 'line-clamp-none' : 'line-clamp-3'}`}>{tour.description}</div>
                                    {/* to handle read all text desciption */}
                                    {!showAllText[tour.id] && <div className=" text-title-light px-5 xl:text-xl lg:text-lg md:text-base hover:cursor-pointer" key={tour.id} onClick={() => { handleShowAllTextClick(tour.id) }}>Read More</div>}
                                    <div className="flex flex-row items-center justify-center ">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* mapping images if they less than 3 */}
                                            {!hideSubGallery[tour.id] && images.slice(0, 3).map((image, index) => (
                                                <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                                                    <a target="_blank" href={image}> <img
                                                        src={image}
                                                        alt={`Image ${index + 1}`}
                                                        className="w-full max-h-32 object-cover"
                                                    /></a>
                                                </div>
                                            ))}
                                            {!hideSubGallery[tour.id] && images.length > 4 && (
                                                <div
                                                    className="w-full h-48 bg-gray-200 text-gray-600 flex items-center justify-center rounded-md cursor-pointer"
                                                    onClick={() => { handlePhotoClick(tour.id) }}
                                                >
                                                    <img src={PlusIcon} />
                                                </div>
                                            )}
                                        </div>
                                        {/* mapping images as gallery if they more than 3 */}
                                        {showFullGallery[tour.id] && (
                                            <div className="mt-4 space-y-4 "  >
                                                {images.map((photo, index) => (
                                                    <a target="_blank" href={photo}>  <img
                                                        key={index}
                                                        src={photo}
                                                        alt={`Photo ${index + 1}`}
                                                        className="w-full h-auto object-cover rounded-lg py-4"
                                                    />
                                                    </a>

                                                ))}
                                                <img className="hover:cursor-pointer" src={MinusIcon} onClick={() => { handlePhotoClick(tour.id) }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row justify-end items-end border-solid border-2 border-title-light w-full rounded-full"></div>
                                    <div className="flex flex-row justify-center items-center space-x-16 text-text-light 
                            xl:text-lg lg:text-base md:text-sm">
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-row items-center justify-center space-x-4"><span>{tour.likeCounter} likes</span>
                                                <img src={likeIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-row items-center justify-center space-x-4"><span>{tour.disLikeCounter} dislikes</span>
                                                <img src={disLikeIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4" onClick={() => handleShowCommentModal(tour.id)}><span>{tour.comments.length} comments</span>
                                                <img src={commentIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                                        </div>

                                    </div>
                                </div>


                                {showCommentsModal[tour.id] && (
                                    <CommentModal handleShowCommentModal={handleShowCommentModal} tourId={tour.id} preventDelete={true}/>


                                )}

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default News