import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function CurrencyFormat(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
    />
  );
}

CurrencyFormat.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CurrencyFormat;
