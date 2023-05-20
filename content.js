// dictionary of words censored by this web extension; reasons for its censorship are given in brief in comments
// note that any censor words/phrases cannot be Googled when using this extension (limiting access to censored content)
// hint: try Googling "what happened in Gujarat in 2002"
var censor = {
    "2002 Gujarat riots" : "[REDACTED]",  // controversy, allegedly enabled by Modi govt
    "Gujarat riots" : "[REDACTED]", // controversy
    "anti-Muslim riots" : "[REDACTED]", // controversy
    "Hitler" : "[REDACTED]",    // violent figure
    "Stalin" : "[REDACTED]",    // violent figure
    "Karl Marx" : "[REDACTED]",  // communist
    "Marxist" : "[REDACTED]",  // promotes communism
    "chai wala" : "Hon'ble PM Narenda Modi",    // nickname for Modi by opposition
    "chaukidar" : "Hon'ble PM Narenda Modi",    // nickname for Modi by opposition
    "Narendra Modi" : "Hon'ble PM Narenda Modi",    // with respect
    "Kashmir independence" : "Kashmir (India)", // not supported by the Indian govt
    "Rafale deal" : "[REDACTED]",   // controversy
    "black money" : "[REDACTED]",   // rooted in most controversies
    "demonetisation" : "[REDACTED]",    // said to have been a failure of the Indian govt
    "farmer protests" : "[REDACTED]",   // Indian govt is criticised globally for how it was handled
    "farm reform" : "[REDACTED]",   // brought about farmer protests
    "India: the Modi Question" : "[REDACTED]",  // BBC documentary about tensions between Modi & Muslims in India
    "The Modi Question" : "[REDACTED]", // the Indian govt has called this "anti-government propaganda"
    "Snoopgate" : "[REDACTED]", // Modi govt controversy regarding surveillance
    "Article 370" : "[REDACTED]",   // Kashmir's state reform drew sharp reactions from citizens
    "Nihalchand Meghwal rape" : "[REDACTED]",  // BJP member accused of sexual exploitation
    "Hindi imposition" : "[REDACTED]"   // Modi govt accusation
};

function getElementsIn (node){  // recursive function to get elements from page to search
    var elem = [];
    for (node = node.firstChild; node; node = node.nextSibling){
        if (node.nodeType == 3) elem.push(node);
        else elem = elem.concat(getElementsIn(node));
    }
    return elem;
}

var elements = getElementsIn(document.body);    // get words in body of page only. this is where most search results are

for (node of elements){ // for each word
    var OGtext = node.nodeValue;    // keep to compare later
    var text = OGtext;
    for (banned in censor){ // for key
        var regex = new RegExp(banned, 'ig');
        var replacement = '<span class="beep">' + censor[banned] + '</span>';
        var replacedText = text.replace(regex, replacement);

        if ((replacedText !== text) && (node.parentNode !== null)) {
            text = replacedText;
        }
    }
    if ((text != OGtext) && (node.parentNode !== null)) {
        var element = document.createElement("span");
        element.innerHTML = text;
        node.parentNode.replaceChild(element, node);
    }
}