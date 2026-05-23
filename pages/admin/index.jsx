import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { ColorSchemeScript, Loader, TextInput } from "@mantine/core";
import { IconLock, IconAlertCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { endPoints, getEndpoint } from "../../lib/pages";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function authenticate() {
      let token = getCookie("auth");
      if (token) {
        var result = await axios.post(getEndpoint(endPoints.sesAdmin), { token });
        if (!result.data.success) {
          router.push("/");
        } else {
          router.push("/admin/dashboard");
        }
      }
    }
    authenticate();
  });

  const validate_admin = async () => {
    setIsLoading(true);
    var result = await axios.post(getEndpoint(endPoints.authAdmin), { password });
    if (result.status === 200) {
      if (result.data.success) {
        setCookie("auth", result.data.token);
        setLoginError("");
        router.push("/admin/dashboard");
      } else {
        setLoginError(result.data.message);
      }
    } else {
      console.log("============ ERROR ============");
      console.log(result);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <ColorSchemeScript />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3.5">
                <IconLock size={24} stroke={1.5} className="text-gray-700" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-sm text-gray-400 mt-1">
                  Enter your password to access the dashboard
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3">
              <TextInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && validate_admin()}
              />
              <button
                className="w-full py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                onClick={validate_admin}
                disabled={isLoading}
              >
                {isLoading ? <Loader color="white" size="xs" /> : "Sign In"}
              </button>

              {loginError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2.5">
                  <IconAlertCircle size={16} className="flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
