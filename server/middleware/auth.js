import jwt from "jsonwebtoken";
// Middleware is set up to 1) verify the user who has logged in 2) allow them to interact with the data.
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      // console.log(token);
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid/Expired token" });
  }
};

export default auth;
