import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import downRow from "../../../assets/images/downRow.png"
import placeHolder from "../../../assets/images/placeholderselect.png"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import useGeoLocation from "../../../assets/map/useGeoLocation"
import MapEvents from "../../../assets/map/mapEvents"
import 'leaflet/dist/leaflet.css';
import '../../../tailwind/smallMap.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addPoint } from "../orgnizerSlice";
import { useNavigate } from "react-router-dom";
function AddNewPlace() {
    const location = useGeoLocation();
    const zoomLevel = 13;
    const coordinate = useSelector(state => state.coordinate);
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [fromDate, setFromDate] = useState(Date.now())
    const [toDate, setToDate] = useState()
    const [fromTime, setFromTime] = useState()
    const [toTime, setToTime] = useState()
    const [requirments, setRequirments] = useState();
    const [error, setError] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const customIcon = new Icon({
        iconUrl: placeHolder,
        iconSize: [38, 38],
    });
    const handelBack = () => {
        navigate('/make-special-tour');
    }
    const handelAdd = () => {
        if (title == null || price == null || fromDate == null || toDate == null || fromTime == null || toTime == null || coordinate == null) {
            setError(true)
        }
        else {
            var point = {
                id: null, position: title, description: requirments, arrivalTime: fromDate, leavingTime: toDate, axisX: coordinate.position[0], axisY: coordinate.position[1],select:true
            }
            dispatch(addPoint(point))
            setError(false)
            navigate('/make-special-tour')
        }

    }
    const titleChange = (e) => {
        setTitle(e.target.value)
    }
    const priceChange = (e) => {
        setPrice(e.target.value)
    }
    const fromDateChange = (e) => {
        setFromDate(e.target.value)
    }
    const toDateChange = (e) => {
        setToDate(e.target.value)
    }
    const fromTimeChange = (e) => {
        setFromTime(e.target.value)
    }
    const toTimeChange = (e) => {
        setToTime(e.target.value)
    }
    const requirmentChange = (e) => {
        setRequirments(e.target.value)
    }

    return (
        <div >
            <SmallHeader />
            <div className="flex flex-row mb-5 xl:gap-x-40 lg:gap-x-20 md:gap-x-10">
                <div className="flex flex-col justify-start w-1/2">
                    <div className="flex flex-row float-start items-center pt-8 
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                        <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Add New Place</div>
                    </div>
                    <div className="flex flex-row text-text-light xl:text-2xl lg:text-xl md:text-base font-['serif'] mx-32 mt-10">Location :</div>
                    <div className="flex flex-row justify-center h-1/2 ml-32 drop-shadow-[1px_1px_rgba(125,143,154,0.5)] border-solid border-2 border-text-light rounded-xl xl:my-10 lg:my-8 md:my-6 ">
                        {
                            !location.loaded ? <div className=" text-title-light font-['Georgia'] 
                            xl:text-3xl xl:pt-36
                            lg:text-2xl lg:pt-32
                            md:text-xl md:pt-28
                            ">Loading</div> :
                                <MapContainer center={[location.cordinates.lat, location.cordinates.lng]} zoom={zoomLevel} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker id={1} position={[coordinate.position[0], coordinate.position[1]]} icon={customIcon} >
                                        {/* configure the popup that showen when hover the position marker */}
                                        <Popup>
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="flex-row text-base font-semibold text-text-light">here</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                    {/* Configure the actions related to map - here we need when click on map add marker in the place where clicked */}
                                    <MapEvents />
                                </MapContainer>
                        }
                    </div>
                    <div className="flex flex-row justify-end">
                        <button onClick={handelAdd}
                            className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-add-button-light text-button-text-light justify-center items-center
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light
                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10
                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Add</button></div>
                </div>
                <div className="flex flex-col">
                    <div className="container flex flex-col items-center drop-shadow-[2px_2px_rgba(125,143,154,0.5)] h-fit w-fit bg-post-bg-light border-solid border-2 border-text-light space-y-5
                xl:px-16 xl:rounded-3xl xl:pt-8
                lg:px-10 lg:rounded-3xl  lg:pt-6 lg:mr-10
                md:px-6 md:rounded-2xl md:pt-4 md:mr-10">
                        <div className="flex flex-row justify-between">
                            <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-16">Title :</span>
                            <input type="text" value={title} onChange={titleChange}
                                className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                        </div>
                        <div className="flex flex-row justify-between">
                            <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-16">Price :</span>
                            <input type="text" value={price} onChange={priceChange}
                                className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                        </div>
                        <div className="flex flex-row justify-between space-x-2">
                            <span className="flex flex-col text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-14">Date :</span>
                            <div className="flex flex-col justify-start items-center xl:gap-4">
                                <input type="date" value={fromDate} onChange={fromDateChange}
                                    className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-48" />
                                <img src={downRow} />
                                <input type="date" value={toDate} onChange={toDateChange}
                                    className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-14  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-12 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-10 md:h-8 md:w-48" />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between space-x-2">
                            <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-20
                            lg:text-xl lg:w-16
                            md:text-lg md:w-14">Time :</span>
                            <div className="flex flex-col justify-start items-center xl:gap-4">
                                <input type="time" value={fromTime} onChange={fromTimeChange}
                                    className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-20  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-16 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-12 md:h-8 md:w-48" />
                                <img src={downRow} />
                                <input type="time" value={toTime} onChange={toTimeChange}
                                    className="flex flex-row drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1
                            xl:rounded-xl xl:text-xl xl:px-20  xl:h-10 xl:w-64 
                            lg:rounded-lg lg:text-lg lg:px-16 lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:px-12 md:h-8 md:w-48" />

                            </div>
                        </div>
                        <div className="flex flex-row justify-between space-x-2">
                            <span className="flex flex-col text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-40
                            lg:text-xl lg:w-36
                            md:text-lg md:w-32">Requirments :</span>
                            <textarea type="text" value={requirments} onChange={requirmentChange}
                                className="drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-offerbg-light border-solid border-2 border-text-light py-1 text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-60 xl:mb-8
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 lg:mb-6
                                    md:h-16 md:rounded-md md:ml-2 md:text-base md:mb-4" />
                        </div>
                        {error && <div className="flex flex-row justify-center space-x-2">
                            <label className=" text-error-light font-['Open_Sans'] pb-10 xl:text-lg lg:text-base md:text-sm ">you must enter required fields !</label>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewPlace