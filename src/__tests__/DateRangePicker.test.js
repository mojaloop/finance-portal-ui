import React from 'react';
import { render } from '@testing-library/react';
import DateRangePicker from '../components/DateRangePicker';

describe('<DateRangePicker />', () => {
  it('should render without crashing', () => {
    const epochFor24Jan2020 = 1579870320000;

    const props = {
      classes: {},
      onChange: () => {},
      defStartDate: new Date(epochFor24Jan2020),
      defEndDate: new Date(epochFor24Jan2020),
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<DateRangePicker {...props} />);
    expect(rendered).toBeTruthy();
  });
});
