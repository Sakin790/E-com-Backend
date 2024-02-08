const user = [
  {
    id: 1,
    name: "sakin",
    age: 18,
  },
  {
    id: 2,
    name: "Mahid",
    age: 20,
  },
];

const getUser = (req, res) => {
  res.status(200).send({
    message: `Server is Working is Properly...! `,
    user,
  });
};

export { getUser };
