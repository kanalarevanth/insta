import {useState, useEffect} from 'react';
import './Post.css';
import {getToken} from '../authentication/auth';
import {Link} from 'react-router-dom'

function Post() {
  const [posts, setpost] = useState([]) 
  async function Data(){ 
    try{ 
      const res = await fetch("http://localhost:5000/posts", {
        method: 'GET',
        mode:'cors',
        cache:'no-cache',
        headers: { 
          'Content-Type': 'multipart/form-data',
          'verify' : `Bearer ${getToken()}`
        },
      })
      const data = await res.json() 
      setpost(data.userpost)
    }catch(e){
      console.log(e)
    }
  }
  useEffect (() =>{
    Data();
  }, [])

    return(
      <div className="postapp"> 
          <div className="header">
              <h1 className="leftText"><i class="fab fa-gg-circle"></i>Instaclone</h1>
              <div className="crightLogo">
              <h1><i class="fas fa-camera"></i></h1>
              </div>
              <div className="createpost">
              <Link to={'./post/CreatePost'}><button className="sin">Create Post</button></Link>
              <Link to={'./post/userpost'}><button className="my">My Post</button></Link>
              </div> 
          </div>
        {posts.map(post => { 
          return (
            <div className="container" key={post._id}> 
                <div className="details"> 
                    <div className="name"> 
                        <div className="detailsName">
                            <h3 className="ename">{post.title}</h3>
                            <p className="place">Hyderabad</p> 
                        </div> 
                        <div className="loading">
                          <h2><i class="fas fa-ellipsis-h"></i></h2>
                        </div> 
                    </div>
                    <div className="image1">
                        <img src={post.image} alt="NoImage" className="img1"></img>
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
        }
          )}
      </div>
  )
}
export default Post;
