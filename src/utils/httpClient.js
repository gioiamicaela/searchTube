import axios from "axios";

const API = process.env.REACT_APP_URL;
const KEY = process.env.REACT_APP_KEY;
export function getChannelId(path, user) {
  return fetch(API + path, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    params: {
      key: KEY,
      part: "contentDetails",
      forUsername: user,
    },
  }).then((result) => result.json());
}

// export const instance =  axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

// const authAxios = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}/private/order`,
//   headers: {
//     Authorization: `Bearer ${tokenBearer}`,
//     ContentType: `application/json`,
//   },
// });
// const response = await authAxios.post(
//   `${process.env.REACT_APP_API_URL}/private/order`,
//   { cart: cartItems }
// );
// console.log(cartItems);
// console.log(response.data._id);
// dispatch(setOrderNumber(response.data._id));
// navigate("/checkout");
