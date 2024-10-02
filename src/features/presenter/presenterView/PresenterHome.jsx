import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeOffer, getOffers } from "../presenterSlice";
import SmallHeader from "../../layout/SmallHeader";
import warning from "../../../assets/images/warning.svg";
import person from '../../../assets/images/mainBackgrounGirl.png';

function PresenterHome() {
  const state = useSelector(state=>state.presenter);
  const state1 = useSelector(state => state.user);
  const presenterName = state1.login.data.userName;
  const [completedForm, setCompletedForm] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const offers = useSelector(getOffers);

   useEffect (() => {
    if (state.name !== '' || state.mobile !== '' || user.login.data.email !== '')
      setCompletedForm(true)
  }, []);


const handleWarning = () =>{
  navigate("/presenter-home-page/presenter-settings");
}
  const handleEditOffer = (id) => {
    // Navigate to edit offer page with offer id
    navigate("/presenter-home-page/presenter-edit-offer");
  };
  const handleDetailsOffer = (id) => {
    // Navigate to offer details page with offer id
    navigate("/presenter-home-page/presenter-offer-details");
    
  };
  const handleDeleteOffer = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
    dispatch(removeOffer({ id }));
    }
  };
 
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };
  return ( 
    <div className="w-full max-h-full" >
      <SmallHeader />
      <div className="flex flex-col">
        <div className="flex flex-row absolute 
                   xl:right-20 xl:space-x-6 
                   lg:right-28 lg:space-x-6 
                   md:right-20 md:space-x-6">
          <span className="text-text-light font-['sans-serif'] 
        xl:pt-6 xl:text-3xl lg:pt-2 lg:text-xl md:pt-0 md:text-md">
            {presenterName}
          </span>
          <img
            src={person}
            alt="Presenter"
            className="cursor-pointer rounded-full xl:w-24 xl:h-24 lg:w-12 lg:h-12 md:w-9 md:h-9"
          />
        </div>
        <div className="xl:pt-20 xl:pl-28 lg:pt-14 lg:pl-20 md:pt-10 md:pl-16">
          <nav className="text-text-light font-['sans-serif']
                      xl:text-2xl lg:text-xl md:text-md">
            <ul className="flex flex-row space-x-7">
              <li><a className="bg-navItem-light">Home</a></li>
              <li><a href="/presenter-home-page/presenter-profile" className="hover:bg-presenterPostDetails-light">Profile</a></li>
              <li><a href="/presenter-home-page/presenter-new-offer" className="hover:bg-presenterPostDetails-light">New Offer</a></li>
              <li><a href="/presenter-home-page/presenter-orders" className="hover:bg-presenterPostDetails-light">Orders</a></li>
              <li><a href="/presenter-home-page/presenter-settings" className="flex flex-row hover:bg-presenterPostDetails-light">Settings {!completedForm && <img src={warning} alt="Warning" onClick={handleWarning}/>}</a></li>
              <li><a href="/presenter/presenter-report" className="hover:bg-presenterPostDetails-light">Make Report</a></li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-center overflow-y-auto h-96 xl:pb-5 lg:pb-0 md:pb-0">
            <div className="flex flex-col rounded-sm items-center space-y-16
     border border-inputLabelShadow-light/20 shadow-inputLabelShadow-light/50 drop-shadow-sm shadow-sm 
     w-3/4 xl:mt-10 xl:pb-10 lg:mt-10 lg:py-6 md:mt-10 md:py-6 md:px-9">
              <div className="absolute bg-presenterbg-light content-center text-center
        xl:w-32 xl:h-16 xl:right-14 xl:-top-8
        lg:w-28 lg:h-14 lg:right-14 lg:-top-8
        md:w-24 md:h-12 md:right-14 md:-top-8">
                <span className="text-text-light xl:text-2xl lg:text-xl md:text-md">My Offers</span>
              </div>
              {offers.length === 0 ? (<div className="text-text-light"> No Offers Available Yet </div>) :
               (offers.map((offer) => (
              <div key={offer.id} className="flex flex-col bg-button-text-light/75 rounded-lg border border-inputLabelShadow-light/40 
                      space-y-10 xl:px-12 xl:py-10 lg:px-6 lg:py-8 md:px-8 md:py-6">
                <span className="text-title-light">{getCurrentDateTime()}</span>
                <span className="text-offerTitle-light font-['BlinkMacSystemFont'] font-bold text-center
                             xl:text-4xl lg:text-3xl md:text-2xl">{offer.title}</span>
                <div className="flex flex-row space-x-10">
                  
               {offer.offerAttatchment.attachment === null ? (
               <div className="text-text-light mt-16 px-2 content-center">There are no images to show</div>
          ) : (
            offer.offerAttatchment.map((attachment, index) => (
              <div className="relative" key={index}>
               <a key={attachment.id} target="_blank" href={attachment.attachment}>
                          <img
                            src={attachment.attachment}
                            alt="Offer Attachment"
                            className="rounded-xl drop-shadow-[2px_3px_rgba(117,135,142,0.8)]"
                          />
               </a>
              </div>
            ))
          )}
          
                </div>
                <div className="flex flex-row bg-presenterPostDetails-light text-text-light rounded-xl 
                         shadow-inputLabelShadow-light/50 drop-shadow-md shadow-sm 
                          space-x-7 xl:pl-28 xl:pt-7 xl:pb-3 lg:pl-28 lg:pt-7 lg:pb-3 md:pl-20 md:pt-10 md:pb-3">
                  <div className="flex flex-col space-y-4">
                    <span>Date:</span>
                    <span>Time:</span>
                    <span>Price:</span>
                    <span>Include:</span>
                    <span>Address:</span>
                  </div>
                  <div className="bg-presenterbg-light  text-text-light absolute text-center content-center
                drop-shadow-[2px_2px_rgba(211,168,76,0.6)] 
                xl:rounded    xl:w-24 xl:h-8 xl:-mt-11 xl:left-5
                lg:rounded-md lg:w-24 lg:h-8 lg:-mt-11 lg:left-5
                md:rounded-sm md:w-20 md:h-8 md:-mt-12 md:left-5">
                    <span className="font-['serif'] xl:text-xl lg:text-lg md:text-md">Details</span>
                </div>
                  <div className="flex flex-col space-y-4">
                    <span>{offer.startDate} - {offer.endDate}</span>
                    <span>{offer.startTime} - {offer.endTime}</span>
                    <span>{offer.pricePerOne}</span>
                    <span>{offer.description}</span>
                    <span>{offer.address}</span>
                  </div>
                </div>
                <div className="flex flex-row justify-center space-x-20">
                  <button onClick={() => handleEditOffer(offer.id)}
                    className="flex flex-col font-['sans-serif'] items-center justify-center
                           drop-shadow-[3px_6px_rgba(117,135,142,0.5)]
                         bg-save-button-light text-button-text-light
                           hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-save-button-hover-light 
                           xl:text-2xl xl:rounded-md xl:w-28 xl:h-10
                           lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                           md:text-lg md:rounded-md  md:w-20 md:h-8">Edit</button>
                  <button onClick={() => handleDetailsOffer(offer.id)}
                    className="flex flex-col font-['sans-serif'] 
                           drop-shadow-[3px_6px_rgba(117,135,142,0.5)] items-center justify-center
                         bg-details-button-light text-button-text-light 
                           hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-details-button-hover-light 
                           xl:text-2xl xl:rounded-md xl:w-28 xl:h-10
                           lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                           md:text-lg md:rounded-md  md:w-20 md:h-8">Details</button>
                  <button onClick={() => handleDeleteOffer(offer.id)}
                    className="flex flex-col font-['sans-serif'] items-center justify-center
                           drop-shadow-[3px_6px_rgba(117,135,142,0.5)] 
                         bg-delete-button-light text-button-text-light
                           hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                           xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10
                           lg:text-xl lg:rounded-md  lg:w-24 lg:h-10  
                           md:text-lg md:rounded-md  md:w-20 md:h-8">Delete</button>
                </div>
              </div>
                     )))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default PresenterHome;
