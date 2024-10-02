import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import Items from "../../../assets/images/reportItems.png"
import Tree from "../../../assets/images/reportTree.png"
import Rock from "../../../assets/images/rock.svg"
import { ProblemList } from "../../../assets/data/tempData";
import { useState } from "react";
import { useSelector } from "react-redux"
import axios from "axios"
import { API_URL } from "../../../app/config"
import { useNavigate } from "react-router-dom"
function ClientReport() {
    const state = useSelector(state => state.user)
    const orgnizerId = useSelector(state=>state.client.selected.orgnizerId)
    const problemList = ProblemList;
    const [reason, setReason] = useState('')
    const [checkError,setCheckError]=useState(false)
    const [msg,setMsg]=useState('')
    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    function handelReasonChange(e) {
        setReason(e.target.value)
    }

    const handelSubmit=async()=>{
        //call api for reports
        var data={
            reason:description,
            report_type: "CR"
        }
        var token=  localStorage.getItem('accessToken');
        const response = await axios.post(`${API_URL}/api/reports/`+orgnizerId, {
        ...data
          },{
            headers: {
                Authorization: `JWT ${token}`,
              }
          }).then((response) => {
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

              setMsg(JSON.stringify(errorData.errors));
            }
          } else {
            setMsg('An unknown error occurred');
          }
            console.error('Error:', error);
          });
        navigate('/user-home-page');
    }

    const handelBack = () => {

        navigate('/user-home-page');
    }
    return (
        <div className="flex flex-col ">
            <SmallHeader />
            <div className="flex flex-row items-center mx-10 mt-10 
                xl:space-x-10 xl:px-28 
                lg:space-x-8 lg:px-24
                md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                        xl:w-12 xl:h-12
                        lg:w-10 lg:h-10
                        md:w-8 md:h-8" />
            </div>
            <div className="container flex flex-row items-center  ">

                <div className="flex flex-row bg-presenterPostDetails-light bg-opacity-40   drop-shadow-[2px_4px_rgba(125,143,154,0.5)] h-fit w-4/5 px-10
                xl:mx-64 xl:rounded-3xl 
                lg:mx-64 lg:rounded-3xl 
                md:mx-56 md:rounded-2xl mb-10">
                    <div className="flex flex-col items-start justify-center mx-auto text-text-light font-['Arial'] gap-1 space-y-5 px-2 xl:text-2xl xl:my-16 lg:text-xl lg:my-16 md:text-lg md:my-20">
                    {
            checkError&& <div className="flex flex-row justify-start  text-error-light font-['Open_Sans']  pb-10
            xl:text-xl lg:text-lg  md:text-base">{msg}
                </div>
           } 
                        <div className="flex flex-row xl:gap-3 lg:gap-2 md:gap-2">
                            <span className="  xl:text-2xl xl:w-48
                            lg:text-xl lg:w-40
                            md:text-lg md:w-28">Tour Title :</span>
                            <span className="pl-2 font-['BlinkMacSystemFont'] ">{state.reports.respondentUser}</span>
                        </div>
                        <div className="flex flex-row xl:gap-3 lg:gap-2 md:gap-2">
                            <span className="  xl:text-2xl xl:w-48
                            lg:text-xl lg:w-40
                            md:text-lg md:w-28">Orgnizer Email :</span>
                            <span className="pl-2 font-['BlinkMacSystemFont'] ">{state.reports.respondentEmail}</span>
                        </div>
                        <div className="flex flex-row xl:gap-3 lg:gap-2 md:gap-2">
                            <span className="  xl:text-2xl xl:w-48
                            lg:text-xl lg:w-40
                            md:text-lg md:w-28">Select Problem :</span>
                            <select className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light text-center
                                xl:h-10 xl:rounded-xl  xl:ml-2 xl:text-xl xl:w-60
                                lg:h-8 lg:rounded-lg lg:ml-2 lg:text-lg lg:w-52 
                                md:h-6 md:rounded-md md:ml-2 md:text-base md:w-40"
                                onChange={handelReasonChange}>
                                {
                                    problemList.map((item) => {
                                        return <option
                                            key={item.id} value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="flex flex-row xl:gap-3 lg:gap-2 md:gap-2">
                            <span className="  xl:text-2xl xl:w-48
                            lg:text-xl lg:w-40
                            md:text-lg md:w-28">Description :</span>
                            <textarea type="text" onChange={(e)=>setDescription(e.target.value)}
                                className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light py-1 text-center
                                    xl:h-24 xl:rounded-xl xl:text-xl xl:w-60 xl:mb-8
                                    lg:h-20 lg:rounded-lg lg:text-lg lg:w-56 lg:mb-6
                                    md:h-16 md:rounded-md md:ml-2 md:text-base md:mb-4" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center mx-auto p-10">
                        <img src={Items} className="xl:w-72 xl:h-96 lg:w-64 lg:h-80 md:w-56 md:h-72" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row  justify-start items-center pb-10 
                      xl:space-x-52 xl:pl-60  xl:gap-6 
                      lg:space-x-40 lg:pl-40 lg:gap-4
                      md:space-x-24 md:pl-40 md:gap-2">
                <img src={Rock} className="xl:w-40 xl:h-40 lg:w-36 lg:h-36 md:w-32 md:h-32" />
                <button onClick={handelSubmit}
                    className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-delete-button-light text-button-text-light justify-center items-center 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Send</button>
            </div>
            <div className="bg-presenterPostDetails-light bg-opacity-40   text-center text-text-light absolute   drop-shadow-[2px_2px_rgba(9,133,94,0.6)] 
                xl:rounded xl:left-80 xl:w-40 xl:h-10 xl:top-48
                lg:rounded-md lg:left-72 lg:w-32 lg:h-8 lg:top-44
                md:rounded-sm md:left-64  md:w-28 md:h-8 md:top-40  ">
                <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">Report</span>
            </div>
            <div className="flex flex-row justify-end items-end ">
                <img src={Tree} className="xl:mr-52 lg:mr-40 lg:h-96 lg:w-72 md:mr-32 md:h-72 md:w-52 absolute  mb-10" />
            </div>
        </div>
    )
}
export default ClientReport