import { useRef, useState } from 'react';

export default function FoldScanLogin({}){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [connected, setConnected] = useState(null);

    function handleSubmit(event){
        event.preventDefault();

        // CHECK IN DB IF USER EXISTS
        fetch(`${process.env.REACT_APP_BACKEND_URL}/loginScanAccount`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(async (response) => {
            const { datas } = await response.json();
            if(datas.error){
                return;
            }
            localStorage.setItem("token", datas.token);
            localStorage.setItem("username", datas.user.username);

            setConnected(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function checkToken(){
        fetch(`${process.env.REACT_APP_BACKEND_URL}/verifyToken`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("token")
            })
        }).then(async (response) =>{
            console.log(await response.json());
        });
    }

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-[#35363a] h-full">
            <div className="mx-auto max-w-lg">
                <div>
                    <img src="/logo.png" className="mx-auto"></img>
                </div>
                {connected && 
                    <div className="my-6 rounded-lg p-8 shadow-2xl text-white">
                        <p className="text-xl text-emerald-600 font-medium mb-8">Connecté</p>
                        <p className="text-xl">Vous pouvez maintenant scanner les tickets</p>
                    </div>
                }
                {!connected &&
                    <form onSubmit={handleSubmit} className="my-6 rounded-lg p-8 shadow-2xl text-white">
                        <p className="text-md font-medium mb-8">Se connecter</p>

                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>

                            <div className="relative mt-1">
                            <input
                                ref={usernameRef}
                                type="text"
                                id="email"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-gray-700"
                                placeholder="Enter email"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                                </svg>
                            </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>

                            <div className="relative mt-1">
                            <input
                                ref={passwordRef}
                                type="password"
                                id="password"
                                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-gray-700"
                                placeholder="Enter password"
                            />

                            <span className="absolute inset-y-0 right-4 inline-flex items-center">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                </svg>
                            </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>
                    </form>
                }
            </div>
        </div>
    )
}