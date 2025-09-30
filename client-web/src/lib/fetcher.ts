export const fetcher = async (data: any) => {
    try{
        let headers: Record<string, string> = {};
        let body: BodyInit | undefined;
        if (data instanceof FormData) {
            body = data;
        } else if (data) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(data);
        }
        const res = await fetch("/url", {
            method: "POST",
            headers,
            body,
            credentials: "include",
        });
        if (!res.ok){
            return new Error('something went wrong');
        }
        return await res.json();
    }catch (e){
        return new Error((e as Error)?.message ||"something went wrong");
    }
};
