function createCustomElement(tag, innerHTML) {
    var elt = document.createElement(tag);
    elt.innerHTML = innerHTML;
    document.body.appendChild(elt);
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve(elt);
        }, 50);
    });
}

function toggle(elt, attribute) {
    if (elt.hasAttribute(attribute)) {
        elt.removeAttribute(attribute);
    } else {
        elt.setAttribute(attribute, '');
    }
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve(elt);
        }, 50);
    });
}

function click(elt, selector) {
    selector ? effroi.mouse.click(elt.querySelector(selector)) : effroi.mouse.click(elt);
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve(elt);
        }, 50);
    });
}