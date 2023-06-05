const { exec } = require("child_process");
const path = require("path");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;

function backupDatabase() {
  const dbName = "hdmStore1";
  const backupPath = path.join(__dirname, "../backups");
  const timestamp = moment().format("YYYY-MM-DD_HH-mm-ss");
  const backupFilename = `${dbName}_${timestamp}.gz`;

  const command = `mongodump --uri="${process.env.MONGODB_URI}" --gzip --archive=${path.join(backupPath, backupFilename)}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during backup: ${error}`);
      return;
    }
    console.log(`Backup successfully created: ${backupFilename}`);

    // Upload the backup to Cloudinary
    cloudinary.uploader.upload(
        path.join(backupPath, backupFilename),
        { resource_type: 'raw', folder: 'backups', public_id: backupFilename },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
          } else {
            console.log("Backup successfully uploaded to Cloudinary with filename:", result.public_id);
          }
        }
      );
  });
}

module.exports = backupDatabase;