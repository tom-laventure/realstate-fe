import React from 'react'
import classes from './EstateView.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import EstateDetails from 'Components/View/Estate/EstateDetails'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import EstateSideNav from 'Components/Navbar/SideNav/EstateSideNav/EstateSideNav'


type Props = {}

const EstateView = (props: Props) => {
    const params = useParams()
    const { selectedEstate } = useGetEstate(params.estate_id, params.selected_id)

    return (
        <div className={classes['estate-view']}>
            <EstateSideNav />
            {selectedEstate && <EstateDetails estate={selectedEstate} />}
        </div>
    )
}

export default EstateView