import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classes from './Elipsis.module.scss'


type elipsisFunction = {
  func: (closeElipsis: () => void) => void,
  label: string
}

interface Props {
  functionArray: elipsisFunction[]
}

const EllipsisMenu = ({ functionArray }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className={classes['elipsis-menu']}
        aria-label="more"
        aria-controls="ellipsis-menu"
        onClick={handleClick}
      >
        ...
      </div>

      <Menu
        id="ellipsis-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted

      >
        {functionArray && functionArray.map((el, index) => {
          return <MenuItem className={classes['elipsis-menu--menu-item']} key={index} onClick={() => el.func(handleClose)}>{el.label}</MenuItem>
        })}
      </Menu>
    </>
  );
};

export default EllipsisMenu;
