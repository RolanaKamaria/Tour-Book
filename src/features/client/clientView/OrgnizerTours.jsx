import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import Camera from "../../../assets/images/camera.png"
import Direction from "../../../assets/images/mainDirection.svg"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Tour from "./Tour";
function OrgnizerTours() {
    const navigate = useNavigate()
    const orgnizerId = useSelector(state => state.client.selected.orgnizerId)
    const tours = useSelector(state => state.client.tours)
    const selectedTours = tours.filter(tour => tour.orgnizerId == orgnizerId)
    const handelBack = () => {

        navigate('/user-home-page');
    }
    return (
        <div className="flex flex-col ">
            <SmallHeader />
            <div className="flex flex-row items-center justify-between mx-10 mt-10 
                xl:space-x-10 xl:px-28 
                lg:space-x-8 lg:px-24
                md:space-x-6 md:px-20">
                <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                        xl:w-12 xl:h-12
                        lg:w-10 lg:h-10
                        md:w-8 md:h-8" />
                        <img src={Camera} className="flex flex-col xl:w-28 xl:h-28 lg:h-24 lg:w-24 md:h-20 md:w-20"/>
            </div>
             <div className="flex flex-row items-end justify-end  mr-72">
             <div className="justify-center items-center text-center text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia'] h-16 pt-3
             w-1/4  bg-clientbg-light bg-opacity-15   drop-shadow-[1px_1px_rgba(117,135,142)] rounded-md">Alwadi Company </div>
             </div>
            <div className="flex flex-row justify-center items-center pb-10 ">
                <div className="flex flex-col items-center justify-start w-4/5 h-screen space-y-5 bg-clientbg-light bg-opacity-15   drop-shadow-[1px_1px_rgba(117,135,142)] rounded-2xl overflow-hidden hover:overflow-y-auto p-10 xl:pl-52 lg:pl-32 md:pl-28">
                    {selectedTours.map(tour => {
                        return (
                            <Tour tour={tour} key={tour.id} />
                        )
                    })}
                </div>
               
            </div>
            <div className="flex flex-row justify-start items-start ">
            <img src={Direction} className="lg:h-96 lg:w-72 md:h-72 md:w-52 absolute top-full pl-10" />
                </div>
        </div>
    )
}

export default OrgnizerTours