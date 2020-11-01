# Email Marketing

![status](https://img.shields.io/badge/status-running-green.svg?colorB=00C106) ![readme](https://img.shields.io/badge/readme-OK-green.svg?colorB=00C106) ![database](https://img.shields.io/badge/database-none-green.svg?colorB=00C106) ![commits](https://img.shields.io/badge/commits-8-blue.svg) ![Version](https://img.shields.io/badge/tag-v1.0-orange.svg)
![techs](https://img.shields.io/badge/techs-javascript—node-green.svg)

#### This API complements the email-marketing project containing the endpoints to load the Excel files and to send the emails through amazon web services, so before starting it you must replace the following variables in the environment variables

<p align="center">
  <img alt="variables image" src="https://s3.amazonaws.com/images.andrewakosta.com/variables-emailp-marketing.jpeg">
</p>

<p style="color:#9c2f2f;background-color:#ff000026;padding: 8px 15px; border-left:4px solid ">The credentials in the image are no longer available, you need to create your own credentials and replace them</p>

`MongoDB`

 <p>This is the connection string to the database where the users will be stored and their relationship with the Excel files, it must be named <b>email-amrketing</b>.</p>

`AWS_SES_REGION`, `AWS_ACCESS_KEY__ID` y `AWS_SECRET_ACCESS_KEY` <br>

<p>
these credentials are generated in the aws console you can find more information about how to get them 
<a href="https://docs.aws.amazon.com/es_es/ses/latest/DeveloperGuide/get-aws-keys.html">here</a>
</p>

`SENDER_EMAIL`, `REPLY_EMAIL`

This is the email address from where the emails will be sent and it must be verified in the aws console

---

<p style="color:#125a20;background-color:#04ff001f;padding: 8px 15px;">This project is still in development so if you want to collaborate go ahead make a pull request...😀</p>


