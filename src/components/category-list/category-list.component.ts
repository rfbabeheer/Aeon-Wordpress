
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ImgLoader } from 'ionic-image-loader';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { MomentModule } from 'angular2-moment';

@Component({})
export class CategoryListComponent {
    @Input('categoryList') categories: any;
    @Output() postTarget: EventEmitter<any> = new EventEmitter<any>();

    constructor(private imageLoaderConfig: ImageLoaderConfig) {
        imageLoaderConfig.enableSpinner(false);
    }

    categoryNav(categoryId, postMediaUrl) {
        this.postTarget.emit({
            id: categoryId,
            media: postMediaUrl
        });
    }
}