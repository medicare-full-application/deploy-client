import { useState, useRef } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1682622259/medicare/9835_fs1qfl.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const ValidationPage = () => {
  const [randomNumber, setRandomNumber] = useState("");
  const [allErrorShow, setAllErrorShow] = useState(false);
  const form = useRef();
  const navigate = useNavigate();
  const randomValue = useSelector((state) => state.random.randomNumber);
  const userId = useSelector((state) => state.random.userId);
  //   console.log(randomValue);

  const handleClick = (e) => {
    e.preventDefault();
    if (randomValue == randomNumber) {
      navigate(`/updatePassword/${userId}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Verification Code Invalid!",
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Verification</Title>
        <Form onSubmit={handleClick} ref={form}>
          <Input
            placeholder="Verification code"
            onChange={(e) => setRandomNumber(e.target.value)}
            required
          />

          <Button>Submit</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ValidationPage;
