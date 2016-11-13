const LineByLineReader = require('line-by-line');
const electron = require('electron');
const path = require('path');
const os = require('os');
const tableify = require('tableify');

const notes = [];
const notesHTML = []
const {app} = electron;
const {BrowserWindow} = electron;

const notesPath = path.join(os.homedir(), 'Google Drive', 'electron-notes');

var lr = new LineByLineReader(notesPath);

lr.on('error', function (err) {
	// 'err' contains error object
});

lr.on('line', function (line) {
	notesHTML.push(tableify(line))
});

lr.on('end', function () {
	win.loadURL('data:text/html;' + notesHTML)
});

let win = BrowserWindow; // BrowserWindow in which to show the dialog

	function createWindow() {
		win = new BrowserWindow({
			width: 800,
			height: 600
		});
		// win.loadURL(`file://${__dirname}/index.html`);
		win.on('closed', () => {
			win = null;
		});
	}
	app.on('ready', createWindow);

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});
	app.on('activate', () => {
			// On OS X it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
		if (win === null) {
			createWindow();
		}
	});
