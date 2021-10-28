import './mypost.css'
import {useState, useEffect} from 'react';
import {getToken} from '../authentication/auth';
import {Link} from 'react-router-dom' 
// import {useHistory} from 'react-router-dom' 
function MyPost() {
    // let history = useHistory()
  const [posts, setpost] = useState([])
  const [deleted, setdeleted] = useState(true) 
  const [postupdate, setpostupdate] = useState([]) 
  const [boll, setboll] = useState(false)
  const [load, setload] = useState(true)

  const [title, settitle] = useState('')
  const [body, setbody] = useState('') 
  const [images, setimages] = useState('') 
  const [url, seturl] = useState('')

  // Post Deleting 
  const clickdelete = async e => {  
    e.preventDefault();
    var x = window.confirm("conform for delete");
    if(x)
    {
      try{
            const response = await fetch(`http://localhost:5000/posts/userpost/${e.target.name}`,{
            method: 'DELETE', 
            headers: { 
                'Content-Type': 'application/json',
                'verify' : `Bearer ${getToken()}`
              }
        })
            const data = await response.json()
            setdeleted(deleted ? false : true) 
            alert(data.message)
        }catch(e){
            console.log(e) 
          }
      }
    }
   
  //  updating when we click on the id and calling the send() function
  const clickupdate = (e) => { 
    e.preventDefault();
    const postid = e.target.name 
    setpostupdate(postid) 
    setboll(true) 
    send(postid) 
  }

  // Getting the data for the required id
  const send = async (postupdate) =>{
      try{
        const response = await fetch(`http://localhost:5000/posts/userpost/${postupdate}`,{
        method: 'GET', 
        headers: { 
            'Content-Type': 'application/json',
            'verify' : `Bearer ${getToken()}`
          }
        }) 
        const data = await response.json()
        settitle(data.findpost.title)
        setbody(data.findpost.body)
        setimages(data.findpost.image)
      } catch(e){ 
        console.log(e)
        }
    }

  // fetching User Post
  async function Data(){ 
    try{ 
      const res = await fetch("http://localhost:5000/posts/userpost", {
        method: 'GET',
        mode:'cors',
        cache:'no-cache',
        headers: { 
          'Content-Type': 'application/json',
          'verify' : `Bearer ${getToken()}`
        },
      })
      const data = await res.json()
      setpost(data.findpost) 
    }catch(e){ 
      console.log(e)
    }
  }

  // when the post updated it will return the data
  useEffect (() =>{
    Data();
  }, [deleted]) 

  
  // posting the image in cloudinary 
  const updateposts = async (e) =>{
    var data = new FormData()
    data.append('file', images)
    data.append('upload_preset', "insta-clone") 
    data.append('cloud_name', "dhlac6v43")
    try{
      e.preventDefault(); 
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

  // when url changes it calls the senddata() function
  useEffect (() =>{
    if (url){
      senddata(postupdate);
    }
    else{
      console.log("url", url) 
    }
  }, [url])

  //  post update
  const senddata = async (e) => {
      try{
          const response = await fetch(`http://localhost:5000/posts/userpost/${postupdate}`,{
          method: 'PUT', 
          headers: { 
              'Content-Type': 'application/json',
              'verify' : `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                title, body, pic:url
          }) 
      })
          const data = await response.json()
          setboll(false)
          setdeleted(deleted ? false : true) 
          console.log(data.updatedpost)
      }catch(e){
          console.log(e)
        }
  }

  const loading =(e) => {
    setload()
  }
    return(
      <div className="postapp">
          <div className="header">
              <h1 className="leftText"><i class="fab fa-gg-circle"></i>Instaclone</h1>
              <div className="crightLogo"> 
              <Link to={'/post'}><h1 className="ic"><i class="fas fa-camera"></i></h1></Link>
              </div>
              <div className="createpost">
              <Link to={'./CreatePost'}><button className="sin">Create Post</button></Link>
              </div> 
          </div>
         {!boll && posts.map(post => { 
          return (
            <div className="container" key={post._id} >
                  <div className="details" >
                    <div className="name">
                        <div className="detailsName">
                            <h3 className="ename">{post.title}</h3>
                            <p className="place">Hyderabad</p> 
                        </div>
                
                    {!load && <div className="ed">
                        <button className="edit" name={post._id} onClick={name =>clickupdate(name)}>Edit</button>
                        <button className="delete" name={post._id} onClick={e => clickdelete(e)}>Delete</button>
                    </div> }
                    { load && <div className="loading" onClick={(e) => loading(e)}>
                        <h2 ><i class="fas fa-ellipsis-h"></i></h2>
                    </div> }
                    </div>
                    <div className="image2">
                        <img src={post.image} alt="10ximage" className="img2"></img>
                    </div>
                      <div className="logos">
                      <h2 className="like"><i class="far fa-heart"></i></h2>
                        <h2 className="send"><i class="far fa-paper-plane"></i></h2> 
                        <p className="date">{new Date().toLocaleDateString()}</p>
                      </div> 
                      <div className="liked">
                        <p>10 Likes</p> 
                      </div>
                      <div className="sentence1">
                          <b className="sentence">{post.body}</b>
                      </div>
                  </div>
                  </div>
                  )
        })
      }

        { boll &&
        <div className="createpostcontainer">
        <div className="postcreate">
          <div className="createpostlogo">
            <h1 className="posttext">Update Post</h1>
          </div>
          <div className="poststatus">
          </div>
        <form onSubmit={e => updateposts(e)} className="createpostform">
        <label>Title :</label>
        <input type="text" value={title} onChange={e => {settitle(e.target.value)}}></input>
        <label>Description :</label>
        <input type="text" value={body} onChange={e => {setbody(e.target.value)}}></input>
        <label>Image :</label> 
        <input type="file" onChange={(e) => setimages(e.target.files[0])}></input> 
        <button type="submit" className="createpostbtn">Update</button>
        </form> 
        <div className="cancel">
        <Link to={'/post'}><p className="backbtn">go back</p></Link>
        </div>
      </div>
      </div> 
      }
      </div>
  )
}
export default MyPost;
