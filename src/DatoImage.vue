<template>
  <div ref="wrapper" role="presentation" :style="wrapperStyle">
    <img :style="sizerStyle" :src="sizerSrc" role="presentation" />
    <div data-test="placeholder" :style="placeholderStyle" />
    <picture data-test="picture" v-if="addImage" :style="pictureStyle">
      <source
        v-if="data.webpSrcSet"
        :srcset="data.webpSrcSet"
        :sizes="data.sizes"
      />
      <source v-if="data.srcSet" :srcset="data.srcSet" :sizes="data.sizes" />
      <img
        v-if="data.src"
        :src="data.src"
        :alt="data.alt"
        :title="data.title"
        @load="handleLoad"
        :style="{ width: '100%' }"
      />
    </picture>
    <component :is="'noscript'">
      <picture :style="pictureStyle">
        <source
          v-if="data.webpSrcSet"
          :srcset="data.webpSrcSet"
          :sizes="data.sizes"
        />
        <source v-if="data.srcSet" :srcset="data.srcSet" :sizes="data.sizes" />
        <img
          v-if="data.src"
          :src="data.src"
          :alt="data.alt"
          :title="data.title"
        />
      </picture>
    </component>
  </div>
</template>

<script>
const isSsr = typeof window === "undefined";
const universalBtoa = isSsr
  ? (str) => Buffer.from(str.toString(), "binary").toString("base64")
  : window.btoa;
const isIntersectionObserverAvailable = isSsr
  ? false
  : !!window.IntersectionObserver;

const absolutePositioning = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export default {
  name: "DatoImage",
  props: {
    // ResponsiveImage from DatoCMS image field
    data: {
      type: Object,
      required: true,
    },
    // class for wrapper
    // class: {
    //   type: String,
    // },
    // class for inner <picture> element
    pictureClass: {
      type: String,
    },
    // Duration (in ms) of the fade-in transition effect when image loaded
    fadeInDuration: {
      type: Number,
    },
    // Indicate at what percentage of the placeholder visibility the loading of the image should be triggered. A value of 0 means that as soon as even one pixel is visible, the callback will be run. A value of 1.0 means that the threshold isn't considered passed until every pixel is visible
    intersectionTreshold: {
      type: Number,
      default: 0,
    },
    // Margin around the placeholder. Can have values similar to the CSS margin property (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the placeholder element's bounding box before computing intersections
    intersectionMargin: {
      type: String,
      default: "0px 0px 0px 0px",
    },
    // Whether enable lazy loading or not
    lazyload: {
      type: Boolean,
      default: true,
    },
    // Additional wrapper styles
    // style: {
    //   type: [Object, String],
    // },
    // Additional inner <picture> element styles
    // pictureStyle: {
    //   type: [Object, String],
    // },
    // Whether the image wrapper should explicitely declare the width of the image or keep it fluid
    explicitWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      inView: false,
      //   lazyload: false,
    };
  },
  computed: {
    placeholderStyle() {
      return {
        ...absolutePositioning,
        backgroundImage: this.data.base64
          ? `url(${this.data.base64})`
          : undefined,
        backgroundColor: this.data.bgColor,
        backgroundSize: "cover",
        opacity: this.showImage ? 0 : 1,
        transition:
          !this.fadeInDuration || this.fadeInDuration > 0
            ? `opacity ${this.fadeInDuration || 500}ms ${
                this.fadeInDuration || 500
              }ms`
            : undefined,
      };
    },
    pictureStyle() {
      return {
        ...absolutePositioning,
        opacity: this.showImage ? 1 : 0,
        transition:
          !this.fadeInDuration || this.fadeInDuration > 0
            ? `opacity ${this.fadeInDuration || 500}ms`
            : undefined,
      };
    },
    wrapperStyle() {
      return {
        display: this.explicitWidth ? "inline-block" : "block",
        overflow: "hidden",
        position: "relative",
      };
    },
    sizerStyle() {
      return {
        display: "block",
        width: this.explicitWidth ? `${this._width}px` : "100%",
      };
    },
    sizerSrc() {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this._width}" height="${this._height}"></svg>`;
      return `data:image/svg+xml;base64,${universalBtoa(svg)}`;
    },
    addImage() {
      if (!this.lazyload) return true;
      if (isSsr) return false;
      if (isIntersectionObserverAvailable) return this.inView || this.loaded;
      return true;
    },
    showImage() {
      if (!this.lazyload) return true;
      if (isSsr) return false;
      if (isIntersectionObserverAvailable) return this.loaded;
      return true;
    },
    _width() {
      return this.data.width;
    },
    aspectRatio() {
      return this.data.aspectRation;
    },
    _height() {
      return this.data.height || this._width / this.aspectRatio;
    },
  },
  methods: {
    handleLoad() {
      this.loaded = true;
    },
    destroyObserver() {
      if (this.$$observer) {
        this.$$observer.unobserve(this.$refs.wrapper);
        this.$$observer = undefined;
      }
    },
    createObserver() {
      this.destroyObserver();

      const options = {
        threshold: this.intersectionTreshold,
        rootMargin: this.intersectionMargin,
      };

      this.$$observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry)
          throw new Error(
            "Fatal error with Vue Dato Image: Zero observer entries"
          );
        if (entry.isIntersecting) {
          this.inView = true;
          this.destroyObserver();
        }
      }, options);

      this.$$observer.observe(this.$refs.wrapper);
    },
  },
  mounted() {
    if (this.lazyload) {
      this.createObserver();
    }
  },
  beforeDestroy() {
    this.destroyObserver();
  },
};
</script>

<style></style>
