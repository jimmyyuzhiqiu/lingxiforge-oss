<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Lock, User, Message } from "@element-plus/icons-vue";
import { loginUser, registerUser } from "@/utils/auth";
import { useTokenStore } from "@/stores";

const router = useRouter();
const route = useRoute();
const tokenStore = useTokenStore();

const mode = ref<"login" | "register">("login");
const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();

const loginForm = reactive({
  account: "",
  password: "",
  remember: true,
});

const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  confirm: "",
  agree: true,
});

const loginRules: FormRules = {
  account: [
    { required: true, message: "请输入账号或邮箱", trigger: "blur" },
    { min: 2, message: "账号长度至少 2 位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度至少 6 位", trigger: "blur" },
  ],
};

const validatePassword = (_: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) return callback(new Error("请输入密码"));
  if (value.length < 8) return callback(new Error("密码长度至少 8 位"));
  callback();
};

const validateConfirm = (_: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) return callback(new Error("请再次输入密码"));
  if (value !== registerForm.password) return callback(new Error("两次密码不一致"));
  callback();
};

const registerRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, message: "用户名至少 2 位", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "邮箱格式不正确",
      trigger: ["blur", "change"],
    },
  ],
  password: [{ validator: validatePassword, trigger: "blur" }],
  confirm: [{ validator: validateConfirm, trigger: "blur" }],
};

const switchMode = (next: "login" | "register") => {
  mode.value = next;
  router.replace({ path: next === "login" ? "/login" : "/register", query: route.query });
};

const handleLogin = async () => {
  if (!loginFormRef.value) return;
  await loginFormRef.value.validate();
  try {
    const { token, user } = await loginUser({
      account: loginForm.account,
      password: loginForm.password,
    });
    tokenStore.setToken(token);
    ElMessage.success(`欢迎回来，${user.displayName || user.username}`);
    const redirect = (route.query.redirect as string) || "/home";
    router.push(redirect);
  } catch (error: any) {
    ElMessage.error(error?.message || "登录失败");
  }
};

const handleRegister = async () => {
  if (!registerFormRef.value) return;
  await registerFormRef.value.validate();
  if (!registerForm.agree) {
    ElMessage.warning("请勾选服务条款");
    return;
  }
  try {
    await registerUser({
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    });
    ElMessage.success("注册成功，请登录");
    loginForm.account = registerForm.username;
    loginForm.password = registerForm.password;
    switchMode("login");
  } catch (error: any) {
    ElMessage.error(error?.message || "注册失败");
  }
};

const loginTitle = computed(() => (mode.value === "login" ? "欢迎回来" : "加入 Lingxi Forge"));

onMounted(() => {
  if (route.path === "/register" || route.query.mode === "register") {
    mode.value = "register";
  }
});

watch(
  () => route.path,
  (path) => {
    if (path === "/register") mode.value = "register";
    if (path === "/login") mode.value = "login";
  }
);
</script>

<template>
  <div class="auth-page auth-scene" data-forge-motion-root>
    <div class="auth-grid">
      <section class="auth-hero glass-card">
        <div class="brand">
          <div class="logo">Lingxi Forge</div>
          <div class="tag">Future Glass • 3D 文创平台</div>
        </div>
        <h1>{{ loginTitle }}</h1>
        <p class="subtitle">
          以玻璃质感的未来视觉重新定义文创生成体验，连接灵感、设计、打印与履约。
        </p>
        <div class="hero-metrics">
          <div class="metric glass-card">
            <div class="value">30+</div>
            <div class="label">馆方合作</div>
          </div>
          <div class="metric glass-card">
            <div class="value">4h</div>
            <div class="label">最快打样</div>
          </div>
          <div class="metric glass-card">
            <div class="value">70%</div>
            <div class="label">成品率</div>
          </div>
        </div>
        <ul class="hero-list">
          <li>多模态生成与可制造优化</li>
          <li>文博 IP 合规与素材归档</li>
          <li>打印履约与供应链协同</li>
        </ul>
      </section>

      <section class="auth-card glass-card">
        <div class="auth-tabs">
          <button :class="{ active: mode === 'login' }" @click="switchMode('login')">登录</button>
          <button :class="{ active: mode === 'register' }" @click="switchMode('register')">注册</button>
        </div>

        <p class="demo-auth-notice" role="note">
          演示登录仅用于界面体验，账号数据只保存在当前浏览器，不构成真实身份认证。请勿使用真实密码或填写敏感信息。
        </p>

        <div v-if="mode === 'login'" class="auth-body">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-position="top">
            <el-form-item label="账号 / 邮箱" prop="account">
              <el-input v-model="loginForm.account" placeholder="输入账号或邮箱" :prefix-icon="User" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" type="password" show-password placeholder="输入密码"
                :prefix-icon="Lock" />
            </el-form-item>
            <div class="row">
              <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
              <span class="link">忘记密码</span>
            </div>
            <el-button type="primary" class="primary-btn" @click="handleLogin">登录</el-button>
          </el-form>
        </div>

        <div v-else class="auth-body">
          <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" label-position="top">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username" placeholder="设置用户名" :prefix-icon="User" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerForm.email" placeholder="用于接收通知" :prefix-icon="Message" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registerForm.password" type="password" show-password placeholder="设置密码"
                :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm">
              <el-input v-model="registerForm.confirm" type="password" show-password placeholder="再次确认密码"
                :prefix-icon="Lock" />
            </el-form-item>
            <div class="row">
              <el-checkbox v-model="registerForm.agree">同意服务条款与隐私政策</el-checkbox>
            </div>
            <el-button type="primary" class="primary-btn" @click="handleRegister">创建账号</el-button>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/auth/login.scss";

.demo-auth-notice {
  margin: 12px 22px 0;
  padding: 10px 12px;
  border: 1px solid rgba(217, 119, 6, 0.28);
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.08);
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
}
</style>
