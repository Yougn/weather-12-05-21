const WeatherIconDay = Object.freeze({
 "ThunderstormIcon": [200, 201, 202, 230, 231, 232, 233, 300, 301, 302],
 "RainIcon": [500, 501, 502, 511],
 "ShowerRainIcon": [520, 521, 522],
 "SnowIcon": [600, 601, 602, 610, 611, 612, 621, 622, 623],
 "MistIcon": [700, 711, 721, 731, 741, 751 ],
 "SmallSunIcon":[800],
 "FewCloudsIcon": [801],
 "ScatteredCloudsIcon": [802],
 "BrokenCloudsIcon": [803, 804, 900]
});

export const getFormattedIcons = (iconCode) => {
    const currentIcon = Object.keys(WeatherIconDay).find(key => WeatherIconDay[key].indexOf(iconCode) !== -1)
    return currentIcon;
};

