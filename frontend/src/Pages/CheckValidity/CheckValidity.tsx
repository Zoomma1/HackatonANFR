import { ApiService } from "../../Services/apiService";
import "./CheckValidity.css";
import { useState } from "react";

export function CheckValidity() {
  const [formState, setFormState] = useState({
    start_date: "",
    end_date: "",
    service: "",
    usage_type: "",
    venue: "",
    rx_freq_min: "",
    rx_freq_max: "",
    tx_freq_min: "",
    tx_freq_max: "",
    duplex: "",
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const [isValid, setIsValid] = useState<boolean | null>(null);
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    ApiService.post("/checkValidate", formState).then((response) => {
      response.text().then((text) => {
        setIsValid(text === "true" ? true : false);
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          name="start_date"
          value={formState.start_date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="end_date"
          value={formState.end_date}
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
          name="usage_type"
          value={formState.usage_type}
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
        RX Frequency (min):
        <input
          type="text"
          name="rx_freq_min"
          value={formState.rx_freq_min}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        RX Frequency (max):
        <input
          type="text"
          name="rx_freq_max"
          value={formState.rx_freq_max}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        TX Frequency (Optional) (min):
        <input
          type="text"
          name="tx_freq_min"
          value={formState.tx_freq_min}
          onChange={handleChange}
        />
      </label>
      <label>
        TX Frequency (Optional) (max):
        <input
          type="text"
          name="tx_freq_max"
          value={formState.tx_freq_max}
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
      {isValid !== null && (
        <label>Frequency is {isValid ? "Valid" : "Invalid"}</label>
      )}
    </form>
  );
}
