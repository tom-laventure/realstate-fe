import React from 'react';
import AppFrame from '../../Common/Frames/AppFrame';
import classes from './NoteSection.module.scss'

const NoteSection = () => {
	return (
		<AppFrame>
			<div className={classes['note-section']}>
				<p>BYOB</p>
				<p>Please try to keep meals vegetarian</p>
			</div>
		</AppFrame>
	);
}
 
export default NoteSection;