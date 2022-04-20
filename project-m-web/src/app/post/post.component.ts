import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpCallerService } from '../http-caller.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ScriptService } from '../script.service';
// import { DOCUMENT } from '@angular/common';
// import { get } from 'scriptjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {

  public modal: boolean = false;

  postList: any ;
  postNum: string = '';
  category: string = '';
  title: string ='';
  writer: string ='';
  date: string ='';
  views: Number = 0;
  diagnosis: string ='';
  contents: string ='';
  file: string[];
  fileSource: string[];

  userName: string;
  userId: string;

  // comments:string[];

  selectedCategory : any;
  categories = [
    {id:1, category: "Liver"},
    {id:2, category: "Heart"},
    {id:3, category: "Stomach"}
  ]

  editCommentText: string;
  editTitle:string;
  editDiagnosis:string;
  editDescription: string;
  editCategory: string;
  editFileSource: string[] =[];
  editFile: string[] =[];

  constructor(private httpCaller: HttpCallerService, private http: HttpClient,
     private authService: AuthService, private modalService: NgbModal, private renderer: Renderer2,
     private scriptService: ScriptService) {
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit(): void {
    this.getPostList();
    this.authService.currentUser().getUserData((err: any, data: any)=>{
      if(err)
        console.log("유저정보를 불러오는데 실패했습니다.", err)
      // console.log(data)
      this.userName = data.UserAttributes[3].Value
      this.userId = this.authService.currentUser().getUsername();
    })
  };

  
  showHide(obj: any): void{
    if(obj.clicked == true)
    {
      if(obj.text != '') this.editCommentText = obj.text
      obj.clicked = false;
    } 
    else
      obj.clicked = true
  }

  getPostList(): void {
    this.httpCaller.get('/post/list').subscribe({
      next: data => {
        this.postList = JSON.parse(data.body)
        this.editFileSource = []
        console.log(this.postList)
      },
      error: error => {
        console.error('There was an error!', error)
      }
    })
  }


  editPost(post:any): void{
    console.log(post)
    if (post.user.name == this.userName && post.user.id == this.userId){
      //수정 가능
      // let comment_id = comment.comment_id;\

      console.log(this.editCategory, this.editDiagnosis, this.editTitle, this.editDescription)
      let postdct:{} = {
        post_id: post.post_id,
        diagnosis: this.editDiagnosis,
        category: this.editCategory,
        description: this.editDescription,
        title: this.editTitle,
        file_source: this.editFileSource,

      }
      console.log(postdct)
      this.http.put('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post', postdct)
      .subscribe(res => {
        console.log(res);
        this.editFileSource = []
        this.getPostList();
      })
    }
  }

  deletePost(post:any): void{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "post_id": post.post_id
      },
    };
    if (this.confirmWindow('게시물을 삭제하시겠습니까?') == true){
      this.http.delete('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post',options)
      .subscribe(res => {
        this.getPostList();
      })
    } 
  }

  deleteComment(cmt_id: string){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "comment_id": cmt_id
      },
    };
    if (this.confirmWindow('댓글을 삭제하시겠습니까?') == true){
      this.http.delete('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post/comment',options)
      .subscribe(res => {
        this.getPostList();
      })
    } 
  }
  
  editComment(comment:any){
    let cmt_id:string = comment[0]
    // let comment_id = comment.comment_id;
    let cmt:{} = {
      text : this.editCommentText
    }
    let update_cmt = {"comment_id": cmt_id, "comment": cmt}
    this.http.put('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post/comment', update_cmt)
    .subscribe(res => {
      console.log(update_cmt);
      // console.log(res);
      this.editCommentText = '';
      comment[1].editClicked=false;
      this.getPostList();
    })
    // console.log('after', (<HTMLTextAreaElement> document.getElementById('edit_txt')).value)
  }
  
  thumbsupdownComment(comment:any, flag: Number){
    let cmt_id:string = comment[0]
    let cmt: {} ;
    if (flag == 1){
      if (this.confirmWindow('댓글을 추천하시겠습니까?') == true) cmt = {like : true, dislike:false}
    }
    else{
      if (this.confirmWindow('댓글을 반대하시겠습니까?') == true) cmt = {like:false, dislike : true}
    }
    let update_cmt = {"comment_id": cmt_id, "comment": cmt}

    console.log(update_cmt)
    this.http.put('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post/comment/likedislike', update_cmt)
    .subscribe(res => {
      console.log(res)
      this.getPostList();
    })
    
  }

  getPostInfo(post:any): void{
    post.edited = true;

    this.editCategory = post.category;
    this.editTitle = post.title;
    this.editDiagnosis = post.diagnosis;
    this.editDescription = post.description;
    
    console.log('getPostInfo',post.file_source)
    for(let fileSource of post.file_source){
      this.editFileSource.push(fileSource)
    }
  }

  readURL(event: any){
    if(event.target.files && event.target.files.length) {
      const fileList = event.target.files;
      for (const file of fileList) {
        this.readImage(file)
      }
    }
  }

  readImage(file: any){
    console.log(file)
    if(file.type && !file.type.startsWith('image/')){
      console.log('File is not an image.', file.type, file)
      return;
    }
    const reader = new FileReader();
  
    reader.onload = () => {
      this.editFileSource.push(reader.result as string);
    };

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  }

  deleteImg(imgSrc: string) : void{
    console.log(this.editFileSource)
    for( const[i,value] of this.editFileSource.entries()){
      if(value == imgSrc){
        this.editFileSource.splice(i,1)
      }
    }
     
  }
  confirmWindow(str: string) : Boolean{
    let ans = confirm(str)
    return ans
  }

  postComment(post : any){
    let txt = <HTMLTextAreaElement> document.getElementById('comment_txt')
    let today = new Date()
    let cmt : {} = {
      text : txt.value,
      write_time: today.toLocaleDateString(),
      dislike: 0,
      like: 0,
      editClicked: false,
      user :{
        id : this.userId,
        name: this.userName
      } 
    }

    let comment = {"post_id": post.post_id, comment:cmt}
    this.http.post('https://ssokuycqjh.execute-api.ap-northeast-2.amazonaws.com/post/comment', comment)
    .subscribe(res => {

        console.log(res);
        txt.value=''
        post.isComment=false;
        //  window.location.reload(); 전체 새로고침
        // this.router.navigate(['/post']); post component로 이동해버림
        // this.ngOnInit(); 좋지 않은 방법
        this.getPostList();
      })
  }

  closeResult: string;
  
  loadScript(){
    console.log('preparing to laod')
    const scriptElement = this.scriptService.loadJsScript(this.renderer, '../assets/MyWebApp.js');
    scriptElement.onload = () =>{
      console.log('laodScript - onload')
    }
    // let node = document.createElement('script')
    // node.src = '../dist/MyWebApp.js'
    // node.type='text/javascript'
    // node.async= true;
    // document.getElementsByTagName('head')[0].appendChild(node)
  }
  
  // loadAPI: Promise<any>;

  open(content : any) {
  //   this.loadAPI = new Promise((resolve) => {
  //     console.log('resolving promise...');
  //     this.loadScript();
  // });
    this.loadScript();

    // clicklistener.click()
    /* modal 창 open */
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      let clicklistener = <HTMLTextAreaElement> document.getElementById("avatar-click-listener")
      clicklistener.click()
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

