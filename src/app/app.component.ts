import { Component } from '@angular/core';
import { Observable, concat, interval, of } from 'rxjs';
import {concatMap, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, finalize, map, mergeMap, scan, startWith, switchMap, take, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form: FormGroup;
  apiEndPoint = `${environment.serverUrl}/api/company/`;
  item$:Observable<any>
  loading:boolean=false
  date$:Observable<Date>


  constructor(private http: HttpClient, private fb: FormBuilder) {
    // const obserber$:Observable<any>=of([1, 2, 3, 4, 5]);
    // obserber$
    // .pipe(
    //    map(val=> val.reduce((acc,val)=>acc+val,0))
    //   // scan((acc,val)=>acc+val,0)
    // )


    // .subscribe(res=>{
    //   console.log(res)
    // })
  }

  ngOnInit() {
  this.formInit();
  this.date$=this.getDate()

   this.item$=this.form.controls.name.valueChanges
   .pipe(
    startWith(''),
    debounceTime(400),
    distinctUntilChanged(),
    tap(()=>{this.loading=true}),
    switchMap((val)=>this.apiCall(val)),
    map(item=>{
      this.loading = false;
      return item['results']}),
    tap(()=>{console.log(this.loading)})

   )
  }

  getDate(){
    return interval(1000)
    .pipe(
      mergeMap((val)=>of(new Date()))
    )
  }

  formInit() {
    this.form = this.fb.group({
      name: ''
    });
  }

  apiCall(searchTerm:string):Observable<any> {
    let params=new HttpParams()
    params=params
    .set('name',searchTerm)
    return this.http.get(this.apiEndPoint,{params});
  }
}
