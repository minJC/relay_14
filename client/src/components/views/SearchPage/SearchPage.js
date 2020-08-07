import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import "./SearchPage.css";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <div class="root">
    <div class="top">
       <h1 class="search_title">우리들의 고여버린 기억</h1>
       <form class="search_box" method="post">
          <input class="search_input" type="text"/>
           <div class="icon_box"> 
              <button class="mike_button"><span class="material-icons">👄</span></button>
              <a href="/search" class="search_button"><span class="material-icons">🔍</span></a>
           </div>
       </form>
      <div class="tag_box">
        <span class="tag_item">군자초</span>
        <span class="tag_item">18기</span>
        <span class="tag_item">보이스카우트</span>
      </div>
    </div>
    <div class="people_main_box">
      <p class="people_main_title">혹시, 너도 고였니?😉</p>
      <div class="people_box">
        
        <div class="people_item">
          <button class="plus_button">♡</button>
          <div class="people_item_top">
            <img class="people_img" src="http://bitly.kr/ZSe0zuqUN1b" alt="profile_img"></img>
            <div class="people_content">
              <p class="people_name">아이유</p>
               <p class="people_school">군자초등학교</p>
               <p class="people_email">i_lov_u@naver.com</p>
            </div>
          </div>
          <div class="people_item_bottom">
                <div class="people_tag_box">
                    <span class="people_tag_item">군자초</span>
                    <span class="people_tag_item">18기</span>
                    <span class="people_tag_item">걸스카우트</span>
               </div>
           </div>  
        </div>
      
      <div class="people_item">
          <button class="plus_button">♡</button>
          <div class="people_item_top">
            <img class="people_img" src="http://bitly.kr/ZSe0zuqUN1b" alt="profile_img"></img>
            <div class="people_content">
              <p class="people_name">아이유</p>
               <p class="people_school">군자초등학교</p>
               <p class="people_email">i_lov_u@naver.com</p>
            </div>
          </div>
         <div class="people_item_bottom">
                <div class="people_tag_box">
                    <span class="people_tag_item">군자초</span>
                    <span class="people_tag_item">18기</span>
                    <span class="people_tag_item">걸스카우트</span>
               </div>
            </div>  
         </div>
        </div>
     </div>
  </div>
  );
}

export default withRouter(LoginPage);