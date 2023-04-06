const createTransporter = require("../../db/config/email");
const transporter = createTransporter();

class mailController {
  constructor() {}

  mailCheck = async (req, res, next) => {
    try {
      const { email } = req.body;
      const password = Math.floor(Math.random() * 1000000);; // 6자리 랜덤한 비밀번호 생성
      let mailOptions = {
        from: "MoodClassic99@gmail.com", //송신할 이메일
        to: email, //수신할 이메일
        subject: "MOOD 확인 코드입니다.",
        html: `
         <div>
             <h2>Mood Code</h2>
             <div class="phone" style="font-size: 1.1em;">Title : "코드를 Mood 홈페이지에 입력하세요."</div>
             <div class="message" style="font-size: 1.1em;">message : ${password}</div>
         </div>
         `,
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json({ message: "성공적", password: password }); // 비밀번호를 res에 담아 보내줍니다.
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}

module.exports = mailController;
