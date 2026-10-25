import request from "@/services/http";
import { type CreateLeadPayload, type CreateLeadResponse } from "./type";

enum API {
  Leads_Post_URL = "/leads",
}

export const createLead = (data: CreateLeadPayload) => {
  return request.post<CreateLeadPayload, CreateLeadResponse>(API.Leads_Post_URL, data);
};

export type { CreateLeadPayload } from "./type";

