import { OnInit, Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {LoadingController, NavController, ActionSheetController, ToastController, Platform} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import fetch from 'node-fetch';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-set-up-profile',
  templateUrl: './set-up-profile.page.html',
  styleUrls: ['./set-up-profile.page.scss'],
})
export class SetUpProfilePage implements OnInit {
  isLoading = false;
  isSignUp = true;
  selectedLocation = '';

  cityData = [{
    id: '',
    name: ''
  }];

  capturedSnapURL: string = '';

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit : true,
    correctOrientation: true,
    targetWidth: 130,
    targetHeight: 130,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,

  ) {}

  async ngOnInit() {
    const getKey = await fetch(
      'https://x.rajaapi.com/poe',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
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
      buttons: [{
        text: 'Load from Gallery',
        handler: () => {
          this.selectGalery();
        }
      }, {
        text: 'Use Camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  next() {
    this.isLoading = true;
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Signing in...'})
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/set-up-done');
        }, 1500);
      });
  }

  onSubmit(form: NgForm) {
    const email = this.authService.getUserInfo().email;
    const username = this.authService.getUserInfo().username;
    const password = this.authService.getUserInfo().password;
    const full_name = form.value.fullName;
    const telephone = form.value.phoneNumber;
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
          telephone,
          location,
          image
        };

        let response: any = {};
        await fetch('https://cibo-cove-231019.herokuapp.com/api/auth/sign-up', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'},
        })
        .then((returnedResponse) => {
          response = returnedResponse;
        })
        .catch((err) => {
          loadingEl.dismiss();
        });
        const data = await response.json();
        console.log(data);

        if (data.success === true) {
          loadingEl.dismiss();
          this.authService.login();
          console.log('dataToken', data.token);
          this.storage.set('userToken', data.token);
          this.router.navigateByUrl('set-up-done');

        } else {
          loadingEl.dismiss();
          const alert = await this.alertController.create({
            header: 'Alert',
            message: data.message,
            buttons: ['OK']
          });
          loadingEl.dismiss();
          await alert.present();
          return;
        }
      }
      getDataFromAPI();
    });

    if (this.isSignUp) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      console.log(err);
    });
  }

  selectGalery() {
    const options = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: 1,
    };
    this.imagePicker.getPictures(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      alert(err);
    });
  }

  onChange(value){
    this.selectedLocation = value.detail.value;
  };
}
