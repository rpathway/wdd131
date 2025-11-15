const temperature = 10; // celcius
const windSpeed = 5;  // km/h

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

function calculateWindChill(temp, wind) {
  // W = 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

if (temperature <= 10 && windSpeed > 4.8) {
  const windChill = calculateWindChill(temperature, windSpeed);
  document.getElementById('windchill').textContent = windChill.toFixed(1) + '°C';
} else {
  document.getElementById('windchill').textContent = 'N/A';
}