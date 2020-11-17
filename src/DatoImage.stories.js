import DatoImage from "./DatoImage.vue";

export default {
  title: "DatoImage",
  component: DatoImage,
};

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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatoImage },
  template:
    '<dato-image :style="style" :data="data" :fade-in-duration="fadeInDuration" />',
});

export const Default = Template.bind({});
Default.args = {
  data,
};

export const Sized = Template.bind({});
Sized.args = {
  data,
  style: { width: "300px" },
};

export const WithScroll = Template.bind({});
WithScroll.args = {
  data,
  style: { width: "300px", marginTop: "2000px" },
};

export const WithFade = Template.bind({});
WithFade.args = {
  data,
  style: { width: "300px" },
  fadeInDuration: 4000,
};
