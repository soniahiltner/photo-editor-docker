import { createContext, useCallback, useState } from 'react'
import Proptypes from 'prop-types'

export const ImageContext = createContext()

export const ImageProvider = ({ children }) => {
  const [originalFilename, setOriginalFilename] = useState('')
  const [filename, setFilename] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [width, setWidth] = useState(originalWidth)
  const [height, setHeight] = useState(originalHeight)

  // State for navbar
  const [navbar, setNavbar] = useState(true)
  const [resize, setResize] = useState(false)
  const [convert, setConvert] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [flip, setFlip] = useState(false)
  const [adjust, setAdjust] = useState(false)
  const [cropAndResize, setCropAndResize] = useState(false)
  const [crop, setCrop] = useState(false)
  const [frames, setFrames] = useState(false)

  // State for edition forms
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [editDone, setEditDone] = useState(false) // control the save options in edition forms

  // State for resizing
  const [newWidth, setNewWidth] = useState(width || originalWidth)
  const [newHeight, setNewHeight] = useState(height || originalHeight)
  const [percentageValue, setPercentageValue] = useState(100)

  // State for converting
  const [format, setFormat] = useState(filename.split('.').pop())
  const [quality, setQuality] = useState(100)

  // State for rotating
  const [degrees, setDegrees] = useState(0)

  // State for adjusting
  const [brightness, setBrightness] = useState(0)
  const [lightness, setLightness] = useState(0)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)

  // State for frames
  const [size, setSize] = useState('0')
  const [background, setBackground] = useState('black')
  const [keepSize, setKeepSize] = useState('') // control the resize of the image

  //State for cropping and resizing
  const [newWidthValue, setNewWidthValue] = useState('')
  const [newHeightValue, setNewHeightValue] = useState('')
  const [newRatio, setNewRatio] = useState('')
  const [cropOption, setCropOption] = useState('center')

  // State for cropping
  const [edit, setEdit] = useState(false)
  const [coordinates, setCoordinates] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  // Handle reset forms
  const resetForms = () => {
    setSuccess(false)
    setEditDone(false)
    setPercentageValue(100)
    setQuality(100)
    setDegrees(0)
    setFormat(filename.split('.').pop())
    setBrightness(0)
    setLightness(0)
    setHue(0)
    setSaturation(0)
    setSize('0')
    setBackground('black')
    setKeepSize('yes')
    setNewRatio('')
    setNewWidthValue('')
    setNewHeightValue('')
    setCropOption('center')
    setEdit(false)
    setCoordinates(null)
    setCroppedImage(null)

    if (width && height) {
      setNewWidth(width)
      setNewHeight(height)
    } else {
      setNewWidth(originalWidth)
      setNewHeight(originalHeight)
    }
  }

  // Show navbar and hide edition forms
  const showNavbar = () => {
    setNavbar(true)
    setResize(false)
    setConvert(false)
    setRotate(false)
    setFlip(false)
    setAdjust(false)
    setCrop(false)
    setFrames(false)
    setCropAndResize(false)
  }

  // Handle close button in the edition forms
  const handleClose = () => {
    showNavbar()
    resetForms()
  }

  // Download image
  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a')
      link.href = image
      link.setAttribute('download', `image.${format}`)
      link.click()
    }
  }

  // get original image
  const getImage = useCallback(async (originalFilename) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/image/${originalFilename}`)
      if (!res.ok) {
        throw new Error('Failed to fetch image')
      }
      const data = await res.json()
      setImage(data.dataUrl)
      setOriginalFilename(data.filename)
      setFilename(data.filename)
      setOriginalWidth(data.width)
      setOriginalHeight(data.height)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])

  

  return (
    <ImageContext.Provider
      value={{
        getImage,
        resetForms,
        downloadImage,
        showNavbar,
        handleClose,
        image,
        setImage,
        originalFilename,
        setOriginalFilename,
        filename,
        setFilename,
        navbar,
        setNavbar,
        resize,
        setResize,
        convert,
        setConvert,
        rotate,
        setRotate,
        flip,
        setFlip,
        adjust,
        setAdjust,
        cropAndResize,
        setCropAndResize,
        crop,
        setCrop,
        frames,
        setFrames,
        originalWidth,
        setOriginalWidth,
        originalHeight,
        setOriginalHeight,
        newWidth,
        setNewWidth,
        newHeight,
        setNewHeight,
        loading,
        error,
        setError,
        setLoading,
        success,
        setSuccess,
        successMessage,
        setSuccessMessage,
        width,
        setWidth,
        height,
        setHeight,
        percentageValue,
        setPercentageValue,
        editDone,
        setEditDone,
        format,
        setFormat,
        quality,
        setQuality,
        degrees,
        setDegrees,
        brightness,
        setBrightness,
        lightness,
        setLightness,
        saturation,
        setSaturation,
        hue,
        setHue,
        size,
        setSize,
        background,
        setBackground,
        keepSize,
        setKeepSize,
        newWidthValue,
        setNewWidthValue,
        newHeightValue,
        setNewHeightValue,
        newRatio,
        setNewRatio,
        cropOption,
        setCropOption,
        edit,
        setEdit,
        coordinates,
        setCoordinates,
        croppedImage,
        setCroppedImage
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

ImageProvider.propTypes = {
  children: Proptypes.node.isRequired
}
