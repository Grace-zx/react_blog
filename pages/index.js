import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {Row, Col, List, Icon}  from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/index.css'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
//主页
function Home(list) {

  const [mylist,setMylist] = useState(list.data)
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
  useEffect(()=>{
    console.log(list)
  })
  return (
    <div className="container">
      <Head>
        <title>周旭的个人博客</title>
      </Head>
      {/* 头部-导航栏 */}
      <Header />
      <Row className="comm-main" type="flex" justify="center">
      {/* xs相当于手机上、相当于平板、md相当于电脑、lg、xl相当于更大的屏幕（分辨率） */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            // header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                {/* 点击标题跳转到详细页面 */}
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar"/>{item.addTime}</span>
                  <span><Icon type="folder"/>{item.typeName}</span>
                  <span><Icon type="fire"/>{item.view_count}</span>
                </div>
                <div className="list-context"
                   dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                 >
                  
                </div>
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
Home.getInitialProps = async ()=>{
  const promise = new Promise((resovle,reject)=>{
    axios(servicePath.getArticleList)
    .then(res=>{
      resovle(res.data)
    })
  })
  return await promise
}
export default Home