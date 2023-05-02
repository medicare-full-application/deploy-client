import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRandomNumber } from "../../redux/randomRedux";
import styled from "styled-components";

import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { checkUserEmail } from "../../redux/userApiCalls";
import Swal from "sweetalert2";

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

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const isFetching = useSelector((state) => state.user.currentUser);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);

  const [allErrorShow, setAllErrorShow] = useState(false);
  const dispatch = useDispatch();
  const form = useRef();
  const [show, setShow] = useState(false);
  // const [randomNumber, setRandomNumber] = useState(0);
  const navigation = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
    };
    console.log(loginData);
    // navigate("/dashboard");
    const result = await checkUserEmail(loginData, dispatch);
    console.log(result);

    if (result.data.length != 0) {
      setData(result);
      setUserId(result._id);
      sendEmail(result);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email not found!",
      });
    }
    //   try {
    //     let response = await fetch("http://localhost:5000/api/v1/user/email", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // token: token,
    //       },
    //       body: JSON.stringify({
    //         email: email,
    //       }),
    //     });
    //     let json = await response.json();
    //     // console.log(json);
    //     setData(json[0]);
    //     setUserId(json[0]._id);
    //     sendEmail(json[0]);
    //     // dispatch(loginSuccess(json[0]));
    //     // checkLogin(json[0]._id);
    //   } catch (error) {
    //     setAllErrorShow(true);
    //   }
    // };
    // checkEmail();
  };

  //   updatePassword
  const sendEmail = (userData) => {
    let RandomNumber = Math.floor(Math.random() * 10000) + 1;
    var templateParams = {
      user_name: userData.username,
      user_email: userData.email,
      message: RandomNumber,
    };

    // console.log(templateParams);

    emailjs
      .send(
        "service_ntuuid7",
        "template_w2rkcus",
        templateParams,
        "vA6A11HyUlQUiCURz"
      )
      .then(
        (result) => {
          // console.log(result.text);
          // e.target.reset();
          // window.location.href = "http://localhost:3000/updatePassword";
          dispatch(setRandomNumber({RandomNumber:RandomNumber,userId:userData.data[0]._id}));
          console.log(userData);
          navigation("/validation", { RandomNumber: RandomNumber });
          Swal.fire({
            icon: "success",
            title: "Email Sent",
            text: "Email Sent Successfully!",
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email Sent Unsuccessfully!",
          });
        }
      );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form onSubmit={handleClick} ref={form}>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button>Send Email</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default ForgetPassword;
