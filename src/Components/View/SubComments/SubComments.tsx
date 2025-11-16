import React from 'react'
import classes from './SubComments.module.scss'
import { Comment } from '../Comments/Comments'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useFetchSubComments from 'Store/Hooks/Subcomments/useFetchSubcomments'
import { useAppSelector, useAppDispatch } from 'Store/Hooks/useDispatch'
import subcomment from 'Assets/Types/EstateSubCommentType'
import EllipsisMenu, { elipsisFunctionType } from 'Components/Common/Buttons/Elipsis/Elipsis'
import { setEditSubcomment } from 'Store/Reducers/subcomments'


const SubComments = () => {
    const { group_id, selected_id, comment_id } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const goBack = () => {
        // preserve existing query params but ensure tab=comments
        const next = new URLSearchParams(searchParams)
        next.set('tab', 'comments')

        navigate(`/estates/${group_id}/selected/${selected_id}?${next.toString()}`, { replace: true })
    }

    const selectedComment = useAppSelector((state) => state.estates.selectedEstate.estate_comments?.find(el => el.id == comment_id))
    const subcomments = useAppSelector((state) => state.subcomments.subcomments)
    const dispatch = useAppDispatch()

    const { } = useFetchSubComments(comment_id)

    const editSubComment = (sc: subcomment) => { dispatch(setEditSubcomment(sc)) }
    const deleteSubComment = (sc: subcomment) => { dispatch(setEditSubcomment(sc))} 
    const editComment = () => {

    }

    const deleteComment = () => {

    }

    const functionArray = [
        {
            label: 'edit',
            func: editComment
        },
        {
            label: 'delete',
            func: deleteComment
        }
    ]


    const functionSubCommentArray = [
        {
            label: 'edit',
            func: editSubComment
        },
        {
            label: 'delete',
            func: deleteSubComment
        }
    ]

    return (
        <div className={classes['subcomment-container']}>
            <div>
                <Button onClick={() => goBack()}><ArrowBackIcon color='action' fontSize='small' /> </Button>Reply:
            </div>
            <div className={classes['subcomment--comments']}>
                {selectedComment && <Comment comment={selectedComment} functionArray={functionArray} />}
                {subcomments.map((el, index) => {
                    return <SubComment functionArray={functionSubCommentArray} subcomment={el} key={index} />
                })}
            </div>
        </div>
    )
}

interface SubcommentProps {
    subcomment: subcomment,
    functionArray: elipsisFunctionType[]
}

const SubComment = ({ functionArray, subcomment }: SubcommentProps) => {
    return (
        <div className={classes['subcomment--comment']}>
            <div className={classes['subcomment--comment__elipsis']}>{subcomment.is_author && <EllipsisMenu functionArray={functionArray} item={subcomment} />}</div>
            <div className={classes['subcomment--comment__text']}>{subcomment.comment}</div>
            <div className={classes['subcomment--comment__addition']}>
                <div className={classes['subcomment--comment__owner']}>{subcomment.comment_owner}</div>
            </div>
        </div>
    )
}

export default SubComments