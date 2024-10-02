
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../app/config";
import res from "../../assets/images/restaurant1.png"
import Person from "../../assets/images/person.png"
const initialState = {
  id: 4,
  name: 'Almohtaref Company ',
  address: 'syria-homs',
  evaluation: '',
  status: '',
  logo: '',
  joiningDate: '2024-10-12',
  situation: '',
  mobile: '0992448443',
  userId: 1,
  tour: {
    id: 4,
    title: 'Tour Vip',
    startDate: '2024-07-07',
    startTime: '07:00 AM',
    endTime: '12:30 AM',
    endDate: '2024-07-08',
    extraCost: '',
    totalCost: '500',
    seatCost: '15',
    transportationCost: '',
    description: 'Al-Safir until 05/04/2024',
    numOfSeat: 150,
    note: 'you need swimming suit',
    startingPlace: 'Al Nouzha St',
    XstartingPlace: '',
    YstartingPlace: '',
    likeCounter: '',
    disLikeCounter: '',
    posted: false,
    postedAt: false,
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
        description: 'you need to bring your jacket', 
        arrivalTime: '2:00 PM', leavingTime: '4:00 PM', 
        offerRequest: { id: 88, arriveTime: '07:00 AM', leaveTime: '09:00 PM', quantity: '50', description: '', offerId: '1' },
        offers: [
          {
            id: 1,
            name: "Maa Zaher",
            title: "Special Lunch",
            startDate: "2024-05-05",
            endDate: "2024-05-30",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "15",
            description: "burger - pepsi",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            name: "Maa Zaher",
            title: "Sunday Vibe",
            startDate: "2024-08-12",
            endDate: "2024-08-12",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "25",
            description: "Crispy-Drink",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      },
      {
        id: 2,
        name: " Al-Safir Hotel",
        lat: 34.776043258519174, 
        lng: 36.6026282253172, 
        url: '/make-special-tour/presenter-offers', 
        size: 60, 
        select: true, 
        status: 'accept', 
        position: 'Al-Safir Hotel', 
        description: 'you need Bread and Drink', 
        arrivalTime: '6:00 PM', 
        leavingTime: '8:00 PM', 
        offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '50', description: '', offerId: '2' },
        offers: [
          {
            id: 1,
            name: "Al-Safir Hotel",
            title: "Offer of The Month",
            startDate: "2024-04-01",
            endDate: "2024-05-01",
            startTime: "2:00 P.M",
            endTime: "5:00 P.M",
            pricePerOne: "18",
            description: "Barbique- Cake",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            name: "Al-Safir Hotel",
            title: "VIP ",
            startDate: "2024-06-12",
            endDate: "2024-07-12",
            startTime: "10:00 A.M",
            endTime: "12:00 A.M",
            pricePerOne: "40",
            description: "Salmon-Drink",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      },
      {
        id: 3, 
        name: "ENGs_Doctors_Club", 
        lat: 34.71017331715748, 
        lng: 36.639553309802125, 
        url: '/make-special-tour/presenter-offers', 
        size: 20, 
        status: 'accept', 
        select: true, 
        position: 'ENGs_Doctors_Club', 
        description: 'you need to bring your Swim suit and Food', 
        arrivalTime: '1:00 PM', 
        leavingTime: '8:00 PM', 
        offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '50', description: '', offerId: '2' },
        offers: [
          {
            id: 1,
            name: "ENGs_Doctors_Club",
            title: "Friday Lunch",
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            startTime: "10:00 A.M",
            endTime: "7:00 P.M",
            pricePerOne: "20",
            description: "burger - Potato",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            name: "ENGs_Doctors_Club",
            title: "Sunday Break Time",
            startDate: "2024-08-10",
            endDate: "2024-08-15",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "6",
            description: "Cake - Pepsi",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      },
    ],
    tourAttachment: [{ id: '', attachment: '', type: '' }],
    clientRequest: [{ id: '', numOfSeat: '5', status: 'accept', clientId: '', client: { name: '', lastName: '', mobile: '' } }],
    comments: [{ id: '', comment: '', feelings: '', clientId: '' }],
    HMdistance: 0.3,
    KMdistance: 15.9
  },
  tours: [ {
    sn: 1,
    id: 4,
    title: 'Tour vip',
    startDate: '2024-07-07', startTime: '07:00 AM',
    totalCost: 100000,
    seatCost: 500,
    numOfSeat: 200,
    posted: true,
    status: true,
    clientRequest: [],
    likeCounter: 0,
    disLikeCounter: 0,
    comments: [ ],
    description: `Join us on an immersive dining experience as we take you on a tour of some of the best restaurants in the city. Over the course of 3-4 hours, you'll visit 4-5 carefully curated establishments, sampling signature dishes and learning about the unique culinary concepts and histories behind each one.The tour begins at a classic bistro known for its fresh, locally-sourced ingredients and French-inspired fare. You'll start with a tasting of the restaurant's renowned house-made charcuterie and a glass of crisp white wine.
  Next, we'll head to a family-owned Italian trattoria tucked away on a quiet side street. Here you'll savor a regional pasta dish and a seasonal salad while the chef shares insights into their time-honored recipes and techniques.
   `,
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
      description: 'you need to bring your jacket', 
      arrivalTime: '2:00 PM', leavingTime: '4:00 PM', 
      offerRequest: { id: 88, arriveTime: '07:00 AM', leaveTime: '09:00 PM', quantity: '50', description: '', offerId: '1' },
      offers: [
      {
          id: 2,
          name: "Maa Zaher",
          title: "Sunday Vibe",
          startDate: "2024-08-12",
          endDate: "2024-08-12",
          startTime: "2:00 P.M",
          endTime: "6:00 P.M",
          pricePerOne: "25",
          description: "Crispy-Drink",
          address: "Old-Homs",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        },
      ]
    },
    {
      id: 2,
      name: " Al-Safir Hotel",
      lat: 34.776043258519174, 
      lng: 36.6026282253172, 
      url: '/make-special-tour/presenter-offers', 
      size: 60, 
      select: true, 
      status: 'wait', 
      position: 'Al-Safir Hotel', 
      description: 'you need Bread and Drink', 
      arrivalTime: '6:00 PM', 
      leavingTime: '8:00 PM', 
      offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '50', description: '', offerId: '2' },
      offers: [
        {
          id: 1,
          name: "Al-Safir Hotel",
          title: "Offer of The Month",
          startDate: "2024-04-01",
          endDate: "2024-05-01",
          startTime: "2:00 P.M",
          endTime: "5:00 P.M",
          pricePerOne: "18",
          description: "Barbique- Cake",
          address: "Al-Inshaat",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        }
      ]
    },
    {
      id: 3, 
      name: "ENGs_Doctors_Club", 
      lat: 34.71017331715748, 
      lng: 36.639553309802125, 
      url: '/make-special-tour/presenter-offers', 
      size: 20, 
      status: 'refuse', 
      select: true, 
      position: 'ENGs_Doctors_Club', 
      description: 'you need to bring your Swim suit and Food', 
      arrivalTime: '1:00 PM', 
      leavingTime: '8:00 PM', 
      offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '50', description: '', offerId: '2' },
      offers: [
        {
          id: 1,
          name: "ENGs_Doctors_Club",
          title: "Friday Lunch",
          startDate: "2024-07-01",
          endDate: "2024-09-01",
          startTime: "10:00 A.M",
          endTime: "7:00 P.M",
          pricePerOne: "20",
          description: "burger - Potato",
          address: "Al-Waar",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        }
      ]
    },
    {
      id: 4, 
      name: "Cafe Firouze", 
      lat: 34.71426416344134, 
      lng: 36.71487891412124, 
      url: '/make-special-tour/presenter-offers', 
      size: 100, 
      status: 'refuse', 
      select: false, 
      position: 'Cafe Firouze', 
      description: 'Nothing you need. we need you', 
      arrivalTime: '1:00 PM', 
      leavingTime: '8:00 PM', 
      offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '50', description: '', offerId: '2' },
      offers: [
        {
          id: 1,
          name: "ENGs_Doctors_Club",
          title: "Friday Lunch",
          startDate: "2024-07-01",
          endDate: "2024-09-01",
          startTime: "10:00 A.M",
          endTime: "7:00 P.M",
          pricePerOne: "20",
          description: "burger - Potato",
          address: "Al-Waar",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        }
      ]
    },
    {id:10,
      name:"Mountain",
      url: '/make-special-tour/presenter-offers', 
      description:"sport shooze",
      arrivalTime:"2024-05-14",
      leavingTime:"2024-05-21",
      size:200,
      lat:34.72941290546218,
      lng:36.751739500905394,
      select:false,
      HMdistance:0,
      KMdistance:0,}
  ],
  },
    {
    sn: 2,
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
       description: 'you need to bring your snacks and bread', 
       arrivalTime: '9:00 AM',
       leavingTime: '12:00 PM', 
       offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
      offers: [
        {
          id: 1,
          title: "Special Lunch",
          startDate: "2024-05-05",
          endDate: "2024-05-30",
          startTime: "2:00 P.M",
          endTime: "6:00 P.M",
          pricePerOne: "15",
          description: "burger - pepsi",
          address: "Old-Homs",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
          requierment:['Shoes','Jacket'],
          activity:['Eat','Relax']
        }, {
          id: 2,
          title: "Sunday Vibe",
          startDate: "2024-08-12",
          endDate: "2024-08-12",
          startTime: "2:00 P.M",
          endTime: "6:00 P.M",
          pricePerOne: "25",
          description: "Crispy-Drink",
          address: "Old-Homs",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
          requierment:['Shoes','Jacket'],
          activity:['Eat','Relax']
        },
      ]
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
      description: 'you need to bring your Swim suit and Food', 
      arrivalTime: '1:00 PM', 
      leavingTime: '7:00 PM', 
       offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
      offers: [
        {
          id: 1,
          title: "Offer of The Month",
          startDate: "2024-04-01",
          endDate: "2024-05-01",
          startTime: "2:00 P.M",
          endTime: "5:00 P.M",
          pricePerOne: "18",
          description: "Barbique- Cake",
          address: "Al-Inshaat",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        }, {
          id: 2,
          title: "VIP ",
          startDate: "2024-06-12",
          endDate: "2024-07-12",
          startTime: "10:00 A.M",
          endTime: "12:00 A.M",
          pricePerOne: "40",
          description: "Salmon-Drink",
          address: "Al-Inshaat",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        },
      ]
    },
    {
      id: 3, 
      name: "ENGs_Doctors_Club", 
      lat: 34.71017331715748, 
      lng: 36.639553309802125, 
      url: '/make-special-tour/presenter-offers', 
      size: 20, 
      status: 'refuse', 
      select: false, 
      position: 'ENGs_Doctors_Club', 
       description: 'you need to bring your Jacket and your Water bottle', 
       arrivalTime: '8:00 PM', 
       leavingTime: '10:00 PM',
       offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
      offers: [
        {
          id: 1,
          title: "Friday Lunch",
          startDate: "2024-07-01",
          endDate: "2024-09-01",
          startTime: "10:00 A.M",
          endTime: "7:00 P.M",
          pricePerOne: "20",
          description: "burger - Potato",
          address: "Al-Waar",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        }, {
          id: 2,
          title: "Sunday Break Time",
          startDate: "2024-08-10",
          endDate: "2024-08-15",
          startTime: "2:00 P.M",
          endTime: "6:00 P.M",
          pricePerOne: "6",
          description: "Cake - Pepsi",
          address: "Al-Waar",
          offerAttatchment: [{ id: '', attachment: '', type: '' }],
        },
      ]
    }
  ],
  },
  {
    sn: 3,
    id: 22,
    title: 'Summer Weekend',
    startDate: '2024-06-01', startTime: '6:00 A.M',
    totalCost: 400,
    seatCost: 10,
    numOfSeat: 200,
    posted: true,
    status: true,
    clientRequest: [{ numOfSeat: 3, status: 'accept' }, { numOfSeat: 5, status: 'accept' }, { numOfSeat: 5, status: 'wait' }, { numOfSeat: 2, status: 'refuse' },],
    likeCounter: 450,
    disLikeCounter: 50,
    comments: [],
    description: 'Spring is Comming',
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
         description: 'you need to bring your snacks and bread', 
         arrivalTime: '9:00 AM',
         leavingTime: '12:00 PM', 
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Special Lunch",
            startDate: "2024-05-05",
            endDate: "2024-05-30",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "15",
            description: "burger - pepsi",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
            requierment:['Shoes','Jacket'],
            activity:['Eat','Relax']
          }, {
            id: 2,
            title: "Sunday Vibe",
            startDate: "2024-08-12",
            endDate: "2024-08-12",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "25",
            description: "Crispy-Drink",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
            requierment:['Shoes','Jacket'],
            activity:['Eat','Relax']
          },
        ]
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
        description: 'you need to bring your Swim suit and Food', 
        arrivalTime: '1:00 PM', 
        leavingTime: '7:00 PM', 
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Offer of The Month",
            startDate: "2024-04-01",
            endDate: "2024-05-01",
            startTime: "2:00 P.M",
            endTime: "5:00 P.M",
            pricePerOne: "18",
            description: "Barbique- Cake",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            title: "VIP ",
            startDate: "2024-06-12",
            endDate: "2024-07-12",
            startTime: "10:00 A.M",
            endTime: "12:00 A.M",
            pricePerOne: "40",
            description: "Salmon-Drink",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      },
      {
        id: 3, 
        name: "ENGs_Doctors_Club", 
        lat: 34.71017331715748, 
        lng: 36.639553309802125, 
        url: '/make-special-tour/presenter-offers', 
        size: 20, 
        status: 'refuse', 
        select: false, 
        position: 'ENGs_Doctors_Club', 
         description: 'you need to bring your Jacket and your Water bottle', 
         arrivalTime: '8:00 PM', 
         leavingTime: '10:00 PM',
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Friday Lunch",
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            startTime: "10:00 A.M",
            endTime: "7:00 P.M",
            pricePerOne: "20",
            description: "burger - Potato",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            title: "Sunday Break Time",
            startDate: "2024-08-10",
            endDate: "2024-08-15",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "6",
            description: "Cake - Pepsi",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      }
    ],
  },
  {
    sn: 4,
    id: 23,
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
    description: "Spring is Comming",
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
         description: 'you need to bring your snacks and bread', 
         arrivalTime: '9:00 AM',
         leavingTime: '12:00 PM', 
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Special Lunch",
            startDate: "2024-05-05",
            endDate: "2024-05-30",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "15",
            description: "burger - pepsi",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
            requierment:['Shoes','Jacket'],
            activity:['Eat','Relax']
          }, {
            id: 2,
            title: "Sunday Vibe",
            startDate: "2024-08-12",
            endDate: "2024-08-12",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "25",
            description: "Crispy-Drink",
            address: "Old-Homs",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
            requierment:['Shoes','Jacket'],
            activity:['Eat','Relax']
          },
        ]
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
        description: 'you need to bring your Swim suit and Food', 
        arrivalTime: '1:00 PM', 
        leavingTime: '7:00 PM', 
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Offer of The Month",
            startDate: "2024-04-01",
            endDate: "2024-05-01",
            startTime: "2:00 P.M",
            endTime: "5:00 P.M",
            pricePerOne: "18",
            description: "Barbique- Cake",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            title: "VIP ",
            startDate: "2024-06-12",
            endDate: "2024-07-12",
            startTime: "10:00 A.M",
            endTime: "12:00 A.M",
            pricePerOne: "40",
            description: "Salmon-Drink",
            address: "Al-Inshaat",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      },
      {
        id: 3, 
        name: "ENGs_Doctors_Club", 
        lat: 34.71017331715748, 
        lng: 36.639553309802125, 
        url: '/make-special-tour/presenter-offers', 
        size: 20, 
        status: 'refuse', 
        select: false, 
        position: 'ENGs_Doctors_Club', 
         description: 'you need to bring your Jacket and your Water bottle', 
         arrivalTime: '8:00 PM', 
         leavingTime: '10:00 PM',
         offerRequest: { id: '', arriveTime: '', leaveTime: '', quantity: '', description: '', offerId: '' },
        offers: [
          {
            id: 1,
            title: "Friday Lunch",
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            startTime: "10:00 A.M",
            endTime: "7:00 P.M",
            pricePerOne: "20",
            description: "burger - Potato",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          }, {
            id: 2,
            title: "Sunday Break Time",
            startDate: "2024-08-10",
            endDate: "2024-08-15",
            startTime: "2:00 P.M",
            endTime: "6:00 P.M",
            pricePerOne: "6",
            description: "Cake - Pepsi",
            address: "Al-Waar",
            offerAttatchment: [{ id: '', attachment: '', type: '' }],
          },
        ]
      }
    ],
  },],
  presrnterData: [{
    name: 'Maa Zaher',
    id: 1,
    axisX: 34.71017331715748,
    axisY: 36.639553309802125,
    size: 500,
    email: 'maa-zaher2010@gmail.com',
    website: 'MAA_ZAHER',
    image:res,
    phone: '0992448443',
    attachments: ['E:/IT/React/Folder/tour-book/src/assets/images/restaurant3.png', 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant1.png', 'E:/IT/React/Folder/tour-book/src/assets/images/restaurant2.png'],
    services: ['Resturant', 'Pool', 'Hotel']
  }],
  allTours: [{
    sn: 1,
    id: 11,
    title: 'Mountains and Rivers tour',
    startDate: '2024-08-08', startTime: '2:20 A.M',
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
   `
  },
  {
    sn: 2,
    id: 22,
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
    description: 'Spring is Comming'
  },
  {
    sn: 3,
    id: 23,
    title: 'Visit The World With Us',
    startDate: '2024-03-04', startTime: '8:30 A.M',
    totalCost: 350,
    seatCost: 10,
    numOfSeat: 100,
    posted: false,
    status: false,
    clientRequest: [],
    likeCounter: 300,
    disLikeCounter: 100,
    comments: [],
    description: "Visit The World With Us"
  },],
  offers: [
{
      id: 1,
      name: "Maa Zaher",
      title: "Special Lunch",
      image:res,
      serviceId: 1,
      startDate: "2024-05-05",
      endDate: "2024-05-30",
      startTime: "2:00 P.M",
      endTime: "6:00 P.M",
      pricePerOne: "15",
      description: "burger - pepsi",
      address: "Old-Homs",
      offerAttatchment: [{ id: '', attachment: '', type: '' }],
    }, {
      id: 2,
      name: "ENGs_Doctors_Club",
      title: "Sunday Break Time",
      image:Person,
      serviceId: 2,
      startDate: "2024-08-10",
      endDate: "2024-08-15",
      startTime: "2:00 P.M",
      endTime: "6:00 P.M",
      pricePerOne: "6",
      description: "Cake - Pepsi",
      address: "Al-Waar",
      offerAttatchment: [{ id: '', attachment: '', type: '' }],
    }, {
      id: 3,
      name: "Magic",
      title: "VIP ",
      image:Person,
      serviceId: 3,
      startDate: "2024-06-12",
      endDate: "2024-07-12",
      startTime: "10:00 A.M",
      endTime: "12:00 A.M",
      pricePerOne: "40",
      description: "Salmon-Drink",
      address: "Al-Inshaat",
      offerAttatchment: [{ id: '', attachment: '', type: '' }],
    }],
  selected: {
    presenterId: 1,
    offerId: 1,
  },
  status: {
    toursPerMonth: [
      { month: 'Jun', count: 0, porfit: 0 }, { month: 'Feb', count: 2, porfit: 0.25 }, { month: 'Mars', count: 4, porfit: 0.44 }, { month: 'Apr', count: 2, porfit: 0.22 }, { month: 'May', count: 4, porfit: 0.44 }, { month: 'Aug', count: 2, porfit: 0.5 }, { month: 'Sept', count: 6, porfit: 0.6 }],
    orgnizerTourRating: 78.5,
  },
  advertisers:[],
  selectOffers:[]
};

const orgnizerSlice = createSlice({
  name: "orgnizer",
  initialState,
  reducers: {
    addPoint: (state, action) => {
      state.tour.tourPoints = [...state.tour.tourPoints, action.payload];
    },
    setFinalTourDetails: (state, action) => {
      state.tour.startDate = action.payload.startDate
      state.tour.extraCost = action.payload.externalCost
      state.tour.totalCost = action.payload.totalCost
      state.tour.seatCost = action.payload.seatPrice
      state.tour.transportationCost = action.payload.transportCost
      state.tour.numOfSeat = action.payload.numOfSeat
      state.tour.note = action.payload.notes
      state.tour.startTime = action.payload.startTime
    },
    setFirstTourDetails: (state, action) => {
      state.tour.title = action.payload.title
      state.tour.KMdistance = action.payload.KMdistance
      state.tour.HMdistance = action.payload.HMdistance
    },
    changeOrderStatus: (state, action) => {
      state.tour.clientRequest[id == action.payload.id].status = action.payload.status
    },
    updateTour: (state, action) => {
      if (state.tour.id != action.payload) {
        var tour = state.tours.filter(tour => tour.id == action.payload)
        state.tour = tour[0]
      }
    },
    deleteTour: (state, action) => {
      state.tours = state.tours.filter(tour => tour.id != action.payload)
      //delete tour api
    },
    deleteComment: (state, action) => {
      var tour = state.tours.filter(tour => tour.id == action.payload.tourId)
      console.log(action.payload)
      tour[0].comments = tour[0].comments.filter(comment => comment.id != action.payload.id)
      //delete comment api
    },
    updateOrgnizerData: (state, action) => {
      state.name = action.payload.name
      state.mobile = action.payload.phoneNumber

    },
    setTourPoint: (state, action) => {
      state.tour.tourPoints = action.payload
    },
    selecteItem: (state, action) => {
      state.selected.presenterId = action.payload.presenterId;
    },
    selectOffer: (state, action) => {
      //api to create offer
      state.tour.tourPoints.filter(tourPoint => tourPoint.id == action.payload.tourPoint)[0].offerRequest = action.payload.offer
      state.tour.tourPoints.filter(tourPoint => tourPoint.id == action.payload.tourPoint)[0].select = true

    },
    editTour: (state, action) => {
      //api for edit
      state.tour.title = action.payload.tour.title
      state.tour.totalCost = action.payload.tour.cost
      state.tour.seatCost = action.payload.tour.seatPrice
      state.tour.startDate = action.payload.tour.startDate
      state.tour.endDate = action.payload.tour.endDate
      state.tour.startTime = action.payload.tour.startTime
      state.tour.endTime = action.payload.tour.endTime
      state.tour.description = action.payload.tour.reservation
      state.tour.note = action.payload.tour.note
      state.tour.tourAttachment = action.payload.tour.images
    },
    editPost: (state, action) => {
      //api for edit
      state.tour.title = action.payload.tour.title
      state.tour.description = action.payload.tour.reservation
      state.tour.note = action.payload.tour.note
      state.tour.tourAttachment = action.payload.tour.images
    },
    editTourPointRequirment: (state, action) => {
      //api for edit requirments
      state.tour.tourPoints.filter(point => point.id == action.payload.point.id)[0] = action.payload.point
    },
    selecteOfferId: (state, action) => {
      state.selected.offerId = action.payload;
    },
    getOrgnizerTours:async(state,action)=>{
      var accessToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjE0MTIyLCJpYXQiOjE3MjMxMjc3MjIsImp0aSI6IjM5MTJlZWQwNjBlNTQ2Y2U4MzlmYWQ0NjhlZDUyZDE0IiwidXNlcl9pZCI6Nn0.afFpupFnhqdLQ0XQKfbs3OerDpmJlaMZdaSHcQgm3nQ";
    // accessToken = localStorage.getItem('accessToken');

      const response = await axios.get(`${API_URL}/api/tours/organizer-tours?page=`+action.payload, { 
      headers: {
      Authorization: `JWT ${accessToken}`,
    }
  }).then((response) => {
    console.log(response.data)
    //state.tours=response.data.data
    }).catch((err)=>{
      console.log(err.message)
    })
    },
  }
});

export const { addPoint, setFinalTourDetails, setFirstTourDetails, changeOrderStatus,
  updateTour, deleteTour, updateOrgnizerData, deleteComment, setTourPoint, selecteItem,
  editTour, selectOffer, editPost, editTourPointRequirment, selecteOfferId,
  getOrgnizerTours } = orgnizerSlice.actions
export default orgnizerSlice.reducer;