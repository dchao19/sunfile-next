function domToString(documentRoot) {
    var html = "";
    var node = documentRoot.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += "<![CDATA[" + node.nodeValue + "]]>";
                break;
            case Node.COMMENT_NODE:
                html += "<!--" + node.nodeValue + "-->";
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html +=
                    "<!DOCTYPE " +
                    node.name +
                    (node.publicId ? ' PUBLIC "' + node.publicId + '"' : "") +
                    (!node.publicId && node.systemId ? " SYSTEM" : "") +
                    (node.systemId ? ' "' + node.systemId + '"' : "") +
                    ">\n";
                break;
            default:
                break;
        }
        node = node.nextSibling;
    }
    return html;
}

chrome.runtime.sendMessage({
    requestType: "pageSource",
    source: domToString(document)
});
