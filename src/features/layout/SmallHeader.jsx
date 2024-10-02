import Logo from "../../assets/images/Logo.svg";
import Title from "../../assets/images/Title.svg";
import notificationIcon from "../../assets/images/notificationIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoleId } from "../user/userSlice";

function SmallHeader() {

  const state = useSelector((state) => state.user);
  var userID = state.login.data.roleId;
  var userName = state.login.data.userName;

  const navigate = useNavigate();
  const dispatch=useDispatch()
 const handleNotification = () =>{
  if (userID === 2) {
    navigate("/orgnizer-notification");
  }
  else if (userID === 1) {
    navigate('/client/client-notification');
    } 

  else if (userID === 3) {
    navigate("/presenter-home-page/presenter-orders");  }
 }
 

  const handelLogOut=()=>{
    if (window.confirm('Are you sure you want to Log out?')) {
      dispatch(setRoleId())
    navigate("/")
      }  }

  return (
    <div
      className="flex flex-row   
        xl:space-x-80 xl:mt-10 xl:ml-14
        lg:space-x-12 lg:mt-14 lg:ml-12
        md:space-x-0 md:mt-14 md:ml-10"
    >
      <div className="flex flex-row space-x-4">
        <img
          src={Logo}
          className="xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-12 md:h-12"
        />
        <img
          src={Title}
          className="xl:w-44 xl:h-20 lg:w-36 lg:h-16 md:w-28 md:h-12"
        />
      </div>
      <div
        className="flex flex-row 
                   xl:space-x-2 xl:pl-96 
                   lg:space-x-2 lg:pl-96 
                   md:space-x-1 md:pl-80 "
      >
        <div className="flex flex-row xl:space-x-20 lg:space-x-3 md:space-x-3" onClick={handleNotification}>
          <div className="relative xl:-right-20 lg:-right-4 md:-right-4 ">
            <span className="border px-1 rounded-full xl:text-base lg:text-sm md:text-xs border-error-light text-error-light">
              {state.notifications.length}
            </span>
          </div>
          <img
            src={notificationIcon}
            className="cursor-pointer
                       xl:mt-2 xl:w-10 xl:h-10
                       lg:mt-2 lg:w-8 lg:h-8 
                       md:mt-3 md:w-6 md:h-6"
          />

        </div>
        <div
          className="text-text-light space-x-2
                     xl:mt-4 xl:text-base
                     lg:mt-3 lg:text-sm
                     md:mt-4 md:text-xs"
        >
          <span>{userName}</span>
          <span> | </span>
          <span className="hover:cursor-pointer" onClick={handelLogOut}>Log out</span>
        </div>
      </div>
    </div>
  );
}
export default SmallHeader;
