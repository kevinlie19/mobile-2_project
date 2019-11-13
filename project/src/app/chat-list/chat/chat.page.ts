import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NavController, IonContent, Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { Chat } from "../chat-list.model";
import { APISetting } from "src/app/constant/API";
import { timestampFormat } from "src/app/helpers/timestampFormat";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  @ViewChild("scrollElement", { static: false }) private content: any;
  loadedMessages: Chat;
  myUser: number;
  otherUser: number;
  msgToSend: string;
  paramId: number;
  userToken: string;
  maxLineLength: number;
  isIos: boolean;
  isRowFull: boolean;
  isLoading: boolean;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private platform: Platform,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has("chatId")) {
        this.navCtrl.navigateBack("/chat-list");
        return;
      }
      this.paramId = Number(paramMap.get("chatId"));

      this.userToken = await this.storage.get("userToken");
      let response = await fetch(APISetting.API_ENDPOINT + "page/chat/", {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: this.userToken
        }
      });

      const result = await response.json();
      this.loadedMessages = result.data[0];
      this.loadedMessages.chat_list = this.loadedMessages.chat_list.filter(
        message => {
          return message.id === Number(paramMap.get("chatId"));
        }
      );

      for (let keyList of this.loadedMessages.chat_list) {
        for (let keyMessage of keyList.messages) {
          keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
        }
      }
      this.isLoading = false;
      await setTimeout(() => {
        this.refreshMessages();
      }, 5000);
    });
    this.maxLineLength = 30;
    if (this.platform.is("ios")) {
      this.isIos = true;
    } else if (this.platform.is("android")) {
      this.isIos = false;
    }
  }

  async refreshMessages() {
    let self = this;

    let response = await fetch(APISetting.API_ENDPOINT + "page/chat/", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: self.userToken
      }
    });
    const result = await response.json();
    console.log("result", result);

    self.loadedMessages = result.data[0];
    self.loadedMessages.chat_list = self.loadedMessages.chat_list.filter(
      message => {
        return message.id === self.paramId;
      }
    );

    for (let keyList of self.loadedMessages.chat_list) {
      for (let keyMessage of keyList.messages) {
        keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
      }
    }

    //this.content.scrollToBottom(300);
    this.refreshMessages();
  }

  ionViewDidEnter() {
    //this.content.scrollToBottom(300);
  }

  ionViewOnChange() {
    //this.content.scrollToBottom(300);
  }

  onClickBack() {
    this.navCtrl.navigateBack("/chat-list");
  }

  async sendMsg() {
    let body = {
      message: this.msgToSend
    };
    let response = await fetch(
      APISetting.API_ENDPOINT +
        "feature/chat/" +
        this.loadedMessages.chat_list[0].id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: this.userToken
        },
        body: JSON.stringify(body)
      }
    );

    let sendMessageStatus;
    if (response.status === 200) {
      sendMessageStatus = await response.json();
    } else {
      console.log(response);
    }

    if (sendMessageStatus.success === true) {
      console.log("BERHASIL CUY MANTAB!");
    } else {
      console.log(sendMessageStatus.message);
      return;
    }

    this.msgToSend = "";
  }

  onKeyAction() {
    if (this.msgToSend) {
      let lines = this.msgToSend.split(/(\r\n|\n|\r)/gm);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > this.maxLineLength) {
          lines[i].concat("\n");
          this.isRowFull = true;
        }
      }
      this.msgToSend = lines.join("");
    }
  }
}
