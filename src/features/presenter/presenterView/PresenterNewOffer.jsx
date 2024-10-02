import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SmallHeader from '../../layout/SmallHeader';
import backButton from '../../../assets/images/backButton.svg';
import { addOfferAttachment, setTitle, setServices, setPricePerOne, setOfferDescription, setOfferStartDate, setOfferEndDate, setOfferStartTime, setOfferEndTime, setSizeOfOffer, addService } from '../presenterSlice';
import arrow from '../../../assets/images/arrow.svg';

function PresenterNewOffer() {
  const state = useSelector(state => state.presenter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploadedImages, setUploadedImages] = useState([]);
  const [allServices, setAllServices] = useState(state.services);
  const [newService, setNewService] = useState("");

  const validationSchema = Yup.object().shape({
    offerName: Yup.string().required("Offer Name is required"),
    unitPrice: Yup.string().required("Unit Price is required"),
    description: Yup.string().required("Description is required"),
    offerSize: Yup.string().required("Offer Size is required"),
    startDate: Yup.string().required("Start Date is required"),
    endDate: Yup.string().required("End Date is required"),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string().required("End Time is required"),
    selectedServiceIds: Yup.array().of(Yup.string()).min(1, "At least one service must be selected")
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleAddService = () => {
    if (newService.trim() !== "") {
      const newServiceObject = {
        id: new Date().toISOString(), // Generate a unique ID
        service: newService
      };
      setAllServices([...allServices, newServiceObject]);
      dispatch(addService(newServiceObject));
      setNewService("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const newImage = {
        id: new Date().toISOString(), // Generate a unique ID
        attachment: e.target.result,
        type: file.type,
      };
      setUploadedImages([...uploadedImages, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (image) => {
    setUploadedImages(uploadedImages.filter(img => img.id !== image.id));
  };

  const handleBack = () => {
    navigate("/presenter-home-page");
  };

  const handleImageClick = (image) => {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${image.attachment}" alt="Uploaded Image" />`);
  };
  

  const onSubmit = (data) => {
    if (uploadedImages.length === 0) {
        alert("Please upload at least one image.");
        return;
      }
    const servicesToSave = data.selectedServiceIds.map(serviceId => ({
      presenterId: state.id,
      serviceId
    }));
    dispatch(setServices(servicesToSave));
    dispatch(addOfferAttachment(uploadedImages));
    dispatch(setSizeOfOffer(data.offerSize));
    dispatch(setTitle(data.offerName));
    dispatch(setPricePerOne(data.unitPrice));
    dispatch(setOfferDescription(data.description));
    dispatch(setOfferStartDate(data.startDate));
    dispatch(setOfferEndDate(data.endDate));
    dispatch(setOfferStartTime(data.startTime));
    dispatch(setOfferEndTime(data.endTime));
    navigate("/presenter-home-page");
  };

  return (
    <div className="w-full max-h-full">
      <SmallHeader />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10 pb-10">
        <div className="flex flex-row space-x-6
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
          />
          <span className="text-title-light font-['sans-serif'] 
          xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
            New Offer
          </span>
        </div>
        <div className="flex flex-row justify-center xl:space-x-28 lg:space-x-12 md:space-x-4 mt-10">
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Offer Name:</label>
            <input
              type="text"
              {...register("offerName")}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                        md:h-8 md:w-40   md:rounded-md md:pl-1 md:text-sm"
            />
            <p className="text-error-light">{errors.offerName?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Unit Price :</label>
            <input
              type="text"
              {...register("unitPrice")}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                         md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
            <p  className="flex flex-row justify-center text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm ">{errors.unitPrice?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Description:</label>
            <textarea
              type="text"
              {...register("description")}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
            <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.description?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Offer Size:</label>
            <input
              type="text"
              {...register("offerSize")}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                         md:h-8 md:w-40 md:rounded-md md:pl-1 md:text-sm"
            />
            <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.offerSize?.message}</p>
          </div>
        </div>
        <div className="bg-post-bg-light shadow-inputLabelShadow-light/40 drop-shadow-sm shadow-md
            flex flex-row space-x-4 overflow-x-auto rounded-md
            xl:mx-24 xl:px-5 xl:py-5
            lg:mx-10 lg:px-5 lg:py-5
            md:mx-10 md:px-5 md:py-5">
          {uploadedImages.length === 0 ? (
            <div className="text-text-light content-center px-2">Upload your offer's attachments</div>
          ) : (
            uploadedImages.map((image, index) => (
              <div className="relative flex-shrink-0" key={index}>
                <img
                  src={image.attachment}
                  className="drop-shadow-[1px_4px_rgba(117,135,142)] rounded-md cursor-pointer 
                  xl:w-80 xl:h-52 lg:w-60 lg:h-48 md:w-40 md:h-36"
                  onClick={() => handleImageClick(image)}
                  alt={`Uploaded ${index}`}
                />
                <div
                  className="bg-error-light cursor-pointer rounded-full px-1.5 absolute top-1 right-1"
                  onClick={() => handleDeleteImage(image)}
                >
                  <span className="text-button-text-light">X</span>
                </div>
              </div>
            ))
          )}
          <div className="flex flex-col content-center justify-center space-y-4 items-center xl:pl-14 lg:pl-5 md:pl-4">
            <span className="font-['sans-serif'] text-text-light xl:text-2xl lg:text-xl md:text-lg">
              Add Images
            </span>
            <label className="bg-button-text-light border border-text-light text-center content-center cursor-pointer 
              xl:w-14 xl:h-12 xl:rounded-xl xl:mx-16 
              lg:w-12 lg:h-10 lg:rounded-lg lg:mx-16
              md:w-10 md:h-8 md:rounded-md  md:mx-16">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-text-light xl:text-3xl lg:text-2xl md:text-xl">
                +
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-row items-center xl:space-x-10 lg:space-x-10 md:space-x-5 xl:ml-24 lg:ml-10 md:ml-10">
          <div className="bg-post-bg-light shadow-inputLabelShadow-light/40 drop-shadow-sm shadow-md
            flex flex-col text-text-light rounded-lg space-y-5 
            xl:px-8 xl:py-10 
            lg:px-8 lg:py-8 
            md:px-4 md:py-10 md:pr-10 md:pl-5">
            <div className="bg-post-bg-light  text-text-light absolute text-center content-center
                drop-shadow-[2px_2px_rgba(211,168,76,0.6)] 
                xl:rounded    xl:w-24 xl:h-8 xl:-mt-14 xl:left-10
                lg:rounded-md lg:w-24 lg:h-8 lg:-mt-11 lg:left-5
                md:rounded-sm md:w-20 md:h-8 md:-mt-12 md:left-5">
              <span className="font-['serif'] xl:text-xl lg:text-lg md:text-md">Details</span>
            </div>
            <div className="flex flex-row xl:space-x-10 lg:space-x-5 lg:px-0 md:space-x-3 md:px-5">
              <label className="text-text-light">Date:</label>
              <div className="flex flex-col space-y-2">
              <input
                type="date"
                {...register("startDate")}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                           xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                           lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                           md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />
               <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.startDate?.message}</p>
              </div>
              <img src={arrow} alt="Arrow" className="md:w-10 md:h-10" />
              <div className="flex flex-col space-y-2">
              <input
                type="date"
                {...register("endDate")}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light 
                           xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                           lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                           md:h-8 md:w-32  md:rounded-md md:pl-1 md:text-sm"
              />
              <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.endDate?.message}</p>
                </div>
            </div>
            <div className="flex flex-row  xl:space-x-10 lg:space-x-5 lg:px-0  md:space-x-3 md:px-5">   
              <label className="text-text-light">Time:</label>
              <div className="flex flex-col space-y-2">
              <input
                type="time"
                {...register("startTime")}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                           xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                           lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                           md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />
                  <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.startTime?.message}</p>
            </div>
              <img src={arrow} alt="Arrow" className="md:w-10 xl:h-10" />
              <div className="flex flex-col space-y-2">
              <input
                type="time"
                {...register("endTime")}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                           xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                           lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                           md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />
                <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                  xl:text-lg lg:text-base md:text-sm">{errors.endTime?.message}</p>
                  </div>
            </div>
           
          </div>
          <div className="flex flex-col xl:space-y-4 lg:space-y-2 md:space-y-2">
            <label className="text-text-light">Service Type:</label>                  
            <select multiple {...register("selectedServiceIds")} 
              className="border-text-light p-2 rounded-md drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
              xl:h-20 xl:w-56 xl:rounded-xl xl:pl-3 xl:text-lg 
              lg:h-20 lg:w-56 lg:rounded-lg lg:pl-1 lg:text-base
              md:h-16 md:w-44 md:rounded-md md:pl-1 md:text-sm">
              {allServices.map(service => (
                <option key={service.id} value={service.id} className="hover:bg-presenterPostDetails-light">
                  {service.service}
                </option>
              ))}
            </select>
            <p  className="flex flex-row justify-center  text-error-light font-['Open_Sans'] 
                                xl:text-lg lg:text-base md:text-sm">{errors.selectedServiceIds?.message}</p>
    
          </div>
          <button type="submit"
            className="flex flex-col font-['sans-serif'] items-center justify-center
            drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
            bg-add-button-light text-button-text-light
            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light 
            xl:text-2xl xl:rounded-md xl:w-28 xl:h-10 xl:mt-72
            lg:text-xl lg:rounded-md lg:w-24 lg:h-10  lg:mt-52
            md:text-md md:rounded-md md:w-52 md:h-10  md:mt-64">Add Offer</button>
        </div>
      </form>
    </div>
  );
}

export default PresenterNewOffer;
