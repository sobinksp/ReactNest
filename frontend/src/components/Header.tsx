// import styled from "styled-components";

import { ReactNode } from "react";

// const HeaderDiv = styled.div`
//   background-color: rgb(241, 241, 241);
//   padding: 1.5rem;
//   padding-left: 4rem;
// `;

// const InspecButton = styled.button`
//   background: rgb(32, 123, 68);
// `;
interface HomeProps {
  children: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div>
      {/* <HeaderDiv className="fw-bold ">EASYRICE TEST</HeaderDiv> */}
      <div
        className="fw-bold py-4 padding-x mb-4"
        style={{
          backgroundColor: "rgb(241,241,241)",
          //   ...paddingXaxis,
          //   padding: "1.5rem",
          //   paddingLeft: "4rem",
        }}
      >
        EASYRICE TEST
      </div>
      {children}
    </div>
  );
};

export default Home;
