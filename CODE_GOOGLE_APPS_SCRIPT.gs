/**
 * L'EPICURIEUX - Réception automatique des rapports du quiz HPE
 */
const RECIPIENT_EMAIL = "ebook8585@gmail.com";
const SHEET_NAME = "Rapports HPE";
const SPREADSHEET_TITLE = "Résultats QCM HPE - L'EPICURIEUX";

function doGet(e) {
  return ContentService.createTextOutput("Service actif : réception des rapports du quiz HPE.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    const c = data.candidate || {};
    const m = data.monitoring || {};
    const r = data.cheatingRisk || {percent: 0, level: "Non calculé", reasons: "Non renseigné"};
    const fullName = ((c.firstName || "") + " " + (c.lastName || "")).trim();
    const subject = "Résultat QCM HPE - " + fullName + " - " + (data.score || 0) + "/" + (data.total || 0);

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      body: data.plainReport || "Rapport reçu sans détail."
    });

    const sheet = getSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow([
      new Date(),
      data.quizTitle || "",
      c.firstName || "",
      c.lastName || "",
      c.email || "",
      c.accessCode || "",
      c.startTime || "",
      c.endTime || "",
      data.score || 0,
      data.total || 0,
      (data.percent || 0) + "%",
      data.answeredCount || 0,
      data.unknownCount || 0,
      data.unansweredCount || 0,
      r.percent + "%",
      r.level || "",
      r.reasons || "",
      m.cameraAuthorized ? "Oui" : "Non",
      m.micAuthorized ? "Oui" : "Non",
      m.recordingStarted ? "Oui" : "Non",
      m.noiseAlerts || 0,
      m.tabSwitches || 0,
      m.copyAttempts || 0,
      m.pasteAttempts || 0,
      m.fullscreenExits || 0,
      m.strictViolation ? "Oui" : "Non",
      m.strictReason || "",
      data.userAgent || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: "Erreur réception rapport QCM HPE",
      body: "Erreur : " + err + "\n\nDonnées reçues :\n" + (e && e.postData ? e.postData.contents : "")
    });
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty("SPREADSHEET_ID");
  let ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(SPREADSHEET_TITLE);
    props.setProperty("SPREADSHEET_ID", ss.getId());
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Date réception","Quiz","Prénom","Nom","Email candidat","Code accès","Début","Fin",
    "Score","Total","Pourcentage","Questions répondues","Je ne sais pas","Questions sans réponse",
    "Potentiel tricherie","Niveau risque","Motifs risque","Caméra","Micro","Enregistrement local",
    "Alertes bruit","Changements onglet","Copier","Coller","Sorties plein écran","Violation stricte",
    "Motif violation","Navigateur"
  ]);
}
