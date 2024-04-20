const getToken = (req) => {
    try {
      const cookies = req.headers.cookie;
      const cookieArray = cookies.split(";").map((cookie) => cookie.trim());
      const tokenCookie = cookieArray.find((cookie) =>
        cookie.startsWith("token=")
      );
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;
      return token;
    } catch (err) {
      return null;
    }
  };
  
  export default getToken;
  