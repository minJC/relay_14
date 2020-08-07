import React from 'react';
import { Menu } from 'antd';
import {Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="친구추천" style={{marginTop: '5px'}}>
        <a href="/youknow">친구추천</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu