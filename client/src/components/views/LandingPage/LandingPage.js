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

<div class="main">
     <h1 class="main_title">우리들의<br/>고여버린 기억💦</h1>
     <form class="main_box" method="post">
        <input class="main_input" type="text"/>
           <div class="icon_box"> 
              <button class="mike_button"><span class="material-icons">👄</span></button>
              <a href="/search" class="search_button"><span class="material-icons">🔍</span></a>
           </div>
     </form>
  </div>
  );

}

export default LandingPage;