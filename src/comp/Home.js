import React,{useState} from 'react'
import { GiFairyWand } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs";
import UseFetch from './UseFetch'
import { BiError } from "react-icons/bi";

export default function Home() {
    const [searchItem,setSearchItem] = useState('')
    const [searchText,setSearchText] = useState('')
    const [oldSearch,setOldSearch] = useState([])
    const {loading,error,gifData} = UseFetch(searchText)
    
    const onSearchChange=(e)=>{
        setSearchItem(e.target.value)     
    }

    const onOldSearchClick=(search_text)=>{        
           setSearchItem(search_text)
           setSearchText(search_text)
    }

    const onSearchClick=(e)=>{
        e.preventDefault()
       setSearchText(searchItem)
        let demoOldSearch = [...oldSearch]
        let check;
        if(oldSearch.length > 10){
            demoOldSearch.shift()
            check= demoOldSearch.filter(j=>j !== searchItem)
        check.push(searchItem)
        setOldSearch(check)
            
        }else{
            check= demoOldSearch.filter(j=>j !== searchItem)
            check.push(searchItem)
            setOldSearch(check)
        }      
    }
    
    return (
        
        <section>
            {loading ? (
                <div className="loading">
                <div className="load">
                    <div className="curve"></div>
                </div>
                </div>
            ):(<div></div>)}
           
            <nav>
                <div className="header">
                     <GiFairyWand />
                     <h1>Hello, Giphy</h1>
                </div>
                </nav>
                <div className="container">
                    <div className="old-search">
                        {oldSearch.length > 0 ? (
                            oldSearch.map((j,i)=>(
                                <p key={i} onClick={()=>onOldSearchClick(j)}><span>#</span>{j}</p>
                            ))
                        ): (<div></div>)}
                        
                        
                        
                    </div>
                    <div className="search">
                        <form onSubmit={onSearchClick} action="">
                        <input  type="search"
                                value={searchItem}
                                placeholder='Search Gif' 
                                name="search"
                                onChange={onSearchChange} />
                        <button type='submit'><BsArrowRight /></button>
                        </form>
                    </div>
                  <div className="gif-container">
                      {gifData.length > 0 ? (
                          gifData.map((j,i)=>(
                            <div key={i} className="gif-box">
                                <img src={j} alt="" />
                            </div>
                          ))
                      ):(<div></div>)}

                      {error ? (
                       <div className="error">
                           <BiError />
                           <h1>Something went wrong</h1>
                           
                       </div>
                      ):(<div></div>)}
                      
                  </div>

                </div>
           
        </section>
    )
}
