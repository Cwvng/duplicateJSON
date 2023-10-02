import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jsonDuplicate';
  resultObj:string='';
  obj:any= {
    "login": {
      "k": "dsada",
      "a": "asdsa",
      "b": {
        "rtwer": "dsada",
        "rt": "asdasd",
        "qeq": "dsada"
      }
    }
  }
  arrObj:any=[];
  json2text(obj:any, path:any){
    let txt = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ('object' == typeof obj[key]) {
          txt += this.json2text(obj[key], path+(path ? '.' : '') + key);
        } else {
          txt += path + (path ? '.' : '') + key + ':\t' + obj[key]+"\n";
          let tmp = path + (path ? '.' : '') + key + '*' + obj[key];
          this.arrObj.push(tmp);

        }
      }
    }
    return txt;
  }
  removeDuplicates(array: any[]): any[] {
    const uniqueValues = new Set();

    // Use the filter method to create a new array with only unique values
    const uniqueArray = array.filter((item) => {
      item = item.split("*")[1];
      if (!uniqueValues.has(item)) {
        uniqueValues.add(item);
        return true;
      }
      return false;
    });

    return uniqueArray;
  }
  newObj:any={};

  ngOnInit() {
    console.log(this.json2text(this.obj,""));
    console.log(this.arrObj);
    this.arrObj = this.removeDuplicates(this.arrObj)
    console.log("after:",this.arrObj);
    this.arrObj.forEach((e:any)=>{
      let x = e.split("*");
      let path = x[0].split(".");
      let code = "this.newObj";
      path.forEach((p:any) =>{
        code+= "."+p;
        eval(`
          if(typeof ${code}== "undefined") {
            console.log(code+" is undefined");
            if(code == x[0]) {
                ${code}=x[1];
                console.log("result:", ${code})
            }
            else ${code}={};
          }
          `);

      })
      console.log("----");
    })
  }
}
