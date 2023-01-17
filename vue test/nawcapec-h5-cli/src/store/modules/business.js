import { getQueryString } from "@/utils/utils";
const business = {
  state: {
    needHeader: Boolean(getQueryString("needHeader")),
  },
  mutations: {},
};
export default business;
