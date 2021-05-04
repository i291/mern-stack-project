import axios from 'axios'

const dodajNovogKorisnika =async user =>{
    
    const odg=await axios.post('http://localhost:5000/login/add', user)
    return odg.data
}
const Register=async user=>{
    const odg=await axios.post('http://localhost:5000/users/add', user)
    return odg.data
}
const dohvatiKorisnike = ()=>{
    return axios.get('http://localhost:5000/users/')
}
export default{
    dodajNovogKorisnika,
    dohvatiKorisnike,
    Register

}