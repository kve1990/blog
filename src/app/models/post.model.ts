export class Post {
  id: number;
  title: string;
  text: string;
  author: any;

  constructor(id: number) {
    this.id = id;
    this.author = '';
    this.title = '';
    this.text = '';
  }
}
