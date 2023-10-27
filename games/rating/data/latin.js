const latinLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const latinOptions = latinLetters;
const latinTransformFunction = (value) => latinLetters[Math.round(value)];
window.options["latin"] = latinOptions;
window.transformFunctions["latin"] = latinTransformFunction;