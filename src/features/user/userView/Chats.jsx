import { useNavigate } from "react-router-dom";
import SmallHeader from "../../layout/SmallHeader"
import SearchIcon from "../../../assets/images/searchIcon.png"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import backButton from '../../../assets/images/backButton.svg';
import { allUsers } from "../../../assets/data/tempData";
import { useState } from "react";
import { startChat } from "../userSlice";

function Chats(){ 
    const user = useSelector(state => state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const allUser=allUsers.filter(users=>users.id!=user.login.data.id)
    const [text,setText]=useState('')
    const [users,setUsers]=useState(allUser)

    const moveChats=(id)=>{
        dispatch(startChat(id))
        navigate('/chats/chat-page')
    }

     //to make filter on users depend on user name
    const search=()=>{
        var selectedUser = allUser.filter(user=>text!=''? user.name.toLowerCase().includes(text)?user:null:user)
        setUsers(selectedUser)
    }

    const handleBack = () => {
        var id= user.login.data.roleId
        if(id==1)
        navigate("/user-home-page");
    else if(id==2)
        navigate('/orgnizer-home')
    else
    navigate('/presenter-home-page')
    };

    return(
        <div className="flex flex-col ">
            <SmallHeader/>
            <div className="flex flex-row w-3/4 justify-start items-center space-x-20  overflow-hidden hover:overflow-x-auto
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
                <img
                    src={backButton}
                    onClick={handleBack}
                    alt="Back"
                    className="cursor-pointer 
            xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
                />
               <input type="search" onChange={(e)=>{setText(e.target.value.toLowerCase())}}
                                    className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-64
                            lg:rounded-lg lg:text-lg  lg:h-9 lg:w-60
                            md:rounded-md md:text-base md:h-8 md:w-48" />
                               <img src={SearchIcon} onClick={search}
                                className="hover:cursor-pointer  hover:drop-shadow-[1px_1px_rgba(117,135,142)]"/>
                </div>
                <div className="flex flex-row w-3/4 justify-start items-center space-x-12  overflow-hidden hover:overflow-x-auto
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
            {users.map(user=>{return(
                <div key={user.id} className="flex flex-col">
                    <div className="flex flex-row items-center space-x-5">
                        <img src={user.image} className="w-24 h-24 rounded-full hover:cursor-pointer" onClick={()=>moveChats(user.id)}/>
                        <span className=" xl:text-2xl lg:text-xl md:text-lg w-40 text-text-light font-['sans-serif'] ">
                                        {user.name}
                        </span>
                    </div>
                </div> 
              )})}
            </div>
            <div className="flex flex-row justify-center items-center p-10 ">
                <div className="flex flex-col items-start justify-start w-4/5 h-screen space-y-5  bg-opacity-15   drop-shadow-[1px_1px_rgba(117,135,142)] 
                rounded-2xl overflow-hidden hover:overflow-y-auto p-10  bg-clientbg-light">
                    {
                        user.chats.filter(chat=>chat.reciverData.id==user.login.data.id || chat.senderData.id==user.login.data.id ).map(chat=>{return(
                            <div className="flex flex-row items-center rounded-lg w-1/2 p-3 xl:text-2xl lg:text-xl md:text-lg text-text-light font-['sans-serif'] bg-post-bg-light 
                            space-x-6 hover:cursor-pointer"
                            onClick={()=>moveChats(chat.senderData.id)}>
                                 <img src={chat.senderData.image} className="w-16 h-16 rounded-full"/>
                                 <span className="flex flex-col">   {chat.senderData.senderName}</span>
                                 {   chat.msg.filter(m=>m.status=='UNR'&&m.type=='R').length>0&&
                                 <span className="text-delete-button-hover-light border-solid border-2 p-1 px-3 h-fit border-delete-button-hover-light rounded-full">{
                                    chat.msg.filter(m=>m.status=='UNR'&&m.type=='R').length
                                    }</span>
                                }
                            </div>
                        )})
                    }
                    </div>
                    </div>
        </div>
    )
}

export default Chats