import React from 'react';
import { render, waitFor, fireEvent,screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';
import Home from '../src/screen/Home';
import { Alert, Linking } from 'react-native';
fetchMock.enableMocks();

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

const mockdata = {
  hits:[
    {
      objectID: '1',
      title: `Post 1`,
      author: 'Author 1',
      created_at: '2024-05-21T12:34:56Z',
      _tags: ['tag1', 'tag2'],
      url: 'https://example.com/1',
    },
  ]};

  const eventData = {
    nativeEvent: {
      contentOffset: {
        y: 500,
      },
      contentSize: {
        height: 500,
        width: 100,
      },
      layoutMeasurement: {
        height: 100,
        width: 100,
      },
    },
  };

  const mockResponse = (data: any) => ({
    ok: true,
    status: 200,
    json: jest.fn().mockResolvedValue(data),
    headers: new Headers(),
    statusText: 'OK',
    type: 'basic',
    url: '',
    redirected: false,
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  } as any);     
  const mockNavigation = {
    navigate: jest.fn(),
  };

describe('Home component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('fetches and displays posts correctly', async () => {
    fetchMock.mockResolvedValue(mockResponse(mockdata));
    
    render(<Home navigation={mockNavigation}/>);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(11000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
            
      await waitFor(()=>{
        const link = screen.getAllByText('Read more');
        expect(link[0]).toBeTruthy();
        fireEvent.press(link[0])
        expect(Linking.openURL).toHaveBeenCalledWith('https://example.com/1');          

        const checkend = screen.getByTestId('checkend');
        fireEvent.scroll(checkend,eventData);
      });
      
      const searchbar = screen.getByPlaceholderText('Search by title or author');
      fireEvent.changeText(searchbar,"Hello")

      expect(searchbar)
      await waitFor(()=>{
        expect(fetchMock).toHaveBeenCalledTimes(2);
      });
  });

  test('error on displays posts', async () => {
    jest.spyOn(Alert, 'alert');
    render(<Home navigation={mockNavigation}/>);

    fetchMock.mockResponseOnce(JSON.stringify({}), {status: 404});
  })
});
