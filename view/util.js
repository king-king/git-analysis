(function () {
    //
    function element(tag, property, parent) {
        let el = document.createElement(tag);
        for (let key in property) {
            if (property.hasOwnProperty(key)) {
                switch (key) {
                    case 'css':
                        for (let cssKey in property[key]) {
                            if (property[key].hasOwnProperty(cssKey)) {
                                el.style.setProperty(cssKey, property[key][cssKey]);
                            }
                        }
                        break;
                    // case 'parent':
                    //     property[key].parent.appendChild(el);
                    //     break;
                    default:
                        break;
                }
            }
        }
        parent && parent.appendChild(el);
        return el;
    }

    function time(year, month, day) {
        return new Date(year, month, day);
    }
    window.util = {
        element,
        time
    };
})();