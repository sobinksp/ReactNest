import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../ApiConfig";
// import styled from "styled-components";

interface Standard {
  id: string;
  name: string;
  createDate: string;
  standardData: Array<{
    conditionMax: string;
    conditionMin: string;
    key: string;
    name: string;
    shape: string[];
    maxLength: number;
    minLength: number;
  }>;
}

const CreateInspection = () => {
  //   const CustomSelect = styled.select`
  //     option[value=""] {
  //       color: blue;
  //     }
  //   `;
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [standards, setStandards] = useState<Standard[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(
    null
  );

  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [price, setPrice] = useState<string | null>(null);
  const [sampling, setSampling] = useState<string[]>([]);
  const [datetime, setDatetime] = useState<string | null>(null);

  const fetchStandards = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/standard`);
      // const res = await fetch("https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/standards.json")
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
  // name
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // standard selection
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const standardId = e.target.value;
    const selected = standards.find((s) => s.id === standardId);
    if (selected) {
      setSelectedStandard(selected);
    }
    // setSelectedStandard(e.target.value as Standard | null);
  };

  // file upload
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };
  const handleNote = (e: ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    // upload file
    if (id === "jsonFile") {
      setFile(e.target.files[0]);
    }

    // regex for price input
    if (id === "price" && isValidPrice(Number(value))) {
      setPrice(value);
    }
  };
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleSampling = (e: ChangeEvent<HTMLInputElement>) => {
    setSampling((prevSampling) =>
      e.target.checked
        ? [...prevSampling, e.target.value]
        : prevSampling.filter((item) => item !== e.target.value)
    );
  };
  const handleDatetime = (e: ChangeEvent<HTMLInputElement>) => {
    setDatetime(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_API_URL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          name: name,
          standardID: selectedStandard?.id,
          note: note,
          standardName: selectedStandard?.name,
          samplingDate: datetime,
          samplingPoint: sampling,
          price: price,
          standardData: selectedStandard?.standardData,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Header>
      <h1 className="text-center mb-4 ">{"Create  Inspection"}</h1>
      <div className="d-flex justify-content-center ">
        <div className="card shadow border-white" style={{ maxWidth: "370px" }}>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Name*</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Inspection Name"
                  required
                  onChange={handleName}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Standard*</label>
                <select
                  className="form-select"
                  required
                  id="standard"
                  onChange={handleSelect}
                >
                  {/* <option value="" disabled={true}> */}
                  <option hidden value="">
                    Please Select Standard
                  </option>
                  {standards.map((standard) => (
                    <option key={standard.id} value={standard.id}>
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
                  accept=".json"
                  id="jsonFile"
                  placeholder="Inspection Name"
                  onChange={handleFile}
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
                  onChange={handleNote}
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="fw-semibold form-label">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="10,000"
                  value={price || ""}
                  onChange={handlePrice}
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
                      value="Front End"
                      onChange={handleSampling}
                    />
                    <label className="form-check-label">Front End</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                      value="Back End"
                      onChange={handleSampling}
                    />
                    <label className="form-check-label">Back End</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input border-dark"
                      type="checkbox"
                      value="Other"
                      onChange={handleSampling}
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
                  onChange={handleDatetime}
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
                <button
                  type="submit"
                  className="btn text-white button-color ml-3"
                >
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
