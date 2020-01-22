// TODO: Work through props required for successful rendering
import React from 'react';
import { render } from '@testing-library/react';
import FSPSelector from '../components/FSPSelector';

xdescribe('<FSPSelector />', () => {
  it('should render without crashing', () => {
    const rendered = render(<FSPSelector />);
    expect(rendered).toBeTruthy();
  });
});
