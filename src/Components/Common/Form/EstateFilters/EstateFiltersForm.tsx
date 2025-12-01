import { FormControl, InputLabel, MenuItem, Select, IconButton, Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setOrderBy } from 'Store/Reducers/estates'
import classes from './EstateFiltersForm.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'

interface EstateFiltersFormProps {
    setOpenFilters: (open: boolean) => void
}

const EstateFiltersForm = ({ setOpenFilters }: EstateFiltersFormProps) => {
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
                    <MenuItem value="desc">Latest Activity</MenuItem>
                    <MenuItem value="user-avg">Highest Rated</MenuItem>
                    <MenuItem value="avg">Highest Group Rating</MenuItem>
                </Select>
            </FormControl>
            <Button
                onClick={() => setOpenFilters(true)}
                className={classes['estate-filters-form--button']}
            >
                Filter By
            </Button>
        </form>
    )
}

export default EstateFiltersForm