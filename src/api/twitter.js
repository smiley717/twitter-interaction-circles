const express = require('express');
const getInteractions = require("../data");
const render = require("../image");
const {getUser} = require("../twitter-api");

const router = express.Router();

router.get('/user', async (req, res) => {
  const { name } = req.query;
  if ( name != null) {
    const user = await getUser(name);

    // this is how many users we will have for each layer from the inside out
    const layers = [8, 15, 26];

    // fetch the interactions
    const data = await getInteractions(user.screen_name.toLowerCase(), layers);

    // render the image
    await render([
      {distance: 0, count: 1, radius: 110, users: [user]},
      {distance: 200, count: layers[0], radius: 64, users: data[0]},
      {distance: 330, count: layers[1], radius: 58, users: data[1]},
      {distance: 450, count: layers[2], radius: 50, users: data[2]},
    ]);

    res.json({
      status: true,
      user,
    });
  } else {
    res.json({
      status: true,
      message: 'Invalid user name'
    });
  }
});

module.exports = router;
