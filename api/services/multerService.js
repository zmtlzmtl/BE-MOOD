const {S3} =require("aws-sdk"); // AWS SDK(Software developing kit)은 S3 에 파일을 올리려는 사용자의 '인증'을 도와줍니다.

exports.s3Upload = async(file) => {
    const s3 = new S3()
    const param = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer
        }
        return await s3.upload(param).promise();
    }