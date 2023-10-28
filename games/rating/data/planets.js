window.planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
window.planetDistances = [0.387, 0.722,   1,       1.52,   5.20,      9.58,     19.2,     30.1,      39.5];
window.planetMasses = [0.330,    4.87,    5.97,    0.642,  1898,      568,      86.8,     102,       0.0130];

window.planetDistanceData = [];
window.planetMassData = [];
for (let i=0; i<window.planetNames.length; ++i)
{
    window.planetDistanceData.push({
        displayName: window.planetNames[i],
        value: window.planetDistances[i]
    });
    window.planetMassData.push({
        displayName: window.planetNames[i],
        value: window.planetMasses[i]
    });
}
window.planetMassData.sort((a, b) => a.value - b.value);
window.options["planetDistance"] = window.planetDistanceData;
window.transformFunctions["planetDistance"] = (value) => {
    value = window.closestValue(window.planetDistances, value);
    return window.planetNames[window.planetDistances.indexOf(value)];
};

window.options["planetMass"] = window.planetMassData;
window.transformFunctions["planetMass"] = (value) => {
    value = window.closestValue(window.planetMasses, value);
    return window.planetNames[window.planetMasses.indexOf(value)];
};

window.options["planetOrdinal"] = window.planetNames;
window.transformFunctions["planetOrdinal"] = (value) => window.planetNames[value];