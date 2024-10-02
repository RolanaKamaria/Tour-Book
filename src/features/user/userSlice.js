import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { updateOrgnizerData } from "../orgnizer/orgnizerSlice";
import { API_URL, CONFIG } from "../../app/config";
import Rolana from "../../assets/images/nan.jpg"
import Nisreen from "../../assets/images/Ns.jpg"
import Takla from "../../assets/images/T.jpg"
import { select } from "@material-tailwind/react";
const initialState = {
  id:null,
  token:null,
  login: {
    loading: '',
    data: {
      id: 1,
      name:'Khaled Yousef',
      userName: 'orgnaizer',
      password: 'P@#5nO0sd',
      roleId: 2,
      confirmPassword: 'P@#5nO0sd',
      avatar: 'C:/Users/User/Desktop/Tour Book/tour-book/src/assets/images/person.png',
      status: 'active',
      email: '',
      phone:"0992448443"

    },
    rejected:false,
    error: ''
  },
  notifications: [
  ],
  subscriptionDetails: {
    id: '88',
    startDate: '2024-08-16',
    endDate: '2024-08-19',
    payment: '50$'
  },
  tours:[ {  
    sn:1,
    id: 11,
    title: 'Mountains and Rivers tour',
    startDate: '2024-06-06', startTime: '2:20 A.M',
    totalCost: 500,
    seatCost: 15,
    numOfSeat: 150,
    posted:false,
    status:true,
    clientRequest: [],
    likeCounter:400,
    disLikeCounter:200,
    comments:[{id:1,comment:'Great post!',feelings:'',clientId:''},{id:2,comment:'I really enjoyed this.',feelings:'',clientId:''},{id:3,comment:'Interesting perspective.',feelings:'',clientId:''}],
    description:`Join us on an immersive dining experience as we take you on a tour of some of the best restaurants in the city. Over the course of 3-4 hours, you'll visit 4-5 carefully curated establishments, sampling signature dishes and learning about the unique culinary concepts and histories behind each one.The tour begins at a classic bistro known for its fresh, locally-sourced ingredients and French-inspired fare. You'll start with a tasting of the restaurant's renowned house-made charcuterie and a glass of crisp white wine.
    Next, we'll head to a family-owned Italian trattoria tucked away on a quiet side street. Here you'll savor a regional pasta dish and a seasonal salad while the chef shares insights into their time-honored recipes and techniques.
     `
  },
  {
    sn:2,
    id: 22,
    title: 'Summer Weekend',
    startDate: '2024-02-09', startTime: '6:00 A.M',
    totalCost: 400,
    seatCost: 10,
    numOfSeat: 200,
    posted:true,
    status:true,
    clientRequest: [{ numOfSeat: 3, status: 'accept' }, { numOfSeat: 5, status: 'accept' }, { numOfSeat: 5, status: 'wait' }, { numOfSeat: 2, status: 'refuse' },]
    ,
    likeCounter:450,
    disLikeCounter:50, 
    comments:[],
    description:'Spring is Comming'
  },],
  reports: { id: 4, reason: '', reportType: '', respondentUser: 'Maa Zaher',respondentEmail:'maa-zaher2010@gmail.com', complainantUser: '' },
  chats:[{
    id:1,
    senderData:{senderName:'Takla Zidan',roleId:1,image:Takla,id:1},
    reciverData:{reciverName:'Nisreen Melhem',roleId:2,image:Nisreen,id:2},
    msg:[
    {id:1,content:'Hello',time:'9:00 A.M',senderId:4,status:'R',type:'R'},
    {id:2,content:'How Are You?',time:'9:00 A.M',senderId:4,status:'R',type:'R'},
    {id:3,content:'I want to ask you how can i pay for last tour you orgnized?',time:'9:01 A.M',senderId:4,status:'R',type:'R'},
    {id:7,content:'Ok, thank u.',time:'9:30 A.M',senderId:4,status:'UNR',type:'R'},
    {id:4,content:'Hello',time:'9:10 A.M',senderId:4,status:'R',type:'S'},
    {id:5,content:'Yes, for sure.',time:'9:10 A.M',senderId:4,status:'R',type:'S'},
    {id:6,content:'I have an office in Al-Nuzhe street, I open from 10 A.M until 8 P.M',time:'9:11 A.M',senderId:4,status:'R',type:'S'},
  ]
},
{
  id:2,
  senderData:{senderName:'Nisreen Melhem',roleId:2,image:Nisreen,id:2},
  reciverData:{reciverName:'Takla Zidan',roleId:1,image:Takla,id:1},
  msg:[
  {id:1,content:'Hello',time:'9:00 A.M',senderId:4,status:'R',type:'S'},
  {id:2,content:'How Are You?',time:'9:00 A.M',senderId:4,status:'R',type:'S'},
  {id:3,content:'I want to ask you how can i pay for last tour you orgnized?',time:'9:01 A.M',senderId:4,status:'R',type:'S'},
  {id:7,content:'Ok, thank u.',time:'9:30 A.M',senderId:4,status:'UNR',type:'S'},
  {id:4,content:'Hello',time:'9:10 A.M',senderId:4,status:'R',type:'R'},
  {id:5,content:'Yes, for sure.',time:'9:10 A.M',senderId:4,status:'R',type:'R'},
  {id:6,content:'I have an office in Al-Nuzhe street, I open from 10 A.M until 8 P.M',time:'9:11 A.M',senderId:4,status:'R',type:'R'},
]
},
{
  id:3,
  senderData:{senderName:'Rolana Kamarie',roleId:3,image:Rolana,id:3},
  reciverData:{reciverName:'Nisreen Melhem',roleId:2,image:Nisreen,id:2},
  msg:[
  {id:1,content:'Hello',time:'10:00 P.M',senderId:4,status:'R',type:'R'},
  {id:3,content:'I want to ask you about this week offer, can i reserve 10 seats over the number specified in the offer?',time:'10:02 P.M',senderId:4,status:'R',type:'R'},
  {id:7,content:'Ok, thank u.',time:'10:30 P.M',senderId:4,status:'UNR',type:'R'},
  {id:4,content:'Hello',time:'10:10 P.M',senderId:4,status:'R',type:'S'},
  {id:5,content:'Yes, for sure.',time:'10:11 P.M',senderId:4,status:'R',type:'S'},
]
}
],
selected:{
  chatId:3,
}
};
  export const fetchUsers = createAsyncThunk("user/fetchUsers", async({username,password}) => {

  return axios.post(`${API_URL}/auth/jwt/create/`, {
    username:  username,
    password:password
  },CONFIG).then((res) => 
    {
      localStorage.setItem('accessToken', res.data.access);
      return fetchUserData( res.data.access)
    //return res.data.access;
     }
  )
 } )

 export const fetchUserData = async (token) => {
    
    const response = await axios.get(`${API_URL}/auth/users/me/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
   
    return response.data
  
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.login.data.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.login.data.password = action.payload;
    },
    setConfirmPassword:(state, action)=>{
      state.login.data.confirmPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.login.data.email = action.payload
    },
    setRespondentUser: (state, action) => {
      state.reports.respondentUser = action.payload
    },
    setRespondentEmail: (state, action) => {
      state.reports.respondentEmail = action.payload
    },
    setToken:(state,action)=>{
      state.id=action.payload.uid
      state.token=action.payload.token
    },
    setUserInformation: (state,action) => {
      state.login.data.email = action.payload.userInfo.email;
      state.login.data.userName = action.payload.userInfo.userName;
    },
    updateOrgnizerData: (state, action) => {
      state.login.data.email = action.payload.email;
      state.login.data.avatar = action.payload.image;
      state.login.data.userName = action.payload.userName;
    },
   sendMsg:(state,action)=>{
    var oldMsg=state.chats.filter(chat=> chat.id==state.selected.chatId)
    
    state.chats.filter(chat=> chat.id==state.selected.chatId).msg=[
        ...oldMsg[0],action.payload
    ]
   },
   deleteMsg:(state,action)=>{
    state.chats.filter(chat=> chat.id==state.selected.chatId).msg=
    state.chats.filter(chat=> chat.id==state.selected.chatId).msg.filter(m=>m.id!=action.payload)
   },
   readMsg:(state,action)=>{
    state.chats.filter(chat=>chat.id==state.selected.chatId)[0].msg.forEach(m=>{
      if(m.type=='R')
        m.status='R'
    })
   },
   startChat:(state,action)=>{
    var selectedId=state.chats.filter(chat=>chat.reciverData.id==action.payload)[0].id
    state.selected.chatId=selectedId
   },
   setRoleId:(state,action)=>{
    state.login.data.roleId=1
   }


  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.login.loading = true;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.login.loading = false;
      state.login.rejected = false;
      state.login.error = ""
      state.login.data.id=action.payload.id
      state.login.data.email=action.payload.email
      state.login.data.phone=action.payload.phone
      state.login.data.userName=action.payload.username
      state.login.data.avatar=action.payload.avatar
      state.token = localStorage.getItem('accessToken');
      if(action.payload.role=="AD")
        {  state.login.data.roleId=3}
      else if(action.payload.role=="C")
       { state.login.data.roleId=1}
      else
       { state.login.data.roleId=2}

   
      
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.login.loading = false;
      state.login.rejected = true;
      state.login.error = action.error.message;
   
    });

    builder.addCase(updateOrgnizerData, (state, action) => {
      state.login.data.email=action.payload.email
      state.login.data.avatar=action.payload.image
      state.login.data.userName=action.payload.userName
    });
   
  }
});

export const { setPassword, setEmail,setConfirmPassword, setRespondentEmail, setRespondentUser,setUserName,setToken,
   setUserInformation,sendMsg,deleteMsg,readMsg,startChat,setRoleId } = userSlice.actions


export default userSlice.reducer;