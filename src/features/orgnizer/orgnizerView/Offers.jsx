import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import SearchIcon from "../../../assets/images/searchIcon.png"
import MoreIcon from "../../../assets/images/showMoreIcon.png"
import Person from "../../../assets/images/person.png"
import { Services } from "../../../assets/data/tempData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { selecteOfferId } from "../orgnizerSlice"
import axios from "axios"
import { API_URL } from "../../../app/config"
function Offers(){
    const allOffers = useSelector(state=>state.orgnizer.offers)
    const [text,setText]=useState('')
    const [date,setDate]=useState('')
    const [service,setService]=useState(0)
    const [offers,setOffers]=useState(allOffers)
    const navigate =useNavigate()
    const dispatch = useDispatch()

    useEffect(async()=>{
        var accessToken = localStorage.getItem('accessToken');
    
          const response = await axios.get(`${API_URL}/api/advertisers/offers/list?page`+0, { 
          headers: {
          Authorization: `JWT ${accessToken}`,
        }
      }).then((response) => {
        console.log(response.data)
        var newList=[]
        response.data.results.forEach(element => {
         
                newList.push({
                    name:element.advertiser.username,
                    presenterId:element.advertiser.id,
                    id:element.id,
                    title:element.title,
                    pricePerOne:element.price_for_one,
                    reversed_seats:element.reversed_seats,
                    service:element.service,
                    start_date:element.start_date,
                    available_seats:element.available_seats,
                    description:element.description,
                    end_date:element.end_date,
                })
            
            
           
        });
        setOffers(newList)
        }).catch((err)=>{
          console.log(err.message)
        }) },[])

    //to make filter on offers depend on offerd services / offer title / offer start date
    const search=()=>{
        var selectedOffer = allOffers.filter(offer=>offer.startDate >= date.toString())
        .filter(offer=>service!=0?offer.serviceId==service:offer)
        .filter(offer =>text!=''? offer.title.toLowerCase().includes(text)?offer:null:offer)
        setOffers(selectedOffer)
    }

    const handelSelectOffer=(id)=>{
     
            dispatch(selecteOfferId(id))
            navigate('/orgnizer-offers/details')
    }

    const handelBack = () => {
        navigate('/orgnizer-home');
    }
    return(
        <div className="flex flex-col">
            <SmallHeader/>
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Offers</div>
            </div>
            <div className="flex flex-row justify-center items-center mx-10 mt-10 
                    xl:space-x-20 xl:px-28 
                    lg:space-x-16 lg:px-24
                    md:space-x-12 md:px-20">
                       
                           <input type="search" onChange={(e)=>{setText(e.target.value.toLowerCase())}}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                               <input type="date" onChange={(e)=>{setDate(e.target.value)}}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light  border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-56" />
                                <select type="text" onChange={(e)=>{setService(e.target.value)}}
                                    className="flex flex-col p-1 drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:h-8 md:w-56" >
                                <option value={0}>Select Service</option>
                                {Services.map(service=>{
                                    return(
                                        <option value={service.id} key={service.id}>{service.type}</option>
                                    )
                                })}
                                </select>
                                <img src={SearchIcon} onClick={search}
                                className="hover:cursor-pointer  hover:drop-shadow-[1px_1px_rgba(117,135,142)]"/>
            </div>
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                         <div className=" grid grid-cols-4 gap-y-5 gap-x-20 ">
                            {offers.map(offer=>{
                                return(
                                    //to make gradient background
                                    <div key={offer.id} className="flex flex-col items-center justify-center space-y-3 overflow-hidden relative flex-shrink-0 p-5 rounded-md
                                    bg-gradient-to-br from-backOpacityBgFrom-light from-3% via-post-bg-light via-40% to-backOpacityBgTo-light to-80%  drop-shadow-md shadow-md">
                              
                              <img src={offer.image} className="flex-row rounded-xl xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12"/>
                              <span className="flex flex-row  text-title-light xl:text-2xl lg:text-xl md:text-base font-['sans-serif']">{offer.name}</span>
                              <span className="flex flex-row  text-text-light xl:text-2xl lg:text-xl md:text-base font-['sans-serif']">{offer.title}</span>
                              <div className="flex flex-row justify-center items-center space-x-5">
                              <span className="flex flex-row  text-title-light xl:text-xl lg:text-lg md:text-base font-['sans-serif']">{offer.pricePerOne} $</span>
                              <img src={MoreIcon} onClick={()=>{handelSelectOffer(offer.id)}}
                              className="hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"/>
                              </div>
                                      </div> 
                                )
                            
                            })}
                     
                         </div>
            </div>
        </div>
    )
}

export default Offers