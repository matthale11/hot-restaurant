const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tableArray = [
  {
    name: "Smith",
    phone: "404-354-9685",
    email: "smiths@gmail.com",
  },
  {
    name: "Jackson",
    phone: "713-423-6532",
    email: "jacksons@gmail.com",
  },
];
const waitingArray = [
  {
    name: "Doe",
    phone: "704-654-9874",
    email: "janedoe@gmail.com",
  },
];

app.get("/make", (req, res) =>
  res.sendFile(path.join(__dirname, "make.html"))
);
app.get("/view", (req, res) =>
  res.sendFile(path.join(__dirname, "view.html"))
);

app.get("/api/tables", (req, res) => res.json(tableArray));
app.get("/api/waiting", (req, res) => res.json(waitingArray));
app.post("/api/tables", (req, res) => {
  if (tableArray.length < 5) {
    tableArray.push(req.body);
    res.json(true);
  } else {
    waitingArray.push(req.body);
    res.json(false);
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "home.html"))
);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
