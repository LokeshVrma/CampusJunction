require('dotenv').config();

const profilePage = async (req, res) => {
    res.send("Hello world");
}

module.exports = { profilePage };