# Traveler Website Sample

Traveler is a sample travel website, with all its content and images managed in Content Hub.

![Traveler Website Sample - Home Page](docs/images/readme_image_1)

## Installing Traveler Website Sample

### Prerequisites

In order to run Traveler Sample Site locally or to the Content Hub, the following is required:

- Trial or Standard Tier of the Content Hub;

- [wchtools-cli](https://github.com/ibm-wch/wchtools-cli) v2.3.4 or above;

- The latest Node 10.x LTS version of Node;

- Run `wchtools init` to setup the [WCH tools CLI](https://github.com/ibm-wch/wchtools-cli#getting-started);

- Download or clone this repository to get the 'Traveler Website Sample' artifacts.

### Changing the tenant

1. You can set the tenant information, by changing the values in `src/api/endpoints.js`. This file determines from which tenant website gets served from.

   Inside `src/api/endpoints.js`, replace the values in the following lines:

```
export const DOMAIN_NAME = 'your-domain-name.com';
export const CONTENT_HUB_ID = '0000000-0000-0000-0000-000000000000';
```

The domain name can be extracted from the delivery URL of your site. (e.g. https:/domain_name/content_hub_id/).

All hub information containing domain, IDs and URLs for the hub can be found inside the Content Hub (_Sidebar > About > Hub Information_):

- Log in to your Watson Content Hub and open the 'About' tab.
- Click the 'Hub information' option.
- Find a delivery URL and Content Hub ID on 'Hub Information' pop-up window.

2. Change Content hub ID (from 'Hub Information' window) in _homepage_ value inside `package.json` in the `acoustic-website-react-sample` folder to the Domain Name with the Content Hub ID (e.g. /content_hub_id/samples/traveler-website).

### Uploading contents to the Content Hub

1. Go to the directory where you have a downloaded folder with the Content Model files (it contains sub-folders named _assets, content-types, content, categories_ etc.);
2. Run `wchtools push -A --dir <Folder_Name>` to push the Content Model to the Hub. If your content folder `content-artifacts` is located in a website sample root folder there is also a shortcut `npm run init-content`
3. Login to the specified Content Hub to see that it contains uploaded content inside 'Content Model' and 'Content Library' sections.

### Enable CORS support for localhost

To run the local development server you will need to enable CORS support for your tenant. To control the CORS enablement for Acoustic Content, go to Settings, Administration, Security tab. Add http://localhost:3000 (or "*" for any domain) and save your settings.

### Running the App on Local Development Server

Go to the folder with the application (it contains sub-folders named _src, public_ etc.) and:

1. Install dependencies by running `npm install`;
2. Run `npm start` that will start the development server and will open the application in the new tab of web-browser on the `localhost`.
3. Make sure that address your app is running at (i.e. http://localhost:3000) is added in _Trusted domains for cross-origin resource sharing_ in your Content hub. You can check it in _Settings > Administration > Security > Cross-origin resource sharing_

### Build and Deploy to the Content Hub

_Note:_ If you don't have installed sample locally, please go through sections **Prerequisites**, **Changing the tenant** and from your CLI make sure to install project dependencies by running `npm install`;

Steps to deploy code of your sample:

1. Run `npm run hub-build-deploy` command. It will build and deploy the application to the specified Content Hub;
1. To open the website on Content Hub, please use the following link type: _[delivery_URL]/samples/traveler-website/index.html_
1. Note that publishing can take some time for all updates to be available. In case you do not want to wait for the server side akamai cache to time out you can flush the cache via: `wchtools clear --cache`. More information can be found here: [Clearing the content delivery network cache](https://github.com/acoustic-content-samples/wchtools-cli#clearing-the-watson-content-hub-content-delivery-network-cache)

## API Features Overview

Make sure you explore the Content Hub's powerful API features.

### Getting the Contents for the Website via Content Delivery API

No more hard-coding of texts, footer and header contents, and information pages. With the Content Delivery API, you can build truly flexible website, where user can change almost any part of the website without the developer.

Contact information has changed? No problem - user can easily update the content of the whole page inside the Content Hub:

<img src="docs/images/readme_image_2" alt="image-20191231162620926" style="zoom:50%"/>

Copyright text is no longer will be out-dated for months, and new icons with the links to other social networks can also be easily added. All the items inside the footer can be edited by a user:

![image-20191231162955172](docs/images/readme_image_3)

### Getting the Settings for the Website via Content Delivery API

Flexibility of the content types created in the Content Hub combined with the API allows you to implement solutions that will provide users with more capabilities.

In this sample, you can see how user can change the order, number, and even the display time of the images inside Image Slider.

![image-20191231161137394](docs/images/readme_image_4)

Inside the Content Hub, user can interact with the content type that serves as a settings for the image slider.

<img src="docs/images/readme_image_5" alt="image-20191231161621644" style="zoom:70%;" />

The application receives these settings and changes the behavior and contents of the Image slider without efforts of the developer!

### Faceted Search API

This sample uses Search API that allows to facet the search result returned and represent them in a convenient for a user way.

On the image below, you can see a demonstration of auto-suggested search results with indication of what type of the content is suggested to user (_Gallery Image_ or _Travel Article_).

![image-20191231160032293](docs/images/readme_image_6)

You can find more about the Search API [here](https://acoustic-content-samples.github.io/wch-openapi-documentation/#tag/Delivery-search).
