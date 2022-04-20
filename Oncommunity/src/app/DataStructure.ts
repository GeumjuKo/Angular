
export interface Post{
  post_id : string,
  category : string,
  title : string,
  date : string,
  views : Number,
  diagnosis : string,
  contents : string,
  comment : Comment,
  user: User;
}

export interface Comment{
write_time : string;
text : string;
edit_time : string;
like : Number;
dislike : Number;
user : {
  name : string;
  id : string;
}
}

export interface User{
name : string;
id : string;
dicom_id : string;
gender : string;
age : Number;
}
