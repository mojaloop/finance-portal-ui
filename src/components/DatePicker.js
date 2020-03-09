import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import { useUIDSeed } from 'react-uid';
import { DateTime } from 'luxon';

export const strToDate = (datestr) => DateTime.fromFormat(datestr, 'yyyy-MM-dd', { zone: 'UTC' });

// We deliberately lose some information (hh:mm:ss.ms) here. We're just not interested in sub-day
// granularity.
export const dateToStr = (dt) => {
  if (!dt) {
    throw new TypeError('This function requires a suitable date object as an argument');
  }
  const pad = ((s) => (s.length > 1 ? s : `0${s}`));
  if (dt.year) {
    return `${String(dt.year)}-${pad(String(dt.month))}-${pad(String(dt.day))}`;
  }
  if (dt.getFullYear) {
    return `${String(dt.getFullYear())}-${pad(String(dt.getMonth() + 1))}-${pad(String(dt.getDate()))}`;
  }
  throw new TypeError('This function requires a suitable date object as an argument');
};

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  grid: {
    width: '60%',
  },
});

function DatePicker(props) {
  const {
    defDate, desc, classes, onChange, disabled,
  } = props;

  const dateUIDGenerator = useUIDSeed();

  return (
    <form className={`DatePicker ${classes.container}`} noValidate>
      <TextField
        disabled={disabled}
        id={dateUIDGenerator('date')}
        label={desc}
        type="date"
        defaultValue={dateToStr(defDate)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(ev) => onChange(ev.target.value)}
      />
    </form>
  );
}

DatePicker.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  defDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.instanceOf(DateTime)])
    .isRequired,
  desc: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  disabled: false,
};

export default withStyles(styles)(DatePicker);
