module.exports = (req, res) => {
    const { yaw, pitch } = req.query;
    res.status(200).send(`Yaw: ${yaw}, Pitch: ${pitch}`);
  };