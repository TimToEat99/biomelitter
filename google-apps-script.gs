// BiomeLitter waitlist -> Google Sheet
// Paste this into Extensions > Apps Script in your Google Sheet, then deploy as a Web App.
// Deploy settings: Execute as = Me,  Who has access = Anyone.
// Copy the resulting web-app URL into GOOGLE_SCRIPT_URL in index.html.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var email = (e && e.parameter && e.parameter.email) ? e.parameter.email : '';
    sheet.appendRow([new Date(), email]);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
