import './CreatePost.css'
import {useState, useEffect} from 'react';
import {getToken} from '../authentication/auth';
import {Link} from 'react-router-dom'

function CreatePost() { 
  // let history = useHistory()
  const [loginmsg, setmsg] = useState('') 
  const [title, settitle] = useState('')
  const [body, setbody] = useState('')
  const [file, setfile] = useState('')
  const [url, seturl] = useState('')
  // const [urlstatus, seturlstatus] = useState(false)


  const senddata = async () => {
    try{
      const response = await fetch('http://localhost:5000/posts',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'verify' : `Bearer ${getToken()}`},
          body:JSON.stringify({
          title, body, pic:url 
        })
      })
      const data = await response.json();
      console.log(data) 
      setmsg(data.message)
    }catch(e){
      console.log(e) 
    } 
  } 
  useEffect (() =>{
    if (url){
      senddata();
    }
    else{
      console.log("url", url) 
    }
  }, [url]) 
  const CreatePost = async (e)=> {
    e.preventDefault();
    var data = new FormData()
    data.append('file', file)
    data.append('upload_preset', "insta-clone") 
    data.append('cloud_name', "dhlac6v43")

    try{
      const res = await fetch('https://api.cloudinary.com/v1_1/dhlac6v43/image/upload', {
      method:"POST",
      body:data
    })
      const getdata = await res.json();
      console.log("getdata",getdata) 
      seturl(getdata.url) 
  }catch (e){
    console.log(e) 
  }
   }
    return (
    <div className="createpostcontainer">
      <div className="postcreate">
        <div className="createpostlogo">
          <h1 className="posttext">Create Post</h1>
        </div>
        <div className="poststatus"> 
          <h3 className="postmsg">{loginmsg}</h3>
        </div>
      <form onSubmit={(e)=>CreatePost(e)} className="createpostform">
      <label>Title :</label>
      <input type="text" value={title} onChange={e => {settitle(e.target.value)}}></input>
      <label>Description :</label>
      <input type="text" value={body} onChange={e => {setbody(e.target.value)}}></input>
      <label>Image :</label> 
      <input type="file" onChange={(e) => setfile(e.target.files[0])}></input> 
      <button type="submit" className="createpostbtn">Upload</button>
      </form> 
      <div className="cancel">
      <Link to={'/post/userpost'}><p className="backbtn">go back</p></Link>
      </div>
    </div>
    </div>
    ) 
  } 
export default CreatePost;

  