import React, { useEffect, useState } from 'react'
import axios from 'axios';
function FllowBtn(props) {

    const [follow, setfollow] = useState(false);
    const [Follow, setFollow] = useState([]);
    // useEffect(() => {
    //     console.log("useEffecttttcttttcttttcttttcttttcttttcttttcttttcttttcttttctttt")
    //     if(props.follow.length==0){
    //         console.log("tttt",props.follow);
    //       const userVariable = {
    //         userFrom: props.userFrom
    //       }
    //       axios.post('/api/follow/getlist',userVariable)       //follow친구 목록 가져오기
    //         .then(response => { 
    //           if (response.data.success) {
    //             setFollow(response.data.user)
    //           } else {
    //             alert('Failed to get Follow Data')
    //           }
    //         })
    //     }
    // }, [propstate])


    useEffect(() => {
        FollowORNot();
        
    }, [Follow])
    
    let arr = [];
    const following =()=>{
        console.log("follow",props.userFrom._id);
        const userVariable = {
            userFrom: props.userFrom._id,
            userTo: props.userTo._id
          } 
        axios.post('/api/follow/followFriend',userVariable)       //follow친구 목록 가져오기
        .then(response => {
            console.log(userVariable)
            if (response.data.success) {
                setfollow(true);
            } else {
                alert('Failed to get Follow Data')
            }
        })
    }
    const unfollow =()=>{
        console.log("unfollow",props.userFrom._id);
        const userVariable = {
            userFrom: props.userFrom._id,
            userTo: props.userTo._id
          } 
        axios.post('/api/follow/unfollowFriend',userVariable)       //follow친구 목록 가져오기
        .then(response => {
            if (response.data.success) {
                arr[arr.indexOf(props.userTo._id)]="";
                setfollow(false);
            } else {
                alert('Failed to get Follow Data')
            }
        })
    }

    
    const FollowORNot =()=>{
        if(props.follow.length==0){
            for(let i=0;i<Follow.length;i++){
                arr[arr.length]=props.follow[i].userTo;
            }
            console.log("userToName",arr);
            if(arr.includes(props.userTo._id)||follow){
                //setfollow(true);
                return (
                    <button class="plus_button" onClick={()=>{unfollow()}}>♥</button>
                )
            }else{
                //setfollow(false);
                return (
                    <button class="plus_button" onClick={()=>{following()}}>♡</button>
                )
            }
        }else{

        for(let i=0;i<props.follow.length;i++){
            arr[arr.length]=props.follow[i].userTo;
        }
        console.log("userToName",arr);
        if(arr.includes(props.userTo._id)||follow){
            //setfollow(true);
            return (
                <button class="plus_button" onClick={()=>{unfollow()}}>♥</button>
            )
        }else{
            //setfollow(false);
            return (
                <button class="plus_button" onClick={()=>{following()}}>♡</button>
            )
        }
        }
        //setfollow(flag);
    }
    
    // props.follow.forEach(element => {
    //     console.log(element.userTo, props.userTo._id)
    //     // if(element.userTo==props.userTo._id){
    //     //     setfollow(true);
    //     // }
    // });
    
    //FollowORNot();

    if(props.userFrom){      //로그인시
        FollowORNot();
        if(arr.includes(props.userTo._id)||follow)
            return (
                <button class="plus_button" onClick={()=>{unfollow()}}>♥</button>
            )
        else{
            return (
                <button class="plus_button" onClick={()=>{following()}}>♡</button>
            )
        }
    }
    return (            //로그인 안했을 때
        <button class="plus_button">-</button>
    )
    
}

export default FllowBtn

