import React, { memo } from 'react'

function Ball({ number, color }) {
    return (
        <div className={`bg-gradient-radial-${color} text-white shadow-md h-12 w-12 rounded-full flex justify-center mx-auto`}>
            <p className='self-center font-medium text-xl'>{number}</p>
        </div>
    )
}

export default memo(Ball)