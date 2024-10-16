import React from 'react'

const EducationalPreview = ({ resumeInfo }) => {
    return (
        <div className='my-2'>
            <h2 className='font-bold text-xl' style={{ color: resumeInfo?.themeColor }}>Education</h2>
            <hr className='border-[1.5px] mt-2' style={{
                borderColor: resumeInfo?.themeColor
            }} />
            {resumeInfo?.education.map((education, index) => (
                <div className='my-2' key={index}>
                    <div className='flex justify-between'>
                        <h2 className='font-medium text-sm' style={{ color: resumeInfo?.themeColor }}>{education?.universityName}</h2>
                        <h2 className='font-normal text-xs'>{education?.startDate} <span className='font-bold'>To</span> {education?.endDate}</h2>
                    </div>
                    <h2 className='font-medium text-xs'>{education?.degree} in {education?.major}</h2>
                    <p className='font-normal text-xs mt-2'>{education?.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EducationalPreview
