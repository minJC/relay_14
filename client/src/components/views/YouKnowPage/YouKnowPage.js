import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import {BACK_URL} from '../../Link'
const { Title } = Typography;
const { Meta } = Card;

function YouKnowPage(props) {

    const [Posts, setPosts] = useState([])
    var image = 'https://static.wadiz.kr/main/media/img-fundingopen-pc@2x.3311937d.jpg';
    var mainImg = 'https://cdn.wadiz.kr/ft/images/green001/2020/0605/20200605142924749_2233.jpg/wadiz/optimize/';
    useEffect(() => {
        axios.get(/*localhost123*/'/api/users/getUser')
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data)
                    setPosts(response.data.user)
                } else {
                    alert('Failed to get User Data')
                }
            })
    }, [])


    const renderCards = Posts.map((users, index) => {


        return <Col lg={6} md={8} xs={24} style={{ marginBottom: '40px' }}>
           
            <div style={{ position: 'relative', margin: '0px 10px', width:'150px', height: '150px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.2)', borderRadius: '10px 10px' }}>
            <img style={{ width: '100%' }} alt="thumbnail" src={`${users.image}`} />
            </div>
            <div><h1>{`${users.name}`}</h1></div>
        </Col>
 
    })


    
    return (<div style={{ width: '100%', overflow: 'hidden' }}>
        <section id='mainsection' style={{ backgroundImage: `url(${image})`, padding: '60px 0px', textAlign: 'center', height: '150px' }}><a href="/upload">
            <h1 style={{ color: 'white', fontSize: '26px', margin: '0px' }}><b>알수도 있는 사람</b></h1>
            <p style={{ color: 'white', fontSize: '15px' }}>친구를 찾는데 도움이 됩니다.</p>
        </a>
        
        </section>
        <br/><br/><br/>
            <Row gutter={16}>{renderCards}</Row>
            <hr />

        
    </div>
    )
}

export default YouKnowPage
