import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@material-ui/core';

// TODO: sort by fsp name rather than ID?
function FSPSelector(props) {
  const { fspList, selectFsp } = props;

  return (
    <List>
      {fspList.sort((a, b) => a.id - b.id).map((fsp) => (
        <ListItem
          key={fsp.id}
          button
          onClick={() => selectFsp(fsp.id)}
        >
          <ListItemText>
          [
            {fsp.id}
          ] |
            {fsp.name}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

FSPSelector.propTypes = {
  fspList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string }),
  ).isRequired,
  selectFsp: PropTypes.func.isRequired,
};

export default FSPSelector;
