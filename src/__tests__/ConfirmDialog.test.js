import React from 'react';
import { render } from '@testing-library/react';
import ConfirmDialog from '../components/ConfirmDialog';

describe('<ConfirmDialog />', () => {
  it('should render without crashing', () => {
    const props = {
      description: '',
      title: '',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<ConfirmDialog {...props} />);
    expect(rendered).toBeTruthy();
  });
});
