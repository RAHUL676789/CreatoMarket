import React from 'react'

const NotFound = ({errMsg}) => {
return (
    <div className="flex flex-col   items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mb-2">{errMsg}</h2>
        <p className="text-lg mb-6 text-center">
            Sorry, the page you are looking for does not exist.
        </p>
        <a
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
            Go Back Home
        </a>
    </div>
)
}

export default NotFound
