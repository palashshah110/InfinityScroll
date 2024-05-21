import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import PostDetails from '../src/screen/PostDetails';
import { Linking } from 'react-native';
fetchMock.enableMocks();

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

const route = {
    params:{
     post:{
      title: 'Post 1',
      author: 'Author 1',
      created_at: '2024-05-21T12:34:56Z',
      _tags: ['tag1', 'tag2'],
      url: 'https://example.com/1',
    },
}
}

const mockNavigation = {
    goBack: jest.fn(),
  };

describe('PostDetails component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('fetches and displays posts Details correctly', async () => {
    render(<PostDetails navigation={mockNavigation} route={route}/>);
    expect(screen.getByText('Title: Post 1')).toBeTruthy();
    expect(screen.getByText('Author: Author 1')).toBeTruthy();
    expect(screen.getByText('Created At: 21/5/2024, 6:04:56 pm')).toBeTruthy();
    expect(screen.getByText('Tags: tag1, tag2')).toBeTruthy();

    const link = screen.getByText('Link: https://example.com/1');
    expect(link).toBeTruthy();
    fireEvent.press(link)
    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com/1');
 
    const GoBack = screen.getByText('Go Back');
    fireEvent.press(GoBack);
    expect(mockNavigation.goBack).toHaveBeenCalled();
});
});
