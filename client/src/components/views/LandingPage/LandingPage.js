import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from "antd";
import axios from "axios";
import moment from "moment";
import { BACK_URL } from "../../Link";
import "./LandingPage.css";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  return (
    <body>
      <div class="main">
        <h1 class="search_title">우리들의 고여버린 기억</h1>
        <form class="search_box" method="post">
          <input class="search_input" type="text" />
          <div class="icon_box">
            <button class="mike_button">
              <span class="material-icons">mic</span>
            </button>
            <a href="/search" class="search_button">
              <span class="material-icons">search</span>
            </a>
          </div>
        </form>
      </div>
    </body>
  );
}

export default LandingPage;
