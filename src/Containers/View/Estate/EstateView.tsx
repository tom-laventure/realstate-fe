import React from 'react'
import classes from './EstateView.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import EstateDetails from 'Components/View/Estate/EstateDetails'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'

type Props = {}

const EstateView = (props: Props) => {
    const params = useParams()
    const navigate = useNavigate()
    const { selectedEstate } = useGetEstate(params.id, params.index)


    return (
        <div className={classes['estate-view']}>
            {selectedEstate && <EstateDetails estate={selectedEstate} />}
        </div>
    )
}

export default EstateView