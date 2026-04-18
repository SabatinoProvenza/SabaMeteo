const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export async function fetchWeather(city) {
  const geoResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
  )

  const geoData = await geoResponse.json()

  if (!geoResponse.ok || !geoData.length) {
    throw new Error("Città non trovata")
  }

  const italianResult =
    geoData.find((place) => place.country === "IT") || geoData[0]

  const { lat, lon, name, country, state } = italianResult

  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`,
  )

  const weatherData = await weatherResponse.json()

  if (!weatherResponse.ok) {
    throw new Error(weatherData.message || "Errore nel recupero del meteo")
  }

  return {
    ...weatherData,
    lat,
    lon,
    resolvedLocation: {
      name,
      country,
      state: state || "",
    },
  }
}

export async function fetchForecast(lat, lon) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`,
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error("Errore nel recupero forecast")
  }

  return data.list
}
