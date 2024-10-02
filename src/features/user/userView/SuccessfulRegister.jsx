import DoneIcon from "../../../assets/images/DoneIcon.svg"
function SuccessfulRegister(){
    return(
        <div className="flex flex-row justify-center items-center ">
            <div className="flex flex-col justify-center items-center pt-40 xl:text-4xl lg:text-3xl md:text-2xl text-title-light font-['Georgia'] space-y-32">
                <div className="flex flex-row">Register Done successfully. Check your email to activate your account.</div>
                <img src={DoneIcon} className="xl:w-40 xl:h-40 lg:h-32 lg:w-32 md:h-24 md:w-24"/>
            </div>

        </div>
    )
}

export default SuccessfulRegister