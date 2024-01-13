import { ChangeEvent, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../ApiConfig";
// import styled from "styled-components";

interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: string[];
}

const CreateInspection = () => {
  //   const CustomSelect = styled.select`
  //     option[value=""] {
  //       color: blue;
  //     }
  //   `;
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [standards, setStandards] = useState<Standard[]>([]);

  const fetchStandards = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/standard`);
      const data = await res.json();
      setStandards(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStandards();
  }, []);

  const isValidPrice = (input: number) => {
    return /^(100000(\.0{1,2})?|([1-9]\d{0,4}(\.\d{1,2})?|0(\.\d{1,2})?))$/.test(
      String(input)
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "price" && isValidPrice(Number(value))) {
      setPrice(value);
    }
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Header>
      <h1 className="text-center mb-4">{"Create  Inspection"}</h1>
      <div className="d-flex justify-content-center ">
        <div className="card shadow border-white" style={{ width: "60vh" }}>
          <div className="card-body">
            <form>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Name*</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Inspection Name"
                  required
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Name*</label>
                <select className="form-select" required>
                  {/* <option value="" disabled={true}> */}
                  <option style={{ backgroundColor: "green" }} hidden value="">
                    Please Select Standard
                  </option>
                  {standards.map((standard) => (
                    <option key={standard.id} value={standard.name}>
                      {standard.name}
                    </option>
                  ))}
                </select>
                {/* <CustomSelect>
                  <option hidden>Please Select Standard</option>
                  {standards.map((standard) => (
                    <option key={standard.id} value={standard.name}>
                      {standard.name}
                    </option>
                  ))}
                </CustomSelect> */}
              </div>

              <div className="d-flex flex-column">
                <label className="fw-semibold form-label">Upload File</label>
                <input
                  type="file"
                  id="jsonFile"
                  placeholder="Inspection Name"
                  required
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <hr></hr>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Note</label>
                <input
                  type="text"
                  id="note"
                  placeholder="Note"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="10,000"
                  value={price}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Sampling Point</label>
                <div className="d-flex flex-row justify-content-around">
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                    />
                    <label className="form-check-label">Front End</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                    />
                    <label className="form-check-label">Back End</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mb-4">
                <label className="fw-semibold form-label">
                  Date/Time of Sampling
                </label>
                <input
                  className="form-control text-muted"
                  type="datetime-local"
                  id="datetime"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn button-outline-green fw-semibold"
                  onClick={handleCancelClick}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </button>
                <button className="btn text-white button-color ml-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default CreateInspection;
