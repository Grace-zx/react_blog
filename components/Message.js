import React, { useState,useEffect } from 'react';
import '../static/style/components/header.css'
import {Row, Col, Menu, Icon,Input,Button,message,Modal}  from 'antd' 
import MenuItem from 'antd/lib/menu/MenuItem';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import properties from 'highlight.js/lib/languages/properties';
import moment from "moment";
const {TextArea} = Input
function Message(){
  const [name,setName] = useState('')//留言者笔名
  const [comment,setComment] = useState('')//留言内容
  const [visible,setVisible] = useState(false)
  const [dataProps,setDateProps] =useState('')
  // useEffect(()=>{
  //   setVisible(true)
  //   axios({
  //     method:'post',//请求方法
  //     url:servicePath.getAddMessage,//请求url
  //     data:dataProps,
  //     withCredentials:true
  //   }).then(res=>{
  //     console.log(res)
  //     message.success('留言成功！博主审核通过留言才可查看哦！')
  //   }).catch(error=>{
  //     message.error('留言失败！')
  //   })
  // },[dataProps])
  const handleSubmit = () => {
    let dataProps = {}
    dataProps.name = name
    dataProps.content = comment
    let time = moment().add(10, 'days').calendar()
    let dateText = time.replace('-','/')//改变时间格式
    dataProps.dateTime = (new Date(dateText).getTime())/1000 //变成时间戳
    console.log(dataProps,'dataProps')
    setDateProps(dataProps)
    axios({
          method:'post',//请求方法
          url:servicePath.getAddMessage,//请求url
          data:dataProps,
          withCredentials:true
        }).then(res=>{
          console.log(res)
          message.success('留言成功！博主审核通过留言才可查看哦！')
        }).catch(error=>{
          message.error('留言失败,请添加博主qq！')
        })
  }
  return (
    <div>
    <br/>
        <h4>你的笔名：</h4><Input onChange={(e)=>setName(e.target.value)} placeholder="请输入你的笔名"/>
        <br/><br/>
        <h4>留言内容：</h4><TextArea rows={4} onChange={(e)=>setComment(e.target.value)} placeholder="请输入留言内容" />
        <br/>
        <br/><Button type="primary" onClick={handleSubmit}>提交</Button>    
    </div>
  )
}
// Message.getInitialProps = async ()=>{
//   const promise = new Promise((resovle,reject)=>{
//     axios(servicePath.getArticleList)
//     .then(res=>{
//       resovle(res.data)
//     })
//   })
//   return await promise
// }

export default Message