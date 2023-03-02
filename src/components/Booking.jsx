import React,{useState} from "react";
import "./Booking.css";
import axios from "axios";
var url = "http://localhost:5000/";
function Booking(props) {
    const [room, setRoom] = useState(props.booking.room);
    const [roomNumber, setRoomNumber] = useState(props.booking.roomNumber);
    const [email, setEmail] = useState(props.booking.email);
    const price= props.booking.price;
    const [checkInDate, setCheckInDate] = useState(props.booking.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(props.booking.checkOutDate);
    const id = props.booking._id;


    const updateBooking = async () => {
        const d = {
            room,
            roomNumber,
            email,
            price,
            start:checkInDate,
            end:checkOutDate,
            id
        }

        try {
            const { data } = await axios.post(
                `${url}api/v1/updatebooking`,
                d
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBooking = async () => {
        const d = {
            id
        }
        try {
            const { data } = await axios.post(
                `${url}api/v1/deletebooking`,
                d
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        props.purple("<-Admin Page");
    }






  return (
    <div >
      <div className="booking">
        <div>Booking Id: {props.booking._id} </div>
        <div>Room Type: <input type="text" value={room} onChange={(e)=>{setRoom(e.target.value)}} />  </div>
        <div>Room Number: <input type="text" value={roomNumber} onChange={(e)=>{setRoomNumber(e.target.value)}} />  </div>
        <div>Check In Time And Date: <input type="text" value={checkInDate} onChange={(e)=>{setCheckInDate(e.target.value)}} />  </div>
        <div>Check Out Time And Date: <input type="text" value={checkOutDate}  onChange={(e)=>{setCheckOutDate(e.target.value)}}/>  </div>
        <div>Price: {price} </div>
        <div>Email: <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> </div>
              <div><button onClick={updateBooking}>Update</button> <button onClick={deleteBooking}>Delete</button></div>
        </div>
    </div>
  );
}

export default Booking;
