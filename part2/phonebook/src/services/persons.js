import axios from "axios"

const baseUrl = "/api/persons"

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
    let request
    try{
        request = axios.delete(url).then(res => res, res => res.response)
    }
    catch(e){
        console.log(e)
    }
    console.log(request)

    return request
}

const updateNumber = (person, newNumber) => {
    const url = `${baseUrl}/${person.id}`
    const request = axios.put(url,{...person,number:newNumber})
    return request.then((res)=>res.data)
}

export default {getPersons,addPerson,deletePerson, updateNumber,getPerson}