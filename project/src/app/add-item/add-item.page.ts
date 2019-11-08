import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  AlertController,
  NavController,
  ToastController,
  Platform,
} from '@ionic/angular';
import {Router} from '@angular/router';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Storage} from '@ionic/storage';
import {APISetting} from '../constant/API';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private alertController: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
  ) {}

  image: string = '';
  item_name: string;
  buy_date: Date;
  exp_date: Date;
  category: string;
  description: string;
  tag: string;

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

  ngOnInit() {}

  async addPost() {
    if (
      this.image === '' ||
      this.item_name === '' ||
      !this.buy_date ||
      !this.exp_date ||
      this.category === '' ||
      this.description === '' ||
      this.tag === ''
    ) {
      let alert = await this.alertController.create({
        message: 'Please fill all fields',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              return;
            },
          },
        ],
      });
      await alert.present();
      return;
    }
    const self = this;
    let userToken = await this.storage.get('userToken');

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Saving ...'})
      .then((loadingEl) => {
        loadingEl.present();

        async function getDataFromAPI() {
          const body = {
            image: self.image,
            item_name: self.item_name,
            buy_date: self.buy_date,
            exp_date: self.exp_date,
            category: self.category,
            description: self.description,
            tag: self.tag,
          };

          let response = await fetch(
            APISetting.API_ENDPOINT + 'feature/add-post',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: userToken,
              },
              body: JSON.stringify(body),
            },
          );

          let postStatus;
          if (response.status === 200) {
            postStatus = await response.json();
          } else {
            console.log(response);
            loadingEl.dismiss();
          }

          if (postStatus.success === true) {
            loadingEl.dismiss();
            let alert = await self.alertController.create({
              message: 'Post Successfully Added!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    self.navCtrl.navigateBack('/feeds');
                  },
                },
              ],
            });
            await alert.present();
          } else {
            loadingEl.dismiss();
            let alert = await this.alertCtrl.create({
              title: 'Alert',
              message: postStatus.message,
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
        getDataFromAPI();
      });
  }

  changeImage() {
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
            return;
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
            return;
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
          this.image = this.image;
        } else {
          this.image = 'data:image/jpeg;base64,' + imageData;
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
      outputType: 1,
      quality: 100,
    };
    this.imagePicker.getPictures(options).then(
      (imageData) => {
        if (imageData.length === 0) {
          this.image = this.image;
        } else {
          this.image = 'data:image/jpeg;base64,' + imageData;
        }
      },
      (err) => {
        alert(err);
      },
    );
  }
}
