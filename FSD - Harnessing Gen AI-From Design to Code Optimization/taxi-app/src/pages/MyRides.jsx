import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../services/api";

export default function MyRides() {
  const [rides, setRides] = useState([]);

  const loadRides = async () => {
    const res = await getBookings();
    setRides(res.data);
  };

  useEffect(() => {
    loadRides();
  }, []);

  const cancelRide = async (id) => {
    if (!window.confirm("Cancel this ride?")) return;

    await deleteBooking(id);
    loadRides();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>My Rides</h1>

        {rides.length === 0 ? (
          <p>No rides booked.</p>
        ) : (
          <ul>
            {rides.map((ride) => (
              <li key={ride.id}>
                <span>
                  {ride.name} | {ride.pickup} → {ride.drop}
                </span>
                <button
                  className="cancel-btn"
                  onClick={() => cancelRide(ride.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}