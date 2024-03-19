const { useEffect } = require("react");

const verifyEmail = ({ params }) => {
  useEffect(() => {
    axios
      .post("http://localhost:4000/auth/verify-email", {
        token: params.token,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Verify Email</h1>
      <p>Please check your email for a verification link.</p>
      <p>
        If you did not receive the email, please click
        <button
          onClick={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:4000/auth/verify-email", {
                token: params.token,
              })
              .then((res) => {
                alert("Verification link has been sent to your email address.");
              })
              .catch((err) => {
                alert("Retry");
              });
          }}
        >
          Resend verification link
        </button>
        .
      </p>
    </div>
  );
};

export default verifyEmail;
