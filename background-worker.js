importScripts('workbox-sw.prod.v2.1.0.js');

//pushcrew

var version = 6;
importScripts('https://cdn.pushcrew.com/sw/cd961b7fc40d92661a578254340c720d.js');

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
    "revision": "1bc84b3e0a9f2ac82095aeadc575bb0c"
  },
  {
    "url": "background-worker.js",
    "revision": "da10f31a22e28cd3054b43da218b6116"
  },
  {
    "url": "blog/authors/carlosrojas/index.html",
    "revision": "128877251d7940c6a51443ced63d6298"
  },
  {
    "url": "blog/authors/daniel_lsanchez/index.html",
    "revision": "eb3a83fd83271b737eeb495bb58048b0"
  },
  {
    "url": "blog/authors/darkensses/index.html",
    "revision": "0d7a8e5d4ccb3cc1bcad04a251ab6739"
  },
  {
    "url": "blog/authors/EduardoIbarra/index.html",
    "revision": "801622a134bd135bc50380bcd4c99b33"
  },
  {
    "url": "blog/authors/edyavendano/index.html",
    "revision": "cf3ba7ed9c663fd7ccf745e89bf7c05e"
  },
  {
    "url": "blog/authors/hllauradofalco/index.html",
    "revision": "604c4e61227729dcfa9d2ec2e157a0a3"
  },
  {
    "url": "blog/authors/index.html",
    "revision": "02349ebcb375e1db85d0cb8d273e58f6"
  },
  {
    "url": "blog/authors/javaruiz/index.html",
    "revision": "3476dada1f748fe70abbe940a7cb08db"
  },
  {
    "url": "blog/authors/javebratt/index.html",
    "revision": "5ba1df420cd1beb478cb53c89bd67f7b"
  },
  {
    "url": "blog/authors/javico2609/index.html",
    "revision": "4013904835bd937a916c6df0cab6ebc3"
  },
  {
    "url": "blog/authors/jorgecano/index.html",
    "revision": "6ec6daa22ff9814ccfb25e88619b0cd3"
  },
  {
    "url": "blog/authors/levanocarlos/index.html",
    "revision": "ac52410c59f15e745ddec0245d1e207a"
  },
  {
    "url": "blog/authors/mayrititis/index.html",
    "revision": "ce3bfcbe5e9b674e5dae867f2ad36cdc"
  },
  {
    "url": "blog/authors/nicobytes/index.html",
    "revision": "da2c5b0477ec53834af169ab9300b3b9"
  },
  {
    "url": "blog/authors/thecouk/index.html",
    "revision": "b661b1343d2d66a1c72a66d73e20f739"
  },
  {
    "url": "blog/authors/unjavascripter/index.html",
    "revision": "29911c7aa51265db56b74e61ca016571"
  },
  {
    "url": "blog/hechoen/Honi/index.html",
    "revision": "f9f8031c732dfef9fd9585029143f762"
  },
  {
    "url": "blog/hechoen/index.html",
    "revision": "d1f64bb826b77eec7b807e4a1c781ec8"
  },
  {
    "url": "blog/hechoen/Joule/index.html",
    "revision": "b7040913c219100d28162433b025c89c"
  },
  {
    "url": "blog/hechoen/JustWatch/index.html",
    "revision": "9155831feda90822c0e16e9e7653a830"
  },
  {
    "url": "blog/hechoen/MarketWatch/index.html",
    "revision": "fc8749e1bd23d8769d3df51b35faaf8d"
  },
  {
    "url": "blog/hechoen/Microsoft-Flow/index.html",
    "revision": "260b9aed5806d298ec2cd34239374fb1"
  },
  {
    "url": "blog/hechoen/Pacifica/index.html",
    "revision": "a07db3f91da6a7a1c53cc846206297cb"
  },
  {
    "url": "blog/hechoen/PhoneFlare/index.html",
    "revision": "44acd2d32becae72ba71630d05adc8c9"
  },
  {
    "url": "blog/hechoen/shopit/index.html",
    "revision": "491d43ffd72bfbdf82523ec394b5eb66"
  },
  {
    "url": "blog/hechoen/Sworkit/index.html",
    "revision": "8195ab0fcf22c5ba1394e5504d6bc6a8"
  },
  {
    "url": "blog/hechoen/Untappd/index.html",
    "revision": "7a804acceed3142905681895f39f96b2"
  },
  {
    "url": "blog/index.html",
    "revision": "18710ba540f72671625c0351b10a5357"
  },
  {
    "url": "blog/ionic2/angular2/index.html",
    "revision": "45cca121d2901b4e87c808b5ec1012fd"
  },
  {
    "url": "blog/ionic2/animating-items-ionic/index.html",
    "revision": "d02a73d80c30e9959ed4323ba0a0e6cf"
  },
  {
    "url": "blog/ionic2/auth0-ionic/index.html",
    "revision": "614192d3f21af038ac8dda95e9bd2e82"
  },
  {
    "url": "blog/ionic2/camera-and-ionic/index.html",
    "revision": "e35c25df6ec13f2d222a4c74e4b8e707"
  },
  {
    "url": "blog/ionic2/clase-1-feed/index.html",
    "revision": "e545bedb1b1ed643c244a4e4b8b7f8dd"
  },
  {
    "url": "blog/ionic2/clase-2-feed/index.html",
    "revision": "1128522d9aec5a48c0f59ba9787fd55d"
  },
  {
    "url": "blog/ionic2/clase-3-user-auth/index.html",
    "revision": "b28da9ba4daabbeb1a8818bb18ea9d93"
  },
  {
    "url": "blog/ionic2/clase-4-objects/index.html",
    "revision": "d38cc90cd7ae0bfb56fd220b1bcbb112"
  },
  {
    "url": "blog/ionic2/custom-colors/index.html",
    "revision": "5e562a33377538c993bbd4750e81bbf2"
  },
  {
    "url": "blog/ionic2/directions-google-js-ionic/index.html",
    "revision": "c491ccae952037e6ae0ae370ba9fdaae"
  },
  {
    "url": "blog/ionic2/directivas/index.html",
    "revision": "c81736e2693adc6c2a2991e2b492a73e"
  },
  {
    "url": "blog/ionic2/electron-ionic/index.html",
    "revision": "ab491ddb00decad0eb3cb9e33595e720"
  },
  {
    "url": "blog/ionic2/facebook-and-ionic/index.html",
    "revision": "25b5bde096223b2cf75edcfd345d893f"
  },
  {
    "url": "blog/ionic2/firebase-angularfire-ionic/index.html",
    "revision": "ab5fe8dfde967c5400f2547a299e857f"
  },
  {
    "url": "blog/ionic2/firebase-database-and-ionic/index.html",
    "revision": "a7b6b0f13f20efa53c2a28f6fe8c9c78"
  },
  {
    "url": "blog/ionic2/firebase-functions/index.html",
    "revision": "47d0266a277b89bbbe7503315999e582"
  },
  {
    "url": "blog/ionic2/firebase-storage/index.html",
    "revision": "a713050004ed4f675cb5f66e91b2cb25"
  },
  {
    "url": "blog/ionic2/folder-browser-para-android/index.html",
    "revision": "3c36b99cd0255ab3e94813ca3ebda6f8"
  },
  {
    "url": "blog/ionic2/forms-with-ionic/index.html",
    "revision": "cff23035517f13162e57b2d2ce222700"
  },
  {
    "url": "blog/ionic2/formularios-firebase/index.html",
    "revision": "b366f31c7c79a634d5eb18b7d4662a1a"
  },
  {
    "url": "blog/ionic2/fundamentos-SASS/index.html",
    "revision": "7e313a155e80d8a74a8b7c98a3e48c1e"
  },
  {
    "url": "blog/ionic2/google-maps-and-geocoder/index.html",
    "revision": "dda69b7912019ded2cdb45a5023a5f20"
  },
  {
    "url": "blog/ionic2/google-maps-js-and-ionic/index.html",
    "revision": "dc5817eaf032cae0678945cfc5e4c6b0"
  },
  {
    "url": "blog/ionic2/google-maps-markers/index.html",
    "revision": "1b63bb98d3de1978c86c897fc6e709d9"
  },
  {
    "url": "blog/ionic2/google-maps-native/index.html",
    "revision": "ee80ef11f3e6ea32247895e6790d6440"
  },
  {
    "url": "blog/ionic2/index.html",
    "revision": "e1cecb4ad0d0c6dfaf9cc05b30cb3c4a"
  },
  {
    "url": "blog/ionic2/intro-jasmine/index.html",
    "revision": "50df3394eb94d4f9ea1c033d11286e9a"
  },
  {
    "url": "blog/ionic2/intro-typescript/index.html",
    "revision": "cebbe261cd5cc664ce35265312951f08"
  },
  {
    "url": "blog/ionic2/ionic-2-firebase-3-rc0/index.html",
    "revision": "d1b63ce7f3c70b7e78ba35404c7061df"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal-for-ios/index.html",
    "revision": "7cfdeb0ff6aa17405827c3e2d9c7079c"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal/index.html",
    "revision": "97b4ed0003d2442c76bc59960f9d6ffd"
  },
  {
    "url": "blog/ionic2/ionic-firebase/index.html",
    "revision": "8728eed6b814e80d50930fdb0e43df16"
  },
  {
    "url": "blog/ionic2/ionic-native/index.html",
    "revision": "d1a4584402875f23db9c011eaec78dae"
  },
  {
    "url": "blog/ionic2/ionic-plugin-inappbrowser/index.html",
    "revision": "552a7478d07aa92f70275d3ddf1c3216"
  },
  {
    "url": "blog/ionic2/ionic-push-notifications/index.html",
    "revision": "dfeda37681c91339a48f020e2730da47"
  },
  {
    "url": "blog/ionic2/ionic-redux/index.html",
    "revision": "4847055ca6f73f92f2d9f9fb26dc6578"
  },
  {
    "url": "blog/ionic2/ionic2/index.html",
    "revision": "537a9de165cefd7189dfb5612467d069"
  },
  {
    "url": "blog/ionic2/ngrx-charts-bars/index.html",
    "revision": "45eb47b46703a1874037b13ae6a76080"
  },
  {
    "url": "blog/ionic2/ngx-translate/index.html",
    "revision": "10b49a82024bf75c667593c825acbd66"
  },
  {
    "url": "blog/ionic2/observables-angular/index.html",
    "revision": "923db47c6b79492e43f26c48f2443f34"
  },
  {
    "url": "blog/ionic2/observables/index.html",
    "revision": "3c4278c3f9488d202cf5cc9f77156bf8"
  },
  {
    "url": "blog/ionic2/pwa-ionic/index.html",
    "revision": "acf18b4eebe08841da87637996665827"
  },
  {
    "url": "blog/ionic2/rest-api-with-ionic/index.html",
    "revision": "a51798bf44d5edfe5e7193ea479fb6cc"
  },
  {
    "url": "blog/ionic2/sms-ionic/index.html",
    "revision": "43102aea5acf6e271f76d3fd218ac3fe"
  },
  {
    "url": "blog/ionic2/sqlite-and-ionic/index.html",
    "revision": "3105fc450d1f8682d43188e40ccaacea"
  },
  {
    "url": "blog/ionic2/sync-offline/index.html",
    "revision": "19c961071eef96b4fa2c68921c7510ba"
  },
  {
    "url": "blog/ionic2/typescript/index.html",
    "revision": "f4fd2fc464a3178baea52231919b4114"
  },
  {
    "url": "blog/ionic2/uni-test-provider/index.html",
    "revision": "292c438498e3b83eb34552113c2a9e68"
  },
  {
    "url": "blog/ionic2/unit-test-config-ionic/index.html",
    "revision": "5999831ff1194f7b89d9005fa42ea63f"
  },
  {
    "url": "blog/ionic2/unit-test-http-client/index.html",
    "revision": "d1747ab62bcaf228fd5e7649734957c5"
  },
  {
    "url": "blog/ionic2/validations-in-forms/index.html",
    "revision": "2dc38a598fb557a2167f2cf3c258d122"
  },
  {
    "url": "blog/ionic3/curso-ionic-3-firebase/index.html",
    "revision": "3304f4cdeaf589d12aa5b2493552f75b"
  },
  {
    "url": "blog/news/angular2-ready/index.html",
    "revision": "84e109d4dfa75138d8ce959e530a6dbb"
  },
  {
    "url": "blog/news/announcing-ionic-2-0-0-final/index.html",
    "revision": "534db45bb67adfaba1fc65c98c494a09"
  },
  {
    "url": "blog/news/beta8/index.html",
    "revision": "e4308fa69660f772ed7bf20605050cc9"
  },
  {
    "url": "blog/news/beta9/index.html",
    "revision": "481a30eaa25c522604dcb56827ad39be"
  },
  {
    "url": "blog/news/cambios/index.html",
    "revision": "9672698d3da37bcb95f10f78661e59ed"
  },
  {
    "url": "blog/news/firebase-3/index.html",
    "revision": "2ee10adb58994640c15adccda28cf164"
  },
  {
    "url": "blog/news/firestore/index.html",
    "revision": "58786c32d41ce93531fb4b64413b64da"
  },
  {
    "url": "blog/news/help-testing-ionic-cli/index.html",
    "revision": "3aeb3843e80be08cc205539ab52822b6"
  },
  {
    "url": "blog/news/help-testing-WKWebview/index.html",
    "revision": "be1831dffbaecfaf2ad9f0054ae2efb8"
  },
  {
    "url": "blog/news/Help-Testing/index.html",
    "revision": "82ff362faedd32014c8fece717180c2d"
  },
  {
    "url": "blog/news/index.html",
    "revision": "06c55b29ed4d318c1b928a4ad1c51ffa"
  },
  {
    "url": "blog/news/interview-andresvillanueva/index.html",
    "revision": "f6eb273cac61eba0ed317de41c4e94e8"
  },
  {
    "url": "blog/news/interview-carlosrojas/index.html",
    "revision": "7637ab50f5016d1fc43405f658b59bd3"
  },
  {
    "url": "blog/news/interview-javico/index.html",
    "revision": "c78ac7586a5913d9a78a8569afb08eb7"
  },
  {
    "url": "blog/news/interview-javierruiz/index.html",
    "revision": "7bca0af653b99f698496c159c446e5c4"
  },
  {
    "url": "blog/news/interview-jorgeucano/index.html",
    "revision": "35d067a10b7fdaca31779b817f369cc6"
  },
  {
    "url": "blog/news/interview-nicobytes/index.html",
    "revision": "da0b4a907c653fcdf67b05939321bad7"
  },
  {
    "url": "blog/news/ionic-2-2-0-out/index.html",
    "revision": "951833a90a8c9eb41d21b771d89119b2"
  },
  {
    "url": "blog/news/ionic-2-beta-10/index.html",
    "revision": "714586055d4a39c5673b4b8b53c2dbb6"
  },
  {
    "url": "blog/news/ionic-2-beta-11/index.html",
    "revision": "f4a69209775faa0f116e81b6e11db6cf"
  },
  {
    "url": "blog/news/ionic-2-rc-2/index.html",
    "revision": "6903cc218ecbe5e50a0db2f4384b5706"
  },
  {
    "url": "blog/news/ionic-2-release-candidate/index.html",
    "revision": "a40e6783b034e05fa86610fdc3a31513"
  },
  {
    "url": "blog/news/ionic-3-7/index.html",
    "revision": "40680a5a283d08d380cbf54e757aa150"
  },
  {
    "url": "blog/news/ionic-cli-v3-5-2/index.html",
    "revision": "4e874016275e7a9a2fdc48787d6f841a"
  },
  {
    "url": "blog/news/ionic-cli-v3/index.html",
    "revision": "e25c29ecd432df6ecd109159305213af"
  },
  {
    "url": "blog/news/ionic-native-3x/index.html",
    "revision": "3bf2dfd419999132ef5cc697a6f66663"
  },
  {
    "url": "blog/news/ionic-native-news/index.html",
    "revision": "66104063192faac7451cce2955c86ee8"
  },
  {
    "url": "blog/news/ionic-survey/index.html",
    "revision": "fea6d39b5eadae0e5ae362a8e5fc4270"
  },
  {
    "url": "blog/news/ionic-v-3/index.html",
    "revision": "1c54e6ba3e11e89774895f75c906e173"
  },
  {
    "url": "blog/news/ionicdb-shutdown/index.html",
    "revision": "36a8944590a4734bceaba06bdf113e1b"
  },
  {
    "url": "blog/news/IonicDB/index.html",
    "revision": "e924d7e180243dccd5408e8032afe235"
  },
  {
    "url": "blog/news/ionicmarket/index.html",
    "revision": "39cc3a9504e183d186b55141073e2354"
  },
  {
    "url": "blog/news/ionicplatform/index.html",
    "revision": "98fe97e13a814bec67295999ea488342"
  },
  {
    "url": "blog/news/new-responsive-grid/index.html",
    "revision": "d60065ef96ea72a3ed3a5624d9b10a2c"
  },
  {
    "url": "blog/news/stencil-conf/index.html",
    "revision": "bc1c2a40ed8570a6d5d9576c14e6578e"
  },
  {
    "url": "blog/news/stencil/index.html",
    "revision": "789ed8f4cad0488d94e7526c5b796ffe"
  },
  {
    "url": "blog/news/time-to-upgrade/index.html",
    "revision": "e2fa5dfa396a651a6dcfc68ff54a2243"
  },
  {
    "url": "blog/tips/aot-ahead-of-time/index.html",
    "revision": "df073f8431144e695160c3171d85c065"
  },
  {
    "url": "blog/tips/componentes-reactivos/index.html",
    "revision": "3ac30a86696b836a429793bca30dfb16"
  },
  {
    "url": "blog/tips/creando-modulos-npm/index.html",
    "revision": "9d56a563c668cdcea921fcb654087e58"
  },
  {
    "url": "blog/tips/creando-pugin/index.html",
    "revision": "336a8090323ba3f784883cd6a302650f"
  },
  {
    "url": "blog/tips/crosswalk/index.html",
    "revision": "cfe024cae9cdc73367fd51e733f3c0d5"
  },
  {
    "url": "blog/tips/data-sharing-in-multi-view/index.html",
    "revision": "53dfff4b1852ceb3cb6ce36ef70b0d1c"
  },
  {
    "url": "blog/tips/enviando-al-appstore-ios/index.html",
    "revision": "aab79469560fb62d681e3c671a88c356"
  },
  {
    "url": "blog/tips/enviando-al-appstore/index.html",
    "revision": "0cc6f33fedbd4703ea05ff531513a160"
  },
  {
    "url": "blog/tips/es6-ionic-2/index.html",
    "revision": "d31259cbaff5995e2913f04e8117b077"
  },
  {
    "url": "blog/tips/estado-de-las-apps-hibridas/index.html",
    "revision": "2b11a873e7c12ae3d6cbdd615e7ba119"
  },
  {
    "url": "blog/tips/fork-join/index.html",
    "revision": "d9f085c33a9701377acbeabcc5f1a43e"
  },
  {
    "url": "blog/tips/index.html",
    "revision": "17e356d325c5ee03c8acbf3523f93297"
  },
  {
    "url": "blog/tips/ionic-2-to-ionic3/index.html",
    "revision": "6e16427dbdd79ce9ec8293051ee648f4"
  },
  {
    "url": "blog/tips/ionic-cloud-services/index.html",
    "revision": "ccad6e6a6734c1e850e02d421fef4970"
  },
  {
    "url": "blog/tips/ionic-external-lib/index.html",
    "revision": "0664900b71ce380d8cea5afa5bf4007c"
  },
  {
    "url": "blog/tips/ionic-generator/index.html",
    "revision": "d8cd9d4ee8db95a2330c18f940f8385e"
  },
  {
    "url": "blog/tips/ionic-native-contacts/index.html",
    "revision": "ca4327531bc2597d02457f60a3ccda90"
  },
  {
    "url": "blog/tips/ionic-page-and-lazy-loading/index.html",
    "revision": "98a31bb3afef5653a44cb9f5c87b0453"
  },
  {
    "url": "blog/tips/ionic-vs-nativescript/index.html",
    "revision": "670906ff22cf0cd74b22349ad889cee0"
  },
  {
    "url": "blog/tips/lifecycle-ionic/index.html",
    "revision": "456a75f78deadbb41f02970a8b6e048d"
  },
  {
    "url": "blog/tips/pouchdb/index.html",
    "revision": "abf40e67073a6c1e143ae1159c617df3"
  },
  {
    "url": "blog/tips/preparando-iconos-splashscreen/index.html",
    "revision": "39e33353a8a7dc3bc74cc870957d8c8f"
  },
  {
    "url": "blog/tips/testing-with-ionic-angular/index.html",
    "revision": "c7f92a1ea40f5cd272de24836e648d9c"
  },
  {
    "url": "blog/tips/typescript-fundamentos/index.html",
    "revision": "9b7314fa3e9441dad395f082a7f9e475"
  },
  {
    "url": "communities-dev-day/index.html",
    "revision": "1030c85e5623c69383eee88b65e9bb5f"
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
    "revision": "5098f692beec615f0cb3eacd10be53f3"
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
    "revision": "a9fbe7525df7499fe6bdd586fd4822a5"
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
    "revision": "0dc4f785319b44c94d1fd96b25ecc949"
  },
  {
    "url": "onboarding/index.html",
    "revision": "b89d8bb0d87888920e71c5398ce96c9e"
  },
  {
    "url": "robots.txt",
    "revision": "4caefaa2d86afa6705f7da2a563fe921"
  },
  {
    "url": "sitemap.xml",
    "revision": "e87980845bbbe42f1c5801ce957738d3"
  },
  {
    "url": "sw.html",
    "revision": "077c0e4f1b862fe7fff831076e64c81d"
  },
  {
    "url": "sw.js",
    "revision": "e7aeff2d69179138867051ae4aeb98d4"
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
