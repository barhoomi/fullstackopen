import { useEffect, useState } from 'react'
import axios, { all } from 'axios'

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

  const output = useEffect(() => {
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

  return <div>{countryInfo}</div>
}

const CountiesList = ({ countries }) => {
  const l = countries.length

  switch (l) {
    case 0:
      return <div></div>
    case 1:
      return (
        <div>
          <CountryInfo name={countries[0]} />
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
                {c}
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
  const getAllCountries = useEffect(() => {
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
    axios.get(baseUrl).then(res => setAllCountries(res.data))
  }, [])

  const search = (event, query) => {
    event.preventDefault()

    setQuery(query)
  }

  useEffect(() => {
    if (query == null){
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
      <CountiesList countries={countries} />
    </div>
  )
}

export default App
