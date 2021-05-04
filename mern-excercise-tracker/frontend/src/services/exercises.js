import axios from 'axios'
let token = null
const postaviToken = noviToken =>{
    token= `bearer ${noviToken}`
}

const dohvatiSveKorinike=()=>{
    const promise= axios.get('http://localhost:5000/users/')
    return promise.then( response => response.data)
}
const spremiKorisnikovuVježbu =async exercise =>{
    const config ={
        headers: {Authorization: token}
    }
    const odg=await axios.post('http://localhost:5000/exercises/add', exercise,config)
    return odg

}
const dohvatiKorisnikoveVjezbe=()=>{
    const config ={
        headers: {Authorization: token}
    }
    const odg=  axios.get('http://localhost:5000/exercises/korisnikovevjezbe',config)
    return odg.then( response => response.data)
}
const dohvatiSveVježbe=()=>{
    const promise= axios.get('http://localhost:5000/exercises')
    return promise.then( response => response.data)
}
const obrisiVjezbu= async id=>{
    const config ={
        headers: {Authorization: token}
    }
    const odgovor=await  axios.delete('http://localhost:5000/exercises/'+id,config)
    return odgovor
}
const dohvatiVjezbuPoIdu = id =>{
    const promise= axios.get('http://localhost:5000/exercises/'+id)
    return promise.then( response => response.data)

}

const updejtajVjezbu =async(id,exercise)=>{
    const config ={
        headers: {Authorization: token}
    }
    const odgovor=await axios.post('http://localhost:5000/exercises/update/' + id, exercise,config)
    return odgovor
}
export default{
    dohvatiSveKorinike,
    spremiKorisnikovuVježbu,
    dohvatiSveVježbe,
    obrisiVjezbu,
    dohvatiVjezbuPoIdu,
    updejtajVjezbu,
    postaviToken,
    dohvatiKorisnikoveVjezbe

}