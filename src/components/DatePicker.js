import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useUIDSeed } from 'react-uid';

// We deliberately lose some information (hh:mm:ss.ms) here. We're just not interested in sub-day
// granularity.
const dateToStr = (dt) => {
  const pad = ((s) => (s.length > 1 ? s : `0${s}`));
  if (dt.year) {
    return `${String(dt.year)}-${pad(String(dt.month))}-${String(dt.day)}`;
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

function DatePickerImpl(props) {
  const {
    defDate, desc, classes, onChange, disabled,
  } = props;

  const dateUIDGenerator = useUIDSeed();

  return (
    <form className={classes.container} noValidate>
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

DatePickerImpl.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  defDate: PropTypes.instanceOf(Date).isRequired,
  desc: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

DatePickerImpl.defaultProps = {
  disabled: false,
};

const DatePicker = withStyles(styles)(DatePickerImpl);

export {
  DatePicker,
  dateToStr,
};
