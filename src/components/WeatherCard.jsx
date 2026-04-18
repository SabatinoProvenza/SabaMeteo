const WeatherCard = function ({ weather }) {
  const icon = weather.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  return (
    <div className="mx-auto block w-full max-w-3xl rounded-[2rem] overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* COLONNA SINISTRA */}
        <div className="p-4 sm:p-6 md:p-8 text-center md:text-left">
          <p className="text-white/70 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            Meteo attuale
          </p>

          <h2 className="mt-2 text-xl sm:text-3xl md:text-5xl font-bold leading-tight">
            {weather.resolvedLocation?.name || weather.name}
          </h2>

          <p className="mt-1 text-sm sm:text-base text-white/70">
            {weather.resolvedLocation?.state
              ? `${weather.resolvedLocation.state}, ${weather.resolvedLocation.country}`
              : weather.resolvedLocation?.country}
          </p>

          <p className="mt-2 text-sm sm:text-lg text-white/85 capitalize">
            {weather.weather[0].description}
          </p>

          <div className="mt-4 sm:mt-6">
            <p className="text-3xl sm:text-5xl md:text-7xl font-bold leading-none">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="mt-2 text-sm sm:text-lg text-white/75">
              Percepita: {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
        </div>

        {/* COLONNA DESTRA */}
        <div className="flex flex-col items-center justify-center gap-4 p-4 sm:p-6 md:p-8 border-t sm:border-t-0 sm:border-l border-white/10">
          <img
            src={iconUrl}
            alt={weather.weather[0].description}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 drop-shadow-2xl"
          />

          {/* INFO COMPATTE */}
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] sm:text-xs text-white/65">Umidità</p>
              <p className="text-xs sm:text-sm font-semibold">
                {weather.main.humidity}%
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] sm:text-xs text-white/65">Vento</p>
              <p className="text-xs sm:text-sm font-semibold">
                {weather.wind.speed} m/s
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] sm:text-xs text-white/65">Min / Max</p>
              <p className="text-xs sm:text-sm font-semibold">
                {Math.round(weather.main.temp_min)}° /{" "}
                {Math.round(weather.main.temp_max)}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
