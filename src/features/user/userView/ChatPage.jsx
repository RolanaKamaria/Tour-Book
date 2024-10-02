import SmallHeader from "../../layout/SmallHeader"
import backButton from '../../../assets/images/backButton.svg';
import DeleteIcon from "../../../assets/images/deleteIcon.svg"
import SendIcon from "../../../assets/images/send.png"
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteMsg, readMsg, sendMsg } from "../userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function ChatPage() {
    const user = useSelector(state => state.user)
    const chat=user.chats.filter(chat=>chat.id==user.selected.chatId)
    const sortedChat= [...chat[0].msg].sort((a, b) => a.id - b.id);
    const [msg,setMsg]= useState(sortedChat)
    const [newMsg,setNewMsg]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handelSendMsg=()=>{
        // Get the current time
    const currentTime = new Date();

    // Extract the hour, minute, and second
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const time=hours>12?'P.M':'A.M'
    // Format the time as a string
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${time}`;

        var item={id:msg.length-1,content:newMsg,time:timeString,senderId:user.login.data.id,status:'UNR',type:'S'}
        setMsg([...msg,item])
        dispatch(sendMsg(item))
       
      }

    const handleDeleteMsg = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
          setMsg(msg.filter((m) => m.id !== id));
            dispatch(deleteMsg(id))
        }
      };

    const handleBack = () => {
        dispatch(readMsg())
        navigate("/chats");
    };
    return (
        <div className="flex flex-col ">
            <SmallHeader />
            <div className="flex flex-row justify-start items-center space-x-6 
        xl:ml-20 xl:mt-10 lg:ml-16 lg:mt-10 md:ml-14 md:mt-9">
                <img
                    src={backButton}
                    onClick={handleBack}
                    alt="Back"
                    className="cursor-pointer 
            xl:w-11 xl:h-10 lg:w-9 lg:h-8 md:w-7 md:h-6"
                />
             
                <img src={chat[0].senderData.image} className="w-24 h-24 rounded-full"/>
                <span className="text-title-light font-['sans-serif'] 
          xl:pt-1 xl:text-3xl lg:pt-1 lg:text-2xl md:pt-0 md:text-xl">
                    {chat[0].senderData.senderName}
                </span>
            </div>
            <div className="flex flex-row justify-center items-center p-10 ">
                <div className="flex flex-col items-start justify-start w-4/5 h-screen space-y-5  bg-opacity-15   drop-shadow-[1px_1px_rgba(117,135,142)] 
                rounded-2xl overflow-hidden hover:overflow-y-auto p-10  bg-clientbg-light">
                    {msg.map(m=>{return(
                        <div key={m.id} className="flex flex-row justify-start items-center space-x-3 ">
                            {m.type=='R'&&<div className="flex flex-col rounded-lg w-fit p-3 xl:text-2xl lg:text-xl md:text-lg text-text-light font-['sans-serif'] bg-post-bg-light">
                                        {m.content}
                            </div>}
                            {m.type=='S'&&<div className="flex flex-col rounded-lg w-fit p-3 xl:text-2xl lg:text-xl md:text-lg text-text-light font-['sans-serif'] bg-chatbg-light">
                                        {m.content}
                            </div>}
                            <div className="flex flex-col justify-center items-end xl:text-base lg:text-sm md:text-xs text-input-text-light font-['Georgia']">
                                        {m.time}
                            </div>
                            {m.type=='S'&&
                              <div className="flex flex-col justify-center items-center xl:pl-28 lg:pl-20 md:pl-12">
                                    <img src={DeleteIcon}
                  className="xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"
                  onClick={() => handleDeleteMsg(m.id)}
                />
                              </div>
                            }
                        </div>
                    )})}
                    {msg.length==0&&
                    <div className="flex flex-col justify-start items-center rounded-lg w-fit p-3 xl:text-2xl lg:text-xl md:text-lg text-text-light font-['sans-serif'] ">
                   Start new Chat, Say Hello !
        </div>
                    }
                    <div key={0} className="flex flex-row justify-start items-center space-x-5 pt-16 ">
                    <input className="flex flex-col rounded-lg w-fit p-3 xl:text-2xl lg:text-xl md:text-lg text-text-light font-['sans-serif'] bg-chatbg-light"
                     placeholder="what do you want ..." onChange={(e)=>{setNewMsg(e.target.value)}} defaultValue={newMsg}/>
                      <img src={SendIcon} onClick={handelSendMsg}
               className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"/>
               
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatPage