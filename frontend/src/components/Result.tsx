import { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, useLocation } from "react-router-dom";
import { BASE_API_URL } from "../ApiConfig";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [inspectionData, setInspectionData] = useState(
    location.state?.data || null
  );
  useEffect(() => {
    console.log(inspectionData);
    if (!inspectionData) {
      const fetchData = async () => {
        const res = await fetch(`${BASE_API_URL}/history/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setInspectionData(data);
        }
      };
      fetchData();
    }
  }, [id, inspectionData]);

  return (
    <Header>
      <h1 className="text-center mb-4 ">Inspection</h1>
      <div className="container gap-2 d-flex ">
        <div className="col-md-3">
          <div className="d-flex justify-content-end mb-2">
            <img
              className="img-fluid"
              src={
                inspectionData?.imageLink
                  ? inspectionData.imageLink
                  : "/image-placeholder.jpeg"
              }
              style={{ width: "40vh" }}
              alt="image"
            />
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn button-outline-green"
              style={{ width: 60 }}
              onClick={() => navigate("/create")}
            >
              Back
            </button>
            <button
              className="btn button-color text-white"
              style={{ width: 60 }}
            >
              Edit
            </button>
          </div>
        </div>
        <div
          className="card p-3 col-md-9 gap-3 border-0"
          style={{
            backgroundColor: "rgb(241,241,241)",
          }}
        >
          <div className="card border-0">
            <div className="card-body d-flex row">
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Create Date - Time
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.createdAt
                        ? moment(inspectionData.createdAt).format(
                            "DD/MM/YYYY - HH:mm:ss"
                          )
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Inspection ID:
                </label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext "
                    value={
                      inspectionData?.inspectionID
                        ? inspectionData.inspectionID
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">Standard:</label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.standardName
                        ? inspectionData.standardName
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Total Sample:
                </label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.jsonFile
                        ? `${inspectionData?.jsonFile?.grains?.length} Kernal`
                        : 0
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Update Date - Time:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.updatedAt
                        ? moment(inspectionData.updatedAt).format(
                            "DD/MM/YYYY - HH:mm:ss"
                          )
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-body d-flex row">
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">Note</label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={inspectionData?.note ? inspectionData.note : ""}
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">Price</label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.price
                        ? inspectionData.price.toLocaleString()
                        : ""
                    }
                  />
                </div>
              </div>

              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Date/Time of Sampling
                </label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.samplingDate
                        ? moment(inspectionData.samplingDate).format(
                            "DD MMMM YYYY HH:mm:ss"
                          )
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="mb-3 col-6">
                <label className="col-form-label text-muted">
                  Sampling Point
                </label>
                <div className="">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={
                      inspectionData?.samplingPoint
                        ? inspectionData.samplingPoint
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-body">
              <h3>Composition</h3>
              <table className="table table-hover">
                <thead className="">
                  <tr>
                    <th className="col-8" scope="col">
                      Name
                    </th>
                    <th className="col-2" scope="col">
                      Length
                    </th>
                    <th className="col-2" scope="col">
                      Actual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">ข้าวเต็มเมล็ด</td>
                    <td className="text-muted ">
                      {inspectionData?.standardData[0]?.conditionMin === "GT"
                        ? ">"
                        : "<"}{" "}
                      {inspectionData?.standardData[0]?.minLength}
                    </td>
                    <td className="text-success">
                      {`${inspectionData?.calculatedResult?.composition?.wholegrain?.toFixed(
                        2
                      )} %`}
                    </td>
                  </tr>
                  <tr>
                    <td>ข้าวหักใหญ่</td>
                    <td className="text-muted ">
                      {inspectionData?.standardData
                        ? `${inspectionData?.standardData[1].minLength} - ${
                            inspectionData?.standardData[1].maxLength - 0.01
                          }`
                        : ""}
                    </td>
                    <td className="text-success">
                      {`${inspectionData?.calculatedResult?.composition?.broken_rice1?.toFixed(
                        2
                      )} %`}
                    </td>
                  </tr>
                  <tr>
                    <td>ข้าวหักธรรมดา</td>
                    <td className="text-muted ">
                      {inspectionData?.standardData
                        ? `${inspectionData?.standardData[2].minLength} - ${
                            inspectionData?.standardData[2].maxLength - 0.01
                          }`
                        : ""}
                    </td>
                    <td className="text-success">
                      {`${inspectionData?.calculatedResult?.composition?.broken_rice2?.toFixed(
                        2
                      )} %`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card border-0">
            <div className="card-body">
              <h3>Defect Rice</h3>
              <table className="table  table-hover">
                <thead className="">
                  <tr>
                    <th className="col-10" scope="col">
                      Name
                    </th>

                    <th className="col-2" scope="col">
                      Actual
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">yellow</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.yellow?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">paddy</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.paddy?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">damaged</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.damage?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">glutinous</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.glutinous?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">chalky</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.chalky?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">red</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.red?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                  <tr>
                    <td className="">Total</td>
                    <td className="text-success">{`${inspectionData?.calculatedResult?.defective?.total?.toFixed(
                      2
                    )} %`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Result;
