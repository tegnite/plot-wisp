export default async function Home() {
    const url = process.env.API_URL;
    const response = await fetch(url as string);
    const data = await response.json();
    console.log("data", data);
    return <div className="w-screen h-screen flex justify-center items-center bg-background text-foreground">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-card border border-border">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                >
                    Register
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>
                    Already have an account?{" "}
                    <a href="/auth/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    </div>
}
