import React from 'react';
import { render } from '@testing-library/react';
import FSPSelector from '../components/FSPSelector';

describe('<FSPSelector />', () => {
  it('should render without crashing', () => {
    const rendered = render(<FSPSelector />);
    expect(rendered).toBeTruthy();
  });
});
