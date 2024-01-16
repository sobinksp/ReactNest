import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { AiOutlineSearch } from "react-icons/ai";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../ApiConfig";
import moment from "moment";

const columns: GridColDef[] = [
  { field: "createDate", headerName: "Create Date - Time", flex: 1 },
  { field: "inspectionID", headerName: "Inspection ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "standardName",
    headerName: "Standard",
    description: "This is the standard of inspection.",
    flex: 1,
  },
  {
    field: "note",
    headerName: "Note",
    description: "Inspection's note.",
    flex: 1,
  },
];

interface History {
  name: string;
  createDate: string;
  inspectionID: string;
  standardID: string;
  note: string;
  standardName: string;
  samplingDate: string;
  samplingPoint: Array<[]>;
  price: number;
}

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<History[]>([]);
  const [searchId, setSearchId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(10);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchHistory();
  }, [paginationModel]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    fetchHistory();
  };
  const fetchHistory = async () => {
    try {
      const res = await fetch(
        `${BASE_API_URL}/history?page=${paginationModel.page}&limit=${
          paginationModel.pageSize
        }&id=${searchId || ""}`
      );
      const data = await res.json();
      console.log(data);
      const transformedDate = data.inspections.map((item: any) => ({
        ...item,
        createDate: moment(item.createDate).format("DD/MM/YYYY HH:mm:ss"),
      }));

      setHistory(transformedDate);
      setRowCount(data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    navigate("/create");
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/history`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRows),
      });

      if (res.ok) {
        setHistory(
          history.filter((row) => !selectedRows.includes(row.inspectionID))
        );

        fetchHistory();
      } else {
        alert(`Failed to delete data. Status: ${res.status}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSelect = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedRows(rowSelectionModel as string[]);
  };

  return (
    <Header>
      <div
        className="d-flex justify-content-end container"
        // style={{ ...paddingXaxis }}
      >
        <button
          onClick={handleClick}
          className="d-flex btn text-white button-color mb-4 align-items-center"
        >
          <MdAdd size={25} />
          Create Inspection
        </button>
      </div>
      <div className="container mb-3">
        <div className="card">
          <div className="card-body ">
            <form onSubmit={handleSearchSubmit} className="d-flex flex-row row">
              <div className="col-md-4">
                <label className="form-label">ID</label>
                <input
                  type="text"
                  id="searchId"
                  value={searchId || ""}
                  onChange={(e) => setSearchId(e.target.value)}
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
              <div className="col-md-4 mb-2">
                <label className="form-label">To Date</label>
                <input
                  type="datetime-local"
                  id="dateTo"
                  className="form-control text-muted"
                />
              </div>
              <div className="d-flex justify-content-end mt-2">
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
      <div className="container mb-2 align-items-center d-flex">
        {selectedRows.length > 0 && (
          <>
            <button
              className="btn btn-outline-danger me-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <span>Select items: {selectedRows.length} item(s)</span>
          </>
        )}
      </div>
      <div className="container" style={{ width: "100%" }}>
        <DataGrid
          onRowClick={(RC) => navigate(`inspection/${RC.id}`)}
          rows={history}
          columns={columns}
          getRowId={(history) => history.inspectionID}
          density="compact"
          sx={{
            ".MuiDataGrid-columnHeader": {
              backgroundColor: "rgb(32, 123, 68)",
              color: "white",
              ".MuiSvgIcon-root": {
                color: "white",
              },
            },
            ".MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
          // initialState={{
          //   pagination: {
          //     paginationModel: { page: 0, pageSize: 10 },
          //   },
          // }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) =>
            handleSelect(selectionModel)
          }
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={rowCount}
        />
      </div>
    </Header>
  );
}

export default History;
