import Head from 'next/head'
import Link from 'next/link'
import {Button} from 'antd'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import {Row, Col, Menu, Icon, Breadcrumb,Affix}  from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import "../static/style/pages/detailed.css"
// import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import Tocify from '../components/tocify.tsx'
// import { futimesSync } from 'node:fs'
import servicePath from '../config/apiUrl'
import { useEffect } from 'react'

// 详细页
const Detailed = (props) => {
  //marked
  const renderer = new marked.Renderer()
  //###代表等级
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    }
  useEffect(()=>{
    console.log(props)
  },[])
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,//容错代码不处理
    sanitize:false,//忽略html代码
    tables:true,
    breaks:false,//换行符
    smartLists:true,//自动渲染列表
    highlight:function(code){//高亮
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)
  return (
    <div className="container">
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/">{props.typeName}</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>{props.title}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              {props.title}
            </div>
            <div className="list-icon center">
              <span><Icon type="calendar"/>{props.addTime}</span>
              <span><Icon type="snippets"/>{props.typeName}</span>
              {/* <span><Icon type="fire"/>{props.view_count}人</span> */}
            </div>
            <div className="detailed-content"
              dangerouslySetInnerHTML={{__html:html}}
            >
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          {/* 固钉 */}
          <br/>
          <Affix offsetTop={5}>
            <div className="deailed-nav comm-box">
              <div className="nav-title">日志目录</div>
                {tocify && tocify.render()}
            </div>
          </Affix>
          
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Detailed.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id)
    .then(res=>{
      resolve(res.data.data[0])
    })
  })
  return await promise
}
export default Detailed