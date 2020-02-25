import React from 'react';
import { render } from '@testing-library/react';
import FSPSelector from '../components/FSPSelector';

describe('<FSPSelector />', () => {
  it('should render without crashing', () => {
    const props = {
      fspList: [{ id: 0, name: '' }],
      selectFsp: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const rendered = render(<FSPSelector {...props} />);
    expect(rendered).toBeTruthy();
  });
});
