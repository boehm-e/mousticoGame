let Mailgun = require('mailgun').Mailgun;
let mg = new Mailgun(require('../config.json').mailgun_key);
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const pify = require('pify');

const send = (email, subject, corps) => {
    mg.sendRaw('sender@example.com',
    [email],
    'From: coachs@fiters.fr' +
    '\nTo: ' + email +
    '\nContent-Type: text/html; charset=utf-8' +
    '\nSubject: ' + subject +
    '\n\n' + corps,
    function(err) {
        if (err) {}
    });
};

let templateFiles = (name, phone, email, files, url) => {
    let before = `<!doctype html> <html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <style media="all" type="text/css"> html, body { width: 100%; margin: 0; padding: 0; background: #f6f6f6; display: flex; justify-content: center; } #container { max-width: 500px; margin: 0 auto; padding: 25px; background: #ffffff; margin-top: 20px; } .explain { padding-bottom: 20px; } .buttonContainer { width: 100%; padding-bottom: 15px; display: flex; justify-content: center; } .join { display: inline-block; color: #ffffff; background-color: #FF3333; border: solid 1px #FF3333; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FF3333; } </style> </head> <body class="" style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f6f6f6; margin: 0; padding: 0;"> <div id="container"> <div class="explain"><p>${name} vient de creer un compte sur fiters !<br><br>Téléphone: ${phone}<br><br>Email: ${email}<br><br> Vous pouvez regarder ses documents en cliquant sur les bouttons suivants</p></div>`;
    var middle = '';
    for (i in files) {
        console.log(files[i], i);
        middle += `<div class="buttonContainer" style="display: flex;justify-content: center; width: 100%; text-align: center;"> <a class="join" style="width: 100%; text-align: center;" href="${url}/api/coach_files/${files[i]}">${i}</a> </div>`;
    }
    let after = `<img style="display: flex; margin: 0 auto; padding-top: 150px;" src="http://fiters.fr/assets/images/nav/logo-black.png" alt="" /> </div> </body> </html>`;
    return before+middle+after;
};

const templateValidation = (url) => {
    let before = `<!doctype html> <html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <style media="all" type="text/css"> html, body { width: 100%; margin: 0; padding: 0; background: #f6f6f6; display: flex; justify-content: center; } #container { max-width: 500px; margin: 0 auto; padding: 25px; background: #ffffff; margin-top: 20px; } .explain { padding-bottom: 20px; } .buttonContainer { width: 100%; padding-bottom: 15px; display: flex; justify-content: center; } .join { display: inline-block; color: #ffffff; background-color: #FF3333; border: solid 1px #FF3333; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FF3333; } </style> </head> <body class="" style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f6f6f6; margin: 0; padding: 0;"> <div id="container"> <div class="explain"><p>Vous avez cree votre compte fiters !<br><br> Vous devez valider votre creation de compte en cliquant sur le boutton suivant</p></div>`;
    let middle = `<div class="buttonContainer"> <a class="join" href="${url}" target="_blank">Valider mon compte</a> </div>`;
    let after = `<div style="width: calc(100% / 3 - 30px); display: inline; float: left; padding: 15px;">Avec Fiters, c'est simple : vous coachez quand vous le souhaitez et en toute sécurité. Grâce à notre application simple et innovante, vous êtes mis en relation avec des utilisateurs dès votre première connexion !</div> <div style="width: calc(100% / 3 - 30px); display: inline; float: left; padding: 15px;">En tant que garant de l'identité et de la qualité Fiters, vous intégrez une équipe de coachs qualifiés et mettez votre savoir-faire au service d'utilisateurs en quête d'un suivi personnalisé et complet.</div> <div style="width: calc(100% / 3 - 30px); display: inline; float: left; padding: 15px;">Grâce à notre système de notation et de suivi, constituez votre propre communauté d'utilisateurs en débloquant la fonctionnalité « Followers » qui vous garantira une meilleure visibilité et rémunération.</div> <img style="display: flex; margin: 0 auto; padding-top: 50px;" src="http://fiters.fr/assets/images/nav/logo-black.png" alt="" /> </div> </body> </html>`;
    return before+middle+after;
};

let notifyFiles = (name, phone, email, files, url) => {
    return send(require('../config.json').email, 'Nouveaux fichiers', templateFiles(name, phone, email, files, url));
};
const validationEmail = (email, url) => {
    return send(email, 'Inscription Fiters', templateValidation(url));
};

exports.send = send;
exports.notifyFiles = notifyFiles;
exports.validationEmail = validationEmail;
exports.sendTemplate = async function(email, template, args) {
    const templatePath = path.join(__dirname, '..', 'templates', template);
    const mailTemplate = new EmailTemplate(templatePath);
    const result = await pify(mailTemplate.render.bind(mailTemplate))(args);
    return send(email, result.subject, result.html);
}
