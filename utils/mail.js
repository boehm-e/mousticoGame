const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const pify = require('pify');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
    auth: {
        api_key: 'key-79e48c078412157f3c4c12da6a08ed43',
        domain: 'fiters.co'
    }
}

const fiters = nodemailer.createTransport(mg(auth));


/***************************/
/**  ACCOUNT VALIDATION   **/
/***************************/
const validation = (email, firstname, url) => {
    const template = require('./templates/validation')(url, firstname);
    fiters.sendMail({
        from: 'coach@fiters.co',
        to: email,
        subject: 'validez votre inscription',
        html: template,
    }, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' , info);
        }
    });
}


/***************************/
/**    NEW FILES NOTIF    **/
/***************************/
const newFiles = (name, phone, email, url, files) => {
    const template = require('./templates/newFiles')(name, phone, email, url, files);
    console.log("FILES : ", files);
    fiters.sendMail({
        from: 'coach@fiters.co',
        to: require('../config.json').email,
        subject: `nouveaux fichiers (${email})`,
        html: template,
    }, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' , info);
        }
    });
}

/***************************/
/**     SEND TEMPLATE     **/
/***************************/

const sendTemplate = async function(email, template, args) {
    const templatePath = path.join(__dirname, '..', 'templates', template);
    const mailTemplate = new EmailTemplate(templatePath);
    const result = await pify(mailTemplate.render.bind(mailTemplate))(args);
    fiters.sendMail({
        from: 'coach@fiters.co',
        to: email,
        subject: `nouveaux fichiers (${email})`,
        html: mailTemplate,
    }, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' , info);
        }
    });
}

/***************************/
/**  RESET PASSWORD EMAIL **/
/***************************/

const resetPasswordMail = (email, firstname, token) => {
    const template = require('./templates/resetPasswordMail')(email, firstname, token);
    fiters.sendMail({
        from: 'coach@fiters.co',
        to: email,
        subject: `renouvellement de votre mot de passe`,
        html: template,
    }, function (err, info) {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            console.log('Response: ' , info);
        }
    });
}



exports.validation = validation;
exports.newFiles = newFiles;
exports.sendTemplate = sendTemplate;
exports.resetPasswordMail = resetPasswordMail;

// newFiles('boehm', '0780069182', 'boehm_e@etna-alternance.net', 'http://localhost:7894/', {coucou: "coucou11", salut: "salut11"});
// resetPassword('boehm_e@etna-alternance.net', 'erewan', 'boehm', 'nouveauPassword123');
// validation('boehm_e@etna-alternance.net', 'http://google.com');
