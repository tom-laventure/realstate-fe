import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';


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
      <IconButton
        aria-label="more"
        aria-controls="ellipsis-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        ...
      </IconButton>

      <Menu
        id="ellipsis-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default EllipsisMenu;
