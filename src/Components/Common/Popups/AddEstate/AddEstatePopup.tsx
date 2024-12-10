import React from 'react'
import classes from './AddEstatePopup.module.scss'
import PopupContainer from '../PopupContainer'
import AddEstateForm from 'Components/Common/Form/Estate/AddEstateForm'
import CloseIcon from '@mui/icons-material/Close';

interface AddEstatePopupProps {
  close: () => void
}

const AddEstatePopup = ({ close }: AddEstatePopupProps) => {
  return (
    <PopupContainer disableOutsideClickClose closePopup={close}>
      <div className={classes['estate-popup--container']}>
        <CloseIcon className={classes['estate-popup--close-button']} onClick={close} />
        <div className={classes['estate-popup--header']}>Add Listing</div>
        <AddEstateForm close={close} />
      </div>
    </PopupContainer>
  )
}

export default AddEstatePopup