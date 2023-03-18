function cloudfront(file) {
  let fileName = file.dataValues.fileName;
  file.dataValues.musicUrl =
    "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
  return file;
}
module.exports = { cloudfront };
