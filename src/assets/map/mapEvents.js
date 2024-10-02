import { useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setPosition } from "./coordinateSlice";
var lat,lng,position;
const MapEvents = () => {
  position = useSelector(state => state.coordinate.position)
  const dispatch = useDispatch()
  //to get the select location then add marker there
    useMapEvents({
      dblclick(e) {
        lat=e.latlng.lat;
        lng=e.latlng.lng;
        dispatch(setPosition([lat,lng]))
      }
    });
    return false;
}
export default MapEvents;