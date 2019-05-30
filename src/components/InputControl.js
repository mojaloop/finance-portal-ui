
import React from 'react';
import NumberFormat from 'react-number-format';

function CurrencyFormat(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
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

export {
  CurrencyFormat,
};
