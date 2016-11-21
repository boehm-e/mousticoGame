module.exports = (email, firstname, token) => {
    const website = require('../config.json').website_base;
    const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><title>Full Screen</title><meta content="exported via StampReady" name="sr_export"><meta content="exported via StampReady" name="sr_export"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"><style type="text/css">

    /* Custom Font */
    @font-face{
    font-family:"Proxima N W15 Thin Reg";
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/e7c1fd50-6611-4b2b-86eb-03f6159100c3.eot?#iefix");
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/e7c1fd50-6611-4b2b-86eb-03f6159100c3.eot?#iefix") format("eot"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/cb1061dc-f26a-43a0-8dd8-bb0541873c3d.woff") format("woff"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/a2e9a37c-6342-4985-8053-a9b44d5d3524.ttf") format("truetype"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/602df5ad-7d3a-48e7-8f6a-867f5d482c77.svg#602df5ad-7d3a-48e7-8f6a-867f5d482c77") format("svg");
    }
    @font-face{
    font-family:"Proxima N W15 Light";
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/53f72e41-ffd4-47d4-b8bf-b1ab3cada2e5.eot?#iefix");
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/53f72e41-ffd4-47d4-b8bf-b1ab3cada2e5.eot?#iefix") format("eot"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/fb5639f2-f57b-487d-9610-3dc50820ab27.woff") format("woff"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/2eafe9b7-5a21-49c0-84ca-54c54f899019.ttf") format("truetype"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/0a2fe21c-cfdd-4f40-9dca-782e95c1fa90.svg#0a2fe21c-cfdd-4f40-9dca-782e95c1fa90") format("svg");
    }
    @font-face{
    font-family:"Proxima N W15 Reg";
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/ccd538c8-85a6-4215-9f3f-643c415bbb19.eot?#iefix");
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/ccd538c8-85a6-4215-9f3f-643c415bbb19.eot?#iefix") format("eot"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/e8e438df-9715-40ed-b1ae-58760b01a3c0.woff") format("woff"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/baf65064-a8a8-459d-96ad-d315581d5181.ttf") format("truetype"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/76bd19c9-c46a-4c27-b80e-f8bd0ecd6057.svg#76bd19c9-c46a-4c27-b80e-f8bd0ecd6057") format("svg");
    }
    @font-face{
    font-family:"Proxima N W15 Smbd";
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/f0900b9e-436e-4bb2-ba92-174617a6b4bc.eot?#iefix");
    src:url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/f0900b9e-436e-4bb2-ba92-174617a6b4bc.eot?#iefix") format("eot"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/91b14d48-ff2a-4a42-87df-b04c76cfb67f.woff") format("woff"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/65e3a762-7125-4d24-9247-fc73d4786cd0.ttf") format("truetype"),url("http://www.stampready.net/themeforest/dashboard/templates/nova/font/4b8633b5-6a28-45ea-afc0-1784363b823a.svg#4b8633b5-6a28-45ea-afc0-1784363b823a") format("svg");
    }

    /* Reset */
    * { margin-top: 0px; margin-bottom: 0px; padding: 0px; border: none; line-height: normal; outline: none; list-style: none; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }

    table { border-collapse: collapse !important; padding: 0px !important; border: none !important; border-bottom-width: 0px !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    table td { border-collapse: collapse; text-decoration: none;}
    body { margin: 0px; padding: 0px; background-color: #FFFFFF; }
    .ExternalClass * { line-height: 100%; }

    /* Responsive */
    @media only screen and (max-width:600px) {

    	/* Tables
    	parameters: width, alignment, padding */

    	table[class=scale] { width: 100%!important; }

    	/* Td */
    	td[class=scale-left] { width: 100%!important; text-align: left!important;}
    	td[class=scale-left-bottom] { width: 100%!important; text-align: left!important; padding-bottom: 24px!important; }
    	td[class=scale-left-top] { width: 100%!important; text-align: left!important; padding-top: 24px!important; }
    	td[class=scale-left-all] { width: 100%!important; text-align: left!important; padding-top: 24px!important; padding-bottom: 24px!important; }
    	td[class=scale-center] { width: 100%!important; text-align: center!important;}
    	td[class=scale-center-both] { width: 100%!important; text-align: center!important; padding-left: 20px!important; padding-right: 20px!important; }
    	td[class=scale-center-bottom] { width: 100%!important; text-align: center!important; padding-bottom: 24px!important; }
    	td[class=scale-center-top] { width: 100%!important; text-align: center!important; padding-top: 24px!important; }
    	td[class=scale-center-all] { width: 100%!important; text-align: center!important; padding-top: 24px!important; padding-bottom: 24px!important; padding-left: 20px!important; padding-right: 20px!important; }
    	td[class=scale-right] { width: 100%!important; text-align: right!important;}
    	td[class=scale-right-bottom] { width: 100%!important; text-align: right!important; padding-bottom: 24px!important; }
    	td[class=scale-right-top] { width: 100%!important; text-align: right!important; padding-top: 24px!important; }
    	td[class=scale-right-all] { width: 100%!important; text-align: right!important; padding-top: 24px!important; padding-bottom: 24px!important; }

    	td[class=scale-center-bottom-both] { width: 100%!important; text-align: center!important; padding-bottom: 24px!important; padding-left: 20px!important; padding-right: 20px!important; }
    	td[class=scale-center-top-both] { width: 100%!important; text-align: center!important; padding-top: 24px!important; padding-left: 20px!important; padding-right: 20px!important; }
    	td[class=reset] { height: 0px!important; }
    	td[class=scale-center-topextra] { width: 100%!important; text-align: center!important; padding-top: 84px!important; }

    	img[class="reset"] { display: inline!important; }
    	a[class=pad-top] { padding-top: 50px; display: block;}
    	span[class=mobile-hidden] { display: none; }

    }

    </style></head><body> 								 					 								 					 								 					 								 									 					 				 				<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="scale" data-module="disclaimer_67575" bgcolor="#000">
 		<tr>
 			<td valign="top">
 				<!-- Footer -->
  				<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="    font-family: Arial, Helvetica, sans-serif; font-size: 11px;" class="scale" data-color="Copyright" data-size="Copyright" data-min="11" data-max="16">
 					<tr>
 						<td height="50">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 	</table>
<table width="100%" bgcolor="#000" border="0" cellspacing="0" cellpadding="0" align="center" class="scale" data-module="header_45928" style="position: relative; opacity: 1; top: 0px; left: 0px; z-index: 0;">
 		<tr>
 			<td valign="top" style="background-color: rgb(0, 0, 0);" data-bgcolor="Header">
 				<!-- Nav -->
  				<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="background-color: #000">
 					<tr>
 						<td height="60">
 							<!-- Nav -->
  							<table width="90%" border="0" cellspacing="0" cellpadding="0" align="center">
 								<tr>
 									<td>
 										<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family: 'Proxima N W15 Smbd'; text-transform: uppercase; color: #6e6f72; font-size: 11px; letter-spacing: 1px;" class="scale" data-link-color="Nav Links" data-link-size="Nav Links" data-link-style="color: #6e6f72; text-decoration: none;">
 											<tr>
 												<td valign="middle" align="center" height="107" style="color: #FFF;">
 													 <a href="http://fiters.co">
<img src="http://fiters.fr/assets/images/header_fiters.jpg" data-crop="false" width="100%" style="width: display: block; width: 100%" alt="">
</a>
 												</td>
 											</tr>
 										</table>
 									</td>
 								</tr>
 							</table>
 						</td>
 					</tr>
 				</table>
 				<!-- Header -->
  			</td>
 		</tr>
 	</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" name="threecolumns" bgcolor="#000000" data-module="intro_30708" style="position: relative; opacity: 1; top: 0px; left: 0px; z-index: 0;">
 		<tr>
 			<td>
 				<table width="600" border="0" bgcolor="#161616" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #bababa;" class="scale">
 					<tr>
 						<td width="40">
 						</td>
 						<td style="padding: 40px 0px 8px 0px; line-height: 20px;" class="scale-center-both" data-color="Paragraphs" data-size="Paragraphs" data-min="12" data-max="20">
 							<h2 style="color: #FFFFFF; font-size: 20px">
 								 <b>
Demande de réinitialisation de votre mot de passe.&nbsp;!</b>
 							</h2>
<br>
Bonjour <font style="color: #FFF">
${firstname}</font>
,<br>
<br>
 Vous avez oublié votre mot de passe ? Obtenez-en un nouveau dès maintenant.<br>
<br>

<a href="${website}reinitialisation.html?token=${token}" width="300" height="40" style="font-family: Arial, Helvetica, sans-serif; font-size:14px; text-decoration: none; background-color: #F30000; -webkit-border-radius:30px; width: 250px; text-align:center;  padding: 10px 0; border-radius: 30px; display: block" class=""><span style="color: #ffffff;  line-height: 30px; height: 30px" contenteditable="true" class="editable">Réinitialiser</span></a>
<br>
<br>
 À très bientôt,<br>
<font style="color: #FFF">
La Team Fiters.</font>
 						</td>
 						<td width="40">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 	</table>
 <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" name="threecolumns" bgcolor="#000  " data-module="intro_69815">
 		<tr>
 			<td>
 				<table width="600" bgcolor="#F30" cellspacing="0" cellpadding="0" align="center">
 					<tr>
 						<td height="40" bgcolor="#161618">
 						</td>
 					</tr>
 				</table>
 				<table width="600" border="0" bgcolor="#0e0e0e " cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #808080 ;" class="scale">
 					<tr>
 						<td bgcolor="#161616" width="15">
 						</td>
 						<td style="padding: 30px 20px 20px 20px; line-height: 20px; color: #FFF" class="scale-center-both" data-color="Paragraphs" data-size="Paragraphs" data-min="12" data-max="20">
 							<h2 style="color: #FFF; font-size: 14px">
 								 <b>
&nbsp;LE BOOST</b>
 							</h2>
<br>
Vous avez tout l’air d’un candidat motivé qui aime les nouveaux challenges.<br>
<br>
<font style="font-color: #bababa">
Ça tombe bien, chez Fiters vous n’en manquerez jamais et surtout vous pouvez évoluer jusqu’à former votre propre réseau de coachs&nbsp;!</font>
<br>
<br>
<img src="http://fiters.fr/assets/images/depot_icons.jpg" alt="" style="display: block; width: 100%">
 						</td>
 						<td bgcolor="#161616" width="15">
 						</td>
 					</tr>
 				</table>
 				<table width="600" bgcolor="#161616" cellspacing="0" cellpadding="0" align="center">
 					<tr>
 						<td height="15">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 	</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#000" class="scale" data-module="footer_62855" style="position: relative; opacity: 1; top: 0px; left: 0px;">
 		<tr>
 			<td valign="top">
 				<!-- Footer -->
  				<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family: 'Proxima N W15 Reg'; text-transform: uppercase; color: #3a3a3a; font-size: 12px; letter-spacing: 1px;" class="scale" bgcolor="#000">
 					<tr>
 						<td height="50" style="border-top: 1px solid rgba(0,0,0,0.08)">
 						</td>
 					</tr>
 					<tr>
 						<td align="center">
 							<img src="http://koni.io/mail/logo.png" data-crop="false" style="max-height: 30px;" alt="">
<br>
<br>
<br>
 						</td>
 					</tr>
 					<tr>
 						<td height="20" align="center" class="scale-center">
 							 <a href="#">
<img src="http://koni.io/mail/facebook-letter-logo.png" data-crop="false" alt="" style="padding-right: 10px">
</a>
 <a href="#">
<img src="http://koni.io/mail/twitter-logo.png" data-crop="false" style="padding-right: 10px" alt="">
</a>
 <a href="#">
<img src="http://koni.io/mail/linkedin-logo.png" data-crop="false" style="padding-right: 10px" alt="">
</a>
 <a href="#">
<img src="http://koni.io/mail/instagram-logo.png" data-crop="false" style="padding-right: 4px;" alt="">
</a>
 						</td>
 					</tr>
 					<tr>
 						<td height="50" style="border-top: 1px solid rgba(0,0,0,0.08)">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 	</table>
  <table width="100%" border="0" bgcolor="#000 " cellspacing="0" cellpadding="0" align="center" class="scale" data-module="disclaimer_26489" style="position: relative; opacity: 1; z-index: 0; top: 0px; left: 0px;">
 		<tr>
 			<td valign="top">
 				<!-- Footer -->
  				<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif;  font-size: 12px;" class="scale" data-color="Copyright" data-size="Copyright" data-min="11" data-max="16">
 					<tr>
 						<td style="line-height: 19px; font-size: 11px; color: #b4b4b4;" align="center" class="scale-center">
 							Cet email est automatisé. Merci de ne pas y répondre, nous ne recevrons pas votre email.<br>
 Pour les questions relatives aux déroulement des séances ou à la facturation,<br>
 vous pouvez nous contacter à <a href="#" style="color: #F30">
contact@fiters.co</a>
 						</td>
 					</tr>
 					<tr>
 						<td height="30">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 		<tr>
 			<td height="10">
 			</td>
 		</tr>
 	</table>
 <table width="100%" border="0" bgcolor="#000 " cellspacing="0" cellpadding="0" align="center" class="scale" data-module="disclaimer_26489" style="position: relative; opacity: 1; z-index: 0; top: 0px; left: 0px;">
 		<tr>
 			<td valign="top">
 				<!-- Footer -->
  				<table width="600" border="0" cellspacing="0" cellpadding="0" align="center" style="font-family: Arial, Helvetica, sans-serif;  font-size: 12px;" class="scale" data-color="Copyright" data-size="Copyright" data-min="11" data-max="16">
 					<tr>
 						<td style="line-height: 19px; font-size: 10px; color: #b4b4b4;" align="center" class="scale-center">
 							© 2016 Fiters 						</td>
 					</tr>
 					<tr>
 						<td height="30">
 						</td>
 					</tr>
 				</table>
 			</td>
 		</tr>
 	</table>
 <table width="100%" border="0" bgcolor="#000 " cellspacing="0" cellpadding="0" align="center" class="scale" data-module="disclaimer_26489" style="position: relative; opacity: 1; z-index: 0; top: 0px; left: 0px;">
 		<tr>
 					<td style="line-height: 19px; font-size: 11px; color: #b4b4b4;" align="center" valign="center" class="scale-center">
</td>
   </tr>
 </table>				 					 				 								 					 				 								 					 				 				</body></html>
    `;
    return html;
}
