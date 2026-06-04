/**
 * L'EPICURIEUX - Réception automatique des rapports du quiz HPE
 * À coller dans Google Apps Script : https://script.google.com
 */

const RECIPIENT_EMAIL = "ebook8585@gmail.com";
const SHEET_NAME = "Rapports HPE";
const SPREADSHEET_TITLE = "Résultats QCM HPE - L'EPICURIEUX";

function doGet(e) {
  return ContentService
    .createTextOutput("Service actif : réception des rapports du quiz HPE.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    const candidate = data.candidate || {};
    const monitoring = data.monitoring || {};
    const cheatingRisk = data.cheatingRisk || {percent: 0, level: "Non calculé", reasons: "Non renseigné"};
    const details = data.details || [];
    const score = data.score || 0;
    const total = data.total || 0;
    const percent = data.percent || 0;

    const fullName = ((candidate.firstName || "") + " " + (candidate.lastName || "")).trim();
    const subject = "Résultat QCM HPE - " + fullName + " - " + score + "/" + total;

    const body = data.plainReport || buildFallbackReport_(data);

    // 1) Envoi e-mail
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      body: body
    });

    // 2) Enregistrement dans Google Sheets
    const sheet = getSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow([
      new Date(),
      data.quizTitle || "",
      candidate.firstName || "",
      candidate.lastName || "",
      candidate.email || "",
      candidate.accessCode || "",
      candidate.startTime || "",
      candidate.endTime || "",
      score,
      total,
      percent + "%",
      cheatingRisk.percent + "%",
      cheatingRisk.level || "",
      cheatingRisk.reasons || "",
      monitoring.cameraAuthorized ? "Oui" : "Non",
      monitoring.micAuthorized ? "Oui" : "Non",
      monitoring.recordingStarted ? "Oui" : "Non",
      monitoring.noiseAlerts || 0,
      monitoring.tabSwitches || 0,
      monitoring.copyAttempts || 0,
      monitoring.pasteAttempts || 0,
      monitoring.fullscreenExits || 0,
      monitoring.strictViolation ? "Oui" : "Non",
      monitoring.strictReason || "",
      data.userAgent || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ok: true, message: "Rapport reçu"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: "Erreur réception rapport QCM HPE",
      body: "Une erreur est survenue : " + err + "\n\nDonnées reçues :\n" + (e && e.postData ? e.postData.contents : "")
    });

    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty("SPREADSHEET_ID");
  let ss;

  if (id) {
    try {
      ss = SpreadsheetApp.openById(id);
    } catch (err) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create(SPREADSHEET_TITLE);
    props.setProperty("SPREADSHEET_ID", ss.getId());
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "Date réception",
    "Quiz",
    "Prénom",
    "Nom",
    "Email candidat",
    "Code accès",
    "Début",
    "Fin",
    "Score",
    "Total",
    "Pourcentage",
    "Potentiel tricherie",
    "Niveau risque",
    "Motifs risque",
    "Caméra",
    "Micro",
    "Enregistrement local",
    "Alertes bruit",
    "Changements onglet",
    "Copier",
    "Coller",
    "Sorties plein écran",
    "Violation stricte",
    "Motif violation",
    "Navigateur"
  ]);
}

function buildFallbackReport_(data) {
  const c = data.candidate || {};
  const m = data.monitoring || {};

  return [
    "RAPPORT QCM HPE",
    "Candidat : " + ((c.firstName || "") + " " + (c.lastName || "")).trim(),
    "Email : " + (c.email || ""),
    "Code : " + (c.accessCode || ""),
    "Score : " + (data.score || 0) + "/" + (data.total || 0),
    "Pourcentage note : " + (data.percent || 0) + "%",
    "Potentiel de tricherie : " + ((data.cheatingRisk && data.cheatingRisk.percent) || 0) + "%",
    "Niveau risque : " + ((data.cheatingRisk && data.cheatingRisk.level) || "Non calculé"),
    "Motifs risque : " + ((data.cheatingRisk && data.cheatingRisk.reasons) || "Non renseigné"),
    "",
    "SURVEILLANCE",
    "Caméra : " + (m.cameraAuthorized ? "Oui" : "Non"),
    "Micro : " + (m.micAuthorized ? "Oui" : "Non"),
    "Alertes bruit : " + (m.noiseAlerts || 0),
    "Changements onglet : " + (m.tabSwitches || 0),
    "Violation stricte : " + (m.strictViolation ? "Oui" : "Non"),
    "Motif : " + (m.strictReason || "")
  ].join("\n");
}
