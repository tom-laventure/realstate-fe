import estate from 'Assets/Types/EstateType'
import React, { useState } from 'react'
import classes from './EstateDetails.module.scss'
import Comments from '../Comments/Comments'
import CommentForm from 'Components/Common/Form/Comment/CommentForm'
import comment from 'Assets/Types/EstateCommentType'
import SubComments from '../SubComments/SubComments'
import SubCommentForm from 'Components/Common/Form/Subcomment/SubCommentForm'

type Props = {
  estate: estate
}

const EstateDetails = ({ estate }: Props) => {
  const [selectedComment, setSelectedComment] = useState<comment>()
  let temp = estate.estate_comments ? estate.estate_comments[0] : undefined

  const openSubComment = (comment: comment) => {
    setSelectedComment(comment)
  }


  return (
    <div className={classes['estate-details']}>
      <div className={classes['estate-details--header']}>
        {estate.header}
      </div>
      <div className={classes['estate-details--info']}>
        <div>Full listing: <a href={estate.link}>{estate.link}</a></div>

        <div className={classes['estate-details--comments']}>
          {temp ?
            <>
              <SubComments selectedComment={temp} setSelectedComment={setSelectedComment} />
              <SubCommentForm  selectedCommentId={temp.id} />
            </>
            :
            <>
              <Comments comments={estate.estate_comments} estateId={estate.id} openSubComment={openSubComment} />
              <CommentForm />
            </>
          }
        </div>
      </div>

    </div>
  )
}

export default EstateDetails