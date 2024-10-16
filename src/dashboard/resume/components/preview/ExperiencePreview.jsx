import React from 'react'

const ExperiencePreview = ({ resumeInfo }) => {
    console.log(resumeInfo?.experience?.title);

    return (
        <div className='my-2'>
            <h2 className=' font-bold text-xl' style={{ color: resumeInfo?.themeColor }}>Professional Experience</h2>
            <hr className='border-[1.5px] mt-2' style={{
                borderColor: resumeInfo?.themeColor
            }} />
            {resumeInfo?.experience.map((experience, index) => (
                <div className='my-2' key={index}>
                    <div className='flex justify-between'>
                        <h2 className='font-medium text-sm' style={{ color: resumeInfo?.themeColor }}>{experience?.companyName}</h2>
                        <h2 className='font-medium text-xs'>{experience?.city}, {experience?.state}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='font-medium text-xs'>{experience?.title}</h2>
                        <h2 className='font-normal text-xs'>{experience?.startDate} <span className='font-bold'>To</span> {experience?.currentlyWorking? 'Present' : experience?.endDate }</h2>
                    </div>
                    {/* <p className='font-normal text-xs mt-2'>{experience?.workSummery}</p> */}
                    <div className='font-normal text-xs mt-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}}/>
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview
