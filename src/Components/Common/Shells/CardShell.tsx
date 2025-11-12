import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface CardShellProps {
    children: React.ReactNode
    sx?: any
    className?: string
}

const CardShell: React.FC<CardShellProps> = ({ children, sx = {}, className }) => {
    return (
        <Card
            className={className}
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                p: 0,
                maxWidth: { xs: '100%', md: 900 },
                mx: 'auto',
                backgroundColor: 'background.paper',
                ...sx
            }}
            elevation={2}
        >
            <CardContent sx={{ p: 2 }}>{children}</CardContent>
        </Card>
    )
}

export default CardShell