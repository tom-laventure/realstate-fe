import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import AddEstatePopup from 'Components/Common/Popups/AddEstate/AddEstatePopup'
import Ratings from 'Components/View/Ratings/Ratings'
import EstateFiltersForm from 'Components/Common/Form/EstateFilters/EstateFiltersForm'


interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const [openEstatePopup, setOpenEstatePopup] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const userId = useAppSelector(state => state.account.id)
    const estateClicked = (id: number) => {
        navigate(`${location.pathname}/selected/${id}`)
    }


    return (
        <div className={classes['estates-table']}>
            <div className={classes['estates-table--header-content']}>
                <span className={classes['estates-table--header']}>
                    Group Listings
                </span>
                <button onClick={() => setOpenEstatePopup(true)}>+ new listing</button>
            </div>
            <EstateFiltersForm />
            {estates && estates?.map((estate, index) => {
                return <Estate
                    estate={estate}
                    key={index}
                    click={() => estateClicked(estate.id)}
                />
            })}
            {openEstatePopup && <AddEstatePopup close={() => setOpenEstatePopup(false)} />}
        </div>
    )
}


interface EstateProps {
    click: () => void,
    estate: estate
}

const Estate = ({ click, estate }: EstateProps) => {

    return (
        <div className={classes['estate--container']} onClick={click}>
            <div className={classes['estate--body']}>
                <img className={classes['estate--image']} src={estate.image} />
                <div className={classes['estate--content']}>
                    <div className={classes['estate--top']}>
                        <span className={classes['estate--header']}>{estate.header}</span>
                        <span>{estate.price}</span>
                    </div>
                    <div className={classes['estate--bottom']}>
                        <Ratings estateId={estate.id} ratings={estate.estate_ratings} userRating={estate.user_rating} />
                        <div className={classes['estate--date']}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes['estate--actions']}>
                <Button onClick={click}>Comments &#40;{estate.estate_comment_count}&#41;</Button>
                <Button onClick={() => window.open(estate.link, '_blank')}>View Listing</Button>
            </div>
        </div>
    )

}


export { Estate }
export default EstateTable
