# InteLIS Mobile

Android and iOS companion app for [InteLIS](https://github.com/deforay/intelis), the open-source lab information system by Deforay.

![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue)

The app lets field and lab staff register Viral Load (VL), Early Infant Diagnosis (EID) and Covid-19 test requests on a phone or tablet. It stores requests in a local SQLite database, so it works without a network connection. When a connection is available, it syncs pending requests to an InteLIS server and pulls back test results. Access to the app is protected by a PIN, with optional fingerprint unlock.

Built with Ionic 9, Angular 21 and Apache Cordova.

## Contents

- [Prerequisites](#prerequisites)
- [Install dependencies](#install-dependencies)
- [Run in a browser](#run-in-a-browser)
- [Build and run on Android](#build-and-run-on-android)
- [Build a signed Android release](#build-a-signed-android-release)
- [Build for iOS](#build-for-ios)
- [Run tests and lint](#run-tests-and-lint)
- [Project layout](#project-layout)
- [Server compatibility](#server-compatibility)
- [Privacy policy and terms](#privacy-policy-and-terms)
- [Funding and partners](#funding-and-partners)
- [License](#license)

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 22.12 or later | npm 10 ships with it |
| JDK | 17 | Required by Android Gradle Plugin 8.10 |
| Android SDK | Platform 36, build-tools 36.0.0 | Install through Android Studio SDK Manager |
| Gradle | 8.x on `PATH` | cordova-android uses it once to create the Gradle wrapper |
| Xcode | 16 or later | iOS builds only |

Set `ANDROID_HOME` to the SDK root and `JAVA_HOME` to the JDK 17 install.

The Ionic and Cordova command line tools are project dependencies. A global install is not required.

## Install dependencies

```sh
npm install
```

The repository ships an `.npmrc` that enables `legacy-peer-deps`. Some Cordova wrapper packages declare outdated peer ranges, and npm refuses to install without this flag.

## Run in a browser

```sh
npm start
```

Open `http://localhost:4200`. Native plugins such as SQLite and fingerprint are unavailable in the browser, so the login and sync screens behave differently than on a device.

## Build and run on Android

To build a debug APK:

```sh
npm run dbuild
```

The APK is written to `platforms/android/app/build/outputs/apk/debug/app-debug.apk`.

To build and install on a connected device or running emulator:

```sh
npm run t
```

To install an already built debug APK without rebuilding:

```sh
npm run r
```

The first Android build adds the platform under `platforms/` and downloads Gradle 8.14.2 through the wrapper. Later builds reuse it.

## Build a signed Android release

Release builds produce an Android App Bundle (AAB) for Google Play.

1. If no keystore exists yet, create one. Store it outside version control.

   ```sh
   npm run keygen
   ```

   The command writes `my-release-key.keystore` in the project root with the alias `vlsm`.

2. Build the release bundle.

   ```sh
   npm run release
   ```

   The bundle is written to `platforms/android/app/build/outputs/bundle/release/app-release.aab`.

3. Sign the bundle.

   ```sh
   npm run bundlejarsign
   ```

4. Align the signed bundle. The output is `VLSM.aab` in the project root.

   ```sh
   npm run bundlezipalign
   ```

To produce a signed APK instead, run `npx cordova build android --release -- --packageType=apk` after step 2, then use the `appjarsign` and `appzipalign` scripts.

Before uploading to Google Play, raise the `version` attribute in `config.xml`. Cordova derives the Android `versionCode` from it, and Google Play rejects a bundle whose `versionCode` is not higher than the previous upload.

## Build for iOS

```sh
npx cordova platform add ios
npx cordova build ios
```

To sign and archive, open `platforms/ios/App.xcworkspace` in Xcode.

## Run tests and lint

```sh
npm test
npm run lint
```

Unit tests run under Karma with Jasmine and require Chrome.

## Project layout

| Path | Contents |
|---|---|
| `src/app/login` | Server host, username and password entry |
| `src/app/app-password`, `src/app/enter-app-password` | PIN setup and PIN or fingerprint unlock |
| `src/app/vl_form`, `src/app/eid_form`, `src/app/covid-19_form` | Test request and result screens per test type |
| `src/app/syncTimeline` | Sync history |
| `src/app/services/db.service.ts` | SQLite schema and queries |
| `src/app/services/db-migration.service.ts` | Schema migrations between app versions |
| `src/app/service/syncTestRequests` | Upload of pending requests and download of results |
| `src/app/service/crud` | HTTP client for the InteLIS API |
| `config.xml` | Cordova app id, version, icons and platform preferences |
| `resources/` | Source icons and splash images |

## Server compatibility

The app talks to the InteLIS server API under `/api/v1.1/`. At login the user enters the server host. The app then calls `version.php` on that host to confirm it is reachable before authenticating.

The server must allow the app's origin, and for `http://` hosts the Android build enables cleartext traffic in `config.xml`.

## Privacy policy and terms

The privacy policy and terms of use are published from the `docs/` folder through GitHub Pages:

- Privacy policy: https://deforay.github.io/intelis-mobile/privacy.html
- Terms and conditions: https://deforay.github.io/intelis-mobile/terms.html

The privacy policy URL is the one entered in the Google Play Console listing. When the app's data handling changes, update `docs/privacy.html` and its effective date in the same commit.

## Funding and partners

InteLIS Mobile is developed with funding from the United States Government (USG). Over the years, the project has benefited from the support and collaboration of partners including the African Society for Laboratory Medicine (ASLM), the American Society for Microbiology (ASM), the African Field Epidemiology Network (AFENET), Emory University, and the Maryland Global Initiatives Corporation (MGIC), among others.

## License

InteLIS Mobile is free and open-source software released under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

Read the full text in [LICENSE.md](LICENSE.md).
