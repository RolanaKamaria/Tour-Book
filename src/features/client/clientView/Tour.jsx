import ReportIcon from "../../../assets/images/reportIcon.svg"
import LikeIcon from "../../../assets/images/likeIcon.png"
import DisLikeIcon from "../../../assets/images/disLikeIcon.png"
import CommentIcon from "../../../assets/images/commentIcon.png"
import InviteIcon from "../../../assets/images/inviteIcon.png"
import RegisterIcon from "../../../assets/images/registerIcon.png"
import PlusIcon from "../../../assets/images/PlusIcon.png"
import MinusIcon from "../../../assets/images/minus.png"
import Person from "../../../assets/images/person.png"
import FilledLikeIcon from "../../../assets/images/filledLikeIcon.svg"
import FilledDisLikeIcon from "../../../assets/images/filledDislikeIcon1.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import Comments from "./Comments"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { disLikeTour, likeTour, selecteOrgnizerId, selecteTourId, undisLikeTour, unlikeTour } from "../clientSlice"
import { useSelector } from "react-redux"

function Tour(props) {
    const tour = props.tour
    const user = useSelector(state => state.client)
    const [complete, setComplete] = useState(false)
    const images = [image3, image2, image1, image3, image2, image1]
    const [showFullGallery, setShowFullGallery] = useState({ id: null, value: false });
    const [hideSubGallery, setHideSubGallery] = useState({ id: null, value: true })
    const [showAllText, setShowAllText] = useState({ id: null, value: false })
    const [showCommentsModal, setShowCommentsModal] = useState({ id: null, value: false });
    const [like, setLike] = useState(false)
    const [disLike, setDisLike] = useState(false)
    const [likeCounter, setLikeCounter] = useState(tour.likeCounter)
    const [disLikeCounter, setDisLikeCounter] = useState(tour.disLikeCounter)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [likeIcon, setLikeIcon] = useState(LikeIcon)
    const [disLikeIcon, setDisLikeIcon] = useState(DisLikeIcon)

    //to initial like & disLike with right value & icon
    useEffect(() => {
        var like = tour.usersLike.filter(likeId => likeId == user.id)
        var dislike = tour.usersDislike.filter(dislikeId => dislikeId == user.id)
        if (like[0]) {
            setLikeIcon(FilledLikeIcon)
            setLike(true)
        }
        else if (dislike[0]) {
            setDisLikeIcon(FilledDisLikeIcon)
            setDisLike(true)

        }
    }, [])

    //to handle report event
    const handleReport = () => {
        if (tour.id != null) {
            dispatch(selecteOrgnizerId(tour.orgnizerId))
            //navigate to rerport page
            navigate('/client/client-report')
        }
    }

    //to handel like action 
    const handelLike = () => {
        //api for like
        if (like) {
            setLike(false)
            setLikeIcon(LikeIcon)
            setLikeCounter(likeCounter - 1)
            //call unlike api
            var info = { tourId: tour.id, clientId: user.id }
            dispatch(unlikeTour({ info }))
        } else {
            setLike(true)
            setLikeIcon(FilledLikeIcon)
            setLikeCounter(likeCounter + 1)
            //call like api
            var info = { tourId: tour.id, clientId: user.id }
            dispatch(likeTour({ info }))
            if (disLike) {
                setDisLike(false)
                setDisLikeIcon(DisLikeIcon)
                setDisLikeCounter(disLikeCounter - 1)
                //call undislike api
                var info = { tourId: tour.id, clientId: user.id }
                dispatch(undisLikeTour({ info }))
            }
        }

    }

    //to handel dislike action 
    const handelDislike = () => {
        //api for dislike

        if (disLike) {
            setDisLike(false)
            setDisLikeIcon(DisLikeIcon)
            setDisLikeCounter(disLikeCounter - 1)
            //call undislike api
            var info = { tourId: tour.id, clientId: user.id }
            dispatch(undisLikeTour({ info }))
        } else {
            setDisLike(true)
            setDisLikeIcon(FilledDisLikeIcon)
            setDisLikeCounter(disLikeCounter + 1)
            //call dislike api
            var info = { tourId: tour.id, clientId: user.id }
            dispatch(disLikeTour({ info }))
            if (like) {
                setLike(false)
                setLikeIcon(LikeIcon)
                setLikeCounter(likeCounter - 1)
                //call unlike api
                var info = { tourId: tour.id, clientId: user.id }
                dispatch(unlikeTour({ info }))
            }
        }

    }

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

    //to handel register on tour
    const handelRegister = () => {
        if (tour.id != null) {
            dispatch(selecteTourId(tour.id))
            //navigate to register
            navigate('/client/client-tour-details')
        }
    }

    //to handel invite friends on tour
    const handelInvite = () => {

        if (tour.id != null) {
            dispatch(selecteTourId(tour.id))
            //navigate to invite page
            navigate('/client/client-invite')
        }
    }

    //to navigate to orgnizer page when click image
    const handelGoToOrgnizer = (id) => {

        if (tour.id != null) {
            dispatch(selecteOrgnizerId(tour.orgnizerId))
            //navigate to orgnizer page
            navigate('/user-home/orgnizer-tours')
        }
    }

    return (<div>
        <div className="flex flex-row justify-center items-center relative w-3/4 pt-5" >
            <div className="flex flex-col bg-orgnizerbg-light border-solid border-2 border-title-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl p-5 space-y-5">
                <div className="flex flex-row justify-between items-center text-title-light px-5 xl:text-lg lg:text-base md:text-sm">
                    <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-row justify-center items-center space-x-5">
                            <div className="flex flex-col justify-start items-center">
                                <img src={Person} onClick={() => { handelGoToOrgnizer() }}
                                    className="rounded-full drop-shadow-[1px_1px_rgba(117,135,142)] hover:cursor-pointer
                                xl:w-20 xl:h-20
                                lg:w-16 lg:h-16
                                md:w-14 md:h-14"/>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <div className="flex flex-row justify-start items-center
                                            text-title-light px-5 xl:text-xl lg:text-lg md:text-base">
                                    {tour.title}
                                </div>
                                <div className="flex flex-row justify-start items-center
                                            text-text-light px-5 xl:text-lg lg:text-base md:text-sm">
                                    {tour.startDate} - {tour.startTime}</div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-center">
                        <img src={ReportIcon} className="hover:cursor-pointer xl:w-10 xl:h-16 lg:w-8 lg:h-14 md:w-6 md:h-12" onClick={() => { handleReport() }} />
                    </div>
                </div>
                <div className={`flex flex-row justify-start items-center text-text-light px-5  xl:text-xl lg:text-lg md:text-base ${showAllText[tour.id] ? 'line-clamp-none' : 'line-clamp-3'}`}>{tour.description}</div>
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
                                onClick={() => { handlePhotoClick() }}
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
                            <img className="hover:cursor-pointer" src={MinusIcon} onClick={() => { handlePhotoClick() }} />
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-end items-end border-solid border-2 border-title-light w-full rounded-full"></div>
                <div className="flex flex-row justify-center items-center space-x-16 text-text-light 
                            xl:text-lg lg:text-base md:text-sm">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4"
                            onClick={handelLike}><span>{likeCounter} likes</span>
                            <img src={likeIcon}
                                className="xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6" /></div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4"
                            onClick={handelDislike}><span>{disLikeCounter} dislikes</span>
                            <img src={disLikeIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4" onClick={() => handleShowCommentModal(tour.id)}><span>{tour.comments.length} comments</span>
                            <img src={CommentIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4" onClick={() => handelRegister()}><span> Register</span>
                            <img src={RegisterIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex flex-row items-center justify-center hover:cursor-pointer space-x-4" onClick={() => handelInvite()}><span> Invite</span>
                            <img src={InviteIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/></div>
                    </div>
                </div>
            </div>

            {showCommentsModal[tour.id] && (
                <Comments handleShowCommentModal={handleShowCommentModal} tourId={tour.id} comments={tour.comments} preventDelete={true} />


            )}
        </div>
    </div>)
}
export default Tour