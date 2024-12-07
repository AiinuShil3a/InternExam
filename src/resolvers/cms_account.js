const mailgun = require('mailgun-js');
const CmsAccount = require('../models/cms_accounts');
const CmsResetPasswordToken = require('../models/cms_reset_password_tokens');
const { generateResetToken } = require('../utils/encryption');
const DOMAIN = 'sawasdeebyaot.com';
const mg = mailgun({ apiKey: 'ed4dc7c4-5493d539', domain: DOMAIN });

const userResolver = {
  Mutation: {
    cmsUserCreateAdminAccount: async (_, { cms_firstname, cms_lastname, cms_email, cms_role_id, cms_mobile_number, cms_mobile_country_code, context }) => {
      try {
        // ตรวจสอบอีเมลที่ซ้ำกัน
        const existingUser = await CmsAccount.findOne({ where: { cms_email } });
        if (existingUser) {
          return { success: false, message: 'User already exists' };
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
          from: 'admin@yourdomain.com',
          to: cms_email,
          subject: 'Set your password for CMS Admin Account',
          text: `Please set your password using the following link: https://yourapp.com/reset-password?token=${resetToken}`,
        };

        mg.messages().send(emailData, (error, body) => {
          if (error) {
            console.error(error);
            return { success: false, message: 'Failed to send email' };
          } else {
            return { success: true, message: 'User created successfully. Email sent.' };
          }
        });

      } catch (err) {
        console.error(err);
        return { success: false, message: 'Error creating user' };
      }
    }
  }
};

module.exports = userResolver;
