window.nfsGames = ['The Need for Speed', 'Need for Speed II', 'Need for Speed III: Hot Pursuit', 'Need for Speed: High Stakes', 'Need for Speed: Porsche Unleashed', 'Need for Speed: Hot Pursuit 2', 'Need for Speed: Underground', 'Need for Speed: Underground 2', 'Need for Speed: Most Wanted', 'Need for Speed: Carbon', 'Need for Speed: ProStreet', 'Need for Speed: Undercover', 'Need for Speed: Shift', 'Need for Speed: Nitro', 'Need for Speed: World', 'Need for Speed: Hot Pursuit (2010)', 'Shift 2: Unleashed', 'Need for Speed: The Run', 'Need for Speed: Most Wanted (2012)', 'Need for Speed Rivals', 'Need for Speed: No Limits', 'Need for Speed', 'Need for Speed Payback', 'Need for Speed Heat', 'Need for Speed Unbound'];
window.nfsYears = [1994.67,              1997.17,             1998.17,                           1999.17,                       2000.08,                             2002.75,                         2003.83,                       2004.92,                         2005.92,                       2006.75,                  2007.83,                     2008.83,                      2009.66,                 2009.83,                 2010.50,                 2010.83,                              2011.17,              2011.83,                   2012.75,                              2013.83,                 2015.66,                     2015.83,          2017.83,                  2019.83,               2022.92];

window.nfsData = [];
for (let i=0; i<window.nfsGames.length; ++i)
{
    window.nfsData.push({
        displayName: window.nfsGames[i],
        value: window.nfsYears[i]
    });
}

window.options["nfsYears"] = window.nfsData;
window.transformFunctions["nfsYears"] = (value) => {
    value = window.closestValue(window.nfsYears, value);
    return window.nfsGames[window.nfsYears.indexOf(value)];
};