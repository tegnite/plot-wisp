export const fetcher = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: any
) => {
  try {
    let headers: Record<string, string> = {};
    let body: BodyInit | undefined;

    if (data instanceof FormData) {
      body = data;
    } else if (data && method !== "GET") {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Error(errorText || `Request failed with status ${res.status}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    return null;
  } catch (e) {
    return new Error((e as Error)?.message || "something went wrong");
  }
};
