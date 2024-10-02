import React ,{ useState }  from 'react'
import reportMan from "../../../assets/images/reportMan.svg"
import { useDispatch, useSelector } from "react-redux"
import { setRespondentEmail } from "../../user/userSlice"
import { useNavigate } from "react-router-dom"
import SmallHeader from "../../layout/SmallHeader"
import { ProblemList ,OrganizersName} from "../../../assets/data/tempData"
function PresenterReport() {
    const state = useSelector(state => state.user)
    const [description, setDescription] = useState('')
    const [reason, setReason] = useState('')
    const [organizer, setOrganizer] = useState('')
    const problemList = ProblemList;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handelDescriptionChange = (e) =>  {
        setDescription(e.target.value)
    }
    const handelReasonChange =(e)=> {
        setReason(e.target.value)
        console.log(reason)
    }
    const handelOrganizerNameChange =(e)=> {
        setOrganizer(e.target.value)
    }
    const handelSend = () => {
        navigate("/presenter-home-page");
    }
    const handleCancel= () => {
        navigate("/presenter-home-page")
    }
    return (
        <div className=" w-full h-screen max-h-full">
            <SmallHeader />
            <img src={reportMan} className="absolute top-1/3 h-3/5 w-1/3  right-0 " />
            <div className="container flex flex-row items-center relative xl:pt-24 lg:pt-32 md:pt-32">

                <div className="bg-presenterPostDetails-light drop-shadow-[2px_4px_rgba(125,143,154,0.5)] h-fit
                xl:rounded-3xl 
                lg:mx-64 lg:rounded-3xl 
                md:mx-20 md:rounded-2xl ">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-start justify-start  mx-auto text-text-light font-['Arial'] gap-5 px-8 
                        xl:text-2xl xl:my-16 
                        lg:text-xl lg:my-16 
                        md:text-lg md:my-20">
                            <div className="flex flex-row justify-between 
                            xl:gap-x-24 lg:gap-2 md:gap-2">
                                <span className="w-52">Organizer Name :</span>
                                <select className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light text-center
                                xl:h-10 xl:rounded-xl  xl:ml-6 xl:text-xl xl:w-60
                                lg:h-8 lg:rounded-lg lg:ml-4 lg:text-lg lg:w-52 
                                md:h-6 md:rounded-md md:ml-20 md:text-base md:w-40"
                                    onChange={handelOrganizerNameChange}>
                                    {
                                        OrganizersName.map((item) => {
                                            return <option
                                                key={item.id} value={item.id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex flex-row 
                            xl:gap-32 lg:gap-20 md:gap-2">
                                <span>Select Problem:</span>

                                <select className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light text-center
                                xl:h-10 xl:rounded-xl  xl:ml-6 xl:text-xl xl:w-60
                                lg:h-8 lg:rounded-lg lg:ml-4 lg:text-lg lg:w-52 
                                md:h-6 md:rounded-md md:ml-20 md:text-base md:w-40"
                                    onChange={handelReasonChange}>
                                    {
                                        problemList.map((item) => {
                                            return <option
                                                key={item.id} value={item.id}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="flex flex-row xl:gap-9 lg:gap-1 md:gap-2">
                                <span>Description the problem :</span>
                                <textarea type="text"
                                    onChange={handelDescriptionChange}
                                    value={description}
                                    className="drop-shadow-[1px_4px_rgba(117,135,142)] text-input-text-light 
                                    xl:h-24 xl:rounded-xl xl:pl-3 xl:text-xl xl:w-60
                                    lg:h-20 lg:rounded-lg lg:pl-2 lg:text-lg lg:w-56 lg:ml-5
                                    md:h-16 md:rounded-md md:ml-2 md:text-base" />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center pb-10 
                        xl:gap-6 lg:gap-4 md:gap-2">
                            <button
                                onClick={handelSend}
                                className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-delete-button-light text-button-text-light justify-center items-center 
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-delete-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10 
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Send</button>
                            <button
                                onClick={handleCancel}
                                className="flex flex-col text-center font-['sans-serif'] drop-shadow-[3px_6px_rgba(117,135,142,0.5)] bg-back-button-light text-button-text-light justify-center items-center
                                hover:cursor-pointer hover:drop-shadow-[0px] hover:bg-back-button-hover-light
                                xl:text-2xl xl:rounded-md  xl:w-28 xl:h-10
                                lg:text-xl lg:rounded-md  lg:w-24 lg:h-10
                                md:text-lg md:rounded-md  md:w-20 md:h-8 ">Cancel</button>

                        </div>
                    </div>
                </div>
                <div className="bg-presenterbg-light  text-center text-text-light absolute drop-shadow-[2px_2px_rgba(211,168,76,0.6)]  
                xl:rounded xl:left-80 xl:w-40 xl:h-10 xl:top-20
                lg:rounded-md lg:left-72 lg:w-32 lg:h-8 lg:top-28
                md:rounded-sm md:left-32  md:w-28 md:h-8 md:top-28 ">
                    <span className="xl:text-3xl lg:text-2xl md:text-xl font-['serif']">Report</span>
                </div>

            </div>
        </div>)
}

export default PresenterReport
