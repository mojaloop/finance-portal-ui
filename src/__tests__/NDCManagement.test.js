import React from 'react';
import { render } from '@testing-library/react';
import NDCManagement from '../components/NDCManagement';

describe('<NDCManagement />', () => {
  it('should render without crashing', () => {
    const rendered = render(<NDCManagement />);
    expect(rendered).toBeTruthy();
  });
});
