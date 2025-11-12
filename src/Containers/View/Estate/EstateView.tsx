import React, { useState } from 'react'
import classes from './EstateView.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import CommentsTable from 'Components/Table/Comments/CommentsTable'
import { Estate } from 'Components/Table/Estates/EstateTable'
import { Button } from '@mui/material'
import { EstateNavBar } from 'Components/Navbar/EstateNavBar/EstateNavBar'
import CardShell from 'Components/Common/Shells/CardShell'
import EstateDescription from 'Components/View/EstateDescription/EstateDescription'

type NavItem = 'details' | 'comments' | 'documents' | 'dates';
type Props = {}

const EstateView = (props: Props) => {
    const [activeTab, setActiveTab] = useState<NavItem>('details');
    const params = useParams()
    const { selectedEstate, isLoading } = useGetEstate(params.group_id, params.selected_id)
    const navigate = useNavigate()

    if (isLoading) return <></>
    if (!selectedEstate) return <div />  // guard

    return (
        <div className={classes['estate-view']}>
            <div className={classes['estate-view--content']}>
                <div className={classes['estate-view--body']}>
                    <div className={classes['estate-view--content__button-container']}>
                        <Button onClick={() => navigate(`/estates/${params.group_id}`)}>Go Back</Button>
                    </div>

                    <Estate estate={selectedEstate} click={() => { }} disableCommentButton />

                    {/* controlled navbar */}
                    <EstateNavBar value={activeTab} onNavigate={(tab) => setActiveTab(tab)} />

                    {/* conditional rendering based on activeTab */}
                    <div className={classes['estate-view--panel']}>
                        {activeTab === 'details' && (
                                <EstateDescription listing_detail={selectedEstate.listing_detail} />
                        )}

                        {activeTab === 'comments' && (
                                <CommentsTable estate={selectedEstate} />
                        )}

                        {activeTab === 'documents' && (
                            <CardShell>
                                <div>Documents view (implement)</div>
                            </CardShell>
                        )}

                        {activeTab === 'dates' && (
                            <CardShell>
                                <div>Important dates view (implement)</div>
                            </CardShell>
                        )}
                    </div>

                </div>
            </div>
            <div />
        </div>
    )
}

export default EstateView