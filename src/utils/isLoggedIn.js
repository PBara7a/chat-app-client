const isLoggedIn = () => {
  const loadedToken = localStorage.getItem("token");
  return !(loadedToken === "");
};

export default isLoggedIn;
