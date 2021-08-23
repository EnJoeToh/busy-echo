import * as vscode from 'vscode';

//console.log に色をつける
var red     = '\u001b[31m';
var green   = '\u001b[32m';
var reset   = '\u001b[0m';

export function activate(context: vscode.ExtensionContext) {
  console.log('"echo" is now active');

	let echo = vscode.commands.registerCommand('busy-echo.echo', () => {
    let activeEditor = vscode.window.activeTextEditor;
    let timeId: ReturnType<typeof setTimeout>;

    //テキストの変動をキャッチ
    vscode.workspace.onDidChangeTextDocument(event => {
      clearTimeout(timeId);
      let repeater = () => {
        if (activeEditor && event.document === activeEditor.document){
         //変更があった箇所を表示
         for (const change of event.contentChanges){
            console.log("変化： "  + red +  change.text + reset);                           
          }
          //全文を表示
          let fullText = activeEditor.document.getText();
          console.log("全文： " + green + "「" + fullText + "」\n" + reset);
        }
      };
      timeId = setTimeout(repeater, 50);
    });
  });
  context.subscriptions.push(echo);
}

export function deactivate() {}
