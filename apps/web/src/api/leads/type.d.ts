interface ResponseType<T> {
  code: number;
  success: boolean;
  msg: string;
  message?: string;
  data?: T;
}

export type LeadCompliance = {
  licenseOk: boolean;
  noSensitiveInfo: boolean;
  agreeProcess: boolean;
  needNda?: boolean;
};

export type LeadRequirements = {
  theme: string;
  skuCount: string;
  batchSize: string;
  timeline: string;
  materials?: string[];
  processes?: string[];
  notes?: string;
};

export type LeadContact = {
  org: string;
  name: string;
  title?: string;
  email: string;
  phone: string;
  city?: string;
  wechat?: string;
  preferredContact?: "邮箱" | "电话" | "微信";
};

export type CreateLeadPayload = {
  intent: string;
  role: string;
  files: string[];
  compliance: LeadCompliance;
  requirements: LeadRequirements;
  contact: LeadContact;
  meta?: Record<string, unknown>;
};

export type CreateLeadResponse = ResponseType<{ leadId: string }>;

