import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined';
import SpeedIcon from '@material-ui/icons/SpeedOutlined';
import WebIcon from '@material-ui/icons/WebOutlined';
import CityIcon from '@material-ui/icons/ApartmentOutlined';
import InvoiceIcon from '@material-ui/icons/LayersOutlined';

type MenuItemProps = {
  text: string;
  href: string;
  Icon?: React.FC;
};

function MenuItem (props: MenuItemProps) {
  const {text, href, Icon} = props;

  const handleItemClick = () => {
    console.log('%c ITEM: CLICK', 'color: cyan');
    console.log(href);
  };

  return (
    <ListItem
      button
      onClick={handleItemClick}
    >
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText>
        {text}
      </ListItemText>
    </ListItem>
  );
}

export function MainMenu () {
  return (
    <>
      <List subheader={
        <ListSubheader component="div">
          Register new...
        </ListSubheader>
      }>
        <MenuItem
          text="order"
          href="/make-transport"
          Icon={WebIcon}
        />
        <MenuItem
          text="transport"
          href="/make-transport"
          Icon={LocalShippingIcon}
        />
        <MenuItem
          text="transport type"
          href="/make-transport"
          Icon={SpeedIcon}
        />
      </List>
      <Divider />
      <List subheader={
        <ListSubheader component="div">
          Make an...
        </ListSubheader>
      }>
        <MenuItem
          text="invoice"
          href="/make-transport"
          Icon={InvoiceIcon}
        />
      </List>
      <Divider/>
      <List  subheader={
        <ListSubheader component="div">
          Info
        </ListSubheader>
      }>
        <MenuItem
          text="Cities list"
          href="/make-transport"
          Icon={CityIcon}
        />
      </List>
    </>
  );
}
