# Path to PWA codelab code resources

The code resources are split in three stages that are meant to be followed in order.

> All examples are using the [Workbox](https://developers.google.com/web/tools/workbox/) library for easy implementation and readability.

## Stages

1. Stage 1 - Installable

    > Create a basic PWA that is **installable** and can be added to the homescreen

2. Stage 2 - Cached

    > Add basic **runtime caching** to the PWA

3. Stage 3 - Offline

    > Add a basic **offline page** to the PWA

[Demo of final PWA (stage 3)](https://charistheo.github.io/path-to-pwa/)

4. Stage 4 - Push notifications

    > Add a basic **push notification** to the PWA. 
    > This step cannot be served as part of the demo,
    > as it requires a public API key from a push server
    > such as [this one](https://web-push-codelab.glitch.me/).

## Run (optional)

1. Clone this repository

    ```shell
    git clone https://github.com/charisTheo/path-to-pwa.git && cd path-to-pwa/
    ```

2. Install dependencies

    ```shell
    npm install
    ```

3. Run a web server at the project root

    ```shell
    npm start
    ```

    OR

    * Run a web server for Stage 1

        ```shell
        npm run stage:1
        ```

    * Run a web server for Stage 2

        ```shell
        npm run stage:2
        ```

    * Run a web server for Stage 3

        ```shell
        npm run stage:3
        ```
----

The app icons were generated using the following graphics from Twitter Twemoji:

- Graphics Title: 1f60e.svg
- Graphics Author: Copyright 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji)
- Graphics Source: https://github.com/twitter/twemoji/blob/master/assets/svg/1f60e.svg