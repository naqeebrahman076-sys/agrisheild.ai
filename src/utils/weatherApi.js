export async function fetchMicroclimateData(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,relative_humidity_2m_mean&timezone=auto&past_days=14&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    
    const times = data.daily.time || [];
    const maxTemps = data.daily.temperature_2m_max || [];
    const minTemps = data.daily.temperature_2m_min || [];
    const rain = data.daily.precipitation_sum || [];
    const humidity = data.daily.relative_humidity_2m_mean || [];
    const wind = data.daily.windspeed_10m_max || [];

    const chartData = times.map((t, idx) => ({
      date: t.slice(5),
      temp: Math.round((maxTemps[idx] + minTemps[idx]) / 2) || 26,
      humidity: Math.round(humidity[idx]) || 78,
      rain: rain[idx] || 0,
      wind: wind[idx] || 10,
      isForecast: idx >= 14
    }));

    const next48hRain = (rain[14] || 0) + (rain[15] || 0);
    const max48hWind = Math.max(wind[14] || 0, wind[15] || 0);

    return {
      success: true,
      chartData,
      next48hRain,
      max48hWind,
      avg14DayHumidity: Math.round(chartData.slice(0, 14).reduce((acc, c) => acc + c.humidity, 0) / 14),
      avg14DayTemp: Math.round(chartData.slice(0, 14).reduce((acc, c) => acc + c.temp, 0) / 14)
    };
  } catch (err) {
    console.warn('Using fallback microclimate simulation due to network:', err);
    return generateFallbackMicroclimate();
  }
}

export function generateFallbackMicroclimate() {
  const chartData = [];
  const now = new Date();
  
  for (let i = -14; i <= 6; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(5, 10);
    
    const temp = Math.floor(22 + Math.sin(i) * 4 + Math.random() * 3);
    const humidity = Math.floor(75 + Math.cos(i) * 12 + Math.random() * 5);
    const rain = i === 1 || i === 2 ? 8.5 : Math.random() > 0.7 ? Number((Math.random() * 4).toFixed(1)) : 0;
    const wind = Math.floor(11 + Math.random() * 8);

    chartData.push({
      date: dateStr,
      temp,
      humidity: Math.min(humidity, 98),
      rain,
      wind,
      isForecast: i >= 0
    });
  }

  return {
    success: true,
    isFallback: true,
    chartData,
    next48hRain: 8.5,
    max48hWind: 18.2,
    avg14DayHumidity: 84,
    avg14DayTemp: 26
  };
}