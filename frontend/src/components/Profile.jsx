import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL;


    const fetchData = () => {
        axios.post(`${apiUrl}/user/profile`, {}, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                setData(res.data.data)
                console.log("User data fetched", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
            })
    }

    console.log("data", data)

    useEffect(() => {
        fetchData()
    }, [])

    return (
<div className="mt-10">
    <div className="text-center">
        {loading && (
            <p className="font-medium text-gray-600 text-base">
                Data is loading...
            </p>
        )}
    </div>
    {!loading && (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden border border-gray-200">
            <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                    User Name: <span className="text-gray-700">{data.name}</span>
                </h2>
                <p className="text-gray-700 text-base mb-2">
                    <span className="font-medium text-gray-800">Email:</span> {data.email}
                </p>
                <p className="text-gray-700 text-base">
                    <span className="font-medium text-gray-800">ID:</span> {data.id}
                </p>
            </div>
        </div>
    )}
</div>

    )
}

export default Profile