import { atom } from 'recoil';

export const selectedProfileState = atom({
  key: 'selectedProfileState',
  default: null,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});
export const DropdownState = atom({
  key: 'DropdownState',
  default: false,
});

export const SearchResult = atom({
  key: 'searchResult',
  default: [],
});

export const groupDataState = atom({
  key: 'groupDataState',
  default: [], 
});

export const isConnectSocketState = atom({
  key: 'isConnectSocketState',
  default: false,
});

export const noticeListState = atom({
  key: 'noticeListState',
  default: [],
});

export const noticeCountState = atom({
  key: 'noticeCountState',
  default: 0,
});
