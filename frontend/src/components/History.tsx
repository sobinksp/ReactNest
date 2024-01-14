import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { AiOutlineSearch } from "react-icons/ai";
// import { IoIosAdd } from "react-icons/io";
import { MdAdd } from "react-icons/md";

function History() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create");
  };
  return (
    <Header>
      <div
        className="d-flex justify-content-end container"
        // style={{ ...paddingXaxis }}
      >
        {/* <InspecButton className="btn p-2 text-white">
          Create Inspection
        </InspecButton> */}

        <button
          onClick={handleClick}
          className="d-flex btn text-white button-color mb-4 align-items-center"
          //   style={{ background: "rgb(32, 123, 68)" }}
        >
          {/* <IoIosAdd size={25} /> */}
          <MdAdd size={25} />
          Create Inspection
        </button>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body ">
            <form className="d-flex flex-row row">
              <div className="col-md-4">
                <label className="form-label">ID</label>
                <input
                  type="text"
                  id="id"
                  placeholder="Search with ID"
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">From Date</label>
                <input
                  type="datetime-local"
                  id="dateFrom"
                  className="w-100 form-control text-muted"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">To Date</label>
                <input
                  type="datetime-local"
                  id="dateTo"
                  className="form-control text-muted"
                />
              </div>
              <div className="d-flex justify-content-end ">
                <button
                  type="submit"
                  className="d-flex btn text-white button-color align-align-items-center gap-1"
                >
                  <AiOutlineSearch size={24} className="mr-1" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default History;
