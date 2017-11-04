importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "404.html",
    "revision": "c980ee9e0748fe272a6d05259082ee21"
  },
  {
    "url": "background-worker.js",
    "revision": "f755ac021ac2de2363060af6b7dc8683"
  },
  {
    "url": "blog/authors/carlosrojas/index.html",
    "revision": "a3349ba34e3eb5dd3d46ea7b02e09272"
  },
  {
    "url": "blog/authors/daniel_lsanchez/index.html",
    "revision": "41d3f89d8eaa9a6f3f8eeef8440823a0"
  },
  {
    "url": "blog/authors/darkensses/index.html",
    "revision": "c8f7a12353756ec2e9c19250db688092"
  },
  {
    "url": "blog/authors/EduardoIbarra/index.html",
    "revision": "4dc1c10fa5d5a40aadfef14756e725f1"
  },
  {
    "url": "blog/authors/edyavendano/index.html",
    "revision": "943febb342acc27a524c1a9f1f6f633e"
  },
  {
    "url": "blog/authors/hllauradofalco/index.html",
    "revision": "77555c80affba7de4f4213185a763a98"
  },
  {
    "url": "blog/authors/index.html",
    "revision": "ddbfc895e85bbbccb2cff5f711d45936"
  },
  {
    "url": "blog/authors/javaruiz/index.html",
    "revision": "e047d25a4daee4307a028d12d37bfb99"
  },
  {
    "url": "blog/authors/javebratt/index.html",
    "revision": "913b6642f8153243f42a04f8740dfcb3"
  },
  {
    "url": "blog/authors/javico2609/index.html",
    "revision": "4ad004d835af18c54ff32e1a03777a2d"
  },
  {
    "url": "blog/authors/jorgecano/index.html",
    "revision": "b044c8176744aa0cc4d2c5c2e31c14d2"
  },
  {
    "url": "blog/authors/levanocarlos/index.html",
    "revision": "adf3d244954d3650522c1b48fe234f29"
  },
  {
    "url": "blog/authors/mayrititis/index.html",
    "revision": "584abd5c2652af0bcea1f71574d37551"
  },
  {
    "url": "blog/authors/nicobytes/index.html",
    "revision": "cef8f35cc1d3815d0a09d57a7072e9fb"
  },
  {
    "url": "blog/authors/thecouk/index.html",
    "revision": "64db4ff3fe2f00701615ce0c8bbd2919"
  },
  {
    "url": "blog/authors/unjavascripter/index.html",
    "revision": "4ae28f0dd82e776107ab849b8efc7cf3"
  },
  {
    "url": "blog/hechoen/Honi/index.html",
    "revision": "8733920da4cd2dc6459ee2c6630be629"
  },
  {
    "url": "blog/hechoen/index.html",
    "revision": "10170d219470838513ce4153e685b426"
  },
  {
    "url": "blog/hechoen/Joule/index.html",
    "revision": "efe71f15b5e51fd90b2ac40d45824453"
  },
  {
    "url": "blog/hechoen/JustWatch/index.html",
    "revision": "4b7fe68ede89df3e86e80f6f9bb37119"
  },
  {
    "url": "blog/hechoen/MarketWatch/index.html",
    "revision": "7109f8545b10e0f0fb1a9d37c0557976"
  },
  {
    "url": "blog/hechoen/Microsoft-Flow/index.html",
    "revision": "94a984eb6cf18598587fc448a19ab3db"
  },
  {
    "url": "blog/hechoen/Pacifica/index.html",
    "revision": "e7648b20385eb96d3fc7157e184ea87c"
  },
  {
    "url": "blog/hechoen/PhoneFlare/index.html",
    "revision": "f7787d7ac7e62a9976c583b522d92205"
  },
  {
    "url": "blog/hechoen/shopit/index.html",
    "revision": "c86fee3218c94b392fb6f42cfca9e2a6"
  },
  {
    "url": "blog/hechoen/Sworkit/index.html",
    "revision": "cfb7e665ca32735f1939a73df431c29a"
  },
  {
    "url": "blog/hechoen/Untappd/index.html",
    "revision": "2aaaa51c6b838a84ddb7f085e852c150"
  },
  {
    "url": "blog/index.html",
    "revision": "405bfac669d3effa7e3a71cdd27804a2"
  },
  {
    "url": "blog/ionic2/angular2/index.html",
    "revision": "79edf183aced7f63ec60cfde2ff7422d"
  },
  {
    "url": "blog/ionic2/animating-items-ionic/index.html",
    "revision": "07136b23630ac45764d3065be9827607"
  },
  {
    "url": "blog/ionic2/auth0-ionic/index.html",
    "revision": "e1ba435d9e5f18d5bbdc650c50420eda"
  },
  {
    "url": "blog/ionic2/camera-and-ionic/index.html",
    "revision": "d1e7c32b4bce4f26ddb1735f6ecbc35e"
  },
  {
    "url": "blog/ionic2/clase-1-feed/index.html",
    "revision": "f0c9c32f3ecc4015495c9974b5d31246"
  },
  {
    "url": "blog/ionic2/clase-2-feed/index.html",
    "revision": "3596f803026b208a303d2b442bbdcbac"
  },
  {
    "url": "blog/ionic2/clase-3-user-auth/index.html",
    "revision": "8b00583547fa9f108f0788b8872eaec6"
  },
  {
    "url": "blog/ionic2/clase-4-objects/index.html",
    "revision": "8a4d9e686bed73c7c19b435a45ba3c25"
  },
  {
    "url": "blog/ionic2/custom-colors/index.html",
    "revision": "0af32e0a9d5bf5ae54ab7d13525461a8"
  },
  {
    "url": "blog/ionic2/directions-google-js-ionic/index.html",
    "revision": "8535a15ef6aaa95cf511053036119386"
  },
  {
    "url": "blog/ionic2/directivas/index.html",
    "revision": "77fa26dc2b57eb12e1ce7c8fb07a59d9"
  },
  {
    "url": "blog/ionic2/electron-ionic/index.html",
    "revision": "10a159456b4309202ee2f9ccbb6bff70"
  },
  {
    "url": "blog/ionic2/facebook-and-ionic/index.html",
    "revision": "efbdbf397eacb291f7555650d771b552"
  },
  {
    "url": "blog/ionic2/firebase-angularfire-ionic/index.html",
    "revision": "d4041fe907eb2b8638d171b06b827e94"
  },
  {
    "url": "blog/ionic2/firebase-database-and-ionic/index.html",
    "revision": "2404a56f153fc40fb1eef7db6d89ce94"
  },
  {
    "url": "blog/ionic2/firebase-functions/index.html",
    "revision": "912262fa323e21cbdeefc478c2e89a06"
  },
  {
    "url": "blog/ionic2/firebase-storage/index.html",
    "revision": "83ba0f191fbde6ee35ac0b7b00b42559"
  },
  {
    "url": "blog/ionic2/folder-browser-para-android/index.html",
    "revision": "dec95f7e2f56c5c3e776cdbb1555cfa7"
  },
  {
    "url": "blog/ionic2/forms-with-ionic/index.html",
    "revision": "52e56ebf8ec0e7c2aaf599a2222dadcd"
  },
  {
    "url": "blog/ionic2/formularios-firebase/index.html",
    "revision": "1a88c60321b765a400429157e3c1a0d7"
  },
  {
    "url": "blog/ionic2/fundamentos-SASS/index.html",
    "revision": "57b9600dec3629627617d2e96cffd8f9"
  },
  {
    "url": "blog/ionic2/google-maps-and-geocoder/index.html",
    "revision": "917a18a6152ba19817012022e2ab170d"
  },
  {
    "url": "blog/ionic2/google-maps-js-and-ionic/index.html",
    "revision": "5f60d0af63bb0ee85a3b49cb03186a36"
  },
  {
    "url": "blog/ionic2/google-maps-markers/index.html",
    "revision": "c9ed81ac46c9d63836047226d9db28a5"
  },
  {
    "url": "blog/ionic2/google-maps-native/index.html",
    "revision": "7a476f4d57bb22383cc8b833fb6bc08e"
  },
  {
    "url": "blog/ionic2/index.html",
    "revision": "c8be8474908995505ed91ddf83c19d2e"
  },
  {
    "url": "blog/ionic2/intro-jasmine/index.html",
    "revision": "7a9de9433486b7634ad5bc1d771b85b0"
  },
  {
    "url": "blog/ionic2/intro-typescript/index.html",
    "revision": "d1ae375ca79d2392fe8ea90bedaffbb1"
  },
  {
    "url": "blog/ionic2/ionic-2-firebase-3-rc0/index.html",
    "revision": "4c2bf92f4378ff685cc34f307b1a40f3"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal-for-ios/index.html",
    "revision": "0e70a75487389e428ef1f62636c54608"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal/index.html",
    "revision": "de7757eefd7de89f62bcb6a2e7238dc5"
  },
  {
    "url": "blog/ionic2/ionic-firebase/index.html",
    "revision": "0ee2b1c656b50a9c56eaf4f345a0d403"
  },
  {
    "url": "blog/ionic2/ionic-native/index.html",
    "revision": "3b156e56d1156db4d6dd48e134e1d6f3"
  },
  {
    "url": "blog/ionic2/ionic-plugin-inappbrowser/index.html",
    "revision": "2c3bd49091d1aa3344e033bed6314942"
  },
  {
    "url": "blog/ionic2/ionic-push-notifications/index.html",
    "revision": "71d8dec61e467246a248d5f90adf3276"
  },
  {
    "url": "blog/ionic2/ionic-redux/index.html",
    "revision": "520a6e7354fbc342d8c2fd29ca06fd89"
  },
  {
    "url": "blog/ionic2/ionic2/index.html",
    "revision": "9c7bb166b235a9faee026ba35db988cd"
  },
  {
    "url": "blog/ionic2/ngrx-charts-bars/index.html",
    "revision": "bf0ad5fc74a09363195fccc48a3fee0b"
  },
  {
    "url": "blog/ionic2/ngx-translate/index.html",
    "revision": "7afa4104017e380e11a23417bf666084"
  },
  {
    "url": "blog/ionic2/observables-angular/index.html",
    "revision": "abf4b98b295fe27ecd272615679c4e0e"
  },
  {
    "url": "blog/ionic2/observables/index.html",
    "revision": "9c4bf63dba08b1095dad79f549e6cdf0"
  },
  {
    "url": "blog/ionic2/pwa-ionic/index.html",
    "revision": "e6ff5fbf3db17cbf6cc4eaa5bdcd3f04"
  },
  {
    "url": "blog/ionic2/rest-api-with-ionic/index.html",
    "revision": "ede4e4902a39bd4bddac97ec94840dec"
  },
  {
    "url": "blog/ionic2/sms-ionic/index.html",
    "revision": "b13c5f645225a4ac5b080c63051fafa3"
  },
  {
    "url": "blog/ionic2/sqlite-and-ionic/index.html",
    "revision": "4c5d01b63a21b70677be804af78b8887"
  },
  {
    "url": "blog/ionic2/sync-offline/index.html",
    "revision": "c952e09eee2226a43d34b98f28f0d084"
  },
  {
    "url": "blog/ionic2/typescript/index.html",
    "revision": "0b5e56e6bb7fa7fa63ec5d1c0a7b26fc"
  },
  {
    "url": "blog/ionic2/uni-test-provider/index.html",
    "revision": "009ed55080e1a05aab55ed2706d74a24"
  },
  {
    "url": "blog/ionic2/unit-test-config-ionic/index.html",
    "revision": "8dd2fa6f0424a1c50ad21cf8533440d1"
  },
  {
    "url": "blog/ionic2/unit-test-http-client/index.html",
    "revision": "a62e7db761ccb61211e7e3b1a9554c26"
  },
  {
    "url": "blog/ionic2/validations-in-forms/index.html",
    "revision": "752b59140b5866f29f1aef3deb1394ff"
  },
  {
    "url": "blog/ionic3/curso-ionic-3-firebase/index.html",
    "revision": "c672a444bcfac9ba307398b60ef8eda4"
  },
  {
    "url": "blog/nativescript/nativescript/index.html",
    "revision": "7c0d968b18b41b75a07f20f812ab621f"
  },
  {
    "url": "blog/news/angular2-ready/index.html",
    "revision": "9b95a55cc9c8983123d7a58f4b9093e4"
  },
  {
    "url": "blog/news/announcing-ionic-2-0-0-final/index.html",
    "revision": "f3f1119d661729cf4618760c7a7d1779"
  },
  {
    "url": "blog/news/beta8/index.html",
    "revision": "daf2551dd5cbde88571f902e8f1cd063"
  },
  {
    "url": "blog/news/beta9/index.html",
    "revision": "89c9a37122dbee06cf95aa3a21549a3c"
  },
  {
    "url": "blog/news/cambios/index.html",
    "revision": "8e00ed20d2d1052685775c98460c3900"
  },
  {
    "url": "blog/news/firebase-3/index.html",
    "revision": "74aca5e4c4f9078d137d8d061b36875c"
  },
  {
    "url": "blog/news/firestore/index.html",
    "revision": "c3e3231f3cd0b46b59ef3498ade9e78c"
  },
  {
    "url": "blog/news/help-testing-ionic-cli/index.html",
    "revision": "2a49f5ab35e9c8cc7cdcd377ff869a0c"
  },
  {
    "url": "blog/news/help-testing-WKWebview/index.html",
    "revision": "5291276cd7f8807c6838e065b8904c60"
  },
  {
    "url": "blog/news/Help-Testing/index.html",
    "revision": "1654ad6b4a09bbd473f509c723478151"
  },
  {
    "url": "blog/news/index.html",
    "revision": "1d64b9354e9dfa1cbc070a0e582fe33d"
  },
  {
    "url": "blog/news/interview-andresvillanueva/index.html",
    "revision": "02baada1732c897a768c8d707ba7fb67"
  },
  {
    "url": "blog/news/interview-carlosrojas/index.html",
    "revision": "a2463dd86774d0afb4b59d7e8954293e"
  },
  {
    "url": "blog/news/interview-javico/index.html",
    "revision": "d3a33ab795a231ba464bceb26507b89a"
  },
  {
    "url": "blog/news/interview-javierruiz/index.html",
    "revision": "1de421de680c19dd8c58b72045fbe3d7"
  },
  {
    "url": "blog/news/interview-jorgeucano/index.html",
    "revision": "1eb919c9ade0c77d51c0117438832285"
  },
  {
    "url": "blog/news/interview-nicobytes/index.html",
    "revision": "4807acdb786905d5e76006fbcda795c4"
  },
  {
    "url": "blog/news/ionic-2-2-0-out/index.html",
    "revision": "8f384cecc4cbf99223f4977d3a4ea8bf"
  },
  {
    "url": "blog/news/ionic-2-beta-10/index.html",
    "revision": "6e35700300f75edf22cee1b99dc2e243"
  },
  {
    "url": "blog/news/ionic-2-beta-11/index.html",
    "revision": "21443c893d0b47d6105bef38ae0315c0"
  },
  {
    "url": "blog/news/ionic-2-rc-2/index.html",
    "revision": "739ae9da06cc0110a4fa3d7b07eaf6d4"
  },
  {
    "url": "blog/news/ionic-2-release-candidate/index.html",
    "revision": "d4ab058ad798147cee33410c1553ed01"
  },
  {
    "url": "blog/news/ionic-3-7/index.html",
    "revision": "a134cde21ae3a4df4ff1f0ff7b52ef53"
  },
  {
    "url": "blog/news/ionic-cli-v3-5-2/index.html",
    "revision": "5a6da9bcdba70efbe8cce4c131ee0e9a"
  },
  {
    "url": "blog/news/ionic-cli-v3/index.html",
    "revision": "85f3e7aec49ae3a5055a7cd2650f26a4"
  },
  {
    "url": "blog/news/ionic-native-3x/index.html",
    "revision": "79772dcaaa626c9dc831e9da8f6f6402"
  },
  {
    "url": "blog/news/ionic-native-news/index.html",
    "revision": "8534b4219748c3458df664b4f6166b8c"
  },
  {
    "url": "blog/news/ionic-survey/index.html",
    "revision": "d115540639b22288a834ce6bc2b91f36"
  },
  {
    "url": "blog/news/ionic-v-3/index.html",
    "revision": "8f37f8e43e00baa634e5623409532d5b"
  },
  {
    "url": "blog/news/ionicdb-shutdown/index.html",
    "revision": "17ba4e7606319456ca3721a91d9777b1"
  },
  {
    "url": "blog/news/IonicDB/index.html",
    "revision": "a89a7d0cf6fa6995a9b49f1172d241b0"
  },
  {
    "url": "blog/news/ionicmarket/index.html",
    "revision": "f672be4cd2b7fbe10c81c61972f84290"
  },
  {
    "url": "blog/news/ionicplatform/index.html",
    "revision": "55058864bec51a8094314398e12ebe93"
  },
  {
    "url": "blog/news/new-responsive-grid/index.html",
    "revision": "859ffb3ece9b35ab60bc1510aa0aff8e"
  },
  {
    "url": "blog/news/stencil-conf/index.html",
    "revision": "c7dfe852ff396c219d12e3677730b788"
  },
  {
    "url": "blog/news/stencil/index.html",
    "revision": "a6ea03e6df2943882e1761e9f279546c"
  },
  {
    "url": "blog/news/time-to-upgrade/index.html",
    "revision": "8c44ed0aa0229038bcc7f4954a8bdca0"
  },
  {
    "url": "blog/tips/aot-ahead-of-time/index.html",
    "revision": "4ee4f5a9ce3f728167892fd0e5af7b0b"
  },
  {
    "url": "blog/tips/componentes-reactivos/index.html",
    "revision": "e0a925de0df339bc79808d7c3ba45791"
  },
  {
    "url": "blog/tips/creando-modulos-npm/index.html",
    "revision": "097d056f28d24d2ffeb9e983f1ca7271"
  },
  {
    "url": "blog/tips/creando-pugin/index.html",
    "revision": "8fd76ca81004b43b2676860ca6b91d13"
  },
  {
    "url": "blog/tips/crosswalk/index.html",
    "revision": "2834769ac00986e6234e6c00d1c62a87"
  },
  {
    "url": "blog/tips/data-sharing-in-multi-view/index.html",
    "revision": "ecd88c2ea73503fe830ae5b775f25dc1"
  },
  {
    "url": "blog/tips/enviando-al-appstore-ios/index.html",
    "revision": "6c0ad20a49468c55d0095a9cd8b1a4bf"
  },
  {
    "url": "blog/tips/enviando-al-appstore/index.html",
    "revision": "c345ccd9bee991b05b61990e24575ca8"
  },
  {
    "url": "blog/tips/es6-ionic-2/index.html",
    "revision": "7d8dd9e93576573fa38755fff8a7ac80"
  },
  {
    "url": "blog/tips/estado-de-las-apps-hibridas/index.html",
    "revision": "2b56d64e13bcade3ae15831035567f4f"
  },
  {
    "url": "blog/tips/fork-join/index.html",
    "revision": "dfeadafa8353c06662a2e5d8d6ef2235"
  },
  {
    "url": "blog/tips/index.html",
    "revision": "a5a3b33238916a12e15787ae9355d3ba"
  },
  {
    "url": "blog/tips/ionic-2-to-ionic3/index.html",
    "revision": "d3e38d1c38cca392a8fc3dda18f19257"
  },
  {
    "url": "blog/tips/ionic-cloud-services/index.html",
    "revision": "a89c9e14c3da81610684578d68ef6747"
  },
  {
    "url": "blog/tips/ionic-external-lib/index.html",
    "revision": "74b88c29b46e13e00cc1595d3a5cfcf4"
  },
  {
    "url": "blog/tips/ionic-generator/index.html",
    "revision": "62ef9387b998009bcb02ab99e22b5d05"
  },
  {
    "url": "blog/tips/ionic-native-contacts/index.html",
    "revision": "943cfc988996c0dd25398a04b47dfae4"
  },
  {
    "url": "blog/tips/ionic-page-and-lazy-loading/index.html",
    "revision": "5a6186f0b726f9ed888d5aebe88808f7"
  },
  {
    "url": "blog/tips/ionic-vs-nativescript/index.html",
    "revision": "763ecce0bc626a8028067bdbfe84fd62"
  },
  {
    "url": "blog/tips/lifecycle-ionic/index.html",
    "revision": "46bf6c858365c4a41b5dd82c51627e37"
  },
  {
    "url": "blog/tips/pouchdb/index.html",
    "revision": "abf263b380dbbbfe9ce1d26e2e0e1961"
  },
  {
    "url": "blog/tips/preparando-iconos-splashscreen/index.html",
    "revision": "cbfa2354424198abaa5baf8a2c8e49bf"
  },
  {
    "url": "blog/tips/testing-with-ionic-angular/index.html",
    "revision": "e86a47b8fe6a61e11eea423fd6abcfd8"
  },
  {
    "url": "blog/tips/typescript-fundamentos/index.html",
    "revision": "ddf490214fa8f2b8ad67a426a5fca751"
  },
  {
    "url": "communities-dev-day/index.html",
    "revision": "70f113545b5d77539132b60f1a4c8589"
  },
  {
    "url": "css/main.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "favicon.ico",
    "revision": "0350f4b3a2067110b1e642ee5931a38a"
  },
  {
    "url": "feed.xml",
    "revision": "b7a508051f91b845ffd3475e6fb0d4a2"
  },
  {
    "url": "ffsw-pushcrew.js",
    "revision": "0eb8ebd9130bcac32e67255faac3c964"
  },
  {
    "url": "fonts/ionbook.eot",
    "revision": "2f33ebfe4a341b4956d2e101ce2256a1"
  },
  {
    "url": "fonts/ionbook.svg",
    "revision": "7b7118e224062c813b1bc24c3fdd8b9e"
  },
  {
    "url": "fonts/ionbook.ttf",
    "revision": "318836d6dcbb18848d057ca9f050569c"
  },
  {
    "url": "fonts/ionbook.woff",
    "revision": "f354e9f59522f10694d1d0ab4a8da031"
  },
  {
    "url": "images/authors/hllauradofalco.jpeg",
    "revision": "05621e4997dccdb12dbf86839ee242b6"
  },
  {
    "url": "images/blog/JtabKqV.jpg",
    "revision": "68c82fca0e38f6bf22631bc204776aec"
  },
  {
    "url": "images/blog/JtabKqV.png",
    "revision": "9c471c72b70eb45c4ba892cb7f565af8"
  },
  {
    "url": "images/cover.jpg",
    "revision": "09a4d2d70658dd03994982b264fff22a"
  },
  {
    "url": "images/ion-book-wh.png",
    "revision": "f4331b1d95f346efdb66dbde3894fb35"
  },
  {
    "url": "images/ionic2.png",
    "revision": "538fc71102fd34aac4ee40d4ae18e5ff"
  },
  {
    "url": "images/logo.png",
    "revision": "4efe083446523a6589838cbdf99c01a9"
  },
  {
    "url": "images/logo192.png",
    "revision": "53496ab086e6e65f860f6d84d88d97c6"
  },
  {
    "url": "images/logo48.png",
    "revision": "fd1530a7b70ed3d57ee2ab818abbf26d"
  },
  {
    "url": "images/logo512.png",
    "revision": "a360b47d134bec058b072f876d1c0ab6"
  },
  {
    "url": "images/logo96.png",
    "revision": "f4599567a1ee88e3ee01d783dc261045"
  },
  {
    "url": "images/news.png",
    "revision": "bbf83bd6ef086a6f9c06dbb651057329"
  },
  {
    "url": "images/phones.png",
    "revision": "1742472d1f1765d38305cbc49d9123ec"
  },
  {
    "url": "images/phones2.png",
    "revision": "2bcc7772bb080a7e32f2dbaa9ad7be5f"
  },
  {
    "url": "images/popovers.gif",
    "revision": "e8b84cc18351f835f010a31ea151379b"
  },
  {
    "url": "images/posts/hechoen/2017-06-21-untappd/cover.jpg",
    "revision": "69c7dc825ac30624c60aa468565fe85c"
  },
  {
    "url": "images/posts/hechoen/2017-06-21-untappd/ui.png",
    "revision": "9b4b532a5825dbcec2c9848966cc5d1a"
  },
  {
    "url": "images/posts/ionic2/2016-07-05-ionic-native/cover.jpg",
    "revision": "e80b40c6cd5321b92e01f9dde89a7020"
  },
  {
    "url": "images/posts/ionic2/2016-07-05-ionic-native/screen.png",
    "revision": "42356db622fb320260fe63cc7a7671a7"
  },
  {
    "url": "images/posts/ionic2/2016-07-15-ionic-firebase/cover.jpg",
    "revision": "a6f448da74c008a222d6651c6261d6f8"
  },
  {
    "url": "images/posts/ionic2/2016-08-03-custom-colors/cover.jpg",
    "revision": "8ed0a4c4a616eff076b74e50a0b0a058"
  },
  {
    "url": "images/posts/ionic2/2016-08-18-fundamentos-sass/cover.jpg",
    "revision": "fe4016f35a69016495859ed92617f6d5"
  },
  {
    "url": "images/posts/ionic2/2016-08-18-fundamentos-sass/logo.png",
    "revision": "74c362907475d0d7f0d59d0fb662135c"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/cover.png",
    "revision": "b1384b6e4c27e2645725acb670c14645"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen1.png",
    "revision": "9411ea58bee524e462e52adb7acbb3b5"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen10.png",
    "revision": "66489b4c168cd1574f02787ea4c858f9"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen11.png",
    "revision": "6844fad3044188ec1093cb373c6f3711"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen12.png",
    "revision": "03d31b147cf39810950f30f8a2a7c086"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen13.png",
    "revision": "e672d475d9715631078cafb08678c391"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen14.png",
    "revision": "7dc37980e742d028636e472c5f78b4ec"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen15.png",
    "revision": "50ad96af2abfa08b3006df5c75ed7b52"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen16.png",
    "revision": "e6494ec731382471d62330044ee1de67"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen2.png",
    "revision": "a412c6d19518504201a5ba7a944ab3ef"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen3.png",
    "revision": "ae77577b8c7ff3f412d5d137f42f1844"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen4.png",
    "revision": "9d54c20067580a79014a4b828ddb898d"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen5.png",
    "revision": "2460bb820e1ccf046df561a17ef07ba6"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen6.png",
    "revision": "bfdfaf887ea4bfe0283b4c6f2245e3af"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen7.png",
    "revision": "752c4c1eea0483699b5580f2c24f90b5"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen8.png",
    "revision": "078066493c2adc1881bc3a3d8df520f0"
  },
  {
    "url": "images/posts/ionic2/2016-08-25-facebook-and-ionic/screen9.png",
    "revision": "4df353d10d96d1570a2179980c7a99bd"
  },
  {
    "url": "images/posts/ionic2/2016-08-30-google-maps-js-and-ionic/cover.png",
    "revision": "1eb5594131e20ef09fe20ac561604856"
  },
  {
    "url": "images/posts/ionic2/2016-08-30-google-maps-js-and-ionic/screen.jpg",
    "revision": "efa7e34105b9a56d8139d577eaf185cd"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/cover.jpg",
    "revision": "fab8ebb3775ac55fbbb5aa8897bd93a1"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/result1.jpeg",
    "revision": "e41e212dc4a84cefc90083329cc87e7f"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/result2.jpeg",
    "revision": "8190b54e1911d4da7709ba044c877c49"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/result3.jpeg",
    "revision": "9877119fb0c6217037e4c01c17ff326a"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen1.jpg",
    "revision": "3b17513d954b1b22680add35139324ab"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen2.jpg",
    "revision": "2143ff097fa5b3d008e3bd9f1a9505b7"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen3.jpg",
    "revision": "610ff0255f7a49667e41aad663c4c8b4"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen4.jpg",
    "revision": "b7a0374116efb4b7abb5afa8425e2adf"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen5.jpg",
    "revision": "924743f0c7a9a0f1d80cd5a6678d252e"
  },
  {
    "url": "images/posts/ionic2/2016-09-23-google-maps-native/screen6.jpg",
    "revision": "c4eff924d9dcec085a8d7ed96644c850"
  },
  {
    "url": "images/posts/ionic2/2016-10-04-ngx-translate/cover.png",
    "revision": "b44ab53e6297981ed3063612200ab452"
  },
  {
    "url": "images/posts/ionic2/2016-10-04-ngx-translate/screen.jpg",
    "revision": "e156d0b2b278002d612dc053d99da7ca"
  },
  {
    "url": "images/posts/ionic2/2016-10-04-ngx-translate/screen1.jpg",
    "revision": "e4fea13f0f82afcbbe7369b6de93e488"
  },
  {
    "url": "images/posts/ionic2/2016-10-04-ngx-translate/screen2.jpg",
    "revision": "e06a20764be1069f8900b36032df58d3"
  },
  {
    "url": "images/posts/ionic2/2016-10-19-google-maps-markers/cover.jpg",
    "revision": "8d063edf8ac751d28602e3000aa6584e"
  },
  {
    "url": "images/posts/ionic2/2016-10-19-google-maps-markers/result1.jpg",
    "revision": "6002d88a441258a42bd8247e28eb85d2"
  },
  {
    "url": "images/posts/ionic2/2016-10-19-google-maps-markers/result2.jpg",
    "revision": "734071c42b00afd1fa8ec581bac2a387"
  },
  {
    "url": "images/posts/ionic2/2016-10-19-google-maps-markers/result3.jpg",
    "revision": "2b2c1f6166a94e5a5f7f1c6fc4f39068"
  },
  {
    "url": "images/posts/ionic2/2016-11-06-firebase-angularfire-ionic/cover.jpg",
    "revision": "783a28fa74b48c7268bf9478e5c8ab41"
  },
  {
    "url": "images/posts/ionic2/2016-11-28-sqlite-and-ionic-2/cover.jpg",
    "revision": "9b72f598eb6d2d2d0521763732f8212a"
  },
  {
    "url": "images/posts/ionic2/2016-11-28-sqlite-and-ionic-2/screen1.png",
    "revision": "17d259e4cc8f2b1d8207d094ac047641"
  },
  {
    "url": "images/posts/ionic2/2016-11-28-sqlite-and-ionic-2/screen2.png",
    "revision": "56b6aa7a56ab8b82eca735c04d06fc39"
  },
  {
    "url": "images/posts/ionic2/2016-11-28-sqlite-and-ionic-2/screen3.png",
    "revision": "bcc432943dd6c23b3e514c5a730c92c6"
  },
  {
    "url": "images/posts/ionic2/2016-12-11-animating-items-ionic/cover.jpg",
    "revision": "1271cc666fbba97fccfd201448498673"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/cover.png",
    "revision": "c2e83b213ee58df4e346e4619dd0b387"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen1.png",
    "revision": "1f3f367ce2a23145b31ab9cee2cb5b1d"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen2.png",
    "revision": "11deee3558aa58dc558e922643c540f4"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen3.png",
    "revision": "5556df833e301e1e6138939a5d3bd987"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen4.png",
    "revision": "4aa1f1a2b549c7b425d56a26779552f7"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen5.png",
    "revision": "3e8e66f8db0b73345731b06fd6a64455"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-clase-1-feed/screen6.png",
    "revision": "482096b9726e8e433e6dda91eb6bb340"
  },
  {
    "url": "images/posts/ionic2/2016-12-29-validations-in-forms/cover.jpg",
    "revision": "f321c9bf7bf70636bd31217f82e9827c"
  },
  {
    "url": "images/posts/ionic2/2017-01-05-clase-2-feed/angular.jpg",
    "revision": "4cfe716000c53715cccf8ec17a4ff47b"
  },
  {
    "url": "images/posts/ionic2/2017-01-05-clase-2-feed/angular.png",
    "revision": "3fbc7eff45df433e82566318fd002fd3"
  },
  {
    "url": "images/posts/ionic2/2017-01-05-clase-2-feed/cover.png",
    "revision": "7509208a17de8919b3afb3c274c68860"
  },
  {
    "url": "images/posts/ionic2/2017-01-05-clase-2-feed/es6.png",
    "revision": "46f7e5c03f7eaa9ddc3f32f1030ec0d9"
  },
  {
    "url": "images/posts/ionic2/2017-01-05-clase-2-feed/ts.jpg",
    "revision": "74941b9e152182630b087cd79199c058"
  },
  {
    "url": "images/posts/ionic2/2017-01-12-clase-3-user-auth/cover.png",
    "revision": "1c7e56266ae870373e135815e41ebc94"
  },
  {
    "url": "images/posts/ionic2/2017-01-12-clase-3-user-auth/screen.png",
    "revision": "1d9aa9a84c33e00be6a554841ea6fe8b"
  },
  {
    "url": "images/posts/ionic2/2017-01-12-clase-3-user-auth/screen1.png",
    "revision": "a4b8740aaefb8bca188ad5e3945fc1aa"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/cover.jpg",
    "revision": "951fa5fc6efc0d2962485affdd96e533"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen.png",
    "revision": "0872c07c636b1ec6df2afc1f86b1fb49"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen1.png",
    "revision": "e39bbb12d72ef665f6a34e55aa09176a"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen10.png",
    "revision": "b801ac148eda221e73226164bf66a56a"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen11.png",
    "revision": "521ee31a4e7bddf8fa56127452e51531"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen12.png",
    "revision": "95992d1866961a7ed66d830082e1c72d"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen13.png",
    "revision": "6592d186109b367b02ffda89adb88bde"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen14.png",
    "revision": "e7d34d193f9f6c6935e4d869bd9d1ba1"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen2.png",
    "revision": "34d7768e4b3be2341c0b0352de32fff7"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen3.png",
    "revision": "a17e9ff4cc452a9464bfaacd0b5d54eb"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen4.png",
    "revision": "c8748598f546d31777fe5ef356b85673"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen5.png",
    "revision": "02a3d9c224bf7eecd6b08a2abcd99eed"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen6.png",
    "revision": "cfc95778b724b08fe10c870275a203c5"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen7.png",
    "revision": "7eb1657067b9d39dec75fa6b4186d4ca"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen8.png",
    "revision": "ba1ef46c386f2ddebdc73855a4d17970"
  },
  {
    "url": "images/posts/ionic2/2017-01-31-ionic-push-notifications/screen9.png",
    "revision": "774a00081dd7e89f66ff971a9f6ead41"
  },
  {
    "url": "images/posts/ionic2/2017-03-06-google-maps-and-geocoder/cover.jpg",
    "revision": "8643ffe5a0bcb8d3763df97683fb3fa6"
  },
  {
    "url": "images/posts/ionic2/2017-03-06-google-maps-and-geocoder/result.png",
    "revision": "6482b0a298a8ef78e911e5ca7dd172aa"
  },
  {
    "url": "images/posts/ionic2/2017-05-19-ionic-redux/cover.png",
    "revision": "5cb6dd3eed3946ae0dfb2237b434b6e7"
  },
  {
    "url": "images/posts/ionic2/2017-05-19-ionic-redux/devtool1.png",
    "revision": "64a61676eadb494d61362b1a84aba658"
  },
  {
    "url": "images/posts/ionic2/2017-05-19-ionic-redux/devtool2.png",
    "revision": "708d8f14ca033064869278696d50cb20"
  },
  {
    "url": "images/posts/ionic2/2017-05-19-ionic-redux/tree1.png",
    "revision": "a109e831097dadc5201538c9b7031c50"
  },
  {
    "url": "images/posts/ionic2/2017-05-19-ionic-redux/tree2.png",
    "revision": "4f92036de23e69effbffc3f99bec332d"
  },
  {
    "url": "images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/cover.jpg",
    "revision": "d2a9affab474cb9898133e1179dcc4dd"
  },
  {
    "url": "images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/native3.jpg",
    "revision": "1e9078ec8fe3e7ba8db53a9fddbb8261"
  },
  {
    "url": "images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/screen.png",
    "revision": "0bb4df00c592bfcdfe7b5c6f6b6961a7"
  },
  {
    "url": "images/posts/ionic2/2017-07-08-curso-ionic-3-firebase/cover.png",
    "revision": "da24ac4517f977cdd47b52970063c8b0"
  },
  {
    "url": "images/posts/tips/2016-06-20-ionic-generator/cover.png",
    "revision": "dac5eecbd921c7a83ef88570e873b5ba"
  },
  {
    "url": "images/posts/tips/2016-06-28-crosswalk/cover.jpg",
    "revision": "4f2b9ca71793e45c93f7902f27a4eef2"
  },
  {
    "url": "images/posts/tips/2016-06-28-crosswalk/screen.png",
    "revision": "4426948208e71e6688bf8a65ce1125d6"
  },
  {
    "url": "images/posts/tips/2016-06-28-crosswalk/screen1.png",
    "revision": "e4eadc3b648ccbfe6fee0c153968fdf5"
  },
  {
    "url": "images/posts/tips/2016-08-09-fork-join/cover.jpg",
    "revision": "c733e83c83e2c2b4fcf374d0f9d06963"
  },
  {
    "url": "images/posts/tips/2016-08-09-fork-join/result.png",
    "revision": "4596417ab264fdf7facc8ca82dcc5e66"
  },
  {
    "url": "images/posts/tips/2016-08-09-fork-join/screen.jpg",
    "revision": "bb4771159289c1ed3aa9b0b50e518956"
  },
  {
    "url": "images/posts/tips/2016-08-09-fork-join/screen1.png",
    "revision": "970ebadabacbefe1fe3b3097b201da4b"
  },
  {
    "url": "images/posts/tips/2017-01-16-aot-ahead-of-time/cover.jpg",
    "revision": "e320854eba362a03faebc8929e1daf4b"
  },
  {
    "url": "images/posts/tips/2017-04-15-ionic-2-to-ionic3/cover.jpg",
    "revision": "4f14073e9e3983de5ab6c6dab31016c9"
  },
  {
    "url": "images/posts/tips/2017-04-15-ionic-2-to-ionic3/tree.png",
    "revision": "1b4e1236fea9febe5789899c31ec9612"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/cover.jpg",
    "revision": "4a8671a1bd434fbf7aa5ebaeb6a431dc"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree1.png",
    "revision": "ed5c9b3be12bfd0a9185426257617a49"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree2.png",
    "revision": "cce705ca10933645c7b9bf33c8ab58f8"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree3.png",
    "revision": "0ee37d399f7c0dc1b93114c6f42d71c3"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree4.png",
    "revision": "cb8e0ee3f5e2587a170f73b122090c49"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree5.png",
    "revision": "ebfbb75b9d614335a613a7832ac86a32"
  },
  {
    "url": "images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree6.png",
    "revision": "544d4624abc82ad99d28e92cc5ef40df"
  },
  {
    "url": "images/posts/tips/2017-05-21-data-sharing-in-multi-view/data-sharing-in-multi-view.gif",
    "revision": "3d2169acea8cb9ebe9065b2aedcf7c42"
  },
  {
    "url": "images/posts/tips/2017-05-30-ionic-external-lib/cover.jpg",
    "revision": "698aa52e83904ab07ca670648eb829df"
  },
  {
    "url": "images/posts/tips/2017-06-06-lifecycle-ionic/cover.jpg",
    "revision": "f8ab56ecbb534a343590c9ec04bfd28e"
  },
  {
    "url": "images/posts/tips/2017-06-06-lifecycle-ionic/img1.png",
    "revision": "4ac7c1c284f6029f936b48cf20742d78"
  },
  {
    "url": "images/posts/tips/2017-06-23-typescript-fundamentos/cover.jpeg",
    "revision": "c00275cd796abcd0fb84ea7676456035"
  },
  {
    "url": "images/procesocompleto.png",
    "revision": "9c471c72b70eb45c4ba892cb7f565af8"
  },
  {
    "url": "images/publications.png",
    "revision": "81085573ddb38e1f9e66c1db389c85de"
  },
  {
    "url": "images/techs.png",
    "revision": "fa85cf4e68f457d2f0ea4cba13901198"
  },
  {
    "url": "images/tips.png",
    "revision": "748752fd5f32d346f7e31c3b2e5910dd"
  },
  {
    "url": "images/tutorials.png",
    "revision": "6a51c3bc4f457c9a648bf4988c4f9d28"
  },
  {
    "url": "images/workflow.png",
    "revision": "77123cd3e56247878282436926a51b71"
  },
  {
    "url": "index.html",
    "revision": "b720e5b7727c5fa26f1732f424997c19"
  },
  {
    "url": "launcher/chat-firebase/index.html",
    "revision": "9d42de2bd6e4cb09c86ca694e140c6c2"
  },
  {
    "url": "launcher/demo101/index.html",
    "revision": "f17be6c7f4f69e9c853d3bc67bbb1880"
  },
  {
    "url": "launcher/demo103/index.html",
    "revision": "55b45f145e81596c187d7814ec624c8d"
  },
  {
    "url": "launcher/demo104/index.html",
    "revision": "0dbebc421fa94fb060a5dc0f5a5bcb18"
  },
  {
    "url": "launcher/demo105/index.html",
    "revision": "f7662480b285f78a0b2abd697dcd54c4"
  },
  {
    "url": "launcher/demo106/index.html",
    "revision": "aacb1da7066105cdc0e8df1f4fc98ecf"
  },
  {
    "url": "launcher/demo108/index.html",
    "revision": "20c2c31ebcf69c4920c7e2417281dc4a"
  },
  {
    "url": "launcher/demo109/index.html",
    "revision": "dcc8a23e8fbb643d2041745d7f47a4e0"
  },
  {
    "url": "launcher/demo110/index.html",
    "revision": "e4dacb8c73fd8e7851ce507d3f3f8685"
  },
  {
    "url": "manifest.json",
    "revision": "57cf5f5ef4bc4852dd938d2b8efdc3b3"
  },
  {
    "url": "meetups/index.html",
    "revision": "5c707844a7d0e96f633a673e55d6d6f7"
  },
  {
    "url": "onboarding/index.html",
    "revision": "430e31862621755d446d199cf2f1deb7"
  },
  {
    "url": "robots.txt",
    "revision": "4caefaa2d86afa6705f7da2a563fe921"
  },
  {
    "url": "sitemap.xml",
    "revision": "a07ac7fa449326fdedcd7a0820f7d981"
  },
  {
    "url": "sw.html",
    "revision": "b4bd734d8386799802f088f059da0a24"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js.map",
    "revision": "6fc68cbf40e4e2f38d2889fdaf5bc58a"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
