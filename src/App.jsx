import { useState, useRef, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import { fetchWeather, fetchForecast } from "./services/weatherApi"
import Forecast from "./components/Forecast"
import DayDetails from "./components/DayDetails"

function App() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [forecast, setForecast] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const detailsRef = useRef(null)
  const topRef = useRef(null)

  const selectedDayDetails = forecast.filter(
    (item) => item.dt_txt.split(" ")[0] === selectedDay,
  )

  const handleReset = function () {
    setWeather(null)
    setForecast([])
    setSelectedDay(null)
    setError("")
  }

  const handleSearch = async function (city) {
    try {
      setLoading(true)
      setError("")

      const weatherData = await fetchWeather(city)
      setWeather(weatherData)

      const forecastData = await fetchForecast(weatherData.lat, weatherData.lon)
      setSelectedDay(null)
      setForecast(forecastData)
    } catch (err) {
      setWeather(null)
      setForecast([])
      setError(err.message)
      setSelectedDay(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherBackground = function (weather) {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return "bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.35),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#1e3a8a_35%,_#f59e0b_100%)]"
    }

    const iconCode = weather.weather[0].icon
    const isNight = iconCode.endsWith("n")
    const condition = weather.weather[0].main

    if (condition === "Clear") {
      return isNight
        ? "bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#312e81_100%)]"
        : "bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.35),_transparent_30%),linear-gradient(180deg,_#1e3a8a_0%,_#38bdf8_45%,_#facc15_100%)]"
    }

    switch (condition) {
      case "Clouds":
        return "bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.25),_transparent_30%),linear-gradient(180deg,_#334155_0%,_#64748b_50%,_#cbd5e1_100%)]"

      case "Rain":
      case "Drizzle":
        return "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(180deg,_#0f172a_0%,_#1e293b_45%,_#475569_100%)]"

      case "Thunderstorm":
        return "bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.22),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#1e1b4b_45%,_#334155_100%)]"

      case "Snow":
        return "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_30%),linear-gradient(180deg,_#94a3b8_0%,_#cbd5e1_45%,_#f8fafc_100%)]"

      case "Mist":
      case "Fog":
      case "Haze":
        return "bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.2),_transparent_30%),linear-gradient(180deg,_#475569_0%,_#94a3b8_50%,_#cbd5e1_100%)]"

      default:
        return "bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.35),_transparent_35%),linear-gradient(180deg,_#0f172a_0%,_#1e3a8a_35%,_#f59e0b_100%)]"
    }
  }

  const backgroundClass = getWeatherBackground(weather)
  const getDailyForecastItems = function (forecast) {
    return forecast
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
  }
  const dailyForecast = getDailyForecastItems(forecast)

  const getTodayKey = function () {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const handleSelectDay = function (dayKey) {
    setSelectedDay(dayKey)
  }

  const handleCloseDetails = function () {
    setSelectedDay(null)

    setTimeout(() => {
      if (topRef.current) {
        const y =
          topRef.current.getBoundingClientRect().top + window.scrollY - 40

        window.scrollTo({
          top: y,
          behavior: "smooth",
        })
      }
    }, 120)
  }

  useEffect(() => {
    if (!selectedDay) return

    const timeout = setTimeout(() => {
      if (detailsRef.current) {
        const y =
          detailsRef.current.getBoundingClientRect().top + window.scrollY - 120

        window.scrollTo({
          top: y,
          behavior: "smooth",
        })
      }
    }, 120)

    return () => clearTimeout(timeout)
  }, [selectedDay])

  return (
    <main
      className={`min-h-screen overflow-hidden ${backgroundClass} text-white flex items-center justify-center px-4 py-10 transition-all duration-700`}
    >
      <div ref={topRef} className="w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center mb-10 flex items-center justify-center gap-3">
          <img
            src="/icona-meteo.png"
            alt="SabaMeteo logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            SabaMeteo
          </h1>
        </div>

        <div className="mx-auto max-w-2xl">
          <SearchBar onSearch={handleSearch} onReset={handleReset} />
        </div>

        {loading && (
          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-4 shadow-2xl">
              <p className="text-white/90 animate-pulse">
                Caricamento meteo...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 mx-auto max-w-xl rounded-2xl border border-red-300/30 bg-red-500/10 backdrop-blur-xl px-6 py-4 text-center shadow-xl">
            <p className="text-red-100">{error}</p>
          </div>
        )}

        {weather && (
          <div className="mt-10">
            <WeatherCard
              weather={weather}
              isSelected={selectedDay === getTodayKey()}
              onSelectDay={() => setSelectedDay(getTodayKey())}
            />

            {dailyForecast.length > 0 && (
              <Forecast
                data={dailyForecast}
                selectedDay={selectedDay}
                onSelectDay={handleSelectDay}
              />
            )}

            {selectedDay && selectedDayDetails.length > 0 && (
              <div ref={detailsRef}>
                <DayDetails
                  data={selectedDayDetails}
                  onClose={handleCloseDetails}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default App
