import { useSelector } from "react-redux"
import People from "../../../../assets/images/mainPeople.svg"
import PlusIcon from "../../../../assets/images/PlusIcon.png"
import MinusIcon from "../../../../assets/images/minus.png"
import likeIcon from "../../../../assets/images/filledLikeIcon.svg"
import disLikeIcon from "../../../../assets/images/filledDislikeIcon.svg"
import commentIcon from "../../../../assets/images/filledCommentIcon.svg"
import Person from "../../../../assets/images/person.png"
import image1 from '../../../../assets/images/restaurant1.png'
import image2 from '../../../../assets/images/restaurant2.png'
import image3 from '../../../../assets/images/postImage.png'
import { useLayoutEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../../../../app/config"
function Tours(){
    const tours1 = useSelector(state=>state.user.tours)
    const [tours,setTours]=useState(tours1)
    const images = [image1, image2, image3, image1, image2, image3]
    const [showFullGallery, setShowFullGallery] = useState({ id: null, value: false });
    const [hideSubGallery, setHideSubGallery] = useState({ id: null, value: true })
    const [showAllText, setShowAllText] = useState({ id: null, value: false })

        useLayoutEffect(async()=>{
          
                var accessToken = localStorage.getItem('accessToken');
            
                  const response = await axios.get(`${API_URL}/api/tours/?page=`+1, { 
                  headers: {
                  Authorization: `JWT ${accessToken}`,
                }
              }).then((response) => {
                console.log(response.data)
                var data=[]
                
                response.data.results.forEach(element=>{
                    data.push({
                        id:element.id,
                        startTime:"2:00 P.M",
                        startDate:element.start_date,
                        title:element.title,
                        description:element.description,
                        images:element.tour_attachments,
                        like:element.like_counter,
                        dislike:element.dislike_counter,
                        comments:element.comments_num,
                    })
                })
                //setTours(response.data.result)
                }).catch((err)=>{
                  console.log(err.message)
                })
         
            //api for intialize tours
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
    return(
        <div className="flex flex-row justify-center items-center " id="tours">
            <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row justify-center items-center ">

                <div className="flex flex-col items-center justify-start w-1/2 space-y-10 ">
                 {tours.map(tour=>{
                    return(
                  
                            <div className="flex flex-row justify-center items-center relative w-11/12 pt-5" key={tour.id}>
                                <div className="flex flex-col w-full bg-orgnizerbg-light border-solid border-2 border-title-light drop-shadow-[1px_1px_rgba(117,135,142)] rounded-xl p-5 space-y-5">
                                    <div className="flex flex-row justify-start items-center space-x-5">
                                        <div className="flex flex-col justify-start items-center">  
                                            <img src={Person} 
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
                                            <div className="flex flex-row items-center justify-center space-x-4" >
                                                <span>{tour.comments.length} comments</span>
                                                <img src={commentIcon} className="
                                xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6"/>
                                              </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                         
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center space-x-20">
                  
                    <div className="flex flex-col  justify-center items-end w-1/2 text-text-light font-['sans-serif']  font-semibold
             xl:text-2xl 
             lg:text-xl 
             md:text-lg ">
                       Join Us To Enjoy More & More ...
                    </div>
                    <img src={People} className="flex flex-col justify-start items-start h-1/3 w-1/2 " />
                </div>
                </div>
        </div>
    )
}

export default Tours