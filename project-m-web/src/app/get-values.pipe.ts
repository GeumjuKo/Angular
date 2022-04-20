import {Pipe, PipeTransform} from '@angular/core';

// @Pipe({name: 'getValues'})
// export class GetValuesPipe implements PipeTransform {
//     transform(map: Map<any, any>): any[] {
//         let ret: any = [];

//         map.forEach((val, key) => {
//             ret.push({
//                 key: key,
//                 val: val
//             });
//         });

//         return ret;
//     }
// }

@Pipe({name: 'getValues'})
export class GetValuesPipe implements PipeTransform {
  transform(values:{}) : any {
    let value = [];
    // for (let [key, value] of Object.entries(values)) {
    //   keys.push({key, value});
    // }
    for (let [key, val] of Object.entries(values)) {
        value.push([key,val]);
      }
    //   console.log(value)
    return value;

  }
}

//  <li *ngFor="let recipient of map |getValues">