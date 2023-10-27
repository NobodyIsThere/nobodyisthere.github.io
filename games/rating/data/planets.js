const planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
const planetDistances = [0.387, 0.722,   1,       1.52,   5.20,      9.58,     19.2,     30.1,      39.5];
const planetMasses = [0.330,    4.87,    5.97,    0.642,  1898,      568,      86.8,     102,       0.0130];

const planetDistanceData = [];
const planetMassData = [];
for (let i=0; i<planetNames.length; ++i)
{
    planetDistanceData.push({
        displayName: planetNames[i],
        value: planetDistances[i]
    });
    planetMassData.push({
        displayName: planetNames[i],
        value: planetMasses[i]
    });
}
planetMassData.sort((a, b) => a.value - b.value);
const planetDistanceTransformFunction = (value) => {
    value = window.closestValue(planetDistances, value);
    return planetNames[planetDistances.indexOf(value)];
};
const planetMassTransformFunction = (value) => {
    value = window.closestValue(planetMasses, value);
    return planetNames[planetMasses.indexOf(value)];
}
window.options["planetDistance"] = planetDistanceData;
window.transformFunctions["planetDistance"] = planetDistanceTransformFunction;

window.options["planetMass"] = planetMassData;
window.transformFunctions["planetMass"] = planetMassTransformFunction;

window.options["planetOrdinal"] = planetNames;
window.transformFunctions["planetOrdinal"] = (value) => planetNames[value];