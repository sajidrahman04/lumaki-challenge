var posting = require("./methods/posting");

module.exports = {
  create: async (req, res, next) => {
    try{
      const { company, position, description, duration, deadline } = req.body;
      await posting.create(company, position, description, duration, deadline);
      return res.status(200).json();
    } catch(e) {
      next(e);
    }
  },

  get: async (req, res, next) => {
    try{
      r = await posting.get(req.query);
      return res.status(200).json(r);
    } catch(e) {
      next(e);
    }
  }
}
