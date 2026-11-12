/**
 * Priority Fitness Training: endurance interest form -> Google Sheet.
 * Bound to the Sheet (Extensions > Apps Script). Deploy as Web app:
 *   Execute as: Me   |   Who has access: Anyone
 */
const SHEET_NAME = 'Leads';
const HEADERS = [
  'Timestamp', 'First name', 'Last name', 'Email', 'Phone', 'Location',
  'Sports', 'Experience', 'Weekly training', 'Goal', 'Goal date', 'PRs',
  'Injuries', 'Notes', 'Heard about us', 'Consent', 'Status'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#0A192F').setFontColor('#CCFF00');
    }
    const clean = v => {
      v = String(v || '').trim().slice(0, 2000);
      // Stop spreadsheet formula injection
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    sh.appendRow([
      new Date(), clean(p.firstName), clean(p.lastName), clean(p.email), clean(p.phone), clean(p.location),
      clean(p.sports), clean(p.experience), clean(p.weeklyHours), clean(p.goalRace), clean(p.goalDate), clean(p.pr),
      clean(p.injuries), clean(p.notes), clean(p.source), clean(p.consent), 'New'
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('PF intake endpoint is live.');
}
