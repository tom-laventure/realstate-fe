import React from 'react'
import classes from './AddEstatePopup.module.scss'
import PopupContainer from '../PopupContainer'
import AddEstateForm from 'Components/Common/Form/Estate/AddEstateForm'

interface AddEstatePopupProps {
  close: () => void
}

const AddEstatePopup = ({ close }: AddEstatePopupProps) => {
  return (
    <PopupContainer closePopup={close}>
      <div className={classes['estate-popup--container']}>
        <div className={classes['estate-popup--header']}>Add Listing</div>
        <AddEstateForm />
      </div>
    </PopupContainer>
  )
}

export default AddEstatePopup