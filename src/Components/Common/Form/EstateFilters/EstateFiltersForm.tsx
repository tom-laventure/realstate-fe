import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setOrderBy } from 'Store/Reducers/estates'
import classes from './EstateFiltersForm.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'

const EstateFiltersForm = () => {
    const dispatch = useDispatch()
    const orderBy = useAppSelector(state => state.estates.orderby)

    const filterChange = (event: { target: { value: string } }) => {
        dispatch(setOrderBy(event.target.value))
    }

    return (
        <form className={classes['estate-filters-form']}>
            <FormControl variant="standard" className={classes['estate-filters-form--control']} >
                <InputLabel className={classes['estate-filters-form--label']} id="estate-filters-form-select-label">Order By</InputLabel>
                <Select
                    value={orderBy}
                    onChange={filterChange}
                    size='small'
                    className={classes['estate-filters-form--select']}
                    labelId="estate-filters-form-select-label"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="user-avg">Your Highest Rated</MenuItem>
                    <MenuItem value="avg">Highest Avg Group Rating</MenuItem>
                    <MenuItem value="desc">Date Added Desc</MenuItem>
                    <MenuItem value="asc">Date Added Asc</MenuItem>
                </Select>
            </FormControl>
        </form>
    )
}

export default EstateFiltersForm