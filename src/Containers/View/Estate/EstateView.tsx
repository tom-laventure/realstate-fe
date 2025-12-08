import React, { useEffect, useState } from 'react'
import classes from './EstateView.module.scss'
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import CommentsTable from 'Components/Table/Comments/CommentsTable'
import { Button } from '@mui/material'
import { EstateNavBar } from 'Components/Navbar/EstateNavBar/EstateNavBar'
import CardShell from 'Components/Common/Shells/CardShell'
import EstateDescription from 'Components/View/EstateDescription/EstateDescription'
import EstateCard from 'Components/View/EstateCard/EstateCard'
import Calendar from 'Components/Table/Calandar/Calandar'

type NavItem = 'details' | 'comments' | 'documents' | 'dates';
type Props = {}

const VALID_TABS: NavItem[] = ['details', 'comments', 'documents', 'dates']

const EstateView = (props: Props) => {
    const [activeTab, setActiveTab] = useState<NavItem>('details');
    const params = useParams()
    if (!params.group_id || !params.selected_id) return <div />

    const { selectedEstate, isLoading } = useGetEstate(params.group_id, params.selected_id)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    // initialize activeTab from URL (if present) and keep in sync with URL changes
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab && VALID_TABS.includes(tab as NavItem)) {
            setActiveTab(tab as NavItem)
        } else {
            // optional: keep URL in sync by setting default if you want
            // setSearchParams({ tab: activeTab }, { replace: true })
        }
    }, [searchParams])

    // handler to change tab (updates local state + URL and removes any /comment/:id segment)
    const handleNavigate = (tab: NavItem) => {
        setActiveTab(tab)

        // build next search params (preserve existing params, set tab)
        const next = new URLSearchParams(searchParams)
        next.set('tab', tab)

        // base path without /comment/:id - use route params to be safe
        const basePath = `/estates/${params.group_id}/selected/${params.selected_id}`

        // update the URL path and query in one navigation (removes comment segment)
        navigate(`${basePath}?${next.toString()}`, { replace: true })
        // also update search params state
        setSearchParams(next, { replace: true })
    }

    if (isLoading) return <></>
    if (!selectedEstate) return <div />  // guard

    return (
        <div className={classes['estate-view']}>
            <div className={classes['estate-view--content']}>
                <div className={classes['estate-view--body']}>
                    <div className={classes['estate-view--content__button-container']}>
                        <Button onClick={() => navigate(`/estates/${params.group_id}`)}>Go Back</Button>
                    </div>

                    <EstateCard estate={selectedEstate} groupID={params.group_id} click={() => { }} disableCommentButton />

                    <EstateNavBar value={activeTab} onNavigate={handleNavigate} />

                    {/* conditional rendering based on activeTab */}
                    <CardShell>
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
                            <Calendar
                                events={[]}
                                onEventClick={(event) => {
                                    alert("Clicked event: " + event.title);
                                }}
                            />
                        )}
                    </CardShell>

                </div>
            </div>
            <div />
        </div>
    )
}

export default EstateView