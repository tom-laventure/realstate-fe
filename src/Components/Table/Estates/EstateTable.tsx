import React, { useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AddEstatePopup from 'Components/Common/Popups/AddEstate/AddEstatePopup'
import EstateFiltersForm from 'Components/Common/Form/EstateFilters/EstateFiltersForm'
import EstateCard from 'Components/View/EstateCard/EstateCard'
import FilterByPopup from 'Components/Common/Popups/FilterByPopup/FilterByPopup'

interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const [openEstatePopup, setOpenEstatePopup] = useState(false)
    const [openFilterByPopup, setOpenFilterByPopup] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { group_id } = useParams()

    if (!group_id) return <div />

    const estateClicked = (id: number, tab?: string) => {
        navigate(`${location.pathname}/selected/${id}` + (tab ? `?tab=${tab}` : ''))
    }


    return (
        <div className={classes['estates-table']}>
            <div className={classes['estates-table--filters']}>
                <EstateFiltersForm setOpenFilters={setOpenFilterByPopup} />
            </div>
            <div className={classes['estates-table--content']}>
                {estates && estates.map((estate) => {
                    return <EstateCard
                        estate={estate}
                        key={estate.id}
                        groupID={group_id}
                        click={estateClicked}
                    />
                })}
            </div>
            {openEstatePopup && <AddEstatePopup close={() => setOpenEstatePopup(false)} />}
            <FilterByPopup open={openFilterByPopup} setOpen={setOpenFilterByPopup} />
        </div>
    )
}

export default EstateTable
