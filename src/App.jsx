import './App.css';
import React,{useState} from 'react';
import UserForm from './components/UserForm';
import Admin from './components/Admin';
import axios from 'axios';
var url = "http://localhost:5000/";

function App() {
  const [admin, setAdmin] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [buttonText, setButtonTextx] = useState("Admin Page->");

  const fetchBookings = async () => {
    if (admin === true) {
      setAdmin(false);
      setButtonTextx("Admin Page->");
      return;
    }
    try {
      const { data } = await axios.get(`${url}api/v1/getbookings`);
      console.log(data.message);
      setBookings(data.message);
      setAdmin(true);
      setButtonTextx("<-Booking Page");
      
    } catch (error) {
      console.log(error);
    }
  }

  const lowkey = (x) => {
    setAdmin(false);
    setButtonTextx(x);
  }


  return (
    <div className="App">
      <div><h1>Hotel Management System</h1></div>
      <div><button onClick={fetchBookings} id="toggle">{buttonText}</button></div>
      <div>{admin === false ? <UserForm /> : <Admin Bookings={bookings} purple={ lowkey} /> }</div>

    </div>
  );
}

export default App;
