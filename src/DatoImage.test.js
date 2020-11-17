import { mount } from "@vue/test-utils";
import Vue from "vue";

const data = {
  alt: null,
  aspectRatio: 0.7999342969776609,
  base64:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoIEwgVEA0RDhgPDhUNDhMVDREYGhgaGBYVFiEaHysjJikoHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OHBAQHC8cGig7OzUvLy8vLy8vLzU1Oy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAEwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABQYH/8QAIBAAAQMEAgMAAAAAAAAAAAAAAAECAwQGERJBYQUHMf/EABcBAAMBAAAAAAAAAAAAAAAAAAECAwT/xAAbEQACAQUAAAAAAAAAAAAAAAAAEQECEiNBQv/aAAwDAQACEQMRAD8A6BcM6NgI/iKlrnfRd9UsNIrs8EG2atZ02zyStdDNe0bxJUwCekq4AgWRPYeY/GvXojWIzehY7oAeJxidG00ABMDP/9k=",
  bgColor: "#9c623d",
  height: 6088,
  sizes: "(max-width: 600px) 480px, 800px",
  src: "https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg",
  srcSet:
    "https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.25 1217w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.5 2435w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.75 3652w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg 4870w",
  title: null,
  webpSrcSet:
    "https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.25&fm=webp 1217w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.5&fm=webp 2435w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?dpr=0.75&fm=webp 3652w,https://www.datocms-assets.com/7718/1553180542-ntk9148-edit.jpg?fm=webp 4870w",
  width: 4870,
};

describe("DatoImage", () => {
  let intersectionObserver;
  let observe;
  let unobserve;

  beforeEach(() => {
    intersectionObserver = jest.fn();
    observe = jest.fn();
    unobserve = jest.fn();

    intersectionObserver.mockReturnValue({ observe, unobserve });

    window.IntersectionObserver = intersectionObserver;
  });

  describe("not visible", () => {
    it("renders the blur-up initially", () => {
      const DatoImage = require("./DatoImage.vue").default;
      const wrapper = mount(DatoImage, { propsData: { data } });
      const placeholderWrapper = wrapper.find("[data-test=placeholder]");
      expect(placeholderWrapper.isVisible()).toBe(true);
    });

    it("observes intersection by default", () => {
      const DatoImage = require("./DatoImage.vue").default;
      const wrapper = mount(DatoImage, { propsData: { data } });
      expect(intersectionObserver.mock.instances.length).toBe(1);
      expect(observe.mock.calls.length).toBe(1);
      wrapper.destroy();
      expect(unobserve.mock.calls.length).toBe(1);
    });

    it("does not observe intersection if lazyload is off", () => {
      const DatoImage = require("./DatoImage.vue").default;
      const wrapper = mount(DatoImage, {
        propsData: { data, lazyload: false },
      });
      wrapper.destroy();
      expect(intersectionObserver.mock.instances.length).toBe(0);
      expect(observe.mock.calls.length).toBe(0);
      expect(unobserve.mock.calls.length).toBe(0);
    });
  });

  describe("visible", () => {
    it("add image when lazyloading and intersecting", () => {
      const DatoImage = require("./DatoImage.vue").default;
      const wrapper = mount(DatoImage, {
        propsData: {
          data,
        },
      });

      expect(wrapper.vm.addImage).toBe(false);

      const cb = intersectionObserver.mock.calls[0][0];
      cb([
        {
          isIntersecting: true,
        },
      ]);

      expect(wrapper.vm.addImage).toBe(true);
    });

    it("shows image when image is loaded and intersecting", (done) => {
      const DatoImage = require("./DatoImage.vue").default;
      const wrapper = mount(DatoImage, {
        propsData: {
          data,
        },
      });

      expect(wrapper.vm.showImage).toBe(false);

      const cb = intersectionObserver.mock.calls[0][0];
      cb([
        {
          isIntersecting: true,
        },
      ]);

      Vue.nextTick().then(() => {
        const pictureWrapper = wrapper.find("[data-test=picture]");
        const image = pictureWrapper.find("img");
        expect(pictureWrapper.isVisible()).toBe(false);
        image.trigger("load").then(() => {
          expect(pictureWrapper.isVisible()).toBe(true);
          done();
        });
      });
    });
  });
});
