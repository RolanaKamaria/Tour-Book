import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SmallHeader from '../../layout/SmallHeader';
import backButton from '../../../assets/images/backButton.svg';
import {
  addOfferAttachment, setTitle, setServices, setPricePerOne,
  setOfferDescription, setOfferStartDate, setOfferEndDate,
  setOfferStartTime, setOfferEndTime, setSizeOfOffer, addService
} from '../presenterSlice';
import arrow from '../../../assets/images/arrow.svg';

function PresenterEditOffer() {
  const state = useSelector(state => state.presenter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [offerName, setOfferName] = useState(state.offer.title);
  const [offerSize, setOfferSize] = useState(state.offer.offerSize);
  const [unitPrice, setUnitPrice] = useState(state.offer.pricePerOne);
  const [description, setDescription] = useState(state.offer.description);
  const [startDate, setStartDate] = useState(state.offer.startDate);
  const [endDate, setEndDate] = useState(state.offer.endDate);
  const [startTime, setStartTime] = useState(state.offer.startTime);
  const [endTime, setEndTime] = useState(state.offer.endTime);
  const [uploadedImages, setUploadedImages] = useState(state.offer.offerAttatchment);
  const [allServices, setAllServices] = useState(state.services);
  const [selectedServiceIds, setSelectedServiceIds] = useState(state.PresenterServices.map(s => s.serviceId));
  const [newService, setNewService] = useState("");

  const handleOfferName = (e) => setOfferName(e.target.value);
  const handleUnitPrice = (e) => setUnitPrice(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleOfferSize = (e) => setOfferSize(e.target.value);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);
  const handleStartTime = (e) => setStartTime(e.target.value);
  const handleEndTime = (e) => setEndTime(e.target.value);

  const handleServiceChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedServiceIds(selected);
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

  const handleUpdateOffer = () => {
    const servicesToSave = selectedServiceIds.map(serviceId => ({
      presenterId: state.id,
      serviceId
    }));
    dispatch(setServices(servicesToSave));
    dispatch(addOfferAttachment(uploadedImages));
    dispatch(setSizeOfOffer(offerSize));
    dispatch(setTitle(offerName));
    dispatch(setPricePerOne(unitPrice));
    dispatch(setOfferDescription(description));
    dispatch(setOfferStartDate(startDate));
    dispatch(setOfferEndDate(endDate));
    dispatch(setOfferStartTime(startTime));
    dispatch(setOfferEndTime(endTime));
    navigate("/presenter-home-page");
  };

  return (
    <div className="w-full max-h-full">
      <SmallHeader />
      <div className="flex flex-col space-y-10 pb-10">
        <div className="flex flex-row space-x-6 xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
          <img
            src={backButton}
            onClick={handleBack}
            alt="Back"
            className="cursor-pointer xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
          />
          <span className="text-title-light font-['sans-serif'] xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
            Edit Offer
          </span>
        </div>
        <div className="flex flex-row xl:space-x-28  lg:space-x-8 md:space-x-3 justify-center mt-10">
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Offer Name:</label>
            <input
              type="text"
              value={offerName}
              onChange={handleOfferName}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-44 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Unit Price :</label>
            <input
              type="text"
              value={unitPrice}
              onChange={handleUnitPrice}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-44 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={handleDescription}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                          md:h-8 md:w-44 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-text-light">Offer Size:</label>
            <input
              type="text"
              value={offerSize}
              onChange={handleOfferSize}
              className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
                         xl:h-12 xl:w-52 xl:rounded-xl xl:pl-3 xl:text-lg 
                         lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                         md:h-8 md:w-44 md:rounded-md md:pl-1 md:text-sm"
            />
          </div>
        </div>
        <div className="bg-post-bg-light shadow-inputLabelShadow-light/40 drop-shadow-sm shadow-md
            flex flex-row space-x-4 overflow-x-auto xl:mx-32 lg:mx-20 md:mx-10  px-5 py-5 rounded-md">
          {uploadedImages.length === 0  ? (
            <div className="text-text-light content-center px-2">Upload your offer's attachments</div>
          ) : (
            uploadedImages.map((image, index) => (
              <div className="relative flex-shrink-0" key={index}>
                <img
                  src={image.attachment}
                  className="drop-shadow-[1px_4px_rgba(117,135,142)] rounded-md cursor-pointer 
                  xl:w-72 xl:h-52 lg:w-60 lg:h-52 md:w-40 md:h-36"
                  onClick={() => handleImageClick(image)}
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
            xl:px-8 xl:py-10 xl:pr-0
            lg:px-4 lg:py-8 lg:pr-0
            md:px-4 md:py-10 md:pr-10 md:pl-5">
            <div className="bg-post-bg-light  text-text-light absolute text-center content-center
                drop-shadow-[2px_2px_rgba(211,168,76,0.6)] 
                xl:rounded    xl:w-24 xl:h-8 xl:-mt-14 xl:left-10
                lg:rounded-md lg:w-24 lg:h-8 lg:-mt-11 lg:left-5
                md:rounded-sm md:w-20 md:h-8 md:-mt-12 md:left-5">
              <span className="font-['serif'] xl:text-xl lg:text-lg md:text-md">Details</span>
            </div>
            <div className="flex flex-row xl:space-x-10 lg:space-x-5 md:space-x-3 md:px-5">
              <label className="text-text-light">Date:</label>
              {startDate ? (<input
                type="text"
                value={startDate}
                onChange={handleStartDate}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />): (<input
                type="date"
                value={startDate}
                onChange={handleStartDate}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />)}
              <img src={arrow} alt="Arrow" className="md:w-10 md:h-10" />
              {endDate ? (<input
                type="text"
                value={endDate}
                onChange={handleEndDate}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light 
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32  md:rounded-md md:pl-1 md:text-sm"
              />):(<input
                type="date"
                value={endDate}
                onChange={handleEndDate}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light 
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32  md:rounded-md md:pl-1 md:text-sm"
              />)}
            </div>
            <div className="flex flex-row  xl:space-x-10 lg:space-x-5 md:space-x-3 md:px-5">   
              <label className="text-text-light">Time:</label>
              {startTime ? (<input
                type="text"
                value={startTime}
                onChange={handleStartTime}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />):(<input
                type="time"
                value={startTime}
                onChange={handleStartTime}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />)}
              <img src={arrow} alt="Arrow" className="md:w-10 xl:h-10" />
              {endTime? (<input
                type="text"
                value={endTime}
                onChange={handleEndTime}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />):(<input
                type="time"
                value={endTime}
                onChange={handleEndTime}
                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-presenterbg-light
                xl:h-12 xl:w-60 xl:rounded-xl xl:pl-3 xl:text-lg 
                lg:h-10 lg:w-48 lg:rounded-lg lg:pl-2 lg:text-base
                md:h-8 md:w-32 md:rounded-md md:pl-1 md:text-sm"
              />)}
    
            </div>
          </div>
          <div className="flex flex-col xl:space-y-4 lg:space-y-2 md:space-y-2">
            <label className="text-text-light">Service Type:</label>                  
            <select multiple value={selectedServiceIds} onChange={handleServiceChange} 
              className="border-text-light p-2 rounded-md drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light bg-button-text-light 
              xl:h-20 xl:w-56 xl:rounded-xl xl:pl-3 xl:text-lg 
              lg:h-20 lg:w-56 lg:rounded-lg lg:pl-1 lg:text-base
              md:h-16 md:w-44 md:rounded-md md:pl-1 md:text-sm">
              {allServices.map(service => (
                <option key={service.id} value={service.id}>
                  {service.service}
                </option>
              ))}
            </select>  

          </div>
          <button onClick={handleUpdateOffer}
            className="flex flex-col font-['sans-serif'] items-center justify-center
            drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
            bg-add-button-light text-button-text-light
            hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-add-button-hover-light 
            xl:text-2xl xl:rounded-md xl:w-28 xl:h-10 xl:mt-72
            lg:text-xl lg:rounded-md lg:w-24 lg:h-10  lg:mt-52
            md:text-md md:rounded-md md:w-52 md:h-10  md:mt-64">Save</button>
        </div>
      </div>
    </div>
  );
}

export default PresenterEditOffer;
