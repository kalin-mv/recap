import path from 'path';
// import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import { twig, renderFile } from 'twig';

import { isEmpty } from 'server/utils';
import BaseContext from 'server/BaseContext';

const {
  DEBUG_MODE,
  MAIL_DEBUG,
  MAIL_FROM,
  MAIL_NAME,
  BASE_URL,
  SITE_NAME,
  MAIL_TRANSPORT,
} = process.env;

export const TRANSPORT_MAIL = 'mail';
export const TRANSPORT_SMTP = 'smtp';
export const TRANSPORT_AMAZON = 'amazon';
export const TRANSPORT_GMAIL = 'gmail';

export default class Mail extends BaseContext {
  private template: any = null;

  public tmpl(data: any) {
    this.template = data;
    return this;
  }

  public send(to: string | string[], subject: string, params: any) {
    if (DEBUG_MODE === 'true') {
      to = MAIL_DEBUG;
    }
    to = Array.isArray(to) ? to : [to];

    const mailOptions = {
      from: `${MAIL_NAME} <${MAIL_FROM}>`,
      to: to.join(),
      subject,
      html: '',
      headers: {
        'X-ExclaimerHostedSignatures-MessageProcessed': 'value',
      },
    };
    const query =
      typeof this.template === 'object'
        ? { name: this.template.name, userId: this.template.userId }
        : { name: this.template, userId: null };

    const templateName =
      typeof this.template === 'object' ? this.template.name : this.template;
    params.publicUrl =
      params.action !== null ? BASE_URL + '/' + params.action : null;
    return new Promise((resolve, reject) => {
      this.di.EmailTemplate.findOne(query, async (error, templateFromDb) => {
        if (error) {
          reject({ success: false, error });
        } else {
          if (
            templateFromDb &&
            templateFromDb.subject &&
            !isEmpty(templateFromDb.subject)
          ) {
            mailOptions.subject = templateFromDb.subject;
          }
          let emailTitle = templateFromDb && templateFromDb.title;
          let content = templateFromDb && templateFromDb.description;
          // console.log('templateFromDb.params',templateFromDb.params);

          // if template have params > var description have nested variables
          if (
            templateFromDb &&
            templateFromDb.params &&
            templateFromDb.params.length > 0
          ) {
            // title may contain variables, if not have vars -> return string
            const eTitle = twig({
              data: templateFromDb.title,
            });
            emailTitle = eTitle.render(params);

            // description
            const description = twig({
              data: templateFromDb.description,
            });
            content = description.render(params);
          }

          // TODO 123 remove old params.title = templateFromDb && templateFromDb.title;
          params.title = emailTitle;
          params.description = content;
          params.url = BASE_URL;
          // params.companyName = companyInfo && companyInfo.companyName && companyInfo.companyName;
          params.companyName = SITE_NAME;

          renderFile(
            path.resolve(`server/emails/${templateName}.twig`),
            params,
            (err, html) => {
              if (err) {
                reject({ success: false, err });
              } else {
                mailOptions.html = html;
                let transporter = null;
                switch (MAIL_TRANSPORT) {
                  // case TRANSPORT_SMTP:
                  //   transporter = nodemailer.createTransport({
                  //     host: config.mail.smtp.server,
                  //     port: config.mail.smtp.port,
                  //     secure: config.mail.smtp.security, // true for 465, false for other ports
                  //     auth: {
                  //       user: config.mail.smtp.username,
                  //       pass: config.mail.smtp.password,
                  //     },
                  //   });
                  //   break;
                  // case TRANSPORT_GMAIL:
                  //   transporter = nodemailer.createTransport({
                  //     service: 'gmail',
                  //     auth: {
                  //       user: config.mail.gmail.username,
                  //       pass: config.mail.gmail.password,
                  //     },
                  //   });
                  //   break;
                  case TRANSPORT_MAIL:
                    transporter = nodemailer.createTransport({
                      sendmail: true,
                      newline: 'unix',
                      path: '/usr/sbin/sendmail',
                    });
                    break;
                  // case TRANSPORT_AMAZON:
                  //   aws.config.update({
                  //     accessKeyId: config.mail.amazon.accessKeyId,
                  //     secretAccessKey: config.mail.amazon.secretAccessKey,
                  //     region: config.mail.amazon.region,
                  //   });
                  //   transporter = nodemailer.createTransport({
                  //     SES: new aws.SES({
                  //       apiVersion: '2010-12-01',
                  //     }),
                  //   });
                  //   break;
                  default:
                    break;
                }
                if (transporter) {
                  transporter.sendMail(mailOptions, (error: any, info: any) => {
                    if (error) {
                      reject({ success: false, error });
                    } else {
                      resolve({
                        success: true,
                        data: 'Email message sent: ' + info,
                      });
                    }
                  });
                } else {
                  reject({
                    success: false,
                    error: 'Email transporter is empty',
                  });
                }
              }
            }
          );
        }
      });
    });
  }
}
