import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import TrashIcon from "../../../assets/images/trachIcon.svg"
import SendIcon from "../../../assets/images/send.png"
import { addComment } from "../clientSlice";
function Comments(props){

  const dispatch = useDispatch()

  const [comments, setComments] = useState(props.comments);
  const [comment,setComment]=useState('')
  const tourId = props.tourId
  const inputRef = useRef(null)
  const handleDeleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(comments.filter((comment) => comment.id !== id));
      setComment('')
      inputRef.current.value=''
    }
  };

 
  const handelComment=()=>{
    dispatch(addComment({comment,tourId}))
    setComments([...comments,{id:0,comment:comment,new:true}])
  }

    return(
        <div className="absolute z-50 inset-0 top-0 left-0 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-orgnizerbg-light p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-title-light xl:text-2xl lg:text-xl md:text-base font-['Georgia'] mb-4">Comments</h2>
          <ul>
            {comments.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-title-light"
              >
                <span className="xl:text-xl lg:text-lg md:text-base text-text-light font-['sans-serif'] ">{item.comment}</span>
                {item.new && <img src={TrashIcon}
                  className="xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"
                  onClick={() => handleDeleteComment(item.id)}
                />}
  
              </li>
            ))}
             <div
                className="flex justify-between items-center py-2 "
              >    
              <input type="text" ref={inputRef} placeholder="add new comment ..." onChange={(e)=>{setComment(e.target.value)}} defaultValue={comment}
              className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light border-solid border-2 border-text-light text-left font-['sans-serif'] px-2
          xl:rounded-xl xl:text-xl xl:h-10 xl:w-80
          lg:rounded-lg lg:text-lg lg:h-9 lg:w-72
          md:rounded-md md:text-base md:h-8 md:w-64" />
               <img src={SendIcon} onClick={handelComment}
               className="xl:w-7 xl:h-7 lg:w-6 lg:h-6 md:w-5 md:h-5 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"/>
                {!props.preventDelete && <img src={TrashIcon}
                  className="xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"
                  onClick={() => handleDeleteComment(item.id)}
                />}
  
              </div>
            {comments.length == 0 && <span className="xl:text-xl lg:text-lg md:text-base text-text-light font-['sans-serif'] ">There is no comments</span>}
          </ul>
          <button
            className="py-2 px-4 rounded mt-4 font-['Georgia'] text-title-light xl:text-xl lg:text-lg md:text-base bg-selected-bg-light  drop-shadow-[1px_1px_rgba(117,135,142)] 
                hover:drop-shadow-none hover:cursor-pointer hover:bg-add-button-light hover:text-inputLabel-light"
            onClick={() => { props.handleShowCommentModal(tourId) }}
          >
            Close
          </button>
        </div>
      </div>
    )
}

export default Comments