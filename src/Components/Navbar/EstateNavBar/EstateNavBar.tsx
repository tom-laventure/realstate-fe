import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import styles from './EstateNavBar.module.scss';

type NavItem = 'details' | 'comments' | 'documents' | 'dates';

interface EstateNavBarProps {
    value?: NavItem;
    onNavigate?: (item: NavItem) => void;
}

export const EstateNavBar: React.FC<EstateNavBarProps> = ({ value, onNavigate }) => {
    const [localActiveTab, setLocalActiveTab] = useState<NavItem>('details');
    const activeTab = value ?? localActiveTab;

    const navItems: { id: NavItem; label: string }[] = [
        { id: 'details', label: 'Estate Details' },
        { id: 'comments', label: 'Comments' },
        { id: 'documents', label: 'Documents' },
        { id: 'dates', label: 'Important Dates' },
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: NavItem) => {
        if (!value) setLocalActiveTab(newValue);
        onNavigate?.(newValue);
    };

    return (
        <Box className={styles.navbar}>
            <Tabs value={activeTab} onChange={handleTabChange}>
                {navItems.map((item) => (
                    <Tab key={item.id} label={item.label} value={item.id} />
                ))}
            </Tabs>
        </Box>
    );
};