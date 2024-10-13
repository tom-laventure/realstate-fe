import comment from 'Assets/Types/EstateCommentType'
import React from 'react'
import classes from './SubComments.module.scss'
import { Comment } from '../Comments/Comments'
import SubcommentForm from 'Components/Common/Form/Subcomment/SubCommentForm'

type SubCommentsProps = {
    selectedComment: comment,
    setSelectedComment: (comment: comment | undefined) => void
}

const SubComments = ({ selectedComment, setSelectedComment }: SubCommentsProps) => {
    return (
        <div className={classes['subcomment-container']}>
            <div>
                Reply:
            </div>
            <div className={classes['subcomment--comments']}>
                <Comment comment={selectedComment} functionArray={[]} />
            </div>
        </div>
    )
}

const SubComment = () => {

}

export default SubComments