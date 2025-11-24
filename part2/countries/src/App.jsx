import { useEffect, useState } from 'react'
import axios, { all } from 'axios'

const weather_api_key = import.meta.env.VITE_WEATHER_KEY


const Weather = ({ lat, lon }) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?"
  const part = "current,minutely,hourly,alerts"
  const [weatherInfo, setWeatherInfo] = useState([])

  axios.get(`${url}lat=${lat}&lon=${lon}&exclude=${part}&appid=${weather_api_key}`)
    .then(res => {
      setWeatherInfo(JSON.stringify(res.data))
    })

    return (
      <div>
        {weatherInfo}
      </div>
    )
}

const Search = ({ handleSearch }) => {

  const [value, setValue] = useState([])


  return (
    <form onSubmit={(e) => handleSearch(e, value)}>
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>
      <button type="submit">
        search
      </button>
    </form>
  )
}



const CountryInfo = ({ name }) => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"
  const [countryInfo, setCountryInfo] = useState([])
  const [lat, setLat] = useState([])
  const [lon, setLon] = useState([])

  console.log("name:", name)
  useEffect(() => {
    axios.get(`${baseUrl}/${name}`).then(res => {
      const country = res.data
      if (country == null) {
        setCountryInfo("")
      }
      if (res.status == 200) {
        setCountryInfo(JSON.stringify(country))
      }
    })
  }, [name])

  useEffect(() => {
    try {
      setLat(countryInfo.capitalInfo.latlng[0])
      setLon(countryInfo.capitalInfo.latlng[1])
    } catch {
      setLat(0)
      setLon(0)
    }
  }, [countryInfo])
  return <div>
    {countryInfo}
    <Weather lat={lat} lon={lon} />
  </div>
}

const CountriesList = ({ countries }) => {
  const [displayedCountries, setDisplayedCountries] = useState([countries])
  useEffect(() => {
    setDisplayedCountries(countries)
  }, [countries])



  const l = displayedCountries.length

  switch (l) {
    case 0:
      return <div></div>
    case 1:
      return (
        <div>
          <CountryInfo name={displayedCountries[0]} />
        </div>
      )
    default:
      if (l > 10) {
        return "Too many matches"
      }
      else {
        return (
          <ul>
            {countries.map(c =>
              <li key={c}>
                {c} <button onClick={() => setDisplayedCountries([c])}>show</button>
              </li>
            )}
          </ul>
        )

      }
  }
}



function App() {

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState(null)
  const [allCountries, setAllCountries] = useState([])
  useEffect(() => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
    axios.get(baseUrl).then(res => setAllCountries(res.data))
  }, [])

  const search = (event, query) => {
    event.preventDefault()
    //resets the query so we can still search even if the query hasn't changed (e.g. after clicking a "show" button)
    setQuery(null)
    setTimeout(() => setQuery(query), 1)
  }

  useEffect(() => {
    if (query == null) {
      return
    }
    else {
      const countryNames = allCountries.map(c => Object.values(c.name).slice(0, -1))
      //console.log(matchingCountries.map(c => c.name.common))

      const matching = countryNames
        .filter(n => n[0]
          .toLowerCase()
          .includes(query.toLowerCase())).map(n => n[0])

      setCountries(matching)
    }

  }, [query])

  return (
    <div>
      <Search handleSearch={search} />
      <CountriesList countries={countries} />
    </div>
  )
}

export default App
