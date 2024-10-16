import React from 'react'

function SummaryPreview({ resumeInfo }) {
    return (
        <div >
            <div className='mt-2'>
                <h2 className='font-normal text-xs  '>{resumeInfo?.summery}</h2>
            </div>
        </div>
    )
}

export default SummaryPreview
