import { Category } from './enums';
import { createCustomer, createCustomerID, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

// type Book = { id: number; category: Category; title: string; author: string; available: boolean };

export type BookProperties = keyof Book;
export type PersonBook = Person & Book;
export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type СreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;
// export type СreateCustomerFunctionType = typeof createCustomer;

export type fn = (p1: string, p2: number, p3: boolean) => symbol;
export type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never;
export type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never;
export type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never;

export type P1 = Param1<fn>;
export type P2 = Param2<fn>;
export type P3 = Param3<fn>;


export type Unpromisify<T> = T extends Promise<infer R> ? R : never;
export type rt = ReturnType<typeof getBooksByCategoryPromise>;
export type PromiseValueType = Unpromisify<rt>;