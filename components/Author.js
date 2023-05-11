import {
  GithubOutlined,
  MailOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import servicePath from '../config/apiUrl';
import '../static/style/components/author.css';

const Author = () => {
  const [list, setList] = useState()
  useEffect(() => {
    axios(servicePath.getInformation, { withCredentials: true }).then(res => {
      setList(res.data.data)
    })
  }, [])

  return (
    <div className="author-div comm-box">
      {list ? (
        <div>
          <div><Avatar size={100} src="https://img2.baidu.com/it/u=3960399841,3186234025&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1683824400&t=75a674854bb2b040827626855ee231c0" /></div>
          <div className="author-name">{list.name}</div>
          <div className="author-introduction">{list.introduce}</div>
          <Divider>社交账号</Divider>
          <a href='https://github.com/Grace-zx'><Avatar size={28} icon={<GithubOutlined />} className="account" />{list.github}</a>
          <Avatar size={28} icon={<QqOutlined />} className="account" />{list.qq}
          <Avatar size={28} icon={<WechatOutlined />} className="account" />{list.wechat}
          <Avatar size={28} icon={<MailOutlined />} className="account" />{list.email}
        </div>
      ) : null}

    </div>

  )
}

export default Author
