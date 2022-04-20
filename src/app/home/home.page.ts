import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  @ViewChild(IonSlides) slides: IonSlides;
  public didInit: boolean = false;

  constructor(private http:HttpClient, private auth:AuthenticationService, private router:Router) {
  }

  posts:any;


  ngAfterViewInit(): void {
    this.didInit = true;
  }
  slideOpts = {
    direction: 'vertical'

  };

  slideChanged(){
    this.slides.getActiveIndex().then(index => {
      this.playVideo(index);
    });
    this.slides.getPreviousIndex().then(index => {
      this.stopVideo(index);
    });
  }

  async playVideo(index){
    console.log(index);
    let videoPlayer: HTMLMediaElement = <HTMLMediaElement>document.getElementById(index+1);
    videoPlayer.pause();
    try {
      await videoPlayer.play();
    } catch(err) {
      await videoPlayer.play();
      videoPlayer.autoplay = true;
    }
  }

  stopVideo(index){
    let videoPlayer: HTMLMediaElement = <HTMLMediaElement>document.getElementById(index+1);
    videoPlayer.pause();
  }
  ngOnInit():void{
    this.auth.status().subscribe((res)=>{
      console.log(res);
    });
    this.auth.posts().subscribe((res)=>{
      this.posts = res;
      console.log(this.posts);
    }, (err) =>{
      console.log(err);
    })
  }
  like(){
    console.log("like")
  }
  logout(){
    this.auth.logout().subscribe((res)=>{
      console.log(res);
      localStorage.removeItem('user');
      this.auth.toggleLogin(false);
      this.router.navigate(['/'])
    }, (err)=>{
      console.log(err);
    })
  }
}
