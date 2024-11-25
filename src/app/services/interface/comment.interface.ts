import { Observable } from "rxjs";


export interface CommentServiceInterface {
  deleteComment: (id: string) => Observable<object>;
  comment: (data: { text: string, post: number, user: number }) => Observable<object>;
}
