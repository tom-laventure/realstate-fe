import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import api from 'Assets/Axios/axios'
import { Button, TextField, Box, Container, Typography } from '@mui/material'
import { AxiosError } from 'axios'

const ProfileCompletion = () => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.account)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        address: user?.address || ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5">Complete Your Profile</Typography>

                {error && <Typography color="error">{error}</Typography>}

                <TextField
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                >
                    {loading ? 'Saving...' : 'Complete Profile'}
                </Button>
            </Box>
        </Container>
    )
}

export default ProfileCompletion