import CryptoJS from "crypto-js";

const algorithm = "AES";

/* GENERATE KEY ONLY WHEN NEW KEY IS LOST */
// WHEN GENERATING A NEW KEY UPDATE THE USERNAME AND PASSWORDS IN THE DATABASE TO MATCH THE NEW KEY
// REMOVE THE ACCOUNTS.JSON FILE AND COMMENT THE ENCRYPT FUNCTION FOR FINISHING TOUCH

// function generateKey() {
//   // Generate a 256-bit key
//   const key = CryptoJS.lib.WordArray.random(256 / 8);
//   return key.toString(CryptoJS.enc.Hex);
// }

// function encrypt(key) {
//   const encrypted = [{}];
//   for (let account of accounts) {
//     account.username = CryptoJS[algorithm]
//       .encrypt(account.username, key)
//       .toString();
//     console.log("Username:", account.username);
//     account.password = CryptoJS[algorithm]
//       .encrypt(account.password, key)
//       .toString();
//     console.log("Password:", account.password);
//     encrypted.push(account);
//   }
// }

function decrypt(encryptedText, key) {
  const bytes = CryptoJS[algorithm].decrypt(encryptedText, key);
  console.log(bytes.toString(CryptoJS.enc.Utf8));
  return bytes.toString(CryptoJS.enc.Utf8);
}

export { decrypt };
