module.exports = (name, phone, email, url, files) => {
    let html = `
    <!doctype html>
    <html>
       <head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style media="all" type="text/css"> html, body { width: 100%; margin: 0; padding: 0; background: #f6f6f6; display: flex; justify-content: center; } #container { max-width: 500px; margin: 0 auto; padding: 25px; background: #ffffff; margin-top: 20px; } .explain { padding-bottom: 20px; } .buttonContainer { width: 100%; padding-bottom: 15px; display: flex; justify-content: center; } .join { display: inline-block; color: #ffffff; background-color: #FF3333; border: solid 1px #FF3333; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #FF3333; } </style>
       </head>
       <body class="" style="font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f6f6f6; margin: 0; padding: 0;">
          <div id="container">
          <div class="explain">
             <p>${name} vient de creer un compte sur fiters !<br><br>Téléphone: ${phone}<br><br>Email: ${email}<br><br> Vous pouvez regarder ses documents en cliquant sur les bouttons suivants</p>
          </div>
      `;
      console.log(files);
    for (i in files) {
        html += `<div class="buttonContainer" style="display: flex;justify-content: center; width: 100%; text-align: center;"> <a class="join" style="width: 100%; text-align: center;" href="${files[i]}">${i}</a> </div>`;
    }
    html += `<img style="display: flex; margin: 0 auto; padding-top: 150px;" src="http://fiters.co/assets/images/nav/logo-black.png" alt="" /> </div> </body> </html>`;
    return html
}
