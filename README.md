# PF Endurance Interest Form

Branded page on GitHub Pages → Google Apps Script → Google Sheet.

## 1. Create the Sheet + script (about 5 min)
1. Go to sheets.new and name it **PF Endurance Leads**.
2. **Extensions → Apps Script**. Delete the starter code and paste in `apps-script/Code.gs`. Save.
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Authorize when asked, then copy the **Web app URL** (ends in `/exec`).
5. Open that URL in a browser. You should see "PF intake endpoint is live."

## 2. Connect the page
In `index.html`, replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with the URL. (Or tell Claude the URL and it will do it.)

## 3. Publish on GitHub Pages
```bash
cd pf-endurance-intake
git init && git add . && git commit -m "PF endurance intake form"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Deploy from branch → main / (root)**. Your page goes live at `https://<you>.github.io/<repo>/`.

## 4. Test
Submit the form once. A new **Leads** tab appears in the Sheet with your row. Delete the test row.

## Notes
- The Apps Script URL is public by design (it can only append rows). Keep the Sheet itself private.
- The form collects injury info, so don't share the Sheet widely.
- A hidden honeypot field and a Sheet-side formula-injection guard are included. Add a Google Form-style email notification later via Apps Script `MailApp` if wanted.
- To download as Excel: Sheet → **File → Download → .xlsx**.
- To change fields: tell Claude. Edit `index.html`, `HEADERS` and the `appendRow` in `Code.gs` together, then redeploy the script (**Deploy → Manage deployments → Edit → New version**).
