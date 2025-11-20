import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getPerson = (id)=>{
    const url = `${baseUrl}/${id}`
    const request = axios.get(url)
    return request.then((res)=> res.data)
}

const getPersons = ()=>{
    const request = axios.get(baseUrl)
    return request.then(res=>res.data)
}

const addPerson = (name, number) => { 
    const newPerson = {name,number}
    const request = axios.post(baseUrl,newPerson)
    return request.then((res)=> res.data)
}

const deletePerson = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then((res)=>res.data)
}

const updateNumber = (person, newNumber) => {
    const url = `${baseUrl}/${person.id}`
    const request = axios.put(url,{...person,number:newNumber})
    return request.then((res)=>res.data)
}

export default {getPersons,addPerson,deletePerson, updateNumber}