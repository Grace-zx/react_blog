import React, { Component, useEffect, useState } from 'react';
import {Avatar, Divider} from 'antd'
import '../static/style/components/author.css'
import axios from 'axios'
import servicePath from '../config/apiUrl';

const Author = () => {
  const [list,setList] = useState() 
  useEffect(()=>{
    axios(servicePath.getInformation,{withCredentials:true}).then(res=>{
      setList(res.data.data)
    })
  },[])
  return (
    <div className="author-div comm-box">
    {list?(
      <div>
        <div><Avatar size={100} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=215584831,3270566018&fm=11&gp=0.jpg" /></div>
        <div className="author-name">{list.name}</div>
        <div className="author-introduction">{list.introduce}</div>
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" /> {list.github} 
        <Avatar size={28} icon="qq" className="account" />{list.qq}
        <Avatar size={28} icon="wechat" className="account" />{list.wechat}
        <Avatar size={28} icon="mail" className="account" />{list.email}
        </div>
    ):null}
      
    </div>

  )
}

export default Author
