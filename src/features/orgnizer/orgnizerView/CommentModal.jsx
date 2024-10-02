import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrashIcon from "../../../assets/images/trachIcon.svg"
import { deleteComment } from "../orgnizerSlice";
import axios from "axios";
import { API_URL } from "../../../app/config";
function CommentModal(props) {
  const tours = useSelector(state => state.orgnizer.tours)
  const dispatch = useDispatch()
  var tour = tours.filter(tour => tour.id == props.tourId)
  var tourComments = tour[0].comments
  const [comments, setComments] = useState(tourComments);
  const tourId = props.tourId
  const handleDeleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment({ tourId, id }))
      setComments(comments.filter((comment) => comment.id !== id));
      var token = localStorage.getItem('accessToken');
      var response = axios.delete(
          `${API_URL}/api/clients/` +tourId+'/comments/'+id+'/',
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${token}`,
              },
          }
      ).then(res => {
          console.log(res.data)
      }
      ).catch((error) => {
          
          console.error('Error:', error);
      })
          ;
    }
  };

  return (
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
              {!props.preventDelete && <img src={TrashIcon}
                className="xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 hover:cursor-pointer hover:drop-shadow-[1px_1px_rgba(117,135,142)]"
                onClick={() => handleDeleteComment(item.id)}
              />}

            </li>
          ))}
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
export default CommentModal