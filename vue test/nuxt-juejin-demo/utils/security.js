import CryptoJS from 'crypto-js'
export function SUtripleDESEncryptWithECB(data, key) {
  var encrypted = CryptoJS.TripleDES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export function MYtripleDESDecryptWithECB(data, key) {
  var decrypted = CryptoJS.TripleDES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var parseData = decrypted.toString(CryptoJS.enc.Utf8)
  return parseData
}
