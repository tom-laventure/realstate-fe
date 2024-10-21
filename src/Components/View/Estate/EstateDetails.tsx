import estate from 'Assets/Types/EstateType'
import React, { useState } from 'react'
import classes from './EstateDetails.module.scss'
import Comments from '../Comments/Comments'
import CommentForm from 'Components/Common/Form/Comment/CommentForm'
import SubComments from '../SubComments/SubComments'
import SubCommentForm from 'Components/Common/Form/Subcomment/SubCommentForm'
import { Route, Routes, useLocation } from 'react-router-dom'
import Ratings from '../Ratings/Ratings'

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
        <div>
          <div>Full listing: <a href={estate.link}>{estate.link}</a></div>
          <Ratings />
        </div>
        <div className={classes['estate-details--comments']}>
          <Routes>
            <Route path="comment/:comment_id" element={<SelectedCommenView />} />
            <Route path="/" element={<CommentView estate={estate} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

interface CommentViewProps {
  estate: estate
}

const CommentView = ({ estate }: CommentViewProps) => {
  return (
    <>
      <Comments comments={estate.estate_comments} estateId={estate.id} />
      <CommentForm />
    </>
  )
}

const SelectedCommenView = () => {
  return (
    <>
      <SubComments />
      <SubCommentForm />
    </>
  )
}

export default EstateDetails