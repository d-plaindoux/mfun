/* global document mFun */

const lineNew = "\n"

function getEditor() {
    return document.getElementById("editor");
}

function getOutput() {
    return document.getElementById("output");
}

function printResult(c, r) {
    const sc = mFun.default.prettifier.result(c)
    const sr = mFun.default.prettifier.result(r)
    let value = (sc !== '_' ? sc + " = " : "") + sr + lineNew;
    getOutput().value += value
}

function printError(error) {
    getOutput().value += error + "\n"
}

function executeEntity(e) {
    getOutput().value = "<ast> " + mFun.default.prettifier.ast(e) + lineNew

    const astDB = mFun.default.runtime.evaluator.deBruijn(e)
    getOutput().value += "<db>  " + mFun.default.prettifier.astDB(astDB) + lineNew

    const objectCode = mFun.default.runtime.evaluator.objectCode(astDB)
    getOutput().value += "<obj> " + mFun.default.prettifier.object(objectCode) + lineNew + lineNew

    mFun.default.runtime.evaluator
        .execute(objectCode)
        .onSuccess(r => printResult(e, r))
        .onFailure(r => printError(r));
}

function evalPrint(sourceCode) {
    getOutput().value = ''
    mFun.default.runtime.evaluator
        .parse(sourceCode)
        .onSuccess(r => r.map(e => executeEntity(e)))
        .onFailure(r => printError(r));
    getEditor().value = ''
}

function bootstrap() {
    mFun.default.reader.browser(document)
        .sources()
        .map(evalPrint);
}

function evalPrintEditor() {
    evalPrint(getEditor().value)
}

function readChar(e) {
    console.log(e)
    return false
}

function readChar(e) {
    if (getEditor().value.endsWith("\n\n")) {
        evalPrint(getEditor().value)
    }
}