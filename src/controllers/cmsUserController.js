const mailgun = require('mailgun-js');
const CmsAccount = require('../models/cms_accounts');
const CmsResetPasswordToken = require('../models/cms_reset_password_tokens');
const { generateResetToken } = require('../utils/encryption');

const DOMAIN = 'sandboxfa4a539d790848d3b5cd7bd3260380cf.mailgun.org'; // Sandbox domain ของคุณ
const API_KEY = '26b22b52942459ab841cd2346f403c0f-f55d7446-7794d18e';

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

exports.cmsUserCreateAdminAccount = async (req, res) => {
  const { cms_firstname, cms_lastname, cms_email, cms_role_id, cms_mobile_number, cms_mobile_country_code, context } = req.body;

  try {
    // ตรวจสอบอีเมลที่ซ้ำกัน
    const existingUser = await CmsAccount.findOne({ where: { cms_email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // สร้างผู้ใช้ใหม่
    const newUser = await CmsAccount.create({
      cms_firstname,
      cms_lastname,
      cms_email,
      cms_role_id,
      cms_mobile_number,
      cms_mobile_country_code,
      created_by: context.cms_account_id,
    });

    // สร้าง token สำหรับรีเซ็ตรหัสผ่าน
    const resetToken = generateResetToken();
    await CmsResetPasswordToken.create({
      cms_account_id: newUser.cms_account_id,
      reset_token: resetToken,
    });

    // ส่งอีเมลให้ผู้ใช้
    const emailData = {
      from: 'Mailgun Sandbox <postmaster@sandboxfa4a539d790848d3b5cd7bd3260380cf.mailgun.org>',
      to: cms_email, // ผู้รับที่ได้รับอนุญาต (Authorized Recipient)
      subject: 'Hello from Mailgun Sandbox',
      text: 'This is a test email sent using Mailgun sandbox domain.'
    };

    mg.messages().send(emailData, (error, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      } else {
        return res.status(200).json({ success: true, message: 'User created successfully. Email sent.' });
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error creating user' });
  }
};
