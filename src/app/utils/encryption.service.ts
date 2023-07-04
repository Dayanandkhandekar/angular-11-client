import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'

const ENCRIPTION_KEY = "ProGMsFLo@tiN!ty";

@Injectable()
export class EncryptionService {

  private key;
  private iv;
  constructor() {
    this.key = CryptoJS.enc.Utf8.parse(ENCRIPTION_KEY);
    this.iv = CryptoJS.enc.Utf8.parse(this.key);

  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.key, {
      keySize: 16,
      iv: this.iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  }
  decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, this.key, {
      keySize: 16,
      iv: this.iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
  }

}