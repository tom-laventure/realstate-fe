import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FilterByPopupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterByPopup({ open, setOpen }: FilterByPopupProps) {

    const propertyTypes = [
        { label: "House", count: 32 },
        { label: "Apt/Condo", count: 30 },
        { label: "Townhouse", count: 9 },
        { label: "Land/Lot", count: 1 },
        { label: "Chalet", count: 0 },
    ];

    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

    const toggleType = (label: string) => {
        const next = new Set(selectedTypes);
        next.has(label) ? next.delete(label) : next.add(label);
        setSelectedTypes(next);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Filters</h2>
                            <button onClick={() => setOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* PROPERTY TYPES */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">PROPERTY TYPE</h3>
                            <div className="space-y-3">
                                {propertyTypes.map((t) => (
                                    <label key={t.label} className="flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.has(t.label)}
                                                onChange={() => toggleType(t.label)}
                                                className="w-5 h-5 rounded border-gray-400"
                                            />
                                            <span>{t.label}</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">{t.count}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">PRICE</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Min Price"
                                    className="border rounded-xl p-3 w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Max Price"
                                    className="border rounded-xl p-3 w-full"
                                />
                            </div>
                        </div>

                        {/* BEDROOMS */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">BEDROOMS</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Studio", "1+", "2+", "3+", "4+", "5+"].map((b) => (
                                    <button
                                        key={b}
                                        className="border px-4 py-2 rounded-xl text-sm hover:bg-gray-100"
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* BATHROOMS */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">BATHROOMS</h3>
                            <div className="flex flex-wrap gap-2">
                                {["1+", "2+", "3+", "4+", "5+"].map((b) => (
                                    <button
                                        key={b}
                                        className="border px-4 py-2 rounded-xl text-sm hover:bg-gray-100"
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between items-center pt-4 border-t">
                            <button className="text-gray-500 font-medium">CLEAR</button>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700">
                                SHOW LISTINGS
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
