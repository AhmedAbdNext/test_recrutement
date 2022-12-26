import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Typography, Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ShoppingCarts() {
  const { beers } = useSelector((state) => state.beerOrder);
  const dispatch = useDispatch();
  return (
    <>
      {!beers.length && (
        <Container maxWidth="sm" sx={{ marginTop: '50px', textAlign: 'center' }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            {'Empty list!'}
          </Typography>
          <Typography variant="h4" xs={{ textAlign: 'center' }}>
            {'You have no orders at this moment'}
          </Typography>
        </Container>
      )}

      <List
        sx={{
          width: '100%',
          marginTop: '50px',
          padding: '0 16px 0 16px',
          bgcolor: 'background.paper',
        }}
      >
        {beers.map((beer) => {
          return (
            <React.Fragment key={beer.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      const id = beer.id;
                      dispatch(allActions.navigationAction.openDetailsPage(id));
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={beer.image} />
                </ListItemAvatar>
                <ListItemText primary={beer.name} />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
}
