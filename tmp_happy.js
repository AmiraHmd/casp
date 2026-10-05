const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
require("dotenv").config();
const fs = require("fs");

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

async function run() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
    Prefix: "dalil-book/",
  });
  const response = await s3Client.send(command);
  
  const files = [];
  if (response.Contents) {
    for (const item of response.Contents) {
      if (item.Key.toLowerCase().includes("happy") || item.Key.toLowerCase().includes("muslim")) {
        files.push(item.Key);
      }
    }
  }
  fs.writeFileSync("tmp_happy.json", JSON.stringify(files, null, 2));
}

run().catch(console.error);
