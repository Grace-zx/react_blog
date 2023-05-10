import React, { useState ,useEffect} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col, List, Icon, Breadcrumb}  from 'antd'
import '../static/style/pages/list.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
//列表页
const Photo = (list) => {

  const [mylist,setMylist] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)//对于页面切换
  })
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

  }); 
  return (
    <div className="container">
      <Head>
        <title>周旭的个人博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div"></div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>相册</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <List 
            header={<div>最新照片</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                {/* <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div> */}
                <div className="list-icon">
                  <span><Icon type="calendar"/>{item.time}</span>
                  <span><Icon type="snippets"/>{item.name}</span>
                  {/* <span><Icon type="fire"/>{item.view_count}人</span> */}
                </div>
                {/* <div className="list-context"
                   dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                 >
                  
                </div> */}
                <div>{item.url}</div>
              </List.Item>
            )}
          />
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
Photo.getInitialProps = async (context)=>{
  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getPhotoList+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}
export default Photo
