import { useNavigate } from "react-router-dom";
import Header from "./Header";
function History() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };
  return (
    <Header>
      <div
        className="d-flex justify-content-end padding-x"
        // style={{ ...paddingXaxis }}
      >
        {/* <InspecButton className="btn p-2 text-white">
          Create Inspection
        </InspecButton> */}

        <button
          onClick={handleClick}
          className="btn text-white button-color mb-4"
          //   style={{ background: "rgb(32, 123, 68)" }}
        >
          Create Inspection
        </button>
      </div>
      <div className="padding-x">
        <div className="card">
          <div className="card-body "></div>
        </div>
      </div>
    </Header>
  );
}

export default History;
