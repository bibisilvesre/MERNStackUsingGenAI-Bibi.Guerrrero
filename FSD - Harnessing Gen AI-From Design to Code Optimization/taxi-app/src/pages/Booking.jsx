import { useState } from "react";
import { createBooking } from "../services/api";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    pickup: "",
    drop: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Required";
    if (!form.pickup) err.pickup = "Required";
    if (!form.drop) err.drop = "Required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    await createBooking(form);
    alert("Ride booked!");

    setForm({ name: "", pickup: "", drop: "" });
    setErrors({});
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Book Ride</h1>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <p>{errors.name}</p>

          <input
            placeholder="Pickup"
            value={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          />
          <p>{errors.pickup}</p>

          <input
            placeholder="Drop"
            value={form.drop}
            onChange={(e) => setForm({ ...form, drop: e.target.value })}
          />
          <p>{errors.drop}</p>

          <button type="submit">Book</button>
        </form>
      </div>
    </div>
  );
}