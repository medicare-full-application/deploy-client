import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../redux/userApiCalls";
import { removeRandomNumber } from "../../redux/randomRedux";
import { logout } from "../../redux/userRedux";

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

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const userId = useSelector((state) => state.random.userId);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const userId = window.location.pathname.split("/")[2];

  const checkLogin = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const loginData = {
        password: password,
      };
      const result = await updateUserPassword(
        userId,
        loginData,
        dispatch
      );
      console.log(result);

      if (result) {
        dispatch(logout());
        dispatch(removeRandomNumber());
        // window.location.href = "http://localhost:3000/login";
        navigation("/");
        Swal.fire({
          icon: "success",
          title: "Password Changed!",
          text: "Password has been Changed!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password Changed Unsuccessfully!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Same Confirm Password!",
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form onSubmit={checkLogin}>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button>Change Password</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default UpdatePassword;
