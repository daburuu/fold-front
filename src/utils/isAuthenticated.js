
export default function isAuthenticated() {
    const token = localStorage.getItem("userAddress");
    return token ? true : false;
}
