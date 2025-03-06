import React, { useEffect, useState } from 'react'

function useFetch() {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=> {
        const fetchData = async () =>{
            try{
                const response = await fetch("https://randomuser.me/api/");
                if(!response.ok) throw new Error("Failed to fetch data")
                    const result = await response.json();
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    },["https://randomuser.me/api/"]);
    
  return {data,loading,error}
}

export default useFetch