
export interface itemData {
  id: string;
  name: string;
  type: string;
  maker: string;
  picture: string;
  quantity: number;
  status: string;
  tags?: string[];
  barcode?: string;
  notes?: string;
  user?: string;
  boxed?: boolean;
  data?: Book | Music | Comic | Cloth | Wine | Currency ;
}

/*
  data: Book | Music | Comic | Cloth | Wine | Currency ;
*/

export interface Book {
  isbn: string;
  asin: string;
}

export interface Music {
  asin: string;
}

export interface Comic {
  asin: string;
}

export interface Tools {
}

export interface Cloth {
}

export interface Wine {
}

export interface Currency {
country: string;
}


export interface Box {
  id: number;
  name: string;
  type: string;
  picture: string;
  tags: string[];
  qr: string;
  nfc: string;
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

export interface Subjects {
  id: number;
  title: string;
  description: string;
}

export interface userData {
  id?: string;
  email: string;
  pushToken: string;
  avatarImg?: string;
}