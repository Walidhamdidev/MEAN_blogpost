const deleteArticle = async (req, res) => {
  return res.json({ msg: "Delete" });
};

const update = async (req, res) => {
  return res.json({ msg: "Update" });
};

const getOne = async (req, res) => {
  return res.json({ msg: "Get One" });
};

const getAll = async (req, res) => {
  return res.json({ msg: "Get All" });
};

export default {
  getOne,
  getAll,
  deleteArticle,
  update,
};
