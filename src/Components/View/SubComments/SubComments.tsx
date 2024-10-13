import comment from 'Assets/Types/EstateCommentType'
import React, { useEffect } from 'react'
import classes from './SubComments.module.scss'
import { Comment } from '../Comments/Comments'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom'
import useFetchSubComments from 'Store/Hooks/Subcomments/useFetchSubcomments'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import subcomment from 'Assets/Types/EstateSubCommentType'
import EllipsisMenu from 'Components/Common/Buttons/Elipsis/Elipsis'


const SubComments = () => {
    const { estate_id, selected_id, comment_id } = useParams()
    const selectedComment = useAppSelector((state) => state.estates.selectedEstate.estate_comments?.find(el => el.id == comment_id))
    const subcomments = useAppSelector((state) => state.subcomments.subcomments)
    const navigate = useNavigate()

    const { } = useFetchSubComments(comment_id)



    const goBack = () => {
        navigate(`/estates/${estate_id}/selected/${selected_id}`)
    }

    return (
        <div className={classes['subcomment-container']}>
            <div>
                <Button onClick={() => goBack()}><ArrowBackIcon color='action' fontSize='small' /> </Button>Reply:
            </div>
            <div className={classes['subcomment--comments']}>
                {selectedComment && <Comment comment={selectedComment} functionArray={[]} />}
                {subcomments.map((el, index) => {
                    return <SubComment subcomment={el} key={index} />
                })}
            </div>
        </div>
    )
}

interface SubcommentProps {
    subcomment: subcomment
}

const SubComment = ({ subcomment }: SubcommentProps) => {
    return (
        <div className={classes['subcomment--comment']}>
            <div className={classes['subcomment--comment__elipsis']}><EllipsisMenu functionArray={[]} id={subcomment.id} /></div>
            <div className={classes['subcomment--comment__text']}>{subcomment.comment}</div>
            <div className={classes['subcomment--comment__addition']}>
                <div className={classes['subcomment--comment__owner']}>{subcomment.comment_owner}</div>
            </div>
        </div>
    )
}

export default SubComments