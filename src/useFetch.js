import { useEffect, useState } from "react";


function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then(response => response.json())
        .then(res => setData(res))
        .finally(() => {
            setLoading(false)
        })
    }, [url])

    return {data, loading, error}
}

export default useFetch;