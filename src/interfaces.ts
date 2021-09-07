import { Category } from './enums';

interface Book {
    id: number;
    category: Category;
    title: string;
    author: string;
    available: boolean;
    pages?: number;
    // markDamaged?(reason: string): void;
    // markDamaged?: (reason: string) => void;
    markDamaged?: DamageLogger;
};

interface DamageLogger {
    (p: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface Magazine {
    title: string;
    publisher: string;
}

interface ShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

interface Callback<T> {
    (err: Error, titles: T): void;

}
export { Book, LibMgrCallback, Callback, Magazine, ShelfItem, DamageLogger as Logger, Person, Author, Librarian };