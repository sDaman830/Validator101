import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  font-size: 18px;
  border: 1px solid #4caf50;
  background-color: #1a1a1a;
  color: #fff;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ResultText = styled.p`
  font-size: 20px;
`;

const DetailsContainer = styled.div`
  margin-top: 10px;
`;

const Detail = styled.p`
  font-size: 18px;
`;

const App = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const handleCheckNumber = async () => {
    try {
      const response = await axios.post(
        "https://validator-backend1.onrender.com/check-number",
        {
          number,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Validity Checker</Title>
      <Input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />
      <Button onClick={handleCheckNumber}>Check Number</Button>

      {result && (
        <ResultContainer>
          <ResultText>
            {result.success ? "Number is valid" : "Number not found"}
          </ResultText>
          {result.success && (
            <DetailsContainer>
              <Detail>Expiry Date: {result.expiryDate}</Detail>
              <Detail>Validity: {result.validity}</Detail>
            </DetailsContainer>
          )}
        </ResultContainer>
      )}
    </Container>
  );
};

export default App;
