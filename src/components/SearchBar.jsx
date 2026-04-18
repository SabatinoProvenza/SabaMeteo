import { useState } from "react"

const SearchBar = function ({ onSearch, onReset }) {
  const [city, setCity] = useState("")

  const handleSubmit = function (e) {
    e.preventDefault()

    const trimmedCity = city.trim()
    if (!trimmedCity) return

    onSearch(trimmedCity)
  }

  const handleClear = function () {
    setCity("")
    onReset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-3 sm:p-4"
    >
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Inserisci una città..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 pr-12 text-white placeholder:text-white/60 outline-none focus:border-sky-300/60 focus:ring-2 focus:ring-sky-300/30"
          />

          {city && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-blue-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
        >
          Cerca
        </button>
      </div>
    </form>
  )
}

export default SearchBar
