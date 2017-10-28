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
    "revision": "7a2e832c41cde9323430ef4f98664e94"
  },
  {
    "url": "background-worker.js",
    "revision": "da10f31a22e28cd3054b43da218b6116"
  },
  {
    "url": "blog/authors/carlosrojas/index.html",
    "revision": "a23f73aaeeacedf3638f41a5c61e70b5"
  },
  {
    "url": "blog/authors/daniel_lsanchez/index.html",
    "revision": "6ee25ebadc2e12a82f7ea236abd85f23"
  },
  {
    "url": "blog/authors/darkensses/index.html",
    "revision": "58571cedbc590965151ed8a6542a62b3"
  },
  {
    "url": "blog/authors/EduardoIbarra/index.html",
    "revision": "e2ee1d12e72aa4b395299f49e97d63e0"
  },
  {
    "url": "blog/authors/edyavendano/index.html",
    "revision": "4a64542524ad03d50f708bc45487f8bd"
  },
  {
    "url": "blog/authors/hllauradofalco/index.html",
    "revision": "a2a7bfb4861d0f0e71825da3315eb77d"
  },
  {
    "url": "blog/authors/index.html",
    "revision": "096930daaff8b46ec08e79c319ce0b80"
  },
  {
    "url": "blog/authors/javaruiz/index.html",
    "revision": "7c202cf0e296547ba9d2e54acbf7ab08"
  },
  {
    "url": "blog/authors/javebratt/index.html",
    "revision": "acad829e573735753ef39e6f9a7ff045"
  },
  {
    "url": "blog/authors/javico2609/index.html",
    "revision": "d49637386dabb24c417acf66e45167f8"
  },
  {
    "url": "blog/authors/jorgecano/index.html",
    "revision": "a67efc27463f1f403862fdde0537aedc"
  },
  {
    "url": "blog/authors/levanocarlos/index.html",
    "revision": "e879502a36ce32f7b4527f91444e21da"
  },
  {
    "url": "blog/authors/mayrititis/index.html",
    "revision": "14799bf456b0c2cbd35e2a586415750c"
  },
  {
    "url": "blog/authors/nicobytes/index.html",
    "revision": "b70adfc15211bd97cb1ae3b03639c1ac"
  },
  {
    "url": "blog/authors/thecouk/index.html",
    "revision": "d148bddc074998d3b2fcedd9f91ffb57"
  },
  {
    "url": "blog/authors/unjavascripter/index.html",
    "revision": "af81008f67cac618f4a736d4e45f8191"
  },
  {
    "url": "blog/hechoen/Honi/index.html",
    "revision": "6be97511e5e8496b9cc86b0da582a8ca"
  },
  {
    "url": "blog/hechoen/index.html",
    "revision": "c17cdf89bccbaa8f4238fcab0db4694d"
  },
  {
    "url": "blog/hechoen/Joule/index.html",
    "revision": "5051a5f95d51e26daa74750047853552"
  },
  {
    "url": "blog/hechoen/JustWatch/index.html",
    "revision": "92ce4417e5352c849128e06b172ff8bb"
  },
  {
    "url": "blog/hechoen/MarketWatch/index.html",
    "revision": "add69a6208d5cde2cb6ff4ab3f556515"
  },
  {
    "url": "blog/hechoen/Microsoft-Flow/index.html",
    "revision": "fe996637899e79eee28ac03738a764c3"
  },
  {
    "url": "blog/hechoen/Pacifica/index.html",
    "revision": "ebd48271df7fdcc996c28556d1f78ac8"
  },
  {
    "url": "blog/hechoen/PhoneFlare/index.html",
    "revision": "af0e58a1bd6761943b8ca8570e4027b1"
  },
  {
    "url": "blog/hechoen/shopit/index.html",
    "revision": "15b2a1a22790175ccbc0115519fcdc97"
  },
  {
    "url": "blog/hechoen/Sworkit/index.html",
    "revision": "ada6f2a84ade019e541ab2cebfd615cb"
  },
  {
    "url": "blog/hechoen/Untappd/index.html",
    "revision": "3c6f4e160da8f966b308e7f3b2d6483e"
  },
  {
    "url": "blog/index.html",
    "revision": "5ccb4cadd19d27401468a60cb5f690b5"
  },
  {
    "url": "blog/ionic2/angular2/index.html",
    "revision": "0add103a8d52fb3c8beb725f630b4dbe"
  },
  {
    "url": "blog/ionic2/animating-items-ionic/index.html",
    "revision": "7d23f2dad5522a32a2a409d0c24e5c04"
  },
  {
    "url": "blog/ionic2/auth0-ionic/index.html",
    "revision": "16775ce5734d7434c58430e41e3373e5"
  },
  {
    "url": "blog/ionic2/camera-and-ionic/index.html",
    "revision": "b286bafc4d9afafc11fbb31e30dcafa0"
  },
  {
    "url": "blog/ionic2/clase-1-feed/index.html",
    "revision": "baa671f760ba0c8e2d1a69fc3e576c1f"
  },
  {
    "url": "blog/ionic2/clase-2-feed/index.html",
    "revision": "53beeba3908d7355ddc516b5bb6e853c"
  },
  {
    "url": "blog/ionic2/clase-3-user-auth/index.html",
    "revision": "4813c6e43cd96d08ea244edd0c522f74"
  },
  {
    "url": "blog/ionic2/clase-4-objects/index.html",
    "revision": "f0c8e59965c1b7f2a5114a35509e606f"
  },
  {
    "url": "blog/ionic2/custom-colors/index.html",
    "revision": "4f9d3ec8dd19e7ffbc9f4b2b43586f05"
  },
  {
    "url": "blog/ionic2/directions-google-js-ionic/index.html",
    "revision": "22135fc5266983c283421403193c49c7"
  },
  {
    "url": "blog/ionic2/directivas/index.html",
    "revision": "0c3d068c52ba2be9f6bdc476a8ccd867"
  },
  {
    "url": "blog/ionic2/electron-ionic/index.html",
    "revision": "258817f722bedee5eaf46ad46d0799a0"
  },
  {
    "url": "blog/ionic2/facebook-and-ionic/index.html",
    "revision": "b8b68dbb01b6cb3e0acccfc5606b7054"
  },
  {
    "url": "blog/ionic2/firebase-angularfire-ionic/index.html",
    "revision": "a06d9d3bd42abacfc52b619340657ee5"
  },
  {
    "url": "blog/ionic2/firebase-database-and-ionic/index.html",
    "revision": "69db887e1e04923584385b18b688de47"
  },
  {
    "url": "blog/ionic2/firebase-functions/index.html",
    "revision": "283640e3c5242448d6672d842cbdab79"
  },
  {
    "url": "blog/ionic2/firebase-storage/index.html",
    "revision": "d9483131f505922bfde281546b12b7ca"
  },
  {
    "url": "blog/ionic2/folder-browser-para-android/index.html",
    "revision": "1fb853441066019021452614873c4e2c"
  },
  {
    "url": "blog/ionic2/forms-with-ionic/index.html",
    "revision": "cb1e8fba34bba01bc0757cb3efe00ed1"
  },
  {
    "url": "blog/ionic2/formularios-firebase/index.html",
    "revision": "23e200c868b30f8457759afd73fdcb82"
  },
  {
    "url": "blog/ionic2/fundamentos-SASS/index.html",
    "revision": "6b1344f229d7c711dfc5ead361778d31"
  },
  {
    "url": "blog/ionic2/google-maps-and-geocoder/index.html",
    "revision": "b19019ee5981fb2589c3a86bd4faefad"
  },
  {
    "url": "blog/ionic2/google-maps-js-and-ionic/index.html",
    "revision": "3790b1427b52cdf5592a66f76c85d087"
  },
  {
    "url": "blog/ionic2/google-maps-markers/index.html",
    "revision": "bef82e654390d82e00465432326717d7"
  },
  {
    "url": "blog/ionic2/google-maps-native/index.html",
    "revision": "4d606b3fecc24423591dddeeb65eff66"
  },
  {
    "url": "blog/ionic2/index.html",
    "revision": "8756f00b195ff25ded024f487deb7b8f"
  },
  {
    "url": "blog/ionic2/intro-jasmine/index.html",
    "revision": "6a020679f0a2139f2c9accee8e5ef1db"
  },
  {
    "url": "blog/ionic2/intro-typescript/index.html",
    "revision": "c71a42e53d8348cd36bc1e39cc62c7d1"
  },
  {
    "url": "blog/ionic2/ionic-2-firebase-3-rc0/index.html",
    "revision": "c7657edc52b388aebd51e82d7044dca7"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal-for-ios/index.html",
    "revision": "09b54d66f19ebb125380209088044273"
  },
  {
    "url": "blog/ionic2/ionic-and-onesignal/index.html",
    "revision": "98c5d69d04c54a33cd90854445291187"
  },
  {
    "url": "blog/ionic2/ionic-firebase/index.html",
    "revision": "9726bbd487d9016286e0805f34523827"
  },
  {
    "url": "blog/ionic2/ionic-native/index.html",
    "revision": "277202282482982d2f7e11e8255b0fd2"
  },
  {
    "url": "blog/ionic2/ionic-plugin-inappbrowser/index.html",
    "revision": "e5e36d9516f872ce54e7ee3add3cd428"
  },
  {
    "url": "blog/ionic2/ionic-push-notifications/index.html",
    "revision": "db96d8cb39ed625da1d85c68c2872544"
  },
  {
    "url": "blog/ionic2/ionic-redux/index.html",
    "revision": "ac6010db67b3369c79f35be7dd851906"
  },
  {
    "url": "blog/ionic2/ionic2/index.html",
    "revision": "ac69b96ace3521a0c77153e4e040598f"
  },
  {
    "url": "blog/ionic2/ngrx-charts-bars/index.html",
    "revision": "51188033991cccf659c7df9658463295"
  },
  {
    "url": "blog/ionic2/ngx-translate/index.html",
    "revision": "c7470c8f626b7cd898dd7857f8dacd8e"
  },
  {
    "url": "blog/ionic2/observables-angular/index.html",
    "revision": "ea9e49ff72dd43c2318fc872757047ec"
  },
  {
    "url": "blog/ionic2/observables/index.html",
    "revision": "f2fb985d6afffe35e6b3365d585eda45"
  },
  {
    "url": "blog/ionic2/pwa-ionic/index.html",
    "revision": "17e94f9630a2a13f339f40206ddf9d6b"
  },
  {
    "url": "blog/ionic2/rest-api-with-ionic/index.html",
    "revision": "b8dec21721a3d1213c1475c83d344552"
  },
  {
    "url": "blog/ionic2/sms-ionic/index.html",
    "revision": "98a9f69cf06c8255073f07beff5077d5"
  },
  {
    "url": "blog/ionic2/sqlite-and-ionic/index.html",
    "revision": "c00267e7d74ec7f7385124905b067168"
  },
  {
    "url": "blog/ionic2/sync-offline/index.html",
    "revision": "c73a0dca012ee6add604e1d2569e12b0"
  },
  {
    "url": "blog/ionic2/typescript/index.html",
    "revision": "530cd52fc07ba7a3bba2a30e2a57c3b2"
  },
  {
    "url": "blog/ionic2/uni-test-provider/index.html",
    "revision": "bf49778e217150970f8c39978645f1e5"
  },
  {
    "url": "blog/ionic2/unit-test-config-ionic/index.html",
    "revision": "6f87d25f4d67e8693875c715b695026e"
  },
  {
    "url": "blog/ionic2/unit-test-http-client/index.html",
    "revision": "be9be0ed9fc90e7a839560fbaef34747"
  },
  {
    "url": "blog/ionic2/validations-in-forms/index.html",
    "revision": "e0f662f2807375e07492b622e7b1a35a"
  },
  {
    "url": "blog/ionic3/curso-ionic-3-firebase/index.html",
    "revision": "5b5426e2b55aa95e04f77be983d352bc"
  },
  {
    "url": "blog/news/angular2-ready/index.html",
    "revision": "daddc2b5339d69bc415024a06e5b59b5"
  },
  {
    "url": "blog/news/announcing-ionic-2-0-0-final/index.html",
    "revision": "22575c4ae8a094367c81288bda07c197"
  },
  {
    "url": "blog/news/beta8/index.html",
    "revision": "25a30312c2417b8d8afbc1a711658cec"
  },
  {
    "url": "blog/news/beta9/index.html",
    "revision": "03b7a8b632f964bcb06bae13409d3762"
  },
  {
    "url": "blog/news/cambios/index.html",
    "revision": "7f1adc2c390bd39891dcaea4ee62cc9c"
  },
  {
    "url": "blog/news/firebase-3/index.html",
    "revision": "07afa3411ff77a5c41ea2b002aae3147"
  },
  {
    "url": "blog/news/firestore/index.html",
    "revision": "7e13ccfe0b9b398b1606a6b74d07eeb6"
  },
  {
    "url": "blog/news/help-testing-ionic-cli/index.html",
    "revision": "bca4c1e1be95c3e48bbb97d85c8d2fe4"
  },
  {
    "url": "blog/news/help-testing-WKWebview/index.html",
    "revision": "6b2d34577f66e77d1257176603c21af0"
  },
  {
    "url": "blog/news/Help-Testing/index.html",
    "revision": "0da97da5a411f319f2100c2bd22849fb"
  },
  {
    "url": "blog/news/index.html",
    "revision": "a27e6e726b050e05221175d34dbc827b"
  },
  {
    "url": "blog/news/interview-andresvillanueva/index.html",
    "revision": "568eddd62dc017dda0bb37fbe9fbe30e"
  },
  {
    "url": "blog/news/interview-carlosrojas/index.html",
    "revision": "9f7e45a28604a6658ecb41fe1e9720a4"
  },
  {
    "url": "blog/news/interview-javico/index.html",
    "revision": "69173ada6447193b96ed0855ad56a1b5"
  },
  {
    "url": "blog/news/interview-javierruiz/index.html",
    "revision": "8f83cbb0fec80d67a89ce19acac6c4e9"
  },
  {
    "url": "blog/news/interview-jorgeucano/index.html",
    "revision": "fdb5eb8b5cc988c1769104ca4f677e73"
  },
  {
    "url": "blog/news/interview-nicobytes/index.html",
    "revision": "a6d177c17823b82732267f5aecaee0a9"
  },
  {
    "url": "blog/news/ionic-2-2-0-out/index.html",
    "revision": "ab148ff74b86a3e9c2e9e132003e6aeb"
  },
  {
    "url": "blog/news/ionic-2-beta-10/index.html",
    "revision": "651ac6d9a60d2add151ca62e9351ed77"
  },
  {
    "url": "blog/news/ionic-2-beta-11/index.html",
    "revision": "24d1c43ba840d2cf9881d593298400b4"
  },
  {
    "url": "blog/news/ionic-2-rc-2/index.html",
    "revision": "31d8a26ae3a6bd799c3bbd4af30ce37f"
  },
  {
    "url": "blog/news/ionic-2-release-candidate/index.html",
    "revision": "c92ae5641b2bfcac98fd376853b62358"
  },
  {
    "url": "blog/news/ionic-3-7/index.html",
    "revision": "059316e40d7701fe2ffcf048f8a1e268"
  },
  {
    "url": "blog/news/ionic-cli-v3-5-2/index.html",
    "revision": "6698b459a987e80d6410c5d4aaa8e56e"
  },
  {
    "url": "blog/news/ionic-cli-v3/index.html",
    "revision": "e44af1a5ccd6b51531397509ecb93685"
  },
  {
    "url": "blog/news/ionic-native-3x/index.html",
    "revision": "0740e2386e1b826227b72274c467d8a6"
  },
  {
    "url": "blog/news/ionic-native-news/index.html",
    "revision": "da192013e2ab0e1308c2a482dd0d4e5b"
  },
  {
    "url": "blog/news/ionic-survey/index.html",
    "revision": "98394ee06268125c5e0f5f3f5afa9684"
  },
  {
    "url": "blog/news/ionic-v-3/index.html",
    "revision": "cbf5caeee25657d8b24349570c1d3d46"
  },
  {
    "url": "blog/news/ionicdb-shutdown/index.html",
    "revision": "1e38bf377249fb4e066318530b5d4fd9"
  },
  {
    "url": "blog/news/IonicDB/index.html",
    "revision": "49fbabac6f32c2e581a15095964de74f"
  },
  {
    "url": "blog/news/ionicmarket/index.html",
    "revision": "f01862c2197672682ab0f916e30139a1"
  },
  {
    "url": "blog/news/ionicplatform/index.html",
    "revision": "7655cd3601566e6bcee0b40c4ccadf4e"
  },
  {
    "url": "blog/news/new-responsive-grid/index.html",
    "revision": "33af2de8bd2be4634ac05c5af28d6d72"
  },
  {
    "url": "blog/news/stencil-conf/index.html",
    "revision": "56050aa877097375de697f39cf1ffb24"
  },
  {
    "url": "blog/news/stencil/index.html",
    "revision": "5458d7c6916b0d460b258cfe63795c11"
  },
  {
    "url": "blog/news/time-to-upgrade/index.html",
    "revision": "2eea5f0848718545cf1b413e5a92350e"
  },
  {
    "url": "blog/tips/aot-ahead-of-time/index.html",
    "revision": "0c44477ed00c2e7dcfad9be8adac539e"
  },
  {
    "url": "blog/tips/componentes-reactivos/index.html",
    "revision": "f1c864bbd2559136f6097220b1548ef4"
  },
  {
    "url": "blog/tips/creando-modulos-npm/index.html",
    "revision": "75909f9eefddaad282bd24f1e685897f"
  },
  {
    "url": "blog/tips/creando-pugin/index.html",
    "revision": "5642e0279c74e2e471cc78b3a3406ee1"
  },
  {
    "url": "blog/tips/crosswalk/index.html",
    "revision": "7e76e2117b8a9cfb976354317c22a64b"
  },
  {
    "url": "blog/tips/data-sharing-in-multi-view/index.html",
    "revision": "a687ce66b0eb506b498f59759ebef260"
  },
  {
    "url": "blog/tips/enviando-al-appstore-ios/index.html",
    "revision": "06b78246801ea5ab6be1785c6f3878c7"
  },
  {
    "url": "blog/tips/enviando-al-appstore/index.html",
    "revision": "034ad8656c35c696a76409863d7824df"
  },
  {
    "url": "blog/tips/es6-ionic-2/index.html",
    "revision": "b7471eabcb6af4ef8147ddb0fbace45f"
  },
  {
    "url": "blog/tips/estado-de-las-apps-hibridas/index.html",
    "revision": "845faa1433adcb1e4da733d363117b35"
  },
  {
    "url": "blog/tips/fork-join/index.html",
    "revision": "ebacdce48abe65af55c639ca821f2c86"
  },
  {
    "url": "blog/tips/index.html",
    "revision": "7b59850f291b52a9e49dd6477adb5c83"
  },
  {
    "url": "blog/tips/ionic-2-to-ionic3/index.html",
    "revision": "e14e0d82186d82fd7a71691d123dd1d4"
  },
  {
    "url": "blog/tips/ionic-cloud-services/index.html",
    "revision": "80c2a6e0645d7d13d9f6b2734a35e87d"
  },
  {
    "url": "blog/tips/ionic-external-lib/index.html",
    "revision": "e199e4c13075826f931e33faeb039284"
  },
  {
    "url": "blog/tips/ionic-generator/index.html",
    "revision": "32980786291996f2b38dc66e72479d5c"
  },
  {
    "url": "blog/tips/ionic-native-contacts/index.html",
    "revision": "e56d6973a8fe18daa7a5914caf523fb5"
  },
  {
    "url": "blog/tips/ionic-page-and-lazy-loading/index.html",
    "revision": "869be777bf0532460468cb9553f215db"
  },
  {
    "url": "blog/tips/ionic-vs-nativescript/index.html",
    "revision": "d426c8ef527f26bb4a6e4487f8c4f2f6"
  },
  {
    "url": "blog/tips/lifecycle-ionic/index.html",
    "revision": "2578531a994e38ce1c59b61243764caa"
  },
  {
    "url": "blog/tips/pouchdb/index.html",
    "revision": "603a6de25adc6050d8b809a57a6264a1"
  },
  {
    "url": "blog/tips/preparando-iconos-splashscreen/index.html",
    "revision": "598df2b9b3348c0f2d17ce53f769589d"
  },
  {
    "url": "blog/tips/testing-with-ionic-angular/index.html",
    "revision": "20575bc339e06ced1e257c94600bd1ca"
  },
  {
    "url": "blog/tips/typescript-fundamentos/index.html",
    "revision": "9af3e3a729e1b056256db9ea266786b0"
  },
  {
    "url": "communities-dev-day/index.html",
    "revision": "4547a8b2f15569581086b2d0c94ae183"
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
    "revision": "20e9ca023d57e2902fa98b59ff19243d"
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
    "revision": "e401a99b04d19900c50c55f927dcdb8d"
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
    "revision": "748fecd4c0d920540050c58f5cd7f521"
  },
  {
    "url": "onboarding/index.html",
    "revision": "fdf9c17e7db99fe2458f80581516309d"
  },
  {
    "url": "robots.txt",
    "revision": "4caefaa2d86afa6705f7da2a563fe921"
  },
  {
    "url": "sitemap.xml",
    "revision": "ba3ecd0cb8e66893d5f16261f4fd5e30"
  },
  {
    "url": "sw.html",
    "revision": "077c0e4f1b862fe7fff831076e64c81d"
  },
  {
    "url": "sw.js",
    "revision": "29026396e9fe82ce80355f173a68ca50"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
