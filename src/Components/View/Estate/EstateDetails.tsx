import estate from 'Assets/Types/EstateType'
import React from 'react'
import classes from './EstateDetails.module.scss'
import Comments from '../Comments/Comments'

type Props = {
  estate: estate
}

const EstateDetails = ({ estate }: Props) => {
  return (
    <div className={classes['estate-details']}>
      <div className={classes['estate-details--header']}>
        {estate.header}
      </div>
      <div className={classes['estate-details--info']}>
        <div>Full listing: <a href={estate.link}>{estate.link}</a></div>

        <div className={classes['estate-details--comments']}>
          <Comments comments={estate.estate_comments}/>
        </div>
      </div>

    </div>
  )
}

export default EstateDetails