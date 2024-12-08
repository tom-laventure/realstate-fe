import { CircularProgress, FormControl, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import classes from './AddEstateForm.module.scss'
import debounce from 'lodash/debounce'
import useGetEstateMetaData from 'Store/Hooks/Estates/useGetEstateMetaData'
import { estateMetaData } from 'Assets/Types/EstateType'


interface AddEstateFormProps {

}

interface EstateFormType {
    link: string;
}

const AddEstateForm = ({ }: AddEstateFormProps) => {
    const { register, watch } = useForm<EstateFormType>()
    const [tempEstate, setTempEstate] = useState<estateMetaData>({
        image: '',
        header: '',
        price: ''
    })
    const [url, setUrl] = useState('')
    const { isLoading } = useGetEstateMetaData(url, setTempEstate)
    const linkValue = watch('link')


    const debouncedSubmit = useCallback(
        debounce((value: string) => {
            setUrl(value)
        }, 500),
        []
    );

    useEffect(() => {
        if (linkValue) {
            debouncedSubmit(linkValue);
        }

        return () => debouncedSubmit.cancel();
    }, [linkValue, debouncedSubmit]);

    return (
        <FormControl>
            <div className={classes['estate-form--container']}>
                <div className={classes['estate-form--header']}>
                    <span>
                        Post a link to the listing from whichever site you are using to look at properties here
                        (eg. REW, Zealty)
                    </span>
                </div>
                <TextField
                    label="Add a listing link here"
                    type="text"
                    className={classes['estate-form--input']}
                    {...register('link')}
                />
                <div className={classes['estate-form--preview__container']}>
                    {
                        url && isLoading && <CircularProgress />
                    }

                    {
                        url && !isLoading && <div>

                        </div>
                    }
                    <div className={classes['estate-form--preview']}>
                        {tempEstate.image ? <img src={tempEstate.image} /> :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </FormControl>
    );
};

export default AddEstateForm;
