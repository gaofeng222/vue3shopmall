import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const vLazyImg = {
  name: "lazy-img",
  mounted: (el, bingding) => {
    const target = ref(el);
    const targetIsVisible = ref(false);

    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting;
        console.log("🚀 ~ isIntersecting:", isIntersecting);
        if (isIntersecting) {
          el.src = bingding.value;
          // 优化性能，停止监听
          stop();
        }
      }
    );
  },
};

export default vLazyImg;
