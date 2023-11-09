import React from 'react'

const ImageViewComp = ({imageName, compId, defaultStyle, getImageUrl, defaultImage}) => {

  return (
    <>
        {
            imageName && imageName.startsWith('http') ? 
            <img style={defaultStyle} alt="profile" src={imageName} /> :
            <img style={defaultStyle} alt="profile" 
            src={imageName && imageName.toUpperCase() !== 'default.png'.toUpperCase() ? 
            getImageUrl(compId) : defaultImage} 
            /> 
        }
    </>
  )
}

export default ImageViewComp