import React, { useState } from 'react';
import classes from './AgentsDashboard.module.scss'
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';
import GroupsDashboard from 'Components/Table/Groups/GroupsTable';
import { useAppSelector } from 'Store/Hooks/useDispatch';
import { Button } from '@mui/material';
import CreateGroupForm from 'Components/Common/Form/Group/CreateGroupForm';

const AgentsDashboard = () => {
	const [createGroup, setCreateGroup] = useState(false)

	const groups = useAppSelector(state => state.groups.userGroups)

	return (
		<div className={classes['agents-dashboard']}>
			<div className={classes['agents-dashboard--button']}>
				{!createGroup && <Button onClick={() => setCreateGroup(createGroup => !createGroup)}>Create Group</Button>}
			</div>
			{
				!createGroup ? <GroupsDashboard groups={groups} /> : <CreateGroupForm cancelCreate={() => setCreateGroup(false)} />
			}
		</div>
	);

}



export default AgentsDashboard;