import {OnInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {LoadingController, NavController, ActionSheetController, ToastController, Platform, AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import fetch from 'node-fetch';
import {AuthService} from '../auth/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-set-up-profile',
  templateUrl: './set-up-profile.page.html',
  styleUrls: ['./set-up-profile.page.scss'],
})
export class SetUpProfilePage implements OnInit {
  isLoading = false;
  isSignUp = true;
  selectedLocation = '';

  cityData = [
    {
      id: '',
      name: '',
    },
  ];

  capturedSnapURL: string = '';

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
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private alertController: AlertController,
    private storage: Storage,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
  ) {}

  async ngOnInit() {
    const getKey = await fetch('https://x.rajaapi.com/poe', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const token = await getKey.json();

    const getProvince = await fetch(
      'https://x.rajaapi.com/MeP7c5ne' + token.token + '/m/wilayah/provinsi',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    const province = await getProvince.json();

    this.cityData = province.data;
  }

  changeProfilePicture() {
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

  onSubmit(form: NgForm) {
    const self = this;
    const email = this.authService.getUserInfo().email;
    const username = this.authService.getUserInfo().username;
    const password = this.authService.getUserInfo().password;
    const full_name = form.value.fullName;
    const phone_number = form.value.phoneNumber;
    const image = this.capturedSnapURL;
    const location = this.selectedLocation;

    this.loadingCtrl
    .create({keyboardClose: true, message: 'Signing up...'})
    .then((loadingEl) => {
      loadingEl.present();

      async function getDataFromAPI() {
        const body = {
          email,
          username,
          password,
          full_name,
          phone_number,
          location,
          image
        };

        const response = await fetch('https://cibo-cove-231019.herokuapp.com/api/auth/sign-up', {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'},
        })
        .catch((err) => {
          loadingEl.dismiss();
        });

        const signInStatus = await response.json();

        if (signInStatus.success === true) {
          loadingEl.dismiss();
          self.authService.login();
          self.storage.set('userToken', signInStatus.token);
          self.router.navigateByUrl('set-up-done');
        } else {
          loadingEl.dismiss();
          const alert = await self.alertController.create({
            header: 'Alert',
            message: signInStatus.message,
            buttons: ['OK']
          });
          loadingEl.dismiss();
          await alert.present();
          return;
        }
        getDataFromAPI();
      });
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.capturedSnapURL = base64Image;
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
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.capturedSnapURL = base64Image;
      },
      (err) => {
        alert(err);
      },
    );
  }

  onChange(value) {
    this.selectedLocation = value.detail.value;
  }
}
