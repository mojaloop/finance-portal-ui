import React from 'react';
import { render } from '@testing-library/react';
import NDCManagement from '../components/NDCManagement';

describe('<NDCManagement />', () => {
  it('should render without crashing', () => {
    const props = {
      classes: { table: '' },
      fspName: '',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<NDCManagement {...props} />);
    expect(rendered).toBeTruthy();
  });
});
