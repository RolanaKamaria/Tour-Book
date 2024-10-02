import React from 'react'
import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import { acceptOrder, refuseOrder } from '../presenterSlice';
import { useSelector, useDispatch } from 'react-redux';
import AcceptSign from '../../../assets/images/AcceptSign.svg'
import RefuseSign from '../../../assets/images/RefuseSign.svg'
import { useNavigate } from 'react-router-dom';
function PresenterOrders() {
    const Orders = useSelector(state=>state.presenter.offerRequest);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAcceptOrder = (orderId) => {
        dispatch(acceptOrder({ orderId }));
      };
    
      const handleRefuseOrder = (orderId) => {
        dispatch(refuseOrder({ orderId }));
      };
    const handleBack = () => {
        navigate('/presenter-home-page');
      };
  return (
    <div className="flex flex-col">
            <SmallHeader/>
            <div className="flex flex-row float-start items-center mx-10 mt-10
                    xl:space-x-10 xl:px-28 
                    lg:space-x-8 lg:px-24
                    md:space-x-6 md:px-20">
                <img src={backButton} onClick={handleBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
            
                <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Orders</div>
            </div>
            <div className="flex flex-row justify-center items-center p-10 ">
                <div className="flex flex-col items-center justify-start w-3/5 h-screen space-y-5 bg-post-bg-light
                  drop-shadow-xl rounded-2xl overflow-hidden hover:overflow-y-scroll py-10">
                  {Orders.length !==0 ? Orders.map(order=>{
                    return(
                        <div key={order.id} className="flex flex-row space-x-4 items-center justify-center relative 
                        w-11/12 bg-presenterPostDetails-light 
                        border-solid border-2 border-offerTitle-light 
                       xl:rounded-xl xl:h-24 xl:p-4 xl:pr-1
                         lg:rounded-lg lg:h-20 lg:p-3  lg:pr-4
                        md:rounded-md md:h-16 md:p-2 md:pr-10">
                            <div className=" font-['Open_Sans'] text-text-light xl:text-2xl lg:text-xl md:text-lg"> {order.description} </div>
                            {order.offerState === 'Accepted' ? (<div className='text-save-button-light font-bold bg-presenterbg-light'> Accepted </div>)
                             : order.offerState === 'Refused' ? (<div className='text-error-light font-bold bg-presenterbg-light'> Refused </div>):(
                            <div className='flex flex-row space-x-3'>
                            <img src={AcceptSign} className='xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 cursor-pointer'  onClick={() => handleAcceptOrder(order.id)}/>
                            <img src={RefuseSign} className='xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 cursor-pointer'  onClick={() => handleRefuseOrder(order.id)}/> 
                            </div>
                        )}
                        </div>
                    )
                  }):
                   <div className="flex flex-row items-center justify-center font-['Open_Sans'] relative w-11/12
                    bg-presenterPostDetails-light border-solid border-2 border-offerTitle-light text-text-light 
                     drop-shadow-[1px_1px_rgba(117,135,142)] 
                   xl:text-3xl xl:rounded-xl xl:h-24 xl:p-4
                        lg:text-2xl lg:rounded-lg lg:h-20 lg:p-3
                        md:text-xl md:rounded-md md:h-16 md:p-2">
                    There is No Notifications
                    </div>}
                   
                </div>
            </div>
        </div>
  )
}

export default PresenterOrders
