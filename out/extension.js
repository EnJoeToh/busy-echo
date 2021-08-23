"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
//console.log に色をつける
var red = '\u001b[31m';
var green = '\u001b[32m';
var reset = '\u001b[0m';
function activate(context) {
    console.log('"echo" is now active');
    let echo = vscode.commands.registerCommand('busy-echo.echo', () => {
        let activeEditor = vscode.window.activeTextEditor;
        //テキストの変動をキャッチ
        vscode.workspace.onDidChangeTextDocument(event => {
            if (activeEditor && event.document === activeEditor.document) {
                //変更があった箇所を表示
                for (const change of event.contentChanges) {
                    console.log("変化： " + red + change.text + reset);
                }
                //全文を表示
                let fullText = activeEditor.document.getText();
                console.log("全文： " + green + "「" + fullText + "」\n" + reset);
            }
        });
    });
    context.subscriptions.push(echo);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map