
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


// TODO: sort by fsp name rather than ID?
function FSPSelector(props) {
  const { fspList, selectFsp } = props;
  return (
    <List>
      {fspList.sort((a, b) => a.id - b.id).map(fsp =>
        <ListItem key={fsp.id} button onClick={() => selectFsp(fsp.id)}>
          <ListItemText>[{fsp.id}] | {fsp.name}</ListItemText>
        </ListItem>
      )}
    </List>
  );
}

FSPSelector.propTypes = {
  fspList: PropTypes.array.isRequired,
  selectFsp: PropTypes.func.isRequired
};

export default FSPSelector;
