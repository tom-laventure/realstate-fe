import React from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'Store/Hooks/useDispatch'
import { setSelectedEstate } from 'Store/Reducers/estates'

interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const estateClicked = (id: number) => {
        navigate(`${location.pathname}/selected/${id}`)
    }


    return (
        <div className={classes['estates-table']}>
            {estates && estates?.map((estate, index) => {
                return <Estates header={estate.header} key={index} click={() => estateClicked(estate.id)} />
            })}
        </div>
    )
}


interface EstateProps {
    header: string,
    click: () => void
}

const Estates = ({ header, click }: EstateProps) => {
    return (
        <div className={classes['estate']} onClick={click}>
            <div>{header}</div>
        </div>
    )

}

export default EstateTable
