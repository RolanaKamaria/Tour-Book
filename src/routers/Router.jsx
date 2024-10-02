// this for configure all routers in the website
import { Route, Routes } from "react-router-dom"
import MakeSpecialTour from "../features/orgnizer/orgnizerView/MakeSpecialTour"
import AddNewPlace from "../features/orgnizer/orgnizerView/AddNewPlace"
import TourConfirm from "../features/orgnizer/orgnizerView/TourConfirm"
import OrgnizerForgetPassword from "../features/orgnizer/orgnizerView/OrgnizerForgetPassword"
import OrgnizerNewPassword from "../features/orgnizer/orgnizerView/OrgnizerNewPassword"
import OrgnizerReport from "../features/orgnizer/orgnizerView/OrgnizerReport"
import OrgnizerResetPassword from "../features/orgnizer/orgnizerView/OrgnizerResetPassword"
import MyTour from "../features/orgnizer/orgnizerView/MyTour"
import OrgnizerHomePage from "../features/orgnizer/orgnizerView/OrgnizerHomePage"
import OrgnizerNotifications from "../features/orgnizer/orgnizerView/OrgnizerNotifications"
import OrgnizerSettings from "../features/orgnizer/orgnizerView/OrgnizerSettings"
import PresenterPage from "../features/orgnizer/orgnizerView/PresenterPage"
import TourManager from "../features/orgnizer/orgnizerView/TourManager"
import News from "../features/orgnizer/orgnizerView/News"
import TourItenrary from "../features/orgnizer/orgnizerView/TourItenrary"
import ChooseOffer from "../features/orgnizer/orgnizerView/ChooseOffer"
import EditTour from "../features/orgnizer/orgnizerView/EditTour"
import TourDetails from "../features/orgnizer/orgnizerView/TourDetails"
import TourPost from "../features/orgnizer/orgnizerView/TourPost"
import Offers from "../features/orgnizer/orgnizerView/Offers"
import Weather from "../features/orgnizer/orgnizerView/Weather"
import OrgnizerOfferDetails from "../features/orgnizer/orgnizerView/OrgnizerOfferDetails"
import OrgnizerStatus from "../features/orgnizer/orgnizerView/OrgnizerStatus"
import PresenterHome from "../features/presenter/presenterView/PresenterHome"
import PresenterProfile from "../features/presenter/presenterView/PresenterProfile"
import PresenterEditOffer from "../features/presenter/presenterView/PresenterEditOffer"
import PresenterOrders from "../features/presenter/presenterView/PresenterOrders"
import PresenterSettings from "../features/presenter/presenterView/PresenterSettings"
import OfferDetails from "../features/presenter/presenterView/OfferDetails"
import PresenterNewOffer from "../features/presenter/presenterView/PresenterNewOffer"
import PresenterReport from "../features/presenter/presenterView/PresenterReport"
import PresenterNewPassword from "../features/presenter/presenterView/PresenterNewPassword"
import PresenterResetPassword from "../features/presenter/presenterView/PresenterResetPassword"
import PresenterForgetPassword from "../features/presenter/presenterView/PresenterForgetPassword"
import UserLogin from "../features/user/userView/UserLogin"
import MainPage from "../features/user/userView/MainPage"
import CreateAccount from "../features/client/clientView/CreateAccount"
import UserHomePage from "../features/client/clientView/ClientHomePage"
import SuccessfulRegister from "../features/user/userView/SuccessfulRegister"
import Activate from "../features/user/userView/Activate"
import OrgnizerTours from "../features/client/clientView/OrgnizerTours"
import ClientNewPassword from "../features/client/clientView/ClientNewPassword"
import ClientForgetPassword from "../features/client/clientView/ClientForgetPassword"
import ClientResetPassword from "../features/client/clientView/ClientResetPassword"
import ClientReport from "../features/client/clientView/ClientReport"
import ClientTourDetails from "../features/client/clientView/ClientTourDetails"
import Register from "../features/client/clientView/Register"
import ClientInvite from "../features/client/clientView/ClientInvite"
import ClientProfile from '../features/client/clientView/ClientProfile'
import ClientTours from '../features/client/clientView/ClientTours'
import ClientNotification from '../features/client/clientView/ClientNotification'
import ChatPage from "../features/user/userView/ChatPage"
import Chats from "../features/user/userView/Chats"
export const Router=()=>{
return(
    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/make-special-tour/add-new-place" element={<AddNewPlace/>}/>
        <Route  path="/make-special-tour" element={<MakeSpecialTour/>}/>
        <Route path="/my-tour" element={<MyTour/>}/>
        <Route path="/orgnizer/forget-password" element={<OrgnizerForgetPassword/>}/>
        <Route path="/orgnizer-home" element={<OrgnizerHomePage/>}/>
        <Route path="/orgnizer/new-password" element={<OrgnizerNewPassword/>}/>
        <Route path="/orgnizer-notification" element={<OrgnizerNotifications/>}/>
        <Route path="/orgnizer/report" element={<OrgnizerReport/>}/>
        <Route path="/make-special-tour/confirm-tour" element={<TourConfirm/>}/>
        <Route path="/orgnizer/reset-password" element={<OrgnizerResetPassword/>}/>
        <Route path="/orgnizer-settings" element={<OrgnizerSettings/>}/>
        <Route path="/make-special-tour/choose-position/presenter-page" element={<PresenterPage/>}/>
        <Route path="/make-special-tour/edit-itenrary/confirm" element={<TourConfirm/>}/>
        <Route path="/my-tour/requests" element={<TourManager/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/make-special-tour/edit-itenrary" element={<TourItenrary/>}/>
        <Route path="/make-special-tour/presenter-offers" element={<ChooseOffer/>}/>
        <Route path="/my-tour/edit" element={<EditTour/>}/> 
        <Route path="/my-tour/details" element={<TourDetails/>}/>
        <Route path="/my-tour/post" element={<TourPost/>}/>
        <Route path="/presenter-home-page" element={<PresenterHome/>}/>
        <Route path="/presenter-home-page/presenter-profile" element={<PresenterProfile/>}/>
        <Route path="/presenter-home-page/presenter-new-offer" element={<PresenterNewOffer/>}/>
        <Route path="/presenter-home-page/presenter-edit-offer" element={<PresenterEditOffer/>}/>
        <Route path="/presenter-home-page/presenter-settings" element={<PresenterSettings/>}/>
        <Route path="/presenter-home-page/presenter-orders" element={<PresenterOrders/>}/>
        <Route path="/presenter-home-page/presenter-offer-details" element={<OfferDetails/>}/>
        <Route path="/presenter/presenter-report" element={<PresenterReport/>}/>
        <Route path="/presenter/presenter-forget-password" element={<PresenterForgetPassword/>}/>
        <Route path="/presenter/presenter-reset-password" element={<PresenterResetPassword/>}/>
        <Route path="/presenter/presenter-new-password" element={<PresenterNewPassword/>}/>
        <Route path="/orgnizer-offers" element={<Offers/>}/>
        <Route path="/orgnizer-weather" element={<Weather/>}/>
        <Route path="/orgnizer-offers/details" element={<OrgnizerOfferDetails/>}/>
        <Route path="/orgnizer-status" element={<OrgnizerStatus/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/create-account" element={<CreateAccount/>}/>
        <Route path="/register/done" element={<SuccessfulRegister/>}/>
        <Route path="/user-home-page" element={<UserHomePage/>}/>
        <Route path="/activate" element={<Activate/>}/>
        <Route path="/user-home/orgnizer-tours" element={<OrgnizerTours/>}/>
        <Route path="/password/reset/confirm/" element={<ClientNewPassword/>}/>
        <Route path="/client/client-forget-password" element={<ClientForgetPassword/>}/>
        <Route path="/client/client-reset-password" element={<ClientResetPassword/>}/>
        <Route path="/client/client-report" element={<ClientReport/>}/>
        <Route path="/client/client-tour-details" element={<ClientTourDetails/>}/>
        <Route path="/client/register" element={<Register/>}/>
        <Route path="/client/client-invite" element={<ClientInvite/>}/>
        <Route path="/client/client-profile" element={<ClientProfile/>}/>
        <Route path="/client/client-tours-requests" element={<ClientTours/>}/>
        <Route path="/client/client-notification" element={<ClientNotification/>}/>
        <Route path="/chats/chat-page" element={<ChatPage/>}/>
        <Route path="/chats" element={<Chats/>}/>
    </Routes>
   
)
}

