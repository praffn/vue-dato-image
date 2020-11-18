# Vue Dato Image

Component for workig with images in [DatoCMS](https://www.datocms.com/).

## Installation

```
npm install @praffn/vue-dato-image
```

or

```
yarn add @praffn/vue-dato-image
```

## Usage

```vue
<template>
  <div>
    <DatoImage v-if="imageData" :data="imageData" />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      imageData: null,
    };
  },
  async mounted() {
    const { data } = await this.$dato({
      query: gql`
        {
          page {
            image {
              responsiveImage {
                alt
                title
                base64
                bgColor
                width
                height
                sizes
                srcSet
                webpSrcSet
                src
              }
            }
          }
        }
      `,
    });
    this.imageData = data.page.image;
  },
};
</script>
```

## Props

| prop                 | type                     | required | description                                                                                                                                                                                                                                                                                       | default             |
| -------------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| data                 | `ResponsiveImage` object | ✅       | The responsive you get from a DatoCMS `reponsiveImage` query                                                                                                                                                                                                                                      | —                   |
| fadeInDuration       | number                   | ❌       | Duration (in ms) of the fade in transition when image has loaded                                                                                                                                                                                                                                  | `null`              |
| intersectionTreshold | number                   | ❌       | A value between `0.0` and `1.0` indicating at what percentage of the placeholder visibility that the image should start loading. `0.0` meas at soon as just one pixel is in the viewport and `1.0` means that the entire placeholder has to be in the viewport to start loading the actual image. | `0.0`               |
| intersectionMargin   | string                   | ❌       | The margins around the placeholder when considering intersection. Value should be like the CSS counterpart (top, right, bottom, left) and can be pixels as well as percentages. Used to compute the bounding box before computing intersection.                                                   | `"0px 0px 0px 0px"` |
| lazyload             | boolean                  | ❌       | Whether lazy loading is enabled or not. If not enabled the image will be eagerly loaded and intersection will not be computed.                                                                                                                                                                    | `true`              |

### The `ResponsiveImage` object

This should be the object returned from your GraphQL query. There are some required properties:

| property    | type   | required | description                                                                                                                           |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| aspectRatio | number | ✅       | The aspect ratio of the image                                                                                                         |
| width       | number | ✅       | The width of the image                                                                                                                |
| height      | number | ✅       | The height of the image                                                                                                               |
| sizes       | string | ✅       | The HTML5 `sizes` attribute for the image                                                                                             |
| srcSet      | string | ✅       | The HTML5 `srcset` attribute for the image                                                                                            |
| webpSrcSet  | string | ❌       | The HTML5 `srcset` attribute for the image in WebP format (for browsers that support that)                                            |
| alt         | string | ❌       | Alternative text `alt` for the image. Not required but recommended for acceisiblity reasons if the image is important for the content |
| title       | string | ❌       | Title attribute `title` for the image                                                                                                 |
| bgColor     | string | ❌       | The background color for the image placeholder                                                                                        |
| base64      | string | ❌       | A base64-encoded thumbnail used for the placeholder                                                                                   |
