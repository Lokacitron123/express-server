export const authStatus = (req, res) => {
  console.log("Inside /auth/status endpoint");
  console.log(req.user);

  if (req.user) {
    return res.status(200).send(req.user);
  }

  return res.sendStatus(401);
};

export const loginAuth = (req, res) => {
  return res.sendStatus(200);
};

export const logoutAuth = (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Not Authenticated" });
  }

  req.logOut((error) => {
    if (error) {
      return res.status(400).send({ message: "An error has occured", error });
    }

    res.sendStatus(200);
  });
};
