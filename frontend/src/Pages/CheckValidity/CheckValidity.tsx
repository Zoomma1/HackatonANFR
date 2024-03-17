import "./CheckValidity.css";
import { useState } from "react";

export function CheckValidity() {
  const [formState, setFormState] = useState({
    startDate: "",
    endDate: "",
    service: "",
    usageType: "",
    venue: "",
    rxFreq: "",
    txFreq: "",
    duplex: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formState.startDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={formState.endDate}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Service:
        <input
          type="text"
          name="service"
          value={formState.service}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Usage Type:
        <input
          type="text"
          name="usageType"
          value={formState.usageType}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Venue:
        <input
          type="text"
          name="venue"
          value={formState.venue}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        RX Frequency:
        <input
          type="text"
          name="rxFreq"
          value={formState.rxFreq}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        TX Frequency (Optional):
        <input
          type="text"
          name="txFreq"
          value={formState.txFreq}
          onChange={handleChange}
        />
      </label>
      <label>
        Duplex (Optional):
        <input
          type="text"
          name="duplex"
          value={formState.duplex}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Validate</button>
    </form>
  );
}
