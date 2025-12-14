import { apiClient } from "@/lib/interceptor/clientInterceptor";

export async function logoutApi() {
  return apiClient.post("/auth/logout");
}
