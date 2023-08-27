const post = require("../model/PostJob");

const authController = {
  async CreateJob(req, res) {
    const postImg = `http://localhost:5000/${req.file.path}`
    console.log(postImg)
    try {
      const { jobTitle, salary, location, jobtype, experience } = req.body;
      if (!jobTitle || !salary || !location || !jobtype || !experience ||!postImg) {
        return res.status(400).json({ message: "all fields required" });
      }
      console.log(req.body)
      //create Job
      const newUser = new post({
        jobTitle,
        salary,
        location,
        jobtype,
        experience,
        postImg
      });
      await newUser.save();

      // const token = jwt.sign(req.body)
      res.json({ newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async GetJobs(req, res) {
    try {
      // Getting All Jobs From DB
      const jobs = await post.find();
      return res.status(200).json(jobs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async DeleteJob(req, res) {
    const { id } = req.body;
    try {
      const job = await post.deleteOne({ _id: id });
      return res.status(200).json(job);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async EditJob(req, res) {
    const { id, jobTitle, salary, location, jobtype, experience } = req.body;
    try {
      const job = await post.updateOne(
        { _id: id },
        {
          jobTitle,
          salary,
          location,
          jobtype,
          experience,
        }
      );
      return res.status(200).json(job);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
};
module.exports = authController;
