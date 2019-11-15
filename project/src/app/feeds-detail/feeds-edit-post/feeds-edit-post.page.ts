import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {
  ActionSheetController,
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import {CameraOptions, Camera} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';

import {FeedsDetailService} from '../feeds-detail.service';
import {FeedDetails} from '../feeds-detail.model';
import {APISetting} from 'src/app/constant/API';
import {provinceFormat} from 'src/app/helpers/provinceFormat';

@Component({
  selector: 'app-feeds-edit-post',
  templateUrl: './feeds-edit-post.page.html',
  styleUrls: ['./feeds-edit-post.page.scss'],
})
export class FeedsEditPostPage implements OnInit {
  loadedFeed: FeedDetails;
  capturedSnapURL: string = '';
  selectedCategory: string = '';
  selectedTag: string = '';

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true,
    correctOrientation: true,
    targetWidth: 130,
    targetHeight: 130,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  constructor(
    private feedsFetailService: FeedsDetailService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadedFeed = this.feedsFetailService.getFeed();
    this.capturedSnapURL = this.loadedFeed.post[0].image;
    console.log(this.loadedFeed);
  }

  onClickClose() {
    this.navCtrl.back();
  }

  changePostPicture() {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source!',
      buttons: [
        {
          text: 'Load from Gallery',
          handler: () => {
            this.selectGalery();
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        if (imageData.length === 0) {
          this.capturedSnapURL = this.capturedSnapURL;
        } else {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.capturedSnapURL = base64Image;
        }
      },
      (err) => {
        console.error(err);
      },
    );
  }

  selectGalery() {
    const options = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: 1,
    };
    this.imagePicker.getPictures(options).then(
      (imageData) => {
        if (imageData.length === 0) {
          this.capturedSnapURL = this.capturedSnapURL;
        } else {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.capturedSnapURL = base64Image;
        }
      },
      (err) => {
        alert(err);
      },
    );
  }

  itemNameFormat(itemName: string) {
    return provinceFormat(itemName);
  }

  async onSubmit(form: NgForm) {
    let self = this;
    let image = this.capturedSnapURL;
    let item_name = form.value.itemName;
    let buy_date = form.value.buyDate;
    let exp_date = form.value.expDate;
    let category = form.value.category;
    let description = form.value.description;
    let tag = form.value.tag;
    let userToken = await this.storage.get('userToken');
    let body = {};

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Applying Changes...'})
      .then((loadingEl) => {
        loadingEl.present();

        async function updatePost() {
          if (image === self.loadedFeed.post[0].image) {
            body = {
              item_name,
              buy_date,
              exp_date,
              category,
              description,
              tag,
            };
          } else if (image !== self.loadedFeed.post[0].image) {
            body = {
              image,
              item_name,
              buy_date,
              exp_date,
              category,
              description,
              tag,
            };
          }

          let response = await fetch(
            APISetting.API_ENDPOINT +
              'feature/edit-post/' +
              self.loadedFeed.post[0].id,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: userToken,
              },
              body: JSON.stringify(body),
            },
          );

          let editPostStatus;
          if (response.status === 200) {
            editPostStatus = await response.json();
          } else {
            console.log(response);
            loadingEl.dismiss();
          }

          if (editPostStatus.success === true) {
            loadingEl.dismiss();
            let alert = await self.alertCtrl.create({
              message: 'Post Successfully Updated!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    self.navCtrl.navigateBack('/profile');
                  },
                },
              ],
            });
            await alert.present();
          } else {
            loadingEl.dismiss();
            let alert = await this.alertCtrl.create({
              title: 'Alert',
              message: editPostStatus.message,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {},
                },
              ],
            });
            await alert.present();
            return;
          }
        }
        updatePost();
      });
  }
}
