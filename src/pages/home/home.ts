import { Component } from '@angular/core';
import { IonicPage, Platform, NavController } from 'ionic-angular';
import { ImgLoader } from 'ionic-image-loader';
import { ImageLoaderConfig } from 'ionic-image-loader';
import 'rxjs/Rx'

import { ClientProvider } from '../../providers/client.provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ClientProvider]
})
export class HomePage {
  posts: any;
  page: number;
  showSearchBar: boolean;
  searchString: string;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public clientProvider: ClientProvider,
  ) { 
    this.page = 1;
    this.fetchPost();
    this.showSearchBar = false;
    this.searchString = "";
  }

  ionViewDidLoad() {
  }

  fetchPost(isRefresh?: boolean) {
    if (isRefresh) {
      this.page = 1;
    }
    this.clientProvider.getListPosts(this.page)
      .subscribe(res => {
        console.log(res);
        this.posts = res;
      })
  }

  doRefreshPost(refresher) {
    console.log('Begin async operation', refresher);
    this.fetchPost(true);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

  }

  loadMorePosts(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      this.clientProvider.getListPosts(this.page)
        .subscribe(res => {
          res.forEach(element => {
            this.posts.push(element)
          });
          infiniteScroll.complete();
        })
    }, 500)
  }

  searchPost(event: any) {
    this.navCtrl.push(
      "PostListPage", {
        'type': 'search',
        'id': event.target.value,
        'name': event.target.value
      }
    )
  }

  toPostContent(postDetail: any) {
    this.navCtrl.push(
      "PostContentPage", {
        'postId': postDetail.id,
        'postMedia': postDetail.media
      });
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
}
