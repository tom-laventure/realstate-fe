import React from 'react';

type choice = {
	value: string
}


interface propTypes {
	choices: choice[],
	name: string
}

const RadioButtons = ({choices, name}: propTypes) => {
	
	return (
		<div>
			{
				choices.map((item: choice, key: number) => {
					return <input  
						key={key}
						type='radio'
						value={item.value}
						name={name}
					/>
				})
			}
		</div>
	);
}
 
export default RadioButtons;