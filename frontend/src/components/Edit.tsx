import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { FormEvent, useEffect, useState } from "react";
import moment from "moment";
import { BASE_API_URL } from "../ApiConfig";

const EditInspection = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [inspectionData, setInspectionData] = useState(
    location.state?.data || null
  );
  useEffect(() => {
    if (!inspectionData) {
      const fetchData = async () => {
        const res = await fetch(`${BASE_API_URL}/history/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInspectionData(data);
        }
      };
      fetchData();
    }
  }, [id, inspectionData]);

  const isValidPrice = (input: any) => {
    // return /^(100000(\.0{1,2})?|([1-9]\d{0,4}(\.\d{1,2})?|0(\.\d{1,2})?))$/.test(
    //   String(input)
    // );
    return /^$|^(100000(\.0{1,2})?|([1-9]\d{0,4}(\.\d{1,2})?|0(\.\d{1,2})?))$/.test(
      String(input)
    );
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "note") {
      setInspectionData((prev: any) => ({
        ...prev,
        note: value,
      }));
    }
    if (id === "price" && isValidPrice(e.target.value)) {
      setInspectionData((prev: any) => ({
        ...prev,
        price: value,
      }));
    }

    if (id === "sampling") {
      setInspectionData((prev: any) => {
        const newSampling = e.target.checked
          ? [...prev.samplingPoint, value]
          : prev.samplingPoint.filter((option: string) => option !== value);
        return {
          ...prev,
          samplingPoint: newSampling,
        };
      });
    }
    if (id === "datetime") {
      console.log(inspectionData.samplingDate);
      setInspectionData((prev: any) => ({
        ...prev,
        samplingDate: moment(value).format("YYYY-MM-DDTHH:mm:ss"),
      }));
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_API_URL}/history/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          note: inspectionData.note,
          price: inspectionData.price,
          samplingPoint: inspectionData.samplingPoint,
          samplingDate: inspectionData.samplingDate,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setInspectionData(data);
        navigate(`/inspection/${id}`, { state: { data: data } });
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Header>
      <h1 className="text-center mb-4 ">Edit Inspection ID: {id}</h1>
      <div
        className="container card border-0 shadow"
        style={{ maxWidth: "370px" }}
      >
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column mb-2">
              <label className="fw-semibold form-label">Note</label>
              <input
                type="text"
                id="note"
                value={inspectionData.note}
                placeholder="Note"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="d-flex flex-column mb-4">
              <label className="fw-semibold form-label">Price</label>
              <input
                type="number"
                id="price"
                value={inspectionData.price}
                placeholder="Price"
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <label className="fw-semibold form-label">Sampling Point</label>
            <div className="mb-2 d-flex flex-row justify-content-around">
              {["Front End", "Back End", "Other"].map((option) => (
                <div className="form-check" key={option}>
                  <input
                    className="form-check-input border-dark"
                    type="checkbox"
                    id="sampling"
                    value={option}
                    checked={inspectionData.samplingPoint.includes(option)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column mb-4">
              <label className="fw-semibold form-label">
                Date/Time of Sampling
                {/* {inspectionData.samplingDate} */}
              </label>
              <input
                className="form-control text-muted"
                type="datetime-local"
                id="datetime"
                value={moment(inspectionData.samplingDate).format(
                  "YYYY-MM-DDTHH:mm:ss"
                )}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn button-outline-green fw-semibold"
                style={{ marginRight: "10px" }}
                onClick={() => navigate(`/inspection/${id}`)}
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
    </Header>
  );
};

export default EditInspection;
