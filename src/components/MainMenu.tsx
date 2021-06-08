import React from 'react';
import {withRouter, useHistory, RouteComponentProps} from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined';
import WebIcon from '@material-ui/icons/WebOutlined';
import CityIcon from '@material-ui/icons/ApartmentOutlined';
import InvoiceIcon from '@material-ui/icons/LayersOutlined';
import {ENDPOINTS} from '../pages/endpoints.types';

type MenuItemProps = {
  text: string;
  href: string;
  Icon?: React.FC;
} & RouteComponentProps;

function RawMenuItem (props: MenuItemProps) {
  const history = useHistory();
  const {text, href, Icon} = props;

  const handleItemClick = () => {
    if (history.location.pathname === href) {
      return;
    }
    history.push(href);
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

const MenuItem = withRouter(RawMenuItem);

export function MainMenu () {
  return (
    <>
      <List subheader={
        <ListSubheader component="div">
          List of...
        </ListSubheader>
      }>
        <MenuItem
          text="orders"
          href={ENDPOINTS.ORDERS}
          Icon={WebIcon}
        />
        <MenuItem
          text="vehicles"
          href={ENDPOINTS.VEHICLES}
          Icon={LocalShippingIcon}
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
          href={ENDPOINTS.INVOICES}
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
          href={ENDPOINTS.CITIES}
          Icon={CityIcon}
        />
      </List>
    </>
  );
}
