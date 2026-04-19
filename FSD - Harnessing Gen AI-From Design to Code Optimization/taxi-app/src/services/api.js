import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/bookings",
});

export const createBooking = (data) => API.post("/", data);
export const getBookings = () => API.get("/");
export const deleteBooking = (id) => API.delete(`/${id}`);