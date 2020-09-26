// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

exports.sendEmails = (req, res) => {
  /* Set credentials*/
  const SESconfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
  };
  try {
    let params = {
      Source: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: req.body.emails,
      },
      ReplyToAddresses: [process.env.REPLY_EMAIL],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: req.body.HTML,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: req.body.subject,
        },
      },
    };

    new AWS.SES(SESconfig)
      .sendEmail(params)
      .promise()
      .then((response) => {
        return res.status(200).json({ msg: response });
      })
      .catch((error) => {
        res.status(500).json({ msg: error });
      });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

/*** Get staticstics of sent emails  ***/
exports.getSendStatistics = (req, res) => {
  try {
    const SESconfig = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    };
    let params = {};

    new AWS.SES(SESconfig).getSendStatistics(params, (error, data) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(200).json({ data });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
