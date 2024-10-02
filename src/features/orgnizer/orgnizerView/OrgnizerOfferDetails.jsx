import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import Person from "../../../assets/images/person.png"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
function OrgnizerOfferDetails() {
    const orgnizer = useSelector(state => state.orgnizer)
    const presenterId = orgnizer.selected.presenterId
    const presenter = orgnizer.presrnterData.filter(presenter => presenter.id == presenterId)
    const offerId = orgnizer.selected.offerId
    const offer = orgnizer.offers.filter(offer => offer.id == offerId)
    const images = [image1, image2, image3, image1]
    const navigate=useNavigate()
    const handelBack = () => {
        navigate('/orgnizer-offers');
    }
    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row  justify-start items-center xl:space-x-80 lg:space-x-52 md:space-x-36">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                        <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Offer Details</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-end items-center pt-10
                    xl:space-x-16
                    lg:space-x-12
                    md:space-x-8 ">
                        <div className="flex flex-col justify-start items-center space-y-5 xl:text-2xl lg:text-xl md:text-base font-['Georgia']">
                            <span className="flex-row text-text-light">{presenter[0].name}</span>
                            <a href="/make-special-tour/choose-position/presenter-page" className="flex-row xl:text-xl lg:text-lg md:text-base text-title-light hover:text-text-light">{presenter[0].email}</a></div>
                        <img src={presenter[0].image} className="flex flex-col drop-shadow-[2px_4px_rgba(125,143,154,0.5)] rounded-full
                            xl:w-32 xl:h-32
                            lg:w-28 lg:h-28
                            md:w-24 md:h-24" />

                    </div>
                </div>
            </div>
            <div className="flex flex-row  justify-center items-center my-10">
                <div className="flex flex-col bg-post-bg-light w-2/3 border-solid border-2 border-text-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] px-5 py-10
                                     xl:rounded-xl xl:space-y-10
                                     lg:rounded-lg lg:space-y-8
                                     md:rounded md:space-y-6">
                    <div className="flex flex-row justify-center items-center ">
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['serif'] ">
                            {offer[0].title}
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center 
                    xl:space-x-20 lg:space-x-14 md:space-x-10 ">
                        <div className="flex flex-col justify-start items-center">
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
                        <div className="flex flex-col items-start justify-center overflow-hidden relative flex-shrink-0 rounded-md drop-shadow-md shadow-md
                        bg-gradient-to-br from-backOpacityBgTo-light from-10% via-post-bg-light via-50% to-backOpacityBgFrom-light to-80%  border-solid border-2 border-title-light
                        space-y-3 px-5 py-10 font-['serif'] text-text-light
                            xl:text-2xl lg:text-xl md:text-base">
                            <div className='flex-row space-x-3'>
                                <span className=" text-title-light">Date : </span><span>{offer[0].startTime} - {offer[0].endTime}</span>
                            </div>
                            <div className='flex-row space-x-3'>
                                <span className=" text-title-light">Time : </span><span>{offer[0].startDate} - {offer[0].endDate}</span>
                            </div>
                            <div className='flex-row space-x-3'>
                                <span className=" text-title-light">Price : </span><span>{offer[0].pricePerOne} $ for seat </span>
                            </div>
                            <div className='flex-row space-x-3'>
                                <span className=" text-title-light">Include : </span><span>{offer[0].description} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    )
}
export default OrgnizerOfferDetails