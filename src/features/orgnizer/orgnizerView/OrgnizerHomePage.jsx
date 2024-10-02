import SmallHeader from "../../layout/SmallHeader"
import WarningIcon from "../../../assets/images/WarningIcon.png"
import PlusIcon from "../../../assets/images/PlusIcon.png"
import MinusIcon from "../../../assets/images/minus.png"
import likeIcon from "../../../assets/images/filledLikeIcon.svg"
import disLikeIcon from "../../../assets/images/filledDislikeIcon.svg"
import commentIcon from "../../../assets/images/filledCommentIcon.svg"
import OptionIcon from "../../../assets/images/optionsIcon.svg"
import Person from "../../../assets/images/person.png"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CommentModal from "./CommentModal"
import { Navigate, useNavigate } from "react-router-dom"
import { deleteTour, getOrgnizerTours } from "../orgnizerSlice"
import axios from "axios"
import { API_URL } from "../../../app/config"
function OrgnizerHomePage() {
    const tours = useSelector(state => state.orgnizer.tours)
    const [tours1,setTours]=useState('' )
    const orgnizer = useSelector(state => state.orgnizer)
    const user = useSelector(state => state.user)
    const [complete, setComplete] = useState(false)
    const images = [image1, image2, image3, image1, image2, image3]
    const [showFullGallery, setShowFullGallery] = useState({ id: null, value: false });
    const [hideSubGallery, setHideSubGallery] = useState({ id: null, value: true })
    const [showAllText, setShowAllText] = useState({ id: null, value: false })
    const [showCommentsModal, setShowCommentsModal] = useState({ id: null, value: false });
    const [selectedOption, setSelectedOption] = useState('');
    const [showDeleteOption, setShowDeleteOption] = useState({ id: null, value: false })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(async()=>{
        
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/tours/organizer-tours?page=`+1, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        setTours(response.data)
        }).catch((err)=>{
          console.log(err.message)
        })
        
        //dispatch(getOrgnizerTours(1))
    },[])

    //intialize options with select list options and its navigation links
    const options = [
        { label: 'My Tours', value: '/my-tour' },
        { label: 'Make Special Tour', value: '/make-special-tour' },
        { label: 'News', value: '/news' },
    ];

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

    //to handle navigate to the selected option
    const handleOptionChange = (event) => {
        //setSelectedOption(event.target.value)
        navigate(event.target.value)
    }

    //to test if there is missing data in orgnizer informations
    const missingOrgnizerData = () => {
        console.log(user.login.data.email)
        if (orgnizer.name == '' || orgnizer.mobile == '' || user.login.data.email == '')
            setComplete(true)
    }
    
    //to show delete tour option
    const handleShowDeleteOption = (id) => {
        setShowDeleteOption((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id]
        }))
    }

    const handleDeleteTour = (id) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            dispatch(deleteTour(id))
        }
    }
    // to wait until the orgnizer's data loaded
    const memorizedData = useMemo(() => { missingOrgnizerData() }, [])

    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row  justify-between items-center
            xl:py-12 xl:px-20 xl:space-x-5
            lg:py-10 lg:px-8 lg:space-x-4
            md:py-8 md:px-12 md:space-x-3">
                <div className="flex flex-col">
                    <div className="flex flex-row w-3/4  text-text-light  font-['sans-serif']  hover:cursor-pointer 
                            xl:text-xl  xl:space-x-6
                            lg:text-lg  lg:space-x-4 lg:pl-5
                            md:text-base ">
                        <div className="flex flex-col justify-center items-center text-title-light bg-selected-bg-light px-3 rounded" ><span>Home</span></div>

                        <select id="selection-list" className="flex flex-col justify-center items-center px-3 rounded text-text-light bg-orgnizerbg-light py-2 focus:border-title-light leading-tight
                            hover:text-title-light hover:bg-selected-bg-light hover:cursor-pointer 
                            focus:outline-none focus:shadow-outline focus:bg-post-bg-light focus:text-title-light
                            xl:w-24 lg:w-20 md:w-16"
                            value={selectedOption}
                            onChange={handleOptionChange}>
                            <option value="" className="bg-post-bg-light hover:bg-selected-bg-light hover:text-title-light mx-2 my-2 
                                     md:text-sm lg:text-base  xl:text-lg ">Tours</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value} onClick={()=>{navigate(`${option.value}`)}}
                                    className="bg-post-bg-light hover:bg-selected-bg-light hover:text-title-light mx-2 my-2
                                     md:text-sm lg:text-base  xl:text-lg  ">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-selected-bg-light hover:text-title-light"
                        onClick={()=>{navigate('/orgnizer-status')}}><span>Status</span></div>
                        <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-selected-bg-light hover:text-title-light" 
                         onClick={()=>{navigate('/orgnizer-offers')}}><span>Offers</span></div>
                        <div className="flex flex-col justify-center items-center px-3 rounded hover:bg-selected-bg-light hover:text-title-light"
                        onClick={()=>{navigate('/orgnizer-weather')}}><span>Weather</span></div>
                        <div className="flex flex-col w-fit justify-center items-center px-3 rounded hover:bg-selected-bg-light hover:text-title-light">
                            <div className="flex flex-row space-x-2" onClick={()=>{navigate('/orgnizer-settings')}}>
                                <span>Settings</span>
                                {complete && <img src={WarningIcon} className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5" />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-center items-center 
                    xl:space-x-8 xl:pr-32
                    lg:space-x-6 lg:pr-24
                    md:space-x-4 md:pr-16">
                        <span className="flex flex-col  text-text-light xl:text-2xl lg:text-xl md:text-base font-['Georgia']">User Name</span>
                        <img src={Person} className="flex flex-col drop-shadow-[2px_4px_rgba(125,143,154,0.5)] rounded-full
                            xl:w-32 xl:h-32
                            lg:w-28 lg:h-28
                            md:w-24 md:h-24" />

                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center pb-10 xl:p-10 lg:pt-20 md:pt-32">
                <div className="flex flex-col items-center justify-start w-3/5 h-screen space-y-5 bg-post-bg-light   drop-shadow-[1px_1px_rgba(117,135,142)] rounded-2xl overflow-hidden hover:overflow-y-auto p-10">
                    { tours &&
                    tours.map(tour => {
                        return (
                            <div className="flex flex-row justify-center items-center relative w-11/12 pt-5" key={tour.id}>
                                <div className="flex flex-col w-full bg-orgnizerbg-light border-solid border-2 border-title-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl p-5 space-y-5">
                                    <div className="flex flex-row justify-between items-center text-title-light px-5 xl:text-lg lg:text-base md:text-sm">
                                        <div className="flex flex-col justify-start items-center">{tour.startDate} - {tour.startTime}</div>
                                        <div className="flex flex-col justify-start items-center">
                                            {/* to show either tour options icon or possible options */}
                                            {!showDeleteOption[tour.id] && <img src={OptionIcon} className="hover:cursor-pointer xl:w-8 xl:h-6 lg:w-7 lg:h-5 md:w-5 md:h-3" onClick={() => { handleShowDeleteOption(tour.id) }} />}
                                            {showDeleteOption[tour.id] && <div className="flex flex-row items-center justify-center bg-delete-button-light px-5 rounded hover:bg-delete-button-hover-light hover:cursor-pointer"
                                                onClick={() => { handleDeleteTour(tour.id) }}>
                                                <span className="xl:text-xl lg:text-lg md:text-base text-button-text-light font-['sans-serif'] ">Delete Tour</span>
                                            </div>}
                                        </div>
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
                                    <CommentModal handleShowCommentModal={handleShowCommentModal} tourId={tour.id} preventDelete={false}/>


                                )}

                            </div>
                        )
                    })}
                     {
                        !tours&&<div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia'] text-center py-40">No Tours Yet ...</div>
                    } 
                    
                </div>
            </div>
            <div className="bg-orgnizerbg-light  text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] right-1/3 top-1/2 
             xl:rounded xl:px-4
             lg:rounded-md lg:px-3
             md:rounded-sm  md:px-2">
                <span className="xl:text-2xl lg:text-xl md:text-base font-['serif']">Memories</span>
            </div>

        </div>
    )
}
export default OrgnizerHomePage