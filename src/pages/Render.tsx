import { useNavigate } from "react-router-dom";
import styled from "styled-components"


export default function Render() {
  const navigation = useNavigate();
  return (
    <Container>
      <Title>Render</Title>
      <Wrap>
        <Button onClick={() => navigation("/registration")}>지원자 등록</Button>
        <Button onClick={() => navigation("/applicants")}>지원자 목록</Button>
      </Wrap>
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  margin-top: 20vh;
  border: 1px solid #2c3e50;
  border-radius: 15px;
  background-color: #ecf0f1;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 15%;
`;
const Title = styled.h2`
  text-align: center;
  margin-top: 10%;
  font-size: 22px;
`
const Button = styled.div`
  border: 1px solid #95a5a6;
  color: #fff;
  margin: 10px auto;
  width: 150px;
  padding: 10px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  border-radius: 5px;
  background-color: #769fc9;
  cursor: pointer;
  :hover{
    background-color: #557391;
  }
`;