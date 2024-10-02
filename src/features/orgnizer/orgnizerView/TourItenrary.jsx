import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import loading from "../../../assets/images/loading.png"
import placeHolderSelect from "../../../assets/images/placeholderselect.png"
import DeleteIcon from "../../../assets/images/deleteIcon.svg"
import useGeoLocation from "../../../assets/map/useGeoLocation";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../../tailwind/largeMap.css"
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setTourPoint } from "../orgnizerSlice"

function TourItenrary() {
    const location = useGeoLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const [KMdistance, setKMdistance] = useState(0);
    const [HMdistance, setHMdistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const tour = useSelector(state => state.orgnizer.tour)
    const locations = useSelector(state => state.orgnizer.tour.tourPoints)
    //to get the position that the orgnizer choose شrranged in the order chosen by the orgnizer
    const selectedLocations = locations.filter(location => location.select == true);
    const [arrangedLocations, setArrangedLocations] = useState(selectedLocations)
    const [line, setLine] = useState();
    // Map parameters
    const zoomLevel = 13;
    const customIconSelcet = new Icon({
        iconUrl: placeHolderSelect,
        iconSize: [38, 38],
    });
    
    //to recalculate distance && redraw line between position when order changed
    useEffect(()=>{
        drawLine()
        calculateDistance()
    }
    ,[arrangedLocations])

    //to customize the placeholder Icon that apper on the map when more than one place child allocate in the same region
    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`
            ,
            className: 'custom-marker-cluster',
            iconSize: point(33, 33, true)
        })
    }
    //to draw polyline between to podition on the map
    const drawLine = () => {
        var data = [];
        if (arrangedLocations.length > 1) {
            for (let i = 1; i < arrangedLocations.length; i++) {
                data.push({
                    from_lat: arrangedLocations[i - 1].lat,
                    from_long: arrangedLocations[i - 1].lng,
                    id: Math.random().toString(36).substring(2, 10),
                    to_lat: arrangedLocations[i].lat,
                    to_long: arrangedLocations[i].lng
                })
            }
        }

      setLine(data)
    }
  
    //to calculate distance between selected position
    const calculateDistance = () => {
        var distance = 0;
        if (arrangedLocations.length > 1) {
            for (let i = 1; i < arrangedLocations.length; i++) {
                distance += L.latLng(arrangedLocations[i - 1]).distanceTo(L.latLng(arrangedLocations[i]));
            }
            const distanceInKilometers = distance / 1000;
            const KM = distanceInKilometers.toFixed(2)
            const averageSpeed = 60;
            const travelTimeInHours = distanceInKilometers / averageSpeed;
            const travelTimeInMinutes = travelTimeInHours * 60;
            const H = travelTimeInHours.toFixed(1)
            const D = H / 24
            setKMdistance(KM)
            setHMdistance(H)
            setDuration(D.toFixed())
        }
    }
    // to wait until the distance calculated
    const memorizedData = useMemo(() => { calculateDistance(); drawLine() }, [])

    //to rearranged items in list by drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const newItems = Array.from(arrangedLocations);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setArrangedLocations(newItems);
        drawLine()
      
    };
    
    const handelDeleteLocation = (id) => {
        if (window.confirm('Are you sure you want to delete this point ?')) {
            setArrangedLocations(
                arrangedLocations.filter(location => location.id != id)
            )
        }
    }

    const handleClearAll = () => {
        setArrangedLocations(selectedLocations)
        calculateDistance()
    }

    const handelRequirmentChange = (id, value) => {
        const updatedData = arrangedLocations.map((location) =>
            location.id === id
                ? { ...location, description: value }
                : location
        );
        setArrangedLocations(updatedData)
    }

    const handelSave=()=>{
        dispatch(setTourPoint(arrangedLocations))
        navigate('/make-special-tour/edit-itenrary/confirm')
    }

    const handelBack = () => {
        navigate('/make-special-tour');
    }


    return (
        <div className="flex flex-col space-y-10 ">
            <SmallHeader />
            <div className="flex flex-row justify-start items-center 
            xl:space-x-96 
            lg:space-x-72 
            md:space-x-56 ">
                <div className="flex flex-col justify-center items-center">

                    <div className="flex flex-row justify-center items-center 
                    xl:space-x-10 xl:px-28 xl:mx-10
                    lg:space-x-8 lg:px-24 lg:mx-8 
                    md:space-x-6 md:px-20 md:mx-6 ">
                        <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                                xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Edit Itenrary</div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center ">
                    <div className="flex flex-row justify-center items-center space-x-10">
                     
                        <button onClick={handelSave}
                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10  
                                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">Save</button>
                        <button onClick={handleClearAll}
                            className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-delete-button-light text-button-text-light 
                                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                                            xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10  
                                            lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                            md:text-lg md:rounded-md  md:w-20 md:h-8 ">ClearAll</button>
                    </div>
                </div>

            </div>
            <div className="flex flex-row justify-start items-center  text-text-light font-['serif']
            xl:text-2xl xl:pl-40 xl:space-x-80
            lg:text-xl lg:pl-32 lg:space-x-64
            md:text-lg md:pl-24 md:space-x-48">
                <div className="flex flex-col justify-start items-center ">
                    <div className="flex flex-row justify-start items-center space-x-5">
                        <span className="text-title-light">Cost :</span>
                        <span>{tour.totalCost} $</span>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center ">
                    <div className="flex flex-row justify-start items-center space-x-5">
                        <span className="text-title-light">Distance (H) :</span>
                        <span>{HMdistance} </span>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center ">
                    <div className="flex flex-row justify-start items-center space-x-5">
                        <span className="text-title-light">Distance (KM) :</span>
                        <span>{KMdistance} </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center drop-shadow-[2px_4px_rgba(125,143,154,0.5)] mx-32 pb-5">
                {/* Create Map layer  */}
                {!location.loaded ? <img src={loading} className="w-/12 h-1/12 ml-80" /> :
                    <MapContainer center={[location.cordinates.lat, location.cordinates.lng]} zoom={zoomLevel} style={{ height: "450px", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* Create Map Marker & Groouping them into Cluster */}
                        <MarkerClusterGroup
                            chunkedLoading
                            iconCreateFunction={createCustomClusterIcon}
                        >
                            {arrangedLocations.map(location => {
                                return (
                                    <Marker id={location.id} position={[location.lat, location.lng]} icon={customIconSelcet} >
                                        {/* configure the popup that showen when hover the position marker */}
                                        <Popup>
                                            <div className="flex flex-col justify-start items-start space-y-2">
                                                <div className="flex-row space-x-3 text-base font-semibold text-text-light">
                                                    <span className="text-title-light font-normal">Name :</span>
                                                    <span>{location.name}</span>
                                                </div>
                                                <div className="flex-row space-x-3 text-base font-semibold text-text-light">
                                                    <span className="text-title-light font-normal">arrive :</span>
                                                    <span>{location.arrivalTime}</span>
                                                </div>
                                                <div className="flex-row space-x-3 text-base font-semibold text-text-light">
                                                    <span className="text-title-light font-normal">leave :</span>
                                                    <span>{location.leavingTime}</span>
                                                </div>
                                                <div className="flex-row space-x-3 text-base font-semibold text-text-light">
                                                    <span className="text-title-light font-normal">requirments :</span>
                                                    <span>{location.description}</span>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>)
                            })}

                            {line.map(({ id, from_lat, from_long, to_lat, to_long }) => {
                                return <Polyline key={id} positions={[
                                    [from_lat, from_long], [to_lat, to_long],
                                ]} color={'red'} />
                            })}
                        </MarkerClusterGroup>

                        {/* <MapEvents /> */}
                    </MapContainer>}
            </div>
            <div className="flex flex-row justify-start items-center  text-title-light font-['serif']
            xl:text-3xl xl:pl-40
            lg:text-2xl lg:pl-32 
            md:text-xl md:pl-24">Change the order of points :</div>

            <div className="flex flex-row justify-start items-center text-text-light font-['serif'] 
            xl:text-2xl lg:text-xl md:text-lg">
                <div className="pb-10 
                xl:pl-40 xl:gap-x-32 xl:gap-y-12
                lg:pl-32 lg:gap-24 lg:gap-y-8
                md:pl-24 md:gap-16 md:gap-y-6">
                    {/* DragCropContext component to allow locations to be reordered */}
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="arrangedLocations">
                            {(provided) => (
                                <div
                                    className="space-y-10"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {arrangedLocations.map((location, index) => (
                                        //Draggable component is the item that we want to change its order
                                        <Draggable key={location.id} draggableId={location.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="flex flex-row space-x-10 items-center "
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <div className="flex flex-col space-y-5">
                                                        <div className="flex flex-row justify-between ">
                                                            <input value={index + 1} disabled
                                                                className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-light border-solid border-2 border-text-light text-center rounded-full
                            xl:text-xl xl:h-10 xl:w-10
                            lg:text-lg lg:h-9 lg:w-9
                            md:text-base md:h-8 md:w-8"/>
                                                            <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-48
                            lg:text-xl lg:w-40
                            md:text-lg md:w-32">{location.name}</span>
                                                        </div>
                                                        <div className="flex flex-row space-x-2">
                                                            <span className="flex flex-col  text-title-light font-['sans-serif']  
                            xl:text-2xl xl:w-44
                            lg:text-xl lg:w-36
                            md:text-lg md:w-28">Requirments :</span>
                                                            <input defaultValue={location.description} onChange={(e) => { handelRequirmentChange(location.id, e.target.value) }}
                                                                className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-light border-solid border-2 border-text-light text-center p-2
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48"></input>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <img src={DeleteIcon} onClick={() => { handelDeleteLocation(location.id) }}
                                                            className="hover:cursor-pointer  hover:drop-shadow-[1px_1px_rgba(117,135,142)]
                                    xl:h-10 xl:w-10 lg:h-8 lg:w-8 md:h-6 md:w-6 "/>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

        </div>
    )
}
export default TourItenrary