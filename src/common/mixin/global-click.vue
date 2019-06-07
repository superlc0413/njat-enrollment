<script>
import $ from "jquery";

const globalCallbackList = [];

$(window).click(() => {
  globalCallbackList.forEach(_ => {
    _.do.call(null);
  });
});

export default {
  methods: {
    excuteGlobalClkExceptMe() {
      globalCallbackList.forEach(_ => {
        if (_.vm != this) _.do.call(null);
      });
    },
    registerGlobalClk(callback) {
      if (typeof callback == "function") {
        globalCallbackList.push({ vm: this, do: callback });
      }
    }
  }
};
</script>
