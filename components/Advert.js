import Author from "./Author"
import "../static/style/components/advert.css"
import { useEffect, useState } from "react"
import axios from "axios"
import servicePath from '../config/apiUrl'

const Advert = () => {
  const [links,setLinks] = useState()
  useEffect(()=>{
    axios(servicePath.getLinks).then(res=>{
      setLinks(res.data.data)
    })
  },[])
  return (
    <div className="ad-div comm-box">
    {links?links.map(item=>{
      return (
        <div>
          <h4>{item.name}</h4>
          <a href={item.url}>{item.url}</a>
        </div>
      )
    }):null}
     </div>
  )
}
export default Advert