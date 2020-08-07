import React, { useEffect, useState, Component } from "react";
import { Route, Link } from 'react-router-dom';
import { FaCode } from "react-icons/fa";
import { Formik } from 'formik';
import { Card, Avatar, Col, Typography, Row, Button, Form} from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from 'yup';
import moment from "moment";
import { BACK_URL } from "../../Link";
import "./LandingPage.css";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {
   const dispatch = useDispatch();
   const [key, setKey] = useState('');
   console.log(props)
    const onChangeKey = e => {
      setKey(e.target.value);
    };

    useEffect(() => {
      
    }, [key]);



   return (
      <div class="main">
         <h1 class="main_title">우리들의<br />고여버린 기억💦</h1>
         <form class="main_box" method="post">
            <input required class="main_input" type="text" placeholder="키워드"
               onChange={onChangeKey}
            />
            <div class="icon_box">
               <button class="mike_button"><span class="material-icons">👄</span></button>
               <Link to={{
                  pathname : `/search/${key}`,
                  state : {
                     key : key
                  }
               }}>
                  <span class="material-icons">🔍</span>
               </Link>
            </div>
         </form>
      </div>
   )

}

export default LandingPage;