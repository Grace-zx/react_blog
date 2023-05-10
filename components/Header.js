import React, { useState,useEffect } from 'react';
import '../static/style/components/header.css'
import {Row, Col, Menu, Icon,Modal,Input,Button,message}  from 'antd' 
import MenuItem from 'antd/lib/menu/MenuItem';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import servicePath from '../config/apiUrl'
import properties from 'highlight.js/lib/languages/properties';
const {TextArea} = Input
const Header = () => {
  const [navArray , setNavArray] = useState([])
  useEffect(()=>{
      //获取头部列表
      const fetchData = async ()=>{
          const result= await axios(servicePath.getTypeInfo)
                              .then(
                                  (res)=>{
                                      setNavArray(res.data.data)
                                      return res.data.data
                                  }
                                )
          setNavArray(result)
      }
      fetchData()


  },[])//[]为空的时候表示只有第一次进入的时候才使用
  //跳转到列表页
  const handleClick = (e)=>{
    if(e.key==0){
        Router.push('/index')
    }
    // else if(e.key==2){
    //   props.history.push('/photo')
    // }else if(e.key==4){
    //   Router.push('/message')
    // }
    // else if(e.key==7){
    //   Router.push('/Message')
    // }
    else{
        Router.push('/list?id='+e.key)
    }


  }
  const [name,setName] = useState('')//留言者笔名
  const [comment,setComment] = useState('')//留言内容
  const [visible,setVisible] = useState(false)
  const handleSubmit = () => {
    let dataProps = {}
    dataProps.name = name
    dataProps.content = comment
    let time = moment().add(10, 'days').calendar()
    let dateText = time.replace('-','/')//改变时间格式
    dataProps.dateTime = (new Date(dateText).getTime())/1000 //变成时间戳
    // axios({
    //   method:'post',//请求方法
    //   url:servicePath.getAddMessage,//请求url
    //   data:dataProps,
    //   withCredentials:true
    // }).then(res=>{
    //   console.log(res)
    //   message.success('留言成功！博主审核通过留言才可查看哦！')
    // }).catch(error=>{
    //   message.error('留言失败！')
    // })
  }
  return (
    <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={10} xl={9}>
        <span className="header-logo">周旭</span>
        <span className="header-text">前端开发新手，一直都在努力</span>
      </Col>
      <Col xs={0} sm={0} md={14} lg={8} xl={9}>
        {/* <span onClick={()=>setVisible(true)}>我要留言</span> */}
        <Menu mode="horizontal" onClick={handleClick}>
          <MenuItem key="0">
            <Icon type="home" />首页
          </MenuItem>
          {
            navArray.map(item=>{
              return (
                <MenuItem key={item.Id}>
                <Icon type={item.icon} />
                   {item.typeName}
              </MenuItem>
              )
            })
          }
        </Menu>
      </Col>
    </Row>
    <Modal visible={visible}>
    <br/>
        <h4>你的笔名：</h4><Input onChange={(e)=>setName(e.target.value)} placeholder="请输入你的笔名"/>
        <br/><br/>
        <h4>留言内容：</h4><TextArea rows={4} onChange={(e)=>setComment(e.target.value)} placeholder="请输入留言内容" />
        <br/>
        <br/><Button type="primary" onClick={handleSubmit}>提交</Button>
    </Modal>
  </div>
  )
}

export default Header