import { client } from "./client";

export const loadUser = async (token, onSuccess) => {

  const header = {
    'Authorization': `Bearer ${token}`
  }


  try {
    const { data } = await client.get('/users/me', {
      headers: header
    })
    const currentUser = {
      name: data.name,
      email: data.email,
      userId: data._id,
      token: token

    }
    if (onSuccess) {
      onSuccess(currentUser)
    }

  } catch ({ response }) {
    console.log(response);

  }


}