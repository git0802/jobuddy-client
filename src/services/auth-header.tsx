export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    // return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
    return {
      "x-access-token": user.token,
    }; 
  } else {
    return {};
  }
}
