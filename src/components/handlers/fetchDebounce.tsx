
import axios from 'axios'
import { useState } from 'react'

export const useFetchDebounce = () => {

    const [debounce, setDebounce] = useState(false)

    const fetchData = async (route: string, jsonData: object) => {

        const { data } = await axios.post(`/api/${route}`, jsonData)
        return data

    }

    return { data: fetchData, debounce, setDebounce }
}