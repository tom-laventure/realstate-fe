import estate from 'Assets/Types/EstateType'
import React from 'react'
import classes from './EstateDetails.module.scss'

type Props = {
  estate: estate
}

const EstateDetails = ({ estate }: Props) => {
  return (
    <div className={classes['estate-details']}>
      <div className={classes['estate-details']}>
        {estate.header}
      </div>
    </div>
  )
}

export default EstateDetails