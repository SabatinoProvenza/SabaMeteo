const Forecast = function ({ data, selectedDay, onSelectDay }) {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-2 px-1 hide-scrollbar md:grid md:grid-cols-5 md:px-0 md:overflow-visible">
        {data.map((item, index) => {
          const date = new Date(item.dt_txt)
          const dayKey = item.dt_txt.split(" ")[0]
          const isSelected = selectedDay === dayKey

          return (
            <button
              key={index}
              onClick={() => onSelectDay(dayKey)}
              className={`min-w-[140px] shrink-0 rounded-2xl border p-4 text-center backdrop-blur-xl transition hover:scale-[1.02]
                md:min-w-0 cursor-pointer ${
                  isSelected
                    ? "bg-white/20 border-white/40 shadow-xl"
                    : "bg-white/10 border-white/20"
                }`}
            >
              <p className="text-sm text-white/70">
                {date.toLocaleDateString("it-IT", { weekday: "short" })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />

              <p className="text-lg font-semibold">
                {Math.round(item.main.temp)}°C
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Forecast
