# Traveler Website Sample

Traveler is a sample travel website, with all its content and images managed in Acoustic Content.

## React-Based “Traveler” Website Using Headless CMS

This is an example of how to create a modern website using the headless CMS features of Acoustic Content in combination with a Single Page Application (SPA) for the website. This sample is a React-based site, though the same concepts and content can be used with any web application or other delivery channel. That’s the great benefit of a headless CMS: the content and images are completely independent of the delivery channel. Your business users can manage all the content in one place and have it delivered across all channels - websites, mobile apps, emails, or any other channel. 

![Traveler Website Sample - Home Page](docs/images/readme_image_1)

### Combining the React SPA with content and assets managed by business users

In this example you can see how business users can manage all the website components they need to manage, while the web developer provides the framework for the website.

The following components of the website are managed by business users in Acoustic Content:
- All the pages and navigation shown under the “Destinations” menu. These are dynamic pages in the website, defined by the Region, Country, and Travel Article content items. 
- All the images for the site content, using the Image Profile feature to automatically generate different size images.
- Articles that use rich text features including embedded images.
- Site logo and text for the pages.
- Configuration options for some of the website aspects such as settings for the slideshow on the home page for how many images to show and how long between slides.

These components of the website are defined in the SPA which is built by a web developer:
- The React SPA framework with support for pulling in content and assets dynamically using Acoustic Content REST APIs.
- Top-level navigation (Home, About, Destinations, Gallery, and Contact). These are defined as routes in the SPA.
- Site look and feel, using Bootstrap styling with responsive web design so the site renders nicely on any device.
- Search for content in the site. The search input supports auto-complete, using the "faceted search" support of the Content delivery search API.

To see the dynamic pages of the site in action, try this after you've installed the sample:
- Create a new Travel Article content item. Fill out the text elements and select an image. Note that in the Travel Article Text field you can use features of the rich text editor, including the ability to include images right inline with the text.
- On the “Configuration” tab of your new Travel Article, select the region and country where your article should appear in the navigation.
- Publish the new Travel Article.
- Open the website in a browser.
- On the home page, your new article should appear at the top of the list of articles (since it’s the most recent).
- From the Destinations menu, navigate to the continent and the country for your article. Your new article should be listed, and if you click on it you’ll go to a new dynamic page for your article.


## Installing Traveler Website Sample

### Prerequisites

In order to run Traveler Sample Site locally or hosted on Acoustic Content, the following is required:

- Trial or Standard Tier of Acoustic Content;

- [wchtools-cli](https://github.com/ibm-wch/wchtools-cli) v2.3.4 or above;

- The latest Node 10.x LTS version of Node;

- Run `wchtools init` to setup the [WCH tools CLI](https://github.com/ibm-wch/wchtools-cli#getting-started);

- Download or clone this repository to get the 'Traveler Website Sample' artifacts.

### Change the tenant

1. You can set the tenant information, by changing the values in `src/api/endpoints.js`. This file determines from which tenant website gets served from.

   Inside `src/api/endpoints.js`, replace the values in the following lines:

```
export const DOMAIN_NAME = 'your-domain-name.com';
export const CONTENT_HUB_ID = '0000000-0000-0000-0000-000000000000';
```

The domain name can be extracted from the delivery URL of your site. (e.g. https:/domain_name/content_hub_id/).

All hub information containing domain, IDs and URLs for the hub can be found inside Acoustic Content (_Sidebar > About > Hub Information_):

- Log in to Acoustic Content and open the 'About' tab.
- Click the 'Hub information' option.
- Find a delivery URL and hub ID on 'Hub Information' pop-up window.

2. Change Content hub ID (from 'Hub Information' window) in _homepage_ value inside `package.json` in the `acoustic-website-react-sample` folder to the Domain Name with the hub ID (e.g. /hub_id/samples/traveler-website).

### Upload contents to Acoustic Content

1. Go to the directory where you have a downloaded folder with the Content Model files (it contains sub-folders named _assets, content-types, content, categories_ etc.);
2. Run `wchtools push -A --dir <Folder_Name>` to push the Content Model to the Hub. If your content folder `content-artifacts` is located in a website sample root folder there is also a shortcut `npm run init-content`
3. Login to Acoustic Content to see that it contains uploaded content inside 'Content Model' and 'Content Library' sections.

### Run the site application on a local development server

1. Enable localhost CORS support for your tenant. Login to Acoustic Content and go to Settings, Administration, Security tab. Add http://localhost:3000 (or "*" for any domain) and save your settings.
2. Go to the folder with the application (it contains sub-folders named _src, public_ etc.) and install dependencies by running `npm install`.
3. Run `npm start` to start the development server and open the application in a new web browser tab on the `localhost`.

### Build and Deploy to Acoustic Content

_Note:_ If you haven't installed the sample locally, please go through sections **Prerequisites**, **Changing the tenant** and make sure to install project dependencies by running `npm install`.

Steps to deploy your sample:

1. Run `npm run hub-build-deploy` command. It will build and deploy the application to the specified hub.
2. To open the website on Acoustic Content, please use the following link type: _[delivery_URL]/samples/traveler-website/index.html_
3. Note that publishing can take some time for all updates to be available. In case you do not want to wait for the server side akamai cache to time out you can flush the cache via: `wchtools clear --cache`. More information can be found here: [Clearing the content delivery network cache](https://github.com/acoustic-content-samples/wchtools-cli#clearing-the-watson-content-hub-content-delivery-network-cache).

## API Features

Make sure you explore Acoustic Content's powerful delivery API features. The

### Getting the Contents for the Website via Content Delivery API

No more hard-coding of texts, footer and header contents, and information pages. With the Content Delivery API, you can build truly flexible website, where user can change almost any part of the website without the developer.

Contact information has changed? No problem - user can easily update the content of the whole page inside the Acoustic Content:

<img src="docs/images/readme_image_2" alt="image-20191231162620926" style="zoom:50%"/>

Copyright text is no longer will be out-dated for months, and new icons with the links to other social networks can also be easily added. All the items inside the footer can be edited by a user:

![image-20191231162955172](docs/images/readme_image_3)

### Getting the Settings for the Website via Content Delivery API

Flexibility of the content types created in Acoustic Content combined with the API allows you to implement solutions that will provide users with more capabilities.

In this sample, you can see how user can change the order, number, and even the display time of the images inside Image Slider.

![image-20191231161137394](docs/images/readme_image_4)

Inside Acoustic Content, user can interact with the content type that serves as a settings for the image slider.

<img src="docs/images/readme_image_5" alt="image-20191231161621644" style="zoom:70%;" />

The application receives these settings and changes the behavior and contents of the Image slider without efforts of the developer!

### Faceted Search API

This sample uses Search API that allows to facet the search result returned and represent them in a convenient for a user way.

On the image below, you can see a demonstration of auto-suggested search results with indication of what type of the content is suggested to user (_Gallery Image_ or _Travel Article_).

![image-20191231160032293](docs/images/readme_image_6)

You can find more about the Search API [here](https://acoustic-content-samples.github.io/wch-openapi-documentation/#tag/Delivery-search).
