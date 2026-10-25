export type AuthRole = "admin" | "user";

export type AuthUser = {
  id: string;
  username: string;
  email?: string;
  role: AuthRole;
  displayName?: string;
  createdAt: string;
};

type StoredAuthUser = AuthUser & {
  passwordSalt: string;
  passwordHash: string;
};

const USERS_KEY = "lingxiforge_demo_users_v2";
const CURRENT_USER_KEY = "lingxiforge_demo_current_user_v2";
const TOKEN_KEY = "lingxiforge_demo_token_v2";
const LEGACY_KEYS = [
  "lingxiforge_users",
  "tifa_users",
  "lingxiforge_current_user",
  "tifa_current_user",
  "token",
];

const clearLegacyDemoState = () => {
  const hasLegacyState = LEGACY_KEYS.some((key) => localStorage.getItem(key) !== null);
  if (!hasLegacyState) return;
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

const bytesToHex = (bytes: Uint8Array) =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const hexToBytes = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
};

const secureRandomHex = (byteLength: number) => {
  if (typeof crypto === "undefined" || typeof crypto.getRandomValues !== "function") {
    throw new Error("当前浏览器不支持安全随机数，请使用 HTTPS 或 localhost。");
  }
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
};

const createToken = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : secureRandomHex(24);

const derivePasswordHash = async (password: string, saltHex: string) => {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    throw new Error("密码保护需要安全上下文，请使用 HTTPS 或 localhost。");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBytes(saltHex),
      iterations: 210000,
      hash: "SHA-256",
    },
    key,
    256
  );
  return bytesToHex(new Uint8Array(derived));
};

const constantTimeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let i = 0; i < left.length; i += 1) {
    difference |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return difference === 0;
};

const isStoredUser = (value: unknown): value is StoredAuthUser => {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<StoredAuthUser>;
  return (
    typeof user.id === "string" &&
    typeof user.username === "string" &&
    typeof user.passwordSalt === "string" &&
    typeof user.passwordHash === "string" &&
    typeof user.createdAt === "string" &&
    (user.role === "admin" || user.role === "user")
  );
};

const readUsers = (): StoredAuthUser[] => {
  clearLegacyDemoState();
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isStoredUser) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredAuthUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toPublicUser = (user: StoredAuthUser): AuthUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  displayName: user.displayName,
  createdAt: user.createdAt,
});

export const getUsers = (): AuthUser[] => readUsers().map(toPublicUser);

export const getCurrentUser = (): AuthUser | null => {
  clearLegacyDemoState();
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as AuthUser;
    if (!user || typeof user.id !== "string" || typeof user.username !== "string") return null;
    return user;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  clearLegacyDemoState();
  const token = localStorage.getItem(TOKEN_KEY);
  return Boolean(token && token.length > 6);
};

/**
 * Front-end-only demonstration authentication. This is not a security boundary
 * and must not be used for real accounts or sensitive data.
 */
export const registerUser = async (payload: {
  username: string;
  password: string;
  email?: string;
}): Promise<AuthUser> => {
  const users = readUsers();
  const exists = users.some(
    (user) =>
      user.username.toLowerCase() === payload.username.toLowerCase() ||
      (payload.email && user.email?.toLowerCase() === payload.email.toLowerCase())
  );
  if (exists) throw new Error("用户名或邮箱已存在");

  const passwordSalt = secureRandomHex(16);
  const passwordHash = await derivePasswordHash(payload.password, passwordSalt);
  const user: StoredAuthUser = {
    id: createToken(),
    username: payload.username,
    passwordSalt,
    passwordHash,
    email: payload.email,
    role: "user",
    displayName: payload.username,
    createdAt: new Date().toISOString(),
  };
  users.unshift(user);
  writeUsers(users);
  return toPublicUser(user);
};

export const loginUser = async (payload: {
  account: string;
  password: string;
}): Promise<{ user: AuthUser; token: string }> => {
  const users = readUsers();
  const match = users.find(
    (user) =>
      user.username.toLowerCase() === payload.account.toLowerCase() ||
      user.email?.toLowerCase() === payload.account.toLowerCase()
  );
  if (!match) throw new Error("账号或密码错误");

  const passwordHash = await derivePasswordHash(payload.password, match.passwordSalt);
  if (!constantTimeEqual(passwordHash, match.passwordHash)) {
    throw new Error("账号或密码错误");
  }

  const token = createToken();
  const user = toPublicUser(match);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { user, token };
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
};

/** @deprecated The demo no longer creates a hard-coded administrator account. */
export const ensureAdminAccount = () => {};
