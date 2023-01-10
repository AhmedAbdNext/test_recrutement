import { render, screen } from '@testing-library/react';
import { customOverlappingPayload, normalPayload, overlappingPayload } from './mock/mockData';
import App from './App';

test('renders App Comp.  version 1', () => {
  render(<App events={customOverlappingPayload} />);
  const results = screen.getAllByRole('heading');
  expect(results.length).toEqual(5);
  expect(results[0].innerHTML).toEqual('1');
  expect(results[results.length - 1].innerHTML).toEqual('5');
});

test('renders App Comp.  version 2', () => {
  render(<App events={normalPayload} />);
  const results = screen.getAllByRole('heading');
  expect(results.length).toEqual(2);
  expect(results[0].innerHTML).toEqual('1');
  expect(results[results.length - 1].innerHTML).toEqual('2');
});

test('renders App Comp.  version 3', () => {
  render(<App events={overlappingPayload} />);
  const results = screen.getAllByRole('heading');
  expect(results.length).toEqual(5);
  expect(results[0].innerHTML).toEqual('2');
  expect(results[results.length - 1].innerHTML).toEqual('5');
});
