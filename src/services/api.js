import { create } from "apisauce";

const api = create({
  baseURL: "http://35.188.128.118:8080/api"
});

// api.addRequestTransform(request => {
//   const token = "";
//   request.headers["Authorization"] = `Bearer ${token}`;
// });

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
