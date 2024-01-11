// import styled from "styled-components";

// const HeaderDiv = styled.div`
//   background-color: rgb(241, 241, 241);
//   padding: 1.5rem;
//   padding-left: 4rem;
// `;

// const InspecButton = styled.button`
//   background: rgb(32, 123, 68);
// `;

const Home = () => {
  const paddingXaxis = {
    paddingLeft: "16rem",
    paddingRight: "16rem",
  };
  return (
    <div>
      {/* <HeaderDiv className="fw-bold ">EASYRICE TEST</HeaderDiv> */}
      <div
        className="fw-bold py-4"
        style={{
          backgroundColor: "rgb(241,241,241)",
          ...paddingXaxis,
          //   padding: "1.5rem",
          //   paddingLeft: "4rem",
        }}
      >
        EASYRICE TEST
      </div>
      <div
        className="mt-4 d-flex justify-content-end"
        style={{ ...paddingXaxis }}
      >
        {/* <InspecButton className="btn p-2 text-white">
          Create Inspection
        </InspecButton> */}

        <button
          className="btn text-white"
          style={{ background: "rgb(32, 123, 68)" }}
        >
          Create Inspection
        </button>
      </div>
    </div>
  );
};

export default Home;
