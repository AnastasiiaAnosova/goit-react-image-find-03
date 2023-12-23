import React from 'react'
import { ImageGalleryItemStyles, ImageGalleryItemImgStyles } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ webformatURL, alt }) => {
    return (
        <ImageGalleryItemStyles>
            <ImageGalleryItemImgStyles src={webformatURL} alt={alt} />
        </ImageGalleryItemStyles>
    )
}

export default ImageGalleryItem