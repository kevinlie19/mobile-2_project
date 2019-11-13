import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import {
  ActionSheetController,
  LoadingController,
  AlertController,
  NavController
} from "@ionic/angular";
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Storage } from "@ionic/storage";

import { Profile } from "../profile.model";
import { ProfileService } from "../profile.service";
import { APISetting } from "../../constant/API";
import { provinceFormat } from "src/app/helpers/provinceFormat";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.scss"]
})
export class ProfileEditPage implements OnInit {
  loadedProfile: Profile = {
    user: {
      id: 0,
      email: "",
      username: "",
      full_name: "",
      password: "",
      phone_number: "",
      location: "",
      avatar: "",
      gender: "",
      following: [],
      follower: []
    },
    post: []
  };

  cityData = [
    {
      id: "",
      name: ""
    }
  ];

  capturedSnapURL: string = "";
  selectedLocation = "";
  selectedGender = "";

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true,
    correctOrientation: true,
    targetWidth: 130,
    targetHeight: 130,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private profileService: ProfileService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.loadedProfile = this.profileService.getProfile();
    this.capturedSnapURL = this.loadedProfile.user[0].avatar;

    let getProvinceToken = await fetch("https://x.rajaapi.com/poe", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    let provinceToken = await getProvinceToken.json();

    let getProvinceList = await fetch(
      "https://x.rajaapi.com/MeP7c5ne" +
        provinceToken.token +
        "/m/wilayah/provinsi",
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    let province = await getProvinceList.json();

    this.cityData = province.data;

    for (let item of this.cityData) {
      item.name = provinceFormat(item.name);
    }

    this.cityData.sort((a, b) => a.name.localeCompare(b.name));
  }

  onClickClose() {
    this.navCtrl.navigateBack("/profile");
  }

  changeProfilePicture() {
    this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source!",
      buttons: [
        {
          text: "Load from Gallery",
          handler: () => {
            this.selectGalery();
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  takePicture() {
    this.camera.getPicture(this.cameraOptions).then(
      imageData => {
        if (imageData.length === 0) {
          this.capturedSnapURL = this.capturedSnapURL;
        } else {
          const base64Image = "data:image/jpeg;base64," + imageData;
          this.capturedSnapURL = base64Image;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  selectGalery() {
    const options = {
      maximumImagesCount: 1,
      quality: 100,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then(
      imageData => {
        if (imageData.length === 0) {
          this.capturedSnapURL = this.capturedSnapURL;
        } else {
          const base64Image = "data:image/jpeg;base64," + imageData;
          this.capturedSnapURL = base64Image;
        }
      },
      err => {
        alert(err);
      }
    );
  }

  onChangeGender(value) {
    this.selectedGender = value.detail.value;
  }

  onChangeLocation(value) {
    this.selectedLocation = value.detail.value;
  }

  async onSubmit(form: NgForm) {
    let self = this;
    let full_name = form.value.fullName;
    let phone_number = form.value.phoneNumber;
    let image = this.capturedSnapURL;
    let location = this.selectedLocation;
    let gender = this.selectedGender;
    let userToken = await this.storage.get("userToken");
    let body = {};

    this.loadingCtrl
      .create({ keyboardClose: true, message: "Applying Changes..." })
      .then(loadingEl => {
        loadingEl.present();

        async function getDataFromAPI() {
          if (image === self.loadedProfile.user[0].avatar) {
            body = {
              full_name,
              phone_number,
              location,
              gender
            };
          } else if (image !== self.loadedProfile.user[0].avatar) {
            body = {
              image,
              full_name,
              phone_number,
              location,
              gender
            };
          }

          let response = await fetch(
            APISetting.API_ENDPOINT + "feature/edit-profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: userToken
              },
              body: JSON.stringify(body)
            }
          );

          let editProfileStatus;
          if (response.status === 200) {
            editProfileStatus = await response.json();
          } else {
            console.log(response);
            loadingEl.dismiss();
          }

          if (editProfileStatus.success === true) {
            loadingEl.dismiss();
            let alert = await self.alertCtrl.create({
              message: "Account Successfully Updated!",
              buttons: [
                {
                  text: "OK",
                  handler: () => {
                    self.navCtrl.navigateBack("/profile");
                  }
                }
              ]
            });
            await alert.present();
          } else {
            loadingEl.dismiss();
            let alert = await this.alertCtrl.create({
              title: "Alert",
              message: editProfileStatus.message,
              buttons: [
                {
                  text: "OK",
                  handler: () => {}
                }
              ]
            });
            await alert.present();
            return;
          }
        }
        getDataFromAPI();
      });
  }
}
