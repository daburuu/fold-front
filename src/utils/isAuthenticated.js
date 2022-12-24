
export default function isAuthenticated() {
    const token = localStorage.getItem("authToken");
    return token ? true : false;
}
