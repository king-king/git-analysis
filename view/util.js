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

    function color(starts, ends, steps, gammas) {
        function parseColor(hexStr) {
            return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) {
                return 0x11 * parseInt(s, 16);
            }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
                return parseInt(s, 16);
            });
        }

        // zero-pad 1 digit to 2
        function pad(s) {
            return s.length === 1 ? '0' + s : s;
        }

        let i, j, ms, me, output = [],
            so = [],
            gamma = gammas || 1,
            start = parseColor(starts).map(normalize),
            end = parseColor(ends).map(normalize);

        for (i = 0; i < steps; i++) {
            ms = i / (steps - 1);
            me = 1 - ms;
            for (j = 0; j < 3; j++) {
                so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
            }
            output.push('#' + so.join(''));
        }

        function normalize(channel) {
            return Math.pow(channel / 255, gamma);
        }
        return output;
    }
    window.util = {
        element,
        time,
        color
    };
})();