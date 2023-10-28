window.latinLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
window.greekLetters = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
window.options["latin"] = window.latinLetters;
window.options["greek"] = window.greekLetters;
window.transformFunctions["latin"] = (value) => latinLetters[Math.round(value)];
window.transformFunctions["greek"] = (value) => greekLetters[Math.round(value)];