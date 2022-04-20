import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css']
})
export class WritingComponent implements OnInit {

  uploadForm: FormGroup;

  selectedCategory : any;
  categories = [
    {id:1, category: "Liver"},
    {id:2, category: "Heart"},
    {id:3, category: "Stomach"}
  ]
  name: string=''
  prof_img: string=''
  role: string=''
  id: string=''
  dicom_id: string=''
  gender: string=''
  age: number=0

  imageSrcList: string[] = [];

  // https://angular.kr/guide/form-validation 여기 사이트 참고

    WritingForm: FormGroup;

  
  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private authService: AuthService) {

    this.authService.currentUser().getUserData((err: any, data: any)=>{
      if(err)
        console.log("유저정보를 불러오는데 실패했습니다.", err)
      
      this.name = data.UserAttributes[3].Value
      this.id = this.authService.currentUser().getUsername();
    })
    
    this.role="Doctor";
    this.prof_img = "../assets/images/profile.png"
    this.dicom_id="kkj.dicom98",
    this.gender="female",
    this.age=0;

    this.WritingForm = this.fb.group({
      title: new FormControl(''),
      diagnosis: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      views: 0,
      user: this.fb.group({
        name: this.name,
        id: this.id,
        dicom_id: this.dicom_id,
        gender: this.gender,
        age: this.age,
        role: this.role,
        prof_img : this.prof_img
      }),
      file: new FormControl([], [Validators.required]),
      file_source: new FormControl([], [Validators.required]),
      comments: new FormControl({})
    });

  }

  get f() : {[key:string]: AbstractControl}{
    return this.WritingForm.controls;
  }
  
  ngOnInit(): void {}

  readURL(event: any){
    if(event.target.files && event.target.files.length) {
      const fileList = event.target.files;
      for (const file of fileList) {
        this.readImage(file)
      }
    }
  }

  readImage(file: any){
    
    const reader = new FileReader();

    reader.onload = () => {
  
      this.imageSrcList.push(reader.result as string);
      this.WritingForm.patchValue({
        file_source: this.imageSrcList
      });
    };

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });

    reader.readAsDataURL(file);
  }
  submit(){
    console.log('writingform', this.WritingForm.value);
    this.http.post('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post',this.WritingForm.value,{headers:{'Contents-Type':'multipart/form-data;'}})
    .subscribe(res => {
      console.log(res);
      this.router.navigate(["dashboard"])
      })
  }

}