import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import image1 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png'
import image2 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'
import image3 from 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png'
import useGeoLocation from "../../../assets/map/useGeoLocation";
import placeHolder from "../../../assets/images/placeholderselect.png"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
function PresenterPage() {
    const location = useGeoLocation();
    const zoomLevel = 13;
    const coordinate = useSelector(state => state.coordinate);
    const allPresenter=useSelector(state=>state.orgnizer.presrnterData)
    const presenter=allPresenter[0]
    const [place,setPlace]=useState(coordinate.position)
    const navigate = useNavigate()
    //to make sure the location is loaded before the page 
    const memorizedData = useMemo(() => { if(presenter.axisX!=null){
        setPlace([presenter.axisX,presenter.axisY])
    }}, [])
    console.log(location)
    const customIcon = new Icon({
        iconUrl: placeHolder,
        iconSize: [38, 38],
    });
    const images = [image1,image2,image3,image1]
    const handelBack = () => {
        navigate('/make-special-tour/presenter-offers');
    }
   
    return (
        <div className="flex flex-col">
            <SmallHeader />
            <div className="flex flex-row items-center justify-start
                    xl:space-x-72 xl:px-28 xl:mx-10 xl:mt-10 
                    lg:space-x-56 lg:px-24 lg:mx-8 lg:mt-6 
                    md:space-x-40 md:px-20 md:mx-6 md:mt-6 ">
                <img src={backButton} onClick={handelBack} className="flex flex-col hover:cursor-pointer 
                                xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                <div className="flex flex-col w-1/2 text-center text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">{presenter.name}</div>
            </div>
            <div className="flex flex-row items-center justify-center m-10">
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {images.map((image, index) => (
                        <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center xl:space-x-56 lg:space-x-32 md:space-x-20">
                    <div className="flex flex-col items-start justify-center space-y-5 pb-5">
                        <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-4 md:space-x-3">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-24
                            lg:text-xl lg:w-20
                            md:text-lg md:w-20">Size :</span>
                                <input type="text"    value={presenter.size} disabled
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-72
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-64
                            md:rounded-md md:text-base md:h-8 md:w-60" />

                        </div>
                        <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-4 md:space-x-3">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-24
                            lg:text-xl lg:w-20
                            md:text-lg md:w-20">Email :</span>
                                <input type="text" value={presenter.email}    disabled
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-72
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-64
                            md:rounded-md md:text-base md:h-8 md:w-60" />

                        </div>
                        <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-4 md:space-x-3">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-24
                            lg:text-xl lg:w-20
                            md:text-lg md:w-20">Phone :</span>
                                <input type="text"    value={presenter.phone} disabled
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-72
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-64
                            md:rounded-md md:text-base md:h-8 md:w-60" />

                        </div>
                        <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-4 md:space-x-3">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-24
                            lg:text-xl lg:w-20
                            md:text-lg md:w-20">Website :</span>
                                <input type="text"    value={presenter.website} disabled
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-72
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-64
                            md:rounded-md md:text-base md:h-8 md:w-60" />

                        </div>
                        <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-4 md:space-x-3">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-24
                            lg:text-xl lg:w-20
                            md:text-lg md:w-20">Services :</span>
                                <textarea  value={presenter.services.join('\n')} disabled
                                    className="flex flex-col  drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center h-fit
                            xl:rounded-xl xl:text-xl xl:w-72
                            lg:rounded-lg lg:text-lg  lg:w-64
                            md:rounded-md md:text-base md:w-60" />

                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center space-y-5 pb-5">
                    <div className="flex flex-row justify-between xl:space-x-5 lg:space-x-6 md:space-x-4">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-28
                            lg:text-xl lg:w-24
                            md:text-lg md:w-20">Location :</span>
                        <div className="flex flex-col   justify-center items-center drop-shadow-[1px_1px_rgba(125,143,154,0.5)] border-solid border-2 border-text-light rounded-xl 
                             xl:w-80 xl:h-80
                             lg:w-72 lg:h-72
                             md:w-64 md:h-64">
                        {
                            !location.loaded ? <div className=" text-title-light font-['Georgia'] 
                            xl:text-3xl xl:pt-8
                            lg:text-2xl lg:pt-6
                            md:text-xl md:pt-4
                            ">Loading</div> :
                                <MapContainer center={[place[0],place[1]]} zoom={zoomLevel} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker id={1} position={[place[0],place[1]]} icon={customIcon} >
                                        {/* configure the popup that showen when hover the position marker */}
                                        <Popup>
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="flex-row text-base font-semibold text-text-light">here</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                   
                                </MapContainer>
                        }
                    </div>

                        </div>
                   
                    </div>
            </div>
        </div>
    )
}
export default PresenterPage