import AcceptIcon from "../../../assets/images/acceptIcon.svg"
import WaitingIcon from "../../../assets/images/waitingIcon.svg"
import RefuseIcon from "../../../assets/images/refuseIcon.svg"
import SaveIcon from "../../../assets/images/saveIcon.svg"
import TrachIcon from "../../../assets/images/trachIcon.svg"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { editTourPointRequirment } from "../orgnizerSlice"
function PositionComponent(props){
    const [requirment,setRequirment]=useState(props.point.description)
    const [updateRequirment,setUpdateRequirment]=useState(props.point.description)
    const dispatch = useDispatch()
    const handelSave=()=>{
        setRequirment(updateRequirment)
        var point={ ...props.point,description:requirment}
        dispatch(editTourPointRequirment({point}))
       
    }

    const handelDelete= ()=>{
        setRequirment('')
        var point= { ...props.point,description:''}
        dispatch(editTourPointRequirment({point}))
        
      
    }
     
    return(
        <div  className=" overflow-hidden relative flex-shrink-0">
            <div className="flex flex-col justify-center items-center space-y-5">
                <div className="flex flex-row justify-start items-center space-x-5">
                    <div className="flex flex-col border-solid border-2 border-text-light bg-post-bg-light px-2 rounded-full text-text-light 
                    xl:text-2xl lg:text-xl md:text-lg font-['Georgia']">{props.index + 1}</div>
                    <div className="flex flex-col  text-text-light font-['sans-serif']  
                            xl:text-2xl 
                            lg:text-xl
                            md:text-lg ">{props.point.name}</div>
                            <img src={props.point.status=='accept'?AcceptIcon:props.point.status=='wait'?WaitingIcon:RefuseIcon} 
                            className="flex flex-col xl:w-10 xl:h-10 lg:w-8 lg:h-8 md:w-6 md:h-6"/>
                </div>
               {props.point.status=='accept'?<> <div className="flex flex-row justify-center items-center space-x-5">
                <img src={SaveIcon}  onClick={handelSave}
                 className="flex flex-col hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]
                xl:w-8 xl:h-8 lg:w-6 lg:h-6 md:w-5 md:h-5"/>
                <input type="text" placeholder="edit requirment ... " onChange={(e)=>setUpdateRequirment(e.target.value)}
                            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-center
                            xl:rounded-xl xl:text-xl xl:h-8 xl:w-52
                            lg:rounded-lg lg:text-lg  lg:h-7 lg:w-44
                            md:rounded-md md:text-base md:h-6 md:w-32" />
                </div>
                   {requirment!=''&& <div className="flex flex-row justify-start items-center space-x-5">
                    <span className="flex flex-col  text-text-light font-['serif'] 
            xl:text-xl lg:text-lg md:text-base">{requirment}
                </span>
                    <img src={TrachIcon}  onClick={handelDelete} 
                     className="flex flex-col  hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]
                    xl:w-10 xl:h-10 lg:w-8 lg:h-8 md:w-6 md:h-6"/>
                    </div>}
                    </>
                    :null}
            </div>
        </div>
    )
}

export default PositionComponent