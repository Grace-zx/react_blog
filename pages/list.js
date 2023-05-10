import React, { useState ,useEffect} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List, Icon, Breadcrumb,Modal,Upload,Comment,message, Input, Button}  from 'antd'
import '../static/style/pages/list.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Message from '../components/Message' ;
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import moment from "moment";
const {TextArea} = Input
//列表页
const MyList = (list) => {

  const [mylist,setMylist] = useState(list.data)
  const [previewVisible,setPreviewVisible] = useState(false)
  const [previewImage,setPreviewImage] = useState('')//查看图片
  const [typeId,setTypeId] = useState()//留言id
  const [name,setName] = useState('')//留言者笔名
  const [comment,setComment] = useState('')//留言内容
  const [mevisible,setVisible] = useState(false)//弹出框显示与隐藏
  const [comreply,setComreply] = useState('')//回复评论
  const [thecontent,setTheContent] = useState('')
  const [time,setTime] = useState('')
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }
  const handleChange = ({ file,fileList }) => {
    console.log(fileList,'fileList','file',file,file.uid)
    return message.error('你没有删除权限！')
  }
  const handleCancel = () => {
    setPreviewVisible(false)
  } 
  useEffect(()=>{
    setMylist(list.data)//对于页面切换
    setTypeId(list.id)
    console.log(list.data,list.id,'id')
  },[])
  const renderer = new marked.Renderer();
    marked.setOptions({
      renderer: renderer,
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      sanitize:false,
      xhtml: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
    }) 
  return (
    <div className="container">
      <Head>
        <title>周旭的个人博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div"></div>
          {(list.id==1||list.id==3)?
          (
            <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>{list.id==1?"技术日志":"生活"}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <List 
              // header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item=>(
                <List.Item key={item.id}>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar"/>{item.addTime}</span>
                    <span><Icon type="snippets"/>{item.typeName}</span>
                    {/* <span><Icon type="fire"/>{item.view_count}人</span> */}
                  </div>
                  <div className="list-context"
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                    >
                    
                  </div>
                </List.Item>
              )}
            />
          </div>
          ):(list.id==2?(
            <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>相册</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="clearfix">
              <Upload
                // action="http://localhost:3000/index/photo"
                listType="picture-card"
                fileList={mylist}
                onPreview={handlePreview} 
                onChange={handleChange}
              >
                {/* <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传</div>
                </div> */}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            </div>
          ):(
            <div>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a>留言</a>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Message />
              <div>
                <List
                    className="comment-list"
                    // header={`${data.length} replies`}
                    itemLayout="horizontal"
                    dataSource={mylist}
                    renderItem={item => (
                      <li>
                        <Comment
                          // actions={[<span key="comment-list-reply-to-0" onClick={()=>handleReply(item.id,item.content,item.time,item.name)}>回复</span>,
                          //           <span key="comment-list-reply-to-1" onClick={()=>handledelete(item.id)}>删除</span>]}
                          author={item.name}
                          avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                          content={item.content}
                          datetime={item.time}
                          children={item.reply?
                              <p>
                                <Comment
                                  // actions={[<span key="comment-list-reply-to-1" onClick={()=>handledeleteReply(item.id)}>删除</span>]}
                                  author='博主'
                                  avatar='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=215584831,3270566018&fm=11&gp=0.jpg'
                                  content={item.reply}
                                />
                              </p>:null}
                        />
                      </li>
                    )}
                  />
              </div>
            </div>
          ))
          }
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
MyList.getInitialProps = async (context)=>{
  let id =context.query.id
  if(id==1||id==3){
     //日志和生活
    const promise = new Promise((resolve)=>{
      axios(servicePath.getListById+id).then(
        (res)=>resolve(res.data)
      )
    })
    return await promise
  }else if(id==2){
     //相册
    const promise = new Promise((resolve)=>{
      axios(servicePath.getPhotoList+id).then(
        (res)=>resolve(res.data)
      )
    })
    return await promise
  }else if(id==4){
    //留言
    const promise = new Promise((resolve)=>{
      axios(servicePath.getMessageList+id).then(
        (res)=>resolve(res.data)
      )
    })
    return await promise
  }
}
export default MyList
