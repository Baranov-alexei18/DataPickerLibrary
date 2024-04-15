import React from 'react';
import { render } from '@testing-library/react';

import { ErrorBoundary } from '.';

import '@testing-library/jest-dom';

describe('ErrorBoundary', () => {
  test('renders children when no error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>,
    );
    expect(getByText('Child component')).toBeInTheDocument();
  });

  test('renders error message when an error is thrown', () => {
    const ErrorThrower = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>,
    );

    expect(getByText('Что-то пошло не так.')).toBeInTheDocument();
  });
});
