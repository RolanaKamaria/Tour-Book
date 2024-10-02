import { useDispatch } from "react-redux";
import { setToken } from "../userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, CONFIG } from "../../../app/config";

function Activate(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [checkError,setCheckError]=useState(false)
    const [msg,setMsg]=useState('')
    const location = useLocation();
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');

   //to get token & uid from url
      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const uidParam = params.get('uid');
        const tokenParam = params.get('token');
        setUid(uidParam);
        setToken(tokenParam);
      }, [location]);

    const handelActivate=async()=>{
        const response = await axios.post(`${API_URL}/auth/users/activation/`, {
            uid:uid,
            token:token
          },CONFIG).then((response) => {
            console.log(response.data);
            dispatch(setToken({uid,token}));
            navigate('/login')
          })
          .catch((error) => {
           setCheckError(true)
           
           if (error.response && error.response.data) {
            const errorData = error.response.data;
            
            if (typeof errorData === 'string') {
 
              setMsg(errorData);
            }else {

              setMsg(JSON.stringify(errorData));
            }
          } else {
            setMsg('An unknown error occurred');
          }
            console.error('Error:', error);
          });
    }
    return(
        <div className="flex flex-col justify-center items-center pt-64">
           {
            checkError&& <div className="flex flex-row justify-start  text-error-light font-['Open_Sans']  pb-10
            xl:text-xl lg:text-lg  md:text-base">{msg}
                </div>
           } 
        <button
              onClick={handelActivate}
              className="justify-center items-center text-center  font-['sans-serif'] text-loginButtonText-light flex-row
          bg-gradient-to-br from-loginButtonFrom-light via-loginButtonVia-light to-loginButtonTo-light 
          drop-shadow-[3px_6px_rgba(117,135,142,0.5)] rounded-md 
          hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-gradient-to-br hover:from-loginButtonVia-light hover:via-loginButtonVia-light hover:to-loginButtonVia-light
          xl:text-4xl xl:w-52 xl:h-20  
          lg:text-3xl  lg:w-44 lg:h-16 
          md:text-2xl  md:w-40 md:h-12 "
            >
              Activate
            </button>
        </div>
    )
}

export default Activate