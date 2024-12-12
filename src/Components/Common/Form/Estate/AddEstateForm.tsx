import { Button, CircularProgress, FormControl, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import classes from './AddEstateForm.module.scss'
import debounce from 'lodash/debounce'
import useGetEstateMetaData from 'Store/Hooks/Estates/useGetEstateMetaData'
import { estateMetaData } from 'Assets/Types/EstateType'
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import usePostEstate from 'Store/Hooks/Estates/usePostEstate'
import { useParams } from 'react-router-dom'

interface AddEstateFormProps {
    close: () => void
}

interface EstateFormType {
    link: string;
}

const AddEstateForm = ({ close }: AddEstateFormProps) => {
    const { group_id } = useParams()
    const { mutate } = usePostEstate({ complete: close })
    const { register: registerLink, watch } = useForm<EstateFormType>()
    const { register: registerEstate, reset, getValues, handleSubmit } = useForm<estateMetaData>({
        defaultValues: {
            image: '',
            header: '',
            price: ''
        }
    })

    const { image, header, price } = getValues()
    const [url, setUrl] = useState('')
    const { isLoading } = useGetEstateMetaData(url, reset)
    const linkValue = watch('link')


    const debouncedSubmit = useCallback(
        debounce((value: string) => {
            setUrl(value)
        }, 500),
        []
    );

    useEffect(() => {
        reset()
        if (linkValue) {
            debouncedSubmit(linkValue);
        }

        return () => debouncedSubmit.cancel();
    }, [linkValue, debouncedSubmit]);

    const submitEstate: SubmitHandler<estateMetaData> = (data) => {
        if (!group_id) return
        const estatePrice = formatCurrency(data.price)

        const formdata = {
            estate: {
                header: data.header,
                price: data.price,
                image: data.image,
                link: url
            },
            group_id: group_id
        }

        mutate(formdata)
    }

    function formatCurrency(input: string | undefined) {
        if (!input) return

        let cleanedInput = input.replace(/[^\d.,]/g, '');

        cleanedInput = cleanedInput.replace(/,/g, '');

        const parsedNumber = parseFloat(cleanedInput);
        if (isNaN(parsedNumber)) {
            throw new Error("Input is not a valid number");
        }

        const formattedNumber = parsedNumber.toLocaleString('en-US');

        return `$${formattedNumber}`;
    }

    return (
        <form onSubmit={handleSubmit(submitEstate)}>
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
                        {...registerLink('link')}
                    />
                    <div className={classes['estate-form--preview__container']}>
                        {
                            url && isLoading && <CircularProgress />
                        }

                        {
                            !isLoading &&
                            <div>
                                <div className={classes['estate-form--temp-estate']}>
                                    <img className={classes['estate-form--temp-estate__image']} src={image} />
                                    <div className={classes['estate-form--temp-estate__content']}>
                                        <TextField
                                            className={classes['estate-form--temp-estate__input']}
                                            label="Header"
                                            {...registerEstate('header')}
                                            value={header}

                                        />
                                        <div className={classes['estate-form--temp-estate__bottom']}>
                                            <div className={classes['estate-form--temp-estate__details']}>
                                                <TextField
                                                    size='small'
                                                    className={classes['estate-form--temp-estate__number']}
                                                    defaultValue={0}
                                                /> <BathtubIcon className={classes['estate-form--temp-estate__icon']} />
                                                <TextField
                                                    size='small'
                                                    className={classes['estate-form--temp-estate__number']}
                                                    defaultValue={0}
                                                /> <LocalHotelIcon className={classes['estate-form--temp-estate__icon']} />
                                            </div>
                                            <TextField label={'Price'} value={price} {...registerEstate('price')} />
                                        </div>
                                    </div>
                                    <div>
                                        <TextField className={classes['estate-form--temp-estate__input']} defaultValue={url} disabled size="small" />
                                    </div>
                                </div>
                                <div className={classes['estate-form--temp-estate__buttons']}>
                                    <Button variant='contained' type="submit">Create</Button>
                                    <Button variant="outlined" onClick={close}>Cancel</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </FormControl>
        </form>
    );
};

export default AddEstateForm;
