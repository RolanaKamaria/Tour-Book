import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useState } from "react";
const initialState = {
  id: 1,
  gender: 'Female',
  name: 'Nisreen',
  middleName: 'Issa',
  lastName: 'Melhem',
  mobile: '0992448443',
  birthday: '2001-08-19',
  clientRequest: [{ id: '1', numOfSeat: '5', status: 'accept', clientId: '1', client: { name: 'Rolana', lastName: 'Kamaria', mobile: '0940580349' } }],

  notifications: ['Rolana Kamaria invite you to join her in the Extraordinary Experiece tour',
    'Wajeeh Rabahie invite you to join him in the Tour Around The World tour',
    'Nisreen Melhem invite you to join her in the Discover The World tour',
    'Takla Zidan  invite you to join her in the Tour Around The World tour',
    'Maen Melhem  invite you to join him in the Discover The World tour',
    'Nagham Melhem  invite you to join her in the Mountains and Rivers tour'
  ,],

  clientTours: [
    {
      id:11,
      title:'Discover The World tour',
      status:'accepted',
      meetingPoint:'Homs Hotel',
      startDate:'2024-09-09',
      endDate:'2024-09-10',
      meetingTime:'8:30 AM',
      totalTime:'17 Hours',
      price:'100$',
      numberOfSeats:'5',
      tourPoints: [
        {
          id: 1, 
          name: "Maa Zaher", 
          lat: 34.7207443, 
          lng: 36.7173883, 
          url: '/make-special-tour/presenter-offers', 
          size: 120, 
          select: true, 
          status: 'accept', 
          position: 'Maa Zaher', 
          requirement:[{title:"snacks"},{title:"Bread"}],
          activity:[{title:'Eat'},{title:'Relax'}],
          arrivalTime: '9:00 AM',
           leavingTime: '12:00 PM', 
        },
        {
          id: 2,
          name: "MagicTown Resort Zaidal", 
          lat: 34.776043258519174, 
          lng: 36.6026282253172, 
          url: '/make-special-tour/presenter-offers', 
          size: 60, 
          select: true, 
          status: 'wait', 
          position: 'MagicTown Resort Zaidal', 
          requirement:[{title:"Swim suit"},{title:"Food"}],
          activity:[{title:'Swim'},{title:'Eat'}],
          arrivalTime: '1:00 PM', 
          leavingTime: '7:00 PM', 
        },
        {
          id: 3, 
          name: "Al-Kharaab Street", 
          lat: 34.71017331715748, 
          lng: 36.639553309802125, 
          url: '/make-special-tour/presenter-offers', 
          size: 20, 
          status: 'refuse', 
          select: false, 
          position: 'Al-Kharaab Street', 
          requirement:[{title:"Water"},{title:"Jacket"}],
          activity:[{title:'Talk'},{title:'Relax'}],
          arrivalTime: '8:00 PM', 
          leavingTime: '10:00 PM', 
        },
        {
          id: 4, 
          name: "Bella Milano", 
          lat: 34.71017331715748, 
          lng: 36.639553309802125, 
          url: '/make-special-tour/presenter-offers', 
          size: 20, 
          status: 'refuse', 
          select: false, 
          position: 'Bella Milano', 
          requirement:[{title:"suitable clothes"},{title:"shoes"}],
          activity:[{title:'Drink'},{title:'Dance'}],
          arrivalTime: '10:30 PM', 
          leavingTime: '2:00 AM', 
        }
      ],
    },
    {
      id:1,
      title:'Mountains and oceans',
      status:'accepted',
      meetingPoint:'Homs clock',
      startDate:'2024-04-04',
      endDate:'2024-04-05',
      meetingTime:'09:00 AM',
      totalTime:'24 Hours',
      price:'50$',
      numberOfSeats:'3',
      tourPoints: [
        {
          id: 1, 
          name: "Mount Qasioun", 
          lat: 34.7207443, 
          lng: 36.7173883, 
          url: '/make-special-tour/presenter-offers', 
          size: 120, 
          select: true, 
          status: 'accept', 
          position: 'Mount Qasioun', 
          requirement:[{title:"Shoes"},{title:"Jacket"}],
          activity:[{title:'Eat'},{title:'Relax'}],
          arrivalTime: '9:00 AM',
           leavingTime: '3:00 PM', 
        },
        {
          id: 2, 
          name: "New Qasioun Mall", 
          lat: 34.776043258519174, 
          lng: 36.6026282253172, 
          url: '/make-special-tour/presenter-offers', 
          size: 60, 
          select: true, 
          status: 'wait', 
          position: 'New Qasioun Mall', 
          requirement:[{title:"Extra Money"},{title:"Jacket"}],
          activity:[{title:'Eat'},{title:'Playing Balling'}],
          arrivalTime: '3:30 PM', 
          leavingTime: '9:00 PM', 
        },
      ],
    }, 
    {
      id:2,
      title:'Extraordinary Experiece tour',
      status:'refused',
      meetingPoint:'Al-baath University',
      startDate:'2024-08-13',
      endDate:'2024-08-13',
      meetingTime:'12:00 PM',
      totalTime:'10 Hours',
      price:'120$',
      numberOfSeats:'2',
      tourPoints: [
        {
          id: 1, 
          name: "Engineers_Doctors_Club", 
          lat: 34.7207443, 
          lng: 36.7173883, 
          url: '/make-special-tour/presenter-offers', 
          size: 120, 
          select: true, 
          status: 'accept', 
          position: 'Engineers_Doctors_Club', 
          requirement:[{title:"Swimming suit"},{title:"shoes"}],
          activity:[{title:'Eat'},{title:'swim'}],
          arrivalTime: '12:30 AM',
           leavingTime: '05:00 PM', 
        },
        {
          id: 2,
          name: "AlSaah Cafe and Restaurant", 
          lat: 34.776043258519174, 
          lng: 36.6026282253172, 
          url: '/make-special-tour/presenter-offers', 
          size: 60, 
          select: true, 
          status: 'wait', 
          position: 'AlSaah Cafe and Restaurant', 
          requirement:[{title:"Money"},{title:"Jacket"}],
          activity:[{title:'Eat'},{title:'Relax'}],
          arrivalTime: '6:00 PM', 
          leavingTime: '10:00 PM', 
        },
      ],
    },
  
  ],

  tours: [{
    sn: 1,
    orgnizerId: 2,
    id: 11,
    title: 'Discover The World tour',
    startDate: '2024-05-05', startTime: '2:20 A.M',
    totalCost: 500,
    seatCost: 15,
    numOfSeat: 150,
    posted: false,
    status: true,
    clientRequest: [],
    likeCounter: 400,
    disLikeCounter: 200,
    comments: [{ id: 1, comment: 'Great post!', feelings: '', clientId: '' }, { id: 2, comment: 'I really enjoyed this.', feelings: '', clientId: '' }, { id: 3, comment: 'Interesting perspective.', feelings: '', clientId: '' }],
    description: `Join us on an immersive dining experience as we take you on a tour of some of the best restaurants in the city. Over the course of 3-4 hours, you'll visit 4-5 carefully curated establishments, sampling signature dishes and learning about the unique culinary concepts and histories behind each one.The tour begins at a classic bistro known for its fresh, locally-sourced ingredients and French-inspired fare. You'll start with a tasting of the restaurant's renowned house-made charcuterie and a glass of crisp white wine.
Next, we'll head to a family-owned Italian trattoria tucked away on a quiet side street. Here you'll savor a regional pasta dish and a seasonal salad while the chef shares insights into their time-honored recipes and techniques.
 `,
    usersLike: [12, 13, 22, 33, 1],
    usersDislike: [2, 3, 4, 5]
  },

  {
    sn: 2,
    id: 22,
    orgnizerId: 3,
    title: 'Summer Weekend',
    startDate: '2024-06-01', startTime: '6:00 A.M',
    totalCost: 400,
    seatCost: 10,
    numOfSeat: 200,
    posted: true,
    status: true,
    clientRequest: [{ numOfSeat: 3, status: 'accept' }, { numOfSeat: 5, status: 'accept' }, { numOfSeat: 5, status: 'wait' }, { numOfSeat: 2, status: 'refuse' },]
    ,
    likeCounter: 450,
    disLikeCounter: 50,
    comments: [],
    description: `Join us on an immersive dining experience as we take you on a tour of some of the best restaurants in the city. Over the course of 3-4 hours, you'll visit 4-5 carefully curated establishments, sampling signature dishes and learning about the unique culinary concepts and histories behind each one.The tour begins at a classic bistro known for its fresh, locally-sourced ingredients and French-inspired fare. You'll start with a tasting of the restaurant's renowned house-made charcuterie and a glass of crisp white wine.
Next, we'll head to a family-owned Italian trattoria tucked away on a quiet side street. Here you'll savor a regional pasta dish and a seasonal salad while the chef shares insights into their time-honored recipes and techniques.
 `,
    usersLike: [12, 13, 22, 33],
    usersDislike: [2, 3, 4, 5, 9]
  },
  {
    sn: 3,
    id: 23,
    orgnizerId: 2,
    title: 'Mountains and Rivers tour',
    startDate: '2024-09-19', startTime: '8:30 A.M',
    totalCost: 350,
    seatCost: 10,
    numOfSeat: 100,
    posted: false,
    status: false,
    clientRequest: [],
    likeCounter: 300,
    disLikeCounter: 100,
    comments: [],
    description: `Join us on an immersive dining experience as we take you on a tour of some of the best restaurants in the city. Over the course of 3-4 hours, you'll visit 4-5 carefully curated establishments, sampling signature dishes and learning about the unique culinary concepts and histories behind each one.The tour begins at a classic bistro known for its fresh, locally-sourced ingredients and French-inspired fare. You'll start with a tasting of the restaurant's renowned house-made charcuterie and a glass of crisp white wine.
Next, we'll head to a family-owned Italian trattoria tucked away on a quiet side street. Here you'll savor a regional pasta dish and a seasonal salad while the chef shares insights into their time-honored recipes and techniques.
 `,
    usersLike: [12, 13, 22, 33],
    usersDislike: [2, 3, 4, 5, 1]
  },],
  selected: {
    orgnizerId: 2,
    tourId: 11
  },

};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    cancelTour: (state, action) => {
      state.clientTours = state.clientTours.filter(tour => tour.id !== action.payload.id);
    },
    setNumberOfSeats: (state,action) =>{
      state.clientRequest= [...state.clientRequest,
        { id: '2', numOfSeat: action.payload, status: 'accept', clientId: '5', client: { name: '', lastName: '', mobile: '' } }
      ]
     },
    selecteOrgnizerId: (state, action) => {
      state.selected.orgnizerId = action.payload;
    },
    selecteTourId: (state, action) => {
      state.selected.tourId = action.payload;
    },
    addComment: (state, action) => {
      const tour = state.tours.filter(tour => tour.id == action.payload.tourId)
      var comments = tour[0].comments
      comments = [...comments, { id: Math.random().toString(36).substring(2, 10), comment: action.payload.comment, clientId: state.id }]
      tour[0].comments = comments
      //call api for comments we have in action tour id and comment and we use from here client id
    },

    registerUser: (state, action) => { 
      state.name = action.payload.user.name;
      state.middleName = action.payload.user.middleName;
      state.lastName = action.payload.user.lastName;
      state.mobile = action.payload.user.mobile;
      state.birthday = action.payload.user.birthday;
      state.gender = action.payload.user.gender;
    },
    editRegisterInfo: (state, action) => {
      state.name = action.payload.clientInfo.name;
      state.lastName = action.payload.clientInfo.lastName;
      state.mobile = action.payload.clientInfo.mobile;
      state.birthday = action.payload.clientInfo.birthday;
    },
    likeTour:(state,action)=>{
      //call api for like sent clientId & tourId
    },
    unlikeTour:(state,action)=>{
      //call api for unlike sent clientId & tourId
    },
    disLikeTour:(state,action)=>{
      //call api for dislike sent clientId & tourId
    },
    undisLikeTour:(state,action)=>{
      //call api for undislike sent clientId & tourId
    },
    
  },
});

export const {cancelTour, setNumberOfSeats,selecteOrgnizerId, selecteTourId, addComment, registerUser, likeTour,unlikeTour,disLikeTour,undisLikeTour,editRegisterInfo } = clientSlice.actions

export default clientSlice.reducer;