(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/ssr/src_1055omv._.js",
"[project]/src/app/(auth)/login/page.jsx [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$navigation$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/navigation.js [app-edge-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/components/navigation.js [app-edge-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/client/app-dir/link.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-edge-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-edge-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-edge-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.mjs [app-edge-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-edge-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.jsx [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.jsx [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.jsx [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.jsx [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$auth$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validations/auth.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authStore$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/authStore.js [app-edge-ssr] (ecmascript)");
// // "use client";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import Link from "next/link";
// // import { toast } from "sonner";
// // import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { loginSchema } from "@/lib/validations/auth";
// // import { api } from "@/lib/api";
// // import { useAuthStore } from "@/store/authStore";
// // export default function LoginPage() {
// //   const router = useRouter();
// //   const setAuth = useAuthStore((s) => s.setAuth);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({ resolver: zodResolver(loginSchema) });
// //   const onSubmit = async (values) => {
// //     setLoading(true);
// //     try {
// //       const res = await api.post("/api/v1/login/user", values);
// //       if (res.data.success) {
// //         const { access_token, refresh_token, user } = res.data.data;
// //         setAuth(user, access_token, refresh_token);
// //         toast.success(`Welcome back, ${user.first_name}!`);
// //         router.push("/dashboard");
// //       }
// //     } catch (err) {
// //       toast.error(err?.response?.data?.detail || "Invalid email or password");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   return (
// //     <div className="animate-fadeInUp">
// //       <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-9 space-y-7">
// //         {/* Header */}
// //         <div className="space-y-1.5">
// //           <div className="lg:hidden h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-red-700 flex items-center justify-center font-bold text-white text-base mb-4">
// //             E
// //           </div>
// //           <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Welcome back</h1>
// //           <p className="text-sm text-slate-500">Log in to access your EZlikfe workspace</p>
// //         </div>
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
// //           {/* Email */}
// //           <div className="space-y-1.5">
// //             <Label htmlFor="email" className="text-slate-700 text-sm font-medium">
// //               Email address
// //             </Label>
// //             <div className="relative">
// //               <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="you@company.com"
// //                 className="h-11 pl-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors"
// //                 {...register("email")}
// //               />
// //             </div>
// //             {errors.email && (
// //               <p className="text-xs text-red-500 pl-0.5">{errors.email.message}</p>
// //             )}
// //           </div>
// //           {/* Password */}
// //           <div className="space-y-1.5">
// //             <div className="flex items-center justify-between">
// //               <Label htmlFor="password" className="text-slate-700 text-sm font-medium">
// //                 Password
// //               </Label>
// //               <Link
// //                 href="/forgot-password"
// //                 className="text-xs text-primary font-medium hover:underline"
// //               >
// //                 Forgot password?
// //               </Link>
// //             </div>
// //             <div className="relative">
// //               <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
// //               <Input
// //                 id="password"
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="••••••••"
// //                 className="h-11 pl-10 pr-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors"
// //                 {...register("password")}
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword((v) => !v)}
// //                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
// //               >
// //                 {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //               </button>
// //             </div>
// //             {errors.password && (
// //               <p className="text-xs text-red-500 pl-0.5">{errors.password.message}</p>
// //             )}
// //           </div>
// //           {/* Remember me */}
// //           <div className="flex items-center gap-2">
// //             <Checkbox id="remember" />
// //             <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">
// //               Keep me signed in
// //             </Label>
// //           </div>
// //           {/* Submit */}
// //           <Button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
// //           >
// //             {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
// //           </Button>
// //         </form>
// //         {/* Divider */}
// //         <div className="relative">
// //           <div className="absolute inset-0 flex items-center">
// //             <div className="w-full border-t border-slate-200" />
// //           </div>
// //           <div className="relative flex justify-center text-xs">
// //             <span className="bg-white px-3 text-slate-400">or</span>
// //           </div>
// //         </div>
// //         {/* Google button (optional, remove if not needed) */}
// //         <button
// //           type="button"
// //           className="w-full h-11 rounded-md border border-slate-200 flex items-center justify-center gap-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
// //         >
// //           <svg className="h-4 w-4" viewBox="0 0 24 24">
// //             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
// //             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
// //             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
// //             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
// //           </svg>
// //           Continue with Google
// //         </button>
// //       </div>
// //       <p className="text-sm text-center text-slate-500 mt-6">
// //         Don&apos;t have an account?{" "}
// //         <Link href="/signup" className="text-primary font-medium hover:underline">
// //           Create one
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { toast } from "sonner";
// import {
//   Eye,
//   EyeOff,
//   Loader2,
//   Mail,
//   Lock,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { loginSchema } from "@/lib/validations/auth";
// import { api } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";
// export default function LoginPage() {
//   const router = useRouter();
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });
//   // =====================================================
//   // NORMAL LOGIN
//   // =====================================================
//   const onSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const res = await api.post(
//         "/api/v1/login/user",
//         values
//       );
//       if (res.data.success) {
//         const {
//           access_token,
//           refresh_token,
//           user,
//         } = res.data.data;
//         setAuth(
//           user,
//           access_token,
//           refresh_token
//         );
//         toast.success(
//           `Welcome back, ${user.first_name}!`
//         );
//         router.push("/dashboard");
//       }
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.detail ||
//           "Invalid email or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   // =====================================================
//   // GOOGLE LOGIN
//   // =====================================================
//   const handleGoogleLogin = () => {
//     setGoogleLoading(true);
//     window.location.href =
//       "http://localhost:8000/api/v1/auth/google/login";
//   };
//   return (
//     <div className="animate-fadeInUp">
//       <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-9 space-y-7">
//         {/* ================================================= */}
//         {/* HEADER */}
//         {/* ================================================= */}
//         <div className="space-y-1.5">
//           <div className="lg:hidden h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-red-700 flex items-center justify-center font-bold text-white text-base mb-4">
//             E
//           </div>
//           <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
//             Welcome back
//           </h1>
//           <p className="text-sm text-slate-500">
//             Log in to access your EZlikfe workspace
//           </p>
//         </div>
//         {/* ================================================= */}
//         {/* LOGIN FORM */}
//         {/* ================================================= */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-5"
//         >
//           {/* EMAIL */}
//           <div className="space-y-1.5">
//             <Label
//               htmlFor="email"
//               className="text-slate-700 text-sm font-medium"
//             >
//               Email address
//             </Label>
//             <div className="relative">
//               <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="you@company.com"
//                 className="h-11 pl-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors"
//                 {...register("email")}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-xs text-red-500 pl-0.5">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>
//           {/* PASSWORD */}
//           <div className="space-y-1.5">
//             <div className="flex items-center justify-between">
//               <Label
//                 htmlFor="password"
//                 className="text-slate-700 text-sm font-medium"
//               >
//                 Password
//               </Label>
//               <Link
//                 href="/forgot-password"
//                 className="text-xs text-primary font-medium hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 id="password"
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 placeholder="••••••••"
//                 className="h-11 pl-10 pr-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors"
//                 {...register("password")}
//               />
//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(
//                     (value) => !value
//                   )
//                 }
//                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-4 w-4" />
//                 ) : (
//                   <Eye className="h-4 w-4" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-xs text-red-500 pl-0.5">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>
//           {/* REMEMBER ME */}
//           <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label
//               htmlFor="remember"
//               className="text-sm font-normal text-slate-600 cursor-pointer"
//             >
//               Keep me signed in
//             </Label>
//           </div>
//           {/* LOGIN BUTTON */}
//           <Button
//             type="submit"
//             disabled={
//               loading ||
//               googleLoading
//             }
//             className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5"
//           >
//             {loading ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               "Log in"
//             )}
//           </Button>
//         </form>
//         {/* ================================================= */}
//         {/* DIVIDER */}
//         {/* ================================================= */}
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-slate-200" />
//           </div>
//           <div className="relative flex justify-center text-xs">
//             <span className="bg-white px-3 text-slate-400">
//               or
//             </span>
//           </div>
//         </div>
//         {/* ================================================= */}
//         {/* GOOGLE LOGIN */}
//         {/* ================================================= */}
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           disabled={
//             googleLoading ||
//             loading
//           }
//           className="w-full h-11 rounded-md border border-slate-200 flex items-center justify-center gap-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           {googleLoading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <svg
//               className="h-4 w-4"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//           )}
//           {googleLoading
//             ? "Connecting to Google..."
//             : "Continue with Google"}
//         </button>
//       </div>
//       {/* ================================================= */}
//       {/* SIGNUP */}
//       {/* ================================================= */}
//       <p className="text-sm text-center text-slate-500 mt-6">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/signup"
//           className="text-primary font-medium hover:underline"
//         >
//           Create one
//         </Link>
//       </p>
//     </div>
//   );
// }
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const dynamic = 'force-dynamic';
const runtime = 'edge';
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:8000";
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$components$2f$navigation$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useSearchParams"])();
    const setAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authStore$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])((state)=>state.setAuth);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [googleLoading, setGoogleLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasHandledCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validations$2f$auth$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["loginSchema"])
    });
    // =====================================================
    // GOOGLE CALLBACK HANDLING — page load pe hi check karo
    // =====================================================
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hasHandledCallback.current) return;
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const error = searchParams.get("error");
        // Agar koi google params hi nahi hain, to normal login page hai — kuch mat karo
        if (!accessToken && !refreshToken && !error) return;
        hasHandledCallback.current = true;
        if (error) {
            const messages = {
                not_registered: "User not registered in HRMS"
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(messages[error] || "Google login failed");
            router.replace("/login"); // URL se query params hata do
            return;
        }
        if (accessToken && refreshToken) {
            setGoogleLoading(true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["api"].get("/api/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then((res)=>{
                const user = res.data.data || res.data;
                setAuth(user, accessToken, refreshToken);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Welcome, ${user.first_name}!`);
                router.push("/dashboard");
            }).catch(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Login failed, please try again");
                setGoogleLoading(false);
                router.replace("/login");
            });
        }
    }, [
        searchParams
    ]);
    // =====================================================
    // NORMAL EMAIL + PASSWORD LOGIN
    // =====================================================
    const onSubmit = async (values)=>{
        setLoading(true);
        try {
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["api"].post("/api/v1/login/user", values);
            if (res.data.success) {
                const { access_token, refresh_token, user } = res.data.data;
                setAuth(user, access_token, refresh_token);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Welcome back, ${user.first_name}!`);
                router.push("/dashboard");
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(err?.response?.data?.detail || "Invalid email or password");
        } finally{
            setLoading(false);
        }
    };
    // =====================================================
    // GOOGLE LOGIN — redirect start
    // =====================================================
    const handleGoogleLogin = ()=>{
        try {
            setGoogleLoading(true);
            window.location.href = `${API_URL}/api/v1/auth/google/login`;
        } catch (error) {
            console.error("Google login error:", error);
            setGoogleLoading(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Unable to connect with Google");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-fadeInUp",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl border border-slate-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sm:p-9 space-y-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:hidden h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-red-700 flex items-center justify-center font-bold text-white text-base mb-4",
                                children: "E"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 697,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold text-slate-900 tracking-tight",
                                children: "Welcome back"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 701,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "Log in to access your EZlife workspace"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 705,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit(onSubmit),
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "email",
                                        className: "text-slate-700 text-sm font-medium",
                                        children: "Email address"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 714,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 719,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "email",
                                                type: "email",
                                                placeholder: "you@company.com",
                                                className: "h-11 pl-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors",
                                                ...register("email")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 721,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 718,
                                        columnNumber: 13
                                    }, this),
                                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-500 pl-0.5",
                                        children: errors.email.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 731,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 713,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "password",
                                                className: "text-slate-700 text-sm font-medium",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 738,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/forgot-password",
                                                className: "text-xs text-primary font-medium hover:underline",
                                                children: "Forgot password?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 742,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 737,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 748,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                id: "password",
                                                type: showPassword ? "text" : "password",
                                                placeholder: "••••••••",
                                                className: "h-11 pl-10 pr-10 bg-slate-50/50 border-slate-200 focus-visible:bg-white transition-colors",
                                                ...register("password")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 750,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowPassword((value)=>!value),
                                                className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors",
                                                children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                    lineNumber: 763,
                                                    columnNumber: 33
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                    lineNumber: 763,
                                                    columnNumber: 66
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                                lineNumber: 758,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 747,
                                        columnNumber: 13
                                    }, this),
                                    errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-500 pl-0.5",
                                        children: errors.password.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 768,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        id: "remember"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 774,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "remember",
                                        className: "text-sm font-normal text-slate-600 cursor-pointer",
                                        children: "Keep me signed in"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 775,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 773,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                type: "submit",
                                disabled: loading || googleLoading,
                                className: "w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:-translate-y-0.5",
                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/login/page.jsx",
                                    lineNumber: 786,
                                    columnNumber: 24
                                }, this) : "Log in"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 781,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                        lineNumber: 711,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full border-t border-slate-200"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/login/page.jsx",
                                    lineNumber: 793,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 792,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex justify-center text-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-white px-3 text-slate-400",
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/login/page.jsx",
                                    lineNumber: 797,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 796,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                        lineNumber: 791,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleGoogleLogin,
                        disabled: loading || googleLoading,
                        className: "w-full h-11 rounded-md border border-slate-200 flex items-center justify-center gap-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                        children: [
                            googleLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 809,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "h-4 w-4",
                                viewBox: "0 0 24 24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#4285F4",
                                        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#34A853",
                                        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 813,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#FBBC05",
                                        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 814,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fill: "#EA4335",
                                        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                                        lineNumber: 815,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/login/page.jsx",
                                lineNumber: 811,
                                columnNumber: 13
                            }, this),
                            googleLoading ? "Connecting to Google..." : "Continue with Google"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                        lineNumber: 802,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/login/page.jsx",
                lineNumber: 694,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-center text-slate-500 mt-6",
                children: [
                    "Don't have an account?",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/signup",
                        className: "text-primary font-medium hover:underline",
                        children: "Create one"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/login/page.jsx",
                        lineNumber: 825,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/login/page.jsx",
                lineNumber: 823,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(auth)/login/page.jsx",
        lineNumber: 693,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/button.jsx [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
;
function Button({ className = "", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.jsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/checkbox.jsx [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
;
function Checkbox({ className = "", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: "checkbox",
        className: `h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/checkbox.jsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ui/input.jsx [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-edge-ssr] (ecmascript)");
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className = "", ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: ref,
        className: `block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/src/components/ui/label.jsx [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
;
function Label({ className = "", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: `block text-sm font-medium text-slate-700 ${className}`,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.jsx",
        lineNumber: 2,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/lib/api.js [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-edge-ssr] (ecmascript)");
;
const baseURL = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:8000";
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use((config)=>{
    const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
});
800;
}),
"[project]/src/lib/validations/auth.js [app-edge-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loginSchema",
    ()=>loginSchema,
    "signupSchema",
    ()=>signupSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-edge-ssr] (ecmascript) <export * as z>");
;
const signupSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Company name is required"),
    company_email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Enter a valid email"),
    company_mobile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, "Enter a valid mobile number").max(15, "Enter a valid mobile number"),
    company_address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    company_city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    company_state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    company_country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    company_zipcode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    company_landline: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "First name is required"),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Last name is required"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters"),
    confirm_password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
}).refine((data)=>data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: [
        "confirm_password"
    ]
});
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Enter a valid email"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required")
});
}),
]);

//# sourceMappingURL=src_1055omv._.js.map