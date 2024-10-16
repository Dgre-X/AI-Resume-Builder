import React from 'react'

const SkillsPreview = ({ resumeInfo }) => {
    return (
        <div className='my-2'>
            <h2 className='font-bold text-xl' style={{ color: resumeInfo?.themeColor }}>Skills</h2>
            <hr className='border-[1.5px] mt-2' style={{
                borderColor: resumeInfo?.themeColor
            }} />
            <div className='grid grid-cols-2 gap-1 my-1' >
                {resumeInfo?.skills.map((skills, index) => (
                    <div key={index}>
                        <div className='flex justify-between items-center my-2 px-2'>
                            <h2 className='text-sm'>{skills?.name}</h2>
                            {/* h-2 bg-gray-400 w-[120px] */}
                            <div className='skill-rating-bar'>
                            {/* h-2 */}
                                <div className='skill-rating-fill' style={{
                                    backgroundColor : resumeInfo?.themeColor,
                                    width: skills?.rating*20 + '%'
                                }}>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsPreview
