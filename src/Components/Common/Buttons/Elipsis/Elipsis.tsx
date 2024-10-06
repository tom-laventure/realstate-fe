import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import classes from './Elipsis.module.scss'

const EllipsisMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    handleClose();
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
        <MenuItem className={classes['elipsis-menu--menu-item']} onClick={handleEdit}>Edit</MenuItem>
        <MenuItem className={classes['elipsis-menu--menu-item']} onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default EllipsisMenu;
