import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FilterByForm, { FilterState } from "../../Form/FilterByForm/FilterByForm";

interface FilterByPopupProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterByPopup({ open, setOpen }: FilterByPopupProps) {
    const handleApply = (filters: FilterState) => {
        console.log("Filters applied:", filters);
        // Dispatch to Redux or handle filters here
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setOpen(false)}
                >
                    <motion.div
                        className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Filters</h2>
                            <button onClick={() => setOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <FilterByForm onClose={() => setOpen(false)} onApply={handleApply} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
