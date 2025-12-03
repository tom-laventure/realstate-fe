import React, { useState } from "react";
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import classes from './FilterByForm.module.scss';

interface FilterByFormProps {
    onClose: () => void;
    onApply: (filters: FilterState) => void;
}

export interface FilterState {
    propertyTypes: Set<string>;
    minPrice: string;
    maxPrice: string;
    bedrooms: string | null;
    bathrooms: string | null;
}

const FilterByForm = ({ onClose, onApply }: FilterByFormProps) => {
    const propertyTypes = [
        { label: "House", count: 32 },
        { label: "Apt/Condo", count: 30 },
        { label: "Townhouse", count: 9 },
        { label: "Land/Lot", count: 1 },
        { label: "Chalet", count: 0 },
    ];

    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null);
    const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(null);

    const toggleType = (label: string) => {
        const next = new Set(selectedTypes);
        next.has(label) ? next.delete(label) : next.add(label);
        setSelectedTypes(next);
    };

    const handleClear = () => {
        setSelectedTypes(new Set());
        setMinPrice("");
        setMaxPrice("");
        setSelectedBedrooms(null);
        setSelectedBathrooms(null);
    };

    const handleApply = () => {
        onApply({
            propertyTypes: selectedTypes,
            minPrice,
            maxPrice,
            bedrooms: selectedBedrooms,
            bathrooms: selectedBathrooms,
        });
        onClose();
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleApply(); }}>
            <FormControl className={classes['filter-form--control']}>
                <div className={classes['filter-form--container']}>
                    {/* PROPERTY TYPE */}
                    <div className={classes['filter-form--section']}>
                        <h3 className={classes['filter-form--section-title']}>PROPERTY TYPE</h3>
                        <div className={classes['filter-form--property-types']}>
                            {propertyTypes.map((t) => (
                                <div key={t.label} className={classes['filter-form--property-type']}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedTypes.has(t.label)}
                                                onChange={() => toggleType(t.label)}
                                            />
                                        }
                                        label={t.label}
                                        className={classes['filter-form--checkbox']}
                                    />
                                    <span className={classes['filter-form--count']}>{t.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className={classes['filter-form--section']}>
                        <h3 className={classes['filter-form--section-title']}>PRICE</h3>
                        <div className={classes['filter-form--price-inputs']}>
                            <TextField
                                label="Min Price"
                                type="text"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className={classes['filter-form--input']}
                                size="small"
                            />
                            <TextField
                                label="Max Price"
                                type="text"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className={classes['filter-form--input']}
                                size="small"
                            />
                        </div>
                    </div>

                    {/* BEDROOMS */}
                    <div className={classes['filter-form--section']}>
                        <h3 className={classes['filter-form--section-title']}>BEDROOMS</h3>
                        <div className={classes['filter-form--button-group']}>
                            {["Studio", "1+", "2+", "3+", "4+", "5+"].map((b) => (
                                <Button
                                    key={b}
                                    onClick={() => setSelectedBedrooms(b)}
                                    variant={selectedBedrooms === b ? "contained" : "outlined"}
                                    className={classes['filter-form--option-button']}
                                    size="small"
                                >
                                    {b}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* BATHROOMS */}
                    <div className={classes['filter-form--section']}>
                        <h3 className={classes['filter-form--section-title']}>BATHROOMS</h3>
                        <div className={classes['filter-form--button-group']}>
                            {["1+", "2+", "3+", "4+", "5+"].map((b) => (
                                <Button
                                    key={b}
                                    onClick={() => setSelectedBathrooms(b)}
                                    variant={selectedBathrooms === b ? "contained" : "outlined"}
                                    className={classes['filter-form--option-button']}
                                    size="small"
                                >
                                    {b}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className={classes['filter-form--actions']}>
                        <Button
                            onClick={handleClear}
                            variant="text"
                            className={classes['filter-form--clear-button']}
                        >
                            CLEAR
                        </Button>
                        <div className={classes['filter-form--submit-buttons']}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                className={classes['filter-form--submit-button']}
                            >
                                SHOW LISTINGS
                            </Button>
                        </div>
                    </div>
                </div>
            </FormControl>
        </form>
    );
};

export default FilterByForm;