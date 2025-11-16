import estate from 'Assets/Types/EstateType'
import React, { useState } from 'react'
import classes from './CommentsTable.module.scss'
import CommentForm from 'Components/Common/Form/Comment/CommentForm'
import SubCommentForm from 'Components/Common/Form/Subcomment/SubCommentForm'
import { Route, Routes } from 'react-router-dom'
import Comments from 'Components/View/Comments/Comments'
import SubComments from 'Components/View/SubComments/SubComments'
import CommentsFormPopup from 'Components/Common/Popups/CommentsFormPopup/CommentsFormPopup'
import SubCommentsFormPopup from 'Components/Common/Popups/SubCommentsFormPopup/SubCommentsFormPopup'
import { useDispatch } from 'react-redux'
import { editComment } from 'Store/Reducers/comments'

type Props = {
  estate: estate
}

const CommentsTable = ({ estate }: Props) => {
  const [openPopup, setOpenPopup] = useState(true)

  return (
    <div className={classes['estate-details']}>
      <div className={classes['estate-details--comments']}>
        <Routes>
          <Route path="comment/:comment_id" element={<SelectedCommenView openPopup={openPopup} setPopup={setOpenPopup} />} />
          <Route path="/" element={<CommentView estate={estate} openPopup={openPopup} setPopup={setOpenPopup} />} />
        </Routes>
      </div>
    </div>
  )
}

interface CommentViewProps {
  estate: estate,
  openPopup: boolean,
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentView = ({ estate, openPopup, setPopup }: CommentViewProps) => {
  return (
    <>
      <Comments comments={estate.estate_comments} estateId={estate.id} openPopup={() => setPopup(true)} />
      {openPopup && <CommentsFormPopup closePopup={() => setPopup(false)}>
        <CommentForm closePopup={() => setPopup(false)} />
      </CommentsFormPopup>}

    </>
  )
}

interface SelectedCommentViewProps {
  openPopup: boolean,
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedCommenView = ({ openPopup, setPopup }: SelectedCommentViewProps) => {
  const dispatch = useDispatch()


  const closePopup = () => {
    setPopup(false)
    dispatch(editComment(undefined))
  }


  return (
    <>
      <SubComments openPopup={() => setPopup(true)} />
      {openPopup && <SubCommentsFormPopup closePopup={() => closePopup()}>
        <SubCommentForm closePopup={() => closePopup()} />
      </SubCommentsFormPopup>}
    </>
  )
}

export { CommentView }
export default CommentsTable