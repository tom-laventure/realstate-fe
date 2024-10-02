import React from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'

interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    return (
        <div className={classes['estates-table']}>
            {estates?.map((estate, index) => {
                return <Estates header={estate.header} />
            })}
        </div>
    )
}


interface EstateProps {
    header: string
}

const Estates = ({ header }: EstateProps) => {
    return (
        <div className={classes['estates']}>
            <div>{header}</div>
        </div>
    )

}

export default EstateTable
