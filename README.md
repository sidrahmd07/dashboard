# NEXORA Dashboard — Animated Learning Universe

A beginner-friendly HTML/CSS/JavaScript prototype inspired by the general learning-path experience of hands-on learning platforms. It is not a copy of TryHackMe and does not use TryHackMe branding.

## Run it
1. Extract the ZIP.
2. Open the `nexora_dashboard` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code Live Server extension.
4. Choose one learning world. Its seven-step roadmap opens.
5. Click a number and enter the demo password `python123` to test the access flow.
6. Mark a step complete to see XP, progress, activity, and achievements update.

## Included
- Moving nebula layers and drifting stars, plus a floating ghost mascot.
- Three learning worlds only: AI & ML, Cybersecurity, and Web Development.
- One-world-at-a-time selection; the other worlds stay locked in the demo.
- Seven-number roadmap and password prompt for each step.
- Separate views for Home, Learn, Missions, Paths, Achievements, Community, and Settings.
- Responsive layout, working navigation, editable display name, progress tracking, XP, level, streak, achievements, and local browser storage.

## Important limitations
- This is a front-end demo. It does not include real registration, user accounts, a server, or a shared database.
- `python123` is deliberately a demo password hard-coded in JavaScript. Anyone can inspect front-end code, so **do not use this approach for real security**. A production site must verify accounts, world selection, and passwords on a server/backend.
- The Python lesson screen is a placeholder connection point. It does not replace your friends' existing Python page. Share their HTML/CSS/JS files or repository structure to connect their real page here without overwriting it.
- Progress is stored in this browser only, and the “mark complete” button is a demo action rather than a graded quiz.
- Nebula and star motion is CSS-based. A reduced-motion accessibility preference will tone down animations.

## Suggested integration with your friends' work
Keep their existing Python page in its own file/folder. Once you share the current project files, update `openTopic()` in `script.js` to navigate to their page or load its content in the lesson area. Avoid copying private keys or backend service-role keys into front-end code.
