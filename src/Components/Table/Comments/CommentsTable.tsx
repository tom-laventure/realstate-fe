import estate from 'Assets/Types/EstateType'
import React, { useState } from 'react'
import classes from './CommentsTable.module.scss'
import CommentForm from 'Components/Common/Form/Comment/CommentForm'
import SubCommentForm from 'Components/Common/Form/Subcomment/SubCommentForm'
import { Route, Routes, useLocation } from 'react-router-dom'
import Comments from 'Components/View/Comments/Comments'
import SubComments from 'Components/View/SubComments/SubComments'

type Props = {
  estate: estate
}

const CommentsTable = ({ estate }: Props) => {
  return (
    <div className={classes['estate-details']}>
      <div className={classes['estate-details--comments']}>
        <Routes>
          <Route path="comment/:comment_id" element={<SelectedCommenView />} />
          <Route path="/" element={<CommentView estate={estate} />} />
        </Routes>
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

export { CommentView }
export default CommentsTable