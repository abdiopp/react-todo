import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
export default function TopBar() {
    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        setInterval(() => {
            setCurrentTime(dayjs().format("dddd MMMM  D YYYY hh:mm:ss A"))
        }, 1000);
    }, [])
    return (
        <header className='py-1 bg-primary'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-center text-white">
                            {currentTime}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
