import {OnInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {
  LoadingController,
  NavController,
  ActionSheetController,
  ToastController,
  Platform,
  AlertController,
} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';

import {AuthService} from '../auth/auth.service';
import {Storage} from '@ionic/storage';
import {APISetting} from '../constant/API';
import {provinceFormat} from '../helpers/provinceFormat';

@Component({
  selector: 'app-set-up-profile',
  templateUrl: './set-up-profile.page.html',
  styleUrls: ['./set-up-profile.page.scss'],
})
export class SetUpProfilePage implements OnInit {
  isLoading = false;
  isSignUp: boolean = true;
  selectedLocation: string;

  cityData = [
    {
      id: '',
      name: '',
    },
  ];

  capturedSnapURL = '';
  profilePicture = '';

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

    for (let item of this.cityData) {
      item.name = provinceFormat(item.name);
    }

    this.cityData.sort((a, b) => a.name.localeCompare(b.name));
  }

  changeProfilePicture() {
    this.presentActionSheet();
  }

  fullNameFormat(fullName: string) {
    return provinceFormat(fullName);
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

  async onSubmit(form: NgForm) {
    let self = this;
    let email = this.authService.getUserInfo().email;
    let username = this.authService.getUserInfo().username;
    let password = this.authService.getUserInfo().password;
    let full_name = form.value.fullName;
    let phone_number = form.value.phoneNumber;
    let location = this.selectedLocation;
    let image = this.profilePicture;

    let data = {
      email,
      username,
      password,
      full_name,
      phone_number,
      location,
      image,
    };
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Signing up...'})
      .then(async (loadingEl) => {
        loadingEl.present();

        let response = await fetch(APISetting.API_ENDPOINT + 'auth/sign-up', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });

        let signUpStatus;
        if (response.status === 200) {
          signUpStatus = await response.json();
        } else {
          console.log(response);
          loadingEl.dismiss();
        }

        if (signUpStatus.success === true) {
          loadingEl.dismiss();
          self.authService.login();
          self.storage.set('userToken', signUpStatus.token);
          self.router.navigateByUrl('/set-up-done');
        } else {
          loadingEl.dismiss();
          const alert = await self.alertController.create({
            header: 'Alert',
            message: signUpStatus.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    if (!form.valid) {
      return;
    }
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {
        if (imageData.length === 0) {
          this.profilePicture = this.profilePicture;
        } else {
          this.profilePicture = 'data:image/jpeg;base64,' + imageData;
          this.capturedSnapURL = imageData;
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
          this.profilePicture = this.profilePicture;
        } else {
          this.profilePicture = 'data:image/jpeg;base64,' + imageData;
          this.capturedSnapURL = imageData;
        }
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
