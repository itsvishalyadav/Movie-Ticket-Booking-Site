import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
function SideBar({ username, name }) {
    const navigate = useNavigate();
    async function handleSignout() {
        const res = await fetch("http://localhost:8080/api/signout", { credentials: "include" });
        navigate("/home");
    }
    return (
        <div className={styles["sidebar-container"]}>
            <div className={styles["user-info"]}>
                <div className={styles.img}>
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"></img>
                </div>
                <div className={styles.info}>
                    <h3>{name}</h3>
                    <p>{username}</p>
                </div>
            </div>
            <hr className={styles["sidebar-hr"]} />
            <div className={styles.navs}>
                <p>👤 My Account</p>
                <p>🎫 My Bookings</p>
                <p onClick={handleSignout}>➡️ Sign Out</p>
            </div>
        </div>
    );
}

export default SideBar;