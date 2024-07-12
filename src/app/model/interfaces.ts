export interface Item {
  id: number;
  name: string;
  maker: string;
  type: string;
  picture: string;
  tags: string[];
  quantity: number;
}

export interface Box {
  id: number;
  name: string;
  type: string;
  picture: string;
  tags: string[];
}

export interface Person {
  id: number;
  name: string;
  phone: string;
  local: string;
  picture: string;
  tags: string[];
}

export interface Local {
  id: number;
  name: string;
  local: string;
  picture: string;
  tags: string[];
}

export interface Pin {
  address: string;
  title: string;
  reference: string;
  geoCoordinates: {lat: 0, lng: 0}
}

export interface UserOptions {
  username: string;
  password: string;
}

export interface Subjects {
  id: number;
  title: string;
  description: string;
  route: string;
}