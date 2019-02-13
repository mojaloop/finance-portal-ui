
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function FSPSelector(props) {
  const { fspList, selectFsp } = props;
  return (
    <List>
      {fspList.sort((a, b) => a.id > b.id).map(fsp =>
        <ListItem key={fsp.id} button onClick={selectFsp.bind(null, fsp.id)}>
          <ListItemText>[{fsp.id}] | {fsp.name}</ListItemText>
        </ListItem>
      )}
    </List>
  );
}

export default FSPSelector;
