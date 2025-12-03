import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setOrderBy, setFavoritesOnly } from 'Store/Reducers/estates'
import classes from './EstateFiltersForm.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'

interface EstateFiltersFormProps {
    setOpenFilters: (open: boolean) => void
}

const EstateFiltersForm = ({ setOpenFilters }: EstateFiltersFormProps) => {
    const dispatch = useDispatch()
    const orderBy = useAppSelector(state => state.estates.orderby)
    const showFavoritesOnly = useAppSelector(state => state.estates.favoritesOnly)

    const filterChange = (event: { target: { value: string } }) => {
        dispatch(setOrderBy(event.target.value))
    }

    const toggleFavorites = () => {
        dispatch(setFavoritesOnly(!showFavoritesOnly))
    }

    return (
        <form className={classes['estate-filters-form']}>
            <div className={classes['estate-filters-form--left']}>
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
                    color='inherit'
                >
                    Filter By
                </Button>
            </div>
            <div className={classes['estate-filters-form--right']}>
                <Button
                    onClick={toggleFavorites}
                    className={classes['estate-filters-form--favorites']}
                    startIcon={showFavoritesOnly ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    color={showFavoritesOnly ? 'error' : 'inherit'}
                >
                    Favorites
                </Button>
            </div>
        </form>
    )
}

export default EstateFiltersForm