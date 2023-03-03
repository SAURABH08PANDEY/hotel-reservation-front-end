import React,{useState} from "react";
import "./UserForm.css";
import axios from "axios";
var url = "https://e699.vercel.app/";
const  UserForm=()=> {



  let [price, setPrice] = useState("See Estimate");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cost,setCost] = useState(0);

  const getPrice = () => {
    let d = new Date(startDate);
    let e = new Date(endDate);
    let diff = e.getTime() - d.getTime();
    let hours = diff / (1000 * 3600);
    setPrice(hours * cost);
}




  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const room = e.target.room.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const roomNumber = e.target.roomNumber.value;
    const price = e.target.price.value;
    const d = {
      email,
      room,
      start,
      end,
      roomNumber,
      price
    };
    console.log(d);

    try {
      const { data } = await axios.post(
        `${url}api/v1/booking`,
        d
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="Form" onSubmit={handleSubmit}>
        <div className="Email col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div className="Rooms">
          <div className="col">
            <label htmlFor="room">Select Room Type:</label>
            <select id="room" name="room" >
              <option value="A" >Type A</option>
              <option value="B">Type B</option>
              <option value="C">Type C</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="roomNumber">Type Room Number:</label>
            <input type="text" name="roomNumber" id="roomNumber" />
          </div>
          <div className="col">
            <label htmlFor="price">Room Price(per hour):</label>
            <input type="text" name="price" id="price" onChange={(e)=>setCost(e.target.value)}/>
          </div>
        </div>
        <div className="Date">
          <div className="col">
            <label htmlFor="start">Start Date</label>
            <input type="datetime-local" name="start" id="start" onChange={(e)=>setStartDate(e.target.value)} />
          </div>
          <div className="col">
            <label htmlFor="end">End Date</label>
            <input type="datetime-local" name="end" id="end" onChange={(e)=>setEndDate(e.target.value)}/>
          </div>
        </div>
        <div className="Bottom">
          <div className="col">
            <button type="submit" id="book">
              Book Now
            </button>
          </div>
          <div className="col">
            <button id="estimate" onClick={getPrice}>{price}</button>

          </div>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
