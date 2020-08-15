import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { Title } = Typography;
const { Meta } = Card;

function FindResultPage(props) {
  const [Users, setUsers] = useState([]);
  var image =
    "https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg";
  let user = useSelector((state) => state.user.findData).user;

  console.log("=== === === ");
  console.log(user);

  if (user === undefined) {
    user = [];
  }

  const UserVariable = {
    userId: user,
  };
  console.log("console.log(user);", props);

  let friendsArray = [""];

  const addFriend = (userData) => {
    console.log(userData._id);
  };

  //카드 css 동적 변경
  let cardStyle = function () {
    if (true) {
      return {
        marginBottom: "40px",
        width: "180px",
        textAlign: `center`,
      };
    }
    return {
      border: `2px solid black`,
      marginBottom: "40px",
      width: "180px",
      textAlign: `center`,
    };
  };

  if (user.length != 0) {
    //서버에서 유저 데이터를 전달 받았을 경우
    const renderCards = user.map((users, index) => {
      return (
        <Col lg={6} md={8} xs={24}>
          <div
            style={cardStyle()}
            onClick={() => {
              addFriend(users);
            }}
          >
            <div
              style={{
                position: "relative",
                margin: "0px 10px",
                width: "150px",
                height: "150px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,.2)",
                borderRadius: "10px 10px",
              }}
            >
              <img
                style={{ width: "100%", height: "100%", display: `inline` }}
                alt="thumbnail"
                src={`${users.image}`}
              />
            </div>
            <div
              style={{
                paddingLeft: "60px",
                position: "relative",
                bottom: "8px",
              }}
            >
              <h3>{`${users.name}`}</h3>
            </div>
          </div>
        </Col>
      );
    });
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <section
          id="mainsection"
          style={{
            backgroundImage: `url(${image})`,
            padding: "60px 0px",
            textAlign: "center",
            height: "150px",
          }}
        >
          <a href="/upload">
            <p style={{ color: "white", fontSize: "26px", margin: "0px" }}>
              여러분이 찾는 친구
            </p>
          </a>
        </section>
        <br />
        <br />
        <br />
        <Row gutter={16}>{renderCards}</Row>
        <hr />
      </div>
    );
  } else {
    //서버에서 전달된 데이터가 없을 경우
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <section
          id="mainsection"
          style={{
            backgroundImage: `url(${image})`,
            padding: "60px 0px",
            textAlign: "center",
            height: "150px",
          }}
        >
          <a href="/upload">
            <p style={{ color: "white", fontSize: "26px", margin: "0px" }}>
              여러분이 찾는 친구
            </p>
          </a>
        </section>
        <br />
        <br />
        <br />
        일치하는 친구가 없어요..
      </div>
    );
  }
}

export default FindResultPage;