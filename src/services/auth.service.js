// import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "signin", {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem("user");
// };

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };

// const AuthService = {
//   register,
//   login,
//   logout,
//   getCurrentUser,
// };

// export default AuthService;


import firebaseDb from '../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login = (email, password) => {
  const auth = getAuth(firebaseDb);
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);

      localStorage.setItem("user", JSON.stringify(userCredential.user));
      return userCredential.user;
      //ReactSession.set("username", user.email.split('@')[0]);
      // navigate("../MoviesManagement/main", { replace: true });

    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

//export default { login };

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;


