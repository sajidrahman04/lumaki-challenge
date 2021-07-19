var user = require("./methods/user");

module.exports = {
  register: async (req, res, next) => {
    try{
      const { email, password, type, otherInfo } = req.body;
      const r = await user.register(email, password, type, otherInfo);
      console.log(r);
      return res.status(200).json();
    } catch(e) {
      next(e);
    }
  },

  login: async (req, res, next) => {
    try{
      const { email, password } = req.body;
      const r = await user.login(email, password);
      res.cookie('token', r.body.token, { httpOnly: true });
      return res.status(200).json(r.body);
    } catch(e) {
      next(e)
    }
  },
  getUserById: async (req, res) => { },
  deleteUserById: async (req, res) => { },
}
