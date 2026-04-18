const DayDetails = function ({ data, onClose }) {
  if (!data.length) return null

  const readableDate = new Date(data[0].dt_txt).toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <section className="mt-8 max-w-4xl mx-auto rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
      >
        ✕
      </button>

      <h3 className="text-2xl font-bold capitalize mb-6 pr-10">
        Dettaglio di {readableDate}
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-2 px-1 hide-scrollbar md:grid md:grid-cols-5 md:px-0 md:overflow-visible">
        {data.map((item, index) => (
          <div
            key={index}
            className="min-w-[180px] shrink-0 rounded-2xl border border-white/15 bg-white/10 p-4 text-center lg:min-w-0"
          >
            <p className="text-sm text-white/70">
              {new Date(item.dt_txt).toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />

            <p className="text-lg font-semibold">
              {Math.round(item.main.temp)}°C
            </p>

            <p className="text-sm text-white/80 capitalize mt-1">
              {item.weather[0].description}
            </p>

            <div className="mt-3 space-y-1 text-sm text-white/70">
              <p>Percepita: {Math.round(item.main.feels_like)}°C</p>
              <p>Umidità: {item.main.humidity}%</p>
              <p>Vento: {item.wind.speed} m/s</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DayDetails
