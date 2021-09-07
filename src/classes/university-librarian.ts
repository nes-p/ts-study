import * as Interfaces from './../interfaces';
import { format, logger, logMethod, logParameter, sealed, writable } from './decorators';
// @sealed('UniversityLibrarian')
// @logger
class UniversityLibrarian implements Interfaces.Librarian {
    @format()
    name: string;
    email: string;
    department: string;
    prop: string = 'Additional Property';

    @logMethod
    assistCustomer(/* @logParameter */ custName: string): void {
        console.log(`${this.name} is assistant ${custName}`);
    }
    // assistCustomer2(@logParameter custName: string, @logParameter custName2: string): void {
    //     console.log(`${this.name} is assistant ${custName}`);
    // }

    // @writable(true)
    assisFaculty(): void {
        console.log('Assisting faculty');
    }

    // @writable(false)
    teachCommunity(): void {
        console.log('Teaching community');
    }

}

export { UniversityLibrarian };