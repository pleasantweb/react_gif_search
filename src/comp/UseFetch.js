import {useState,useEffect} from 'react'
import axios from 'axios'
export default function UseFetch(searchText) {
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(false)
   const [gifData,setGifData] = useState([])
  
  useEffect(()=>{
    
    setError(false)
    const source = axios.CancelToken.source()
    const api_key = process.env.REACT_APP_API_KEY 
  
    const fetchData =async ()=>{
        setLoading(true)
        try{
            const res=await axios({
                    method : 'GET',
                    Accept:'application/json',
                
                    url : 'https://api.giphy.com/v1/gifs/search',
                    params: {api_key:api_key,q:searchText,limit:20}
                })
            const myData = await res.data
            let yo =[]
             myData.data.map((j,i)=>{
               return yo.push(j.images.preview_gif.url)
            })
            // console.log(yo);
                setGifData(yo)      
                setLoading(false)
        }catch(err){
            if(axios.isCancel(err)){

            }else{
                setError(true)
                setLoading(false)
            }
        }
        } 

        if(searchText !== ''){
            fetchData()
        }
   

    return ()=>{
        source.cancel()
    }
        
    },[searchText])

    return {loading,error,gifData}
}