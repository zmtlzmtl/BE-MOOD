function cloudfront(file) {
  let fileName = file.dataValues.fileName;
  file.dataValues.musicUrl =
    "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
  return file;
}
module.exports = { cloudfront };

function cloudfrontfor(file) {
  let fileName;
  for (let i = 0; i < file.length; i++) {
    fileName = file[i].dataValues.fileName;
    file[i].dataValues.musicUrl =
      "https://d13uh5mnneeyhq.cloudfront.net/" + fileName;
  }
  return file;
}
module.exports = { cloudfrontfor };
