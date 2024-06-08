export const getProducts = (req, res) => {
  if (req.cookies.hello && req.cookies.hello === "world") {
    return res.status(200).send([{ id: 123, name: "Bananas", price: 19 }]);
  }

  return res
    .status(400)
    .send({ message: "Sorry, the correct cookie was missing. " });
};
