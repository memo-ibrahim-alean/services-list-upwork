export default function AuthButton({ loggedIn, onLogin, onLogout }) {
  return (
    <div className="auth-box">
      {loggedIn ? (
        <button className="btn secondary" onClick={onLogout}>
          Logout
        </button>
      ) : (
        <button className="btn primary" onClick={onLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="G"
            width="16"
            style={{ marginRight: 6 }}
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
}