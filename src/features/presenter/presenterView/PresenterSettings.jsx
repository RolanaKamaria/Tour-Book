import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Person from "../../../assets/images/mainBackgrounGirl.png"
import useGeoLocation from "../../../assets/map/useGeoLocation";
import placeHolder from "../../../assets/images/placeholderselect.png"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import MapEvents from "../../../assets/map/mapEvents"
import 'leaflet/dist/leaflet.css';
import { updatePresenterData } from "../presenterSlice";
function PresenterSettings() {
    const location = useGeoLocation();
    const zoomLevel = 13;
    const coordinate = useSelector(state => state.coordinate);
    const [selectedFile, setSelectedFile] = useState(null);
    const presenter=useSelector(state=>state.presenter)
    const user= useSelector(state=>state.user)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const customIcon = new Icon({
        iconUrl: placeHolder,
        iconSize: [38, 38],
    });
    const handelBack = () => {
        navigate('/presenter-home-page');
    }
    const handelChangePassword= ()=>{
        navigate('/presenter/presenter-reset-password')
    }
    //to update the value of select button image
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
        
      };
     //define required schema with required condition
     const requiredSchema = Yup.object().shape({
        userName: Yup.string()
            .required("Required").default(presenter.name),
        phoneNumber: Yup.number()
            .required("Required").default(presenter.mobile),
        email: Yup.string()
        .required("Required")
        .matches(
            "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
            'Invalid email address'
        ).default(user.login.data.email),
        image: Yup.string().required("Required"),
        axisX: Yup.number(),
        axisY: Yup.number()
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(requiredSchema),
    });

    //convert image object to Base64 object
    const convertToBase64=(data)=>{
              //convert the input string to a Uint8Array
              const encoder = new TextEncoder();
              const uint8Array = encoder.encode(data);
        
              //create a canvas and draw the Uint8Array as an image
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const imageData = ctx.createImageData(1, uint8Array.length);
              imageData.data.set(uint8Array);
              ctx.putImageData(imageData, 0, 0);
          
              //convert the canvas to a base64 JPEG data URL
              const base64Jpeg = canvas.toDataURL('image/jpeg');
              return base64Jpeg
    }

    // handle form submission
    const onSubmit = (data) => {

        var user=data
        // if we want in next level to configure presenter location
        // user.axisX=coordinate.position[0]
        // user.axisY=coordinate.position[1]
        user.image=convertToBase64(data.image)
        dispatch(updatePresenterData(user))
        navigate('/presenter-home-page');
    };

    return (
        <div className="flex flex-col">
            <SmallHeader />
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row xl:space-x-16 lg:space-x-8 md:space-x-8">
                <div className="flex flex-col justify-start items-start">

                    <div className="flex flex-row float-start items-center 
                    xl:space-x-10 xl:px-28 xl:mx-10 xl:mt-10 
                    lg:space-x-8 lg:px-24 lg:mx-8 lg:mt-6 
                    md:space-x-6 md:px-20 md:mx-6 md:mt-6 ">
                        <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                                xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
                        <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Settings</div>
                    </div>
                    <div className="flex flex-col  space-y-10
                    xl:p-14 xl:pl-48
                    lg:p-10 lg:pl-32
                    md:p-6 md:pl-10">
                        <div className="flex flex-row justify-between xl:space-x-8 lg:space-x-6 md:space-x-4">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl 
                            lg:text-xl 
                            md:text-lg ">Presenter Name :</span>
                                <input type="text"    {...register('userName')} defaultValue={presenter.name}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                        </div>
                        {errors.userName && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] max-w-96
                                xl:text-lg lg:text-base md:text-sm">{errors.userName.message}</div>}
                        <div className="flex flex-row justify-between xl:space-x-8 lg:space-x-6 md:space-x-4 ">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-40
                            lg:text-xl lg:w-36
                            md:text-lg md:w-24">Phone Number :</span>
                                <input type="text"    {...register('phoneNumber')} defaultValue={presenter.mobile}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                        </div>
                        {errors.phoneNumber && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] max-w-96
                                xl:text-lg lg:text-base md:text-sm">{errors.phoneNumber.message}</div>}
                        <div className="flex flex-row justify-between xl:space-x-8 lg:space-x-6 md:space-x-4 ">
                                <span className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-40
                            lg:text-xl lg:w-36
                            md:text-lg md:w-24">Email :</span>
                                <input type="text"    {...register('email')} defaultValue={presenter.website}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-56
                            md:rounded-md md:text-base md:h-8 md:w-48" />

                        </div>
                        {errors.email && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] max-w-96
                                xl:text-lg lg:text-base md:text-sm">{errors.email.message}</div>}
                    </div>
                    
                </div>
                <div className="flex flex-col justify-center items-start space-y-10 pb-10">
                    <div className="flex flex-row justify-center items-center space-x-8">
                        <span className="flex flex-col text-text-light xl:text-2xl lg:text-xl md:text-base font-['Georgia'] ">Choose new image</span>
                        <input type="file"   {...register('image')}   id="custom-file-input" onChange={(e)=>handleFileChange(e)} style={{ display: 'none' }}
                            className="flex flex-col drop-shadow-[2px_4px_rgba(125,143,154,0.5)]
                            lg:rounded-full lg:h-9 lg:w-56
                            md:rounded-full md:h-8 md:w-48" />
                             <label htmlFor="custom-file-input">
                                <img src={selectedFile?URL.createObjectURL(selectedFile):
                                //user.login.data.avatar? user.login.data.avatar: 
                                Person} alt="Choose Image Button" 
                                className="rounded-full drop-shadow-[1px_1px_rgba(117,135,142)] hover:cursor-pointer
                                xl:w-28 xl:h-28
                                lg:w-28 lg:h-28
                                md:w-24 md:h-24"/>
                            </label>
                   </div>
                   {errors.image && <div className="flex flex-row justify-center  text-error-light font-['Open_Sans'] max-w-96
                                xl:text-lg lg:text-base md:text-sm">{errors.image.message}</div>}
                   <div className="flex flex-row justify-start items-start xl:space-x-8 lg:space-x-6 md:space-x-4">
                   <span className="flex flex-col text-text-light font-['sans-serif']  
                            xl:text-2xl xl:w-40
                            lg:text-xl lg:w-32
                            md:text-lg md:w-24">Location :</span>
                             <div className="flex flex-col   justify-center items-center drop-shadow-[1px_1px_rgba(125,143,154,0.5)] border-solid border-2 border-text-light rounded-xl 
                             xl:w-96 xl:h-72
                             lg:w-80 lg:h-64
                             md:w-72 md:h-56">
                        {
                            !location.loaded ? <div className=" text-title-light font-['Georgia'] 
                            xl:text-3xl xl:pt-8
                            lg:text-2xl lg:pt-6
                            md:text-xl md:pt-4
                            ">Loading</div> :
                                <MapContainer center={[location.cordinates.lat,location.cordinates.lng]} zoom={zoomLevel} >
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
                   </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center pb-10 xl:gap-6 lg:gap-4 md:gap-2">
                <button type="submit"
                    className="flex flex-col justify-center items-center text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-save-button-light text-button-text-light 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-48 xl:h-10 
                                lg:text-xl lg:rounded-md  lg:w-44 lg:h-10  
                                md:text-lg md:rounded-md  md:w-40 md:h-8">Save</button>
                <button onClick={handelChangePassword}
                    className="flex flex-col justify-center items-center font-['sans-serif']  drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-change-button-light text-button-text-light 
                            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-change-button-hover-light
                             xl:w-48 xl:h-10  xl:text-2xl xl:rounded-md 
                            lg:text-xl lg:rounded-md  lg:w-44 lg:h-10
                            md:text-lg md:rounded-md  md:w-40 md:h-8">Change Password</button>
            </div>
            </form>
        </div>
    )
}
export default PresenterSettings