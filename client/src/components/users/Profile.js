import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/'

import { client } from "../../utils";



// Should be capable to fetch data for Component isolation

const Profile = ({ history, children }) => {


  const { isAuthenticated, user, } = useAuth()

  // const [loginUser, setLoginUser] = React.useState(null)

  //console.log(user);
  // const loginUser = user.user

  const [avatar, setAvatar] = React.useState(null)
  const [error, setError] = React.useState(null)


  const avatarRef = React.useRef()
  const uploaderRef = React.useRef()

  const loadAvatar = () => {
    // console.log(loginUser);
    client.get(`/users/${user.user._id}/avatar`).then(({ data }) => {
      avatarRef.current.src = `http://localhost:5000/users/${user.user._id}/avatar`
    }).catch((response) => {
      console.log(response);
      //  setError(response.data.errors[0].message)
      avatarRef.current.src = '/images/user-1633249_1280.png'
    })
  }


  //React.useCallback(loadAvatar, [loginUser])

  React.useEffect(() => {
    // let isCurrent = true
    //  console.log(isAuthenticated);
    if (isAuthenticated) {
      loadAvatar()
    }

  }, [isAuthenticated])

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setError(null)
    setAvatar(file)

    if (file) {
      const reader = new FileReader();
      //   console.log(file);
      avatarRef.current.file = file;
      reader.onload = (e) => {
        avatarRef.current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }

  }

  const doUpload = () => {

    const data = new FormData()
    data.append('avatar', avatar)

    client.post("/users/me/avatar", data, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }).then((data) => { console.log(data); })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.errors[0].message)
      })

  }

  return (


    <section className="container">
      { !isAuthenticated ? <div>
        <h4>Not Logged In </h4>
        <p className="my-1">
          Already have an account? <Link to="/users/login">Sign In</Link>
        </p>
      </div> :

        <div className="profile-grid my-1">

          <div className="profile-top bg-primary p-2">
            <div
              onClick={() => uploaderRef.current.click()}
            >

              <img
                ref={avatarRef}
                className="round-img my-1"
                src='/images/spinner.gif'
                alt=""
                style={{ cursor: 'pointer' }}
              />

            </div>

            <input ref={uploaderRef} type="file" accept="image/*" multiple={false}
              onChange={handleUpload}
              style={{ display: 'none' }}
            />

            <input type="button" class="btn btn-primary"
              //value="Upload"
              value='Upload'
              onClick={doUpload} />

          </div>

          {error}
          <div class="profile-about bg-dark p-2">
            <h1 className="large">{user.user.name}</h1>
            <h3 className="small">{user.user.email}</h3>
            {/*     <h2 class="text-primary">John's Bio</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
              doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
              neque modi perspiciatis similique?
          </p>*/}

          </div>


        </div>



      }
    </section >
  )
}

export default Profile
