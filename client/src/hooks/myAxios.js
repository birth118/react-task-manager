const axios = require('axios')


axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.baseURL = "http://localhost:5000"

const doReq = ({ url, method = 'get', headers, body, onSuccess }) => {

  // axios#get(url[, config])
  // xios#post(url[, data[, config]])


  const func = axios[method](url, { ...body, headers: { ...headers } })
    .then((resp) => {
      /* console.log(resp.data); */
      onSuccess(resp.data)
    })
    .catch(({ response }) => {
      //  console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      // console.log(func);

    }
    )
}


// const { doRequest, errors } = useRequest({



doReq({
  url: '/users/login',
  method: 'post',
  body: {
    email: "test1@test.com",
    password: "MyPass777"
  },
  onSuccess: (data) => {
    const tok = data.token
    console.log(tok);

    doReq({
      url: '/users/me',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${tok}`
      },
      onSuccess: (data) => {

        console.log(data);
      }
    })

    doReq({
      url: '/tasks',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${tok}`
      },
      onSuccess: (data) => {

        console.log(data);
        const id = data.id

        doReq({
          url: `/tasks/600b61e95c33310013120653`,
          method: 'get',
          headers: {
            'Authorization': `Bearer ${tok}`
          },
          onSuccess: (data) => { console.log(data); }
        })
      }
    })

  }
})


