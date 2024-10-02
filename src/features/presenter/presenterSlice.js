import { createSlice } from "@reduxjs/toolkit";

import Potato from '../../assets/images/Potato.png'
import Burger from '../../assets/images/Burger.png'
import res3 from '../../assets/images/restaurant3.png'
import res1 from '../../assets/images/restaurant1.png'
import Cake from '../../assets/images/Cake.png'
const initialState = {
  id: "9",
  name: "Khaled Yousef",
  mobile:'0991098295',
  status: "Active",
  size: "250",
  placeName: "Magic",
  website: "www.magic@gmail.com",
  axisX: "",
  axisY: "",
  rate: "4",
  userId: "222",
  offerRequest: [{ id: '1', quantity: '5', description: 'Rolana Kamaria ask for 5 seats for Black Friday tour', offerId: '2', offerState: '',date:'05/10/2024', },
  { id: '2', quantity: '5', description: 'Wajeeh Rabahie ask for 3 seats for Spring is Comming tour', offerId: '24', offerState: '',date:'06/14/2024', },
  { id: '3', quantity: '5', description: 'Nisreen Melhem ask for 4 seats for Winter Better tour', offerId: '25', offerState: '',date:'08/18/2024', },
  { id: '4', quantity: '5', description: 'Milad Melhem ask for 2 seats for Black Friday tour', offerId: '25', offerState: '' ,date:'05/19/2024',},
  { id: '5', quantity: '5', description: 'Takla Zidan ask for 4 seats for Black Friday tour', offerId: '25', offerState: '' ,date:'05/11/2024',},
  { id: '6', quantity: '5', description: 'Abboud Assaf ask for 9 seats for Spring is Comming tour', offerId: '25', offerState: '' ,date:'08/10/2024',},
  { id: '7', quantity: '5', description: 'Maen Melhem  ask for 18 seats for Spring is Comming tour', offerId: '25', offerState: '' ,date:'08/10/2024',},
  { id: '8', quantity: '5', description: 'Rita Kamaria ask for 15 seats for Black Friday tour', offerId: '25', offerState: '',date:'05/12/2024', },
  { id: '9', quantity: '5', description: 'Issa Kamaria ask for 8 seats for Black Friday tour', offerId: '25', offerState: '' ,date:'05/14/2024',},
  
  ],
  PresenterAttatchment: [{attachment:res3},{attachment:res1}], 
  PresenterServices: [],
  services: [
    { id: '1', service: 'Pool' },
    { id: '2', service: 'Restaurant' },
    { id: '3', service: 'Wifi' },
    { id: '4', service: 'Hotel' }
  ],
  offers: [    {
    id: "1",
    title: "Friday Lunch",
    offerSize:"200",
    startDate: "14/08/2024",
    endDate: "16/08/2024",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    pricePerOne: "20$",
    description: "Burger - Potato - One Drink",
    address: "syria-homs",

    offerAttatchment: [{ id: 1, attachment:Burger, type: '' },{ id:2, attachment:Cake, type: '' }],

  },
{ id: 2,
  title: "Sunday Lunch",
  startDate: "5/5/2024",
  endDate: "15/5/2024",
  startTime: "2:00 P.M",
  endTime: "6:00 P.M",
  pricePerOne: "15",
  description: "burger - pepsi",
  address: "syria-homs",
  offerAttatchment: [{ id:2, attachment:Potato, type: '' }],
},],
  offer: 
    {
      id: "1",
      title: "Friday Lunch",
      offerSize:"200",
      startDate: "14/08/2024",
      endDate: "16/08/2024",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      pricePerOne: "20$",
      description: "Burger - Potato - One Drink",
      address: "syria-homs",
      offerAttatchment: [{ id: 1, attachment:Burger, type: '' },{ id:2, attachment:Cake, type: '' }],
    },
  };

const presenterSlice = createSlice({
  name: "presenter",
  initialState,
  reducers: {

    setSize: (state, action) => {
      state.size = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setServices: (state, action) => {
      state.PresenterServices = action.payload;
    },
    addImage: (state, action) => {
      state.PresenterAttatchment.push(action.payload);
    },

    removeOffer: (state, action) => {
      state.offers = state.offers.filter(offer => offer.id !== action.payload.id);
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    setTitle: (state, action) => {
      state.offer.title = action.payload;
    },
    setSizeOfOffer: (state, action) => {
      state.offer.title = action.payload;
    },
    setOfferDescription: (state, action) => {
      state.offer.description = action.payload;
    },
    setPricePerOne: (state, action) => {
      state.offer.pricePerOne = action.payload;
    },
    setOfferStartDate: (state, action) => {
      state.offer.startDate = action.payload;
    },
    setOfferEndDate: (state, action) => {
      state.offer.endDate = action.payload;
    },
    setOfferStartTime: (state, action) => {
      state.offer.startTime = action.payload;
    },
    setOfferEndTime: (state, action) => {
      state.offer.endTime = action.payload;
    },
    addOfferAttachment: (state, action) => {
      state.offer.offerAttatchment.push(action.payload);
    },
    updatePresenterData:(state,action)=>{
      state.name=action.payload.userName
      state.mobile=action.payload.phoneNumber
      
    },
    acceptOrder: (state, action) => {
      const { orderId } = action.payload;
      const updatedOrders = state.offerRequest.map(order =>
        order.id === orderId ? { ...order, offerState: 'Accepted' } : order
      );
      return {
        ...state,
        offerRequest: updatedOrders
      };
    },
    refuseOrder: (state, action) => {
      const { orderId } = action.payload;
      const updatedOrders = state.offerRequest.map(order =>
        order.id === orderId ? { ...order, offerState: 'Refused' } : order
      );
      return {
        ...state,
        offerRequest: updatedOrders
      };
    },
   }
});

export const {
  acceptOrder, 
  refuseOrder, 
  updatePresenterData,
  deleteOfferAttatchment,
  addOfferAttachment,
  setSizeOfOffer,
  setOfferDescription,
  setPricePerOne,
  setOfferStartDate,
  setOfferEndDate,
  setOfferStartTime,
  setOfferEndTime,
  setTitle,
  setSize,
  setWebsite,
  setServices,
  addImage,
  removeOffer,
  addService
} = presenterSlice.actions;


export const getServices = (state) => state.presenter.services;
export const getOffers = (state) => state.presenter.offers;
export default presenterSlice.reducer;
