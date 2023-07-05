import React from "react";
import {
  Link,
  Form,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  // console.log(data);
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";

  const isSubmitting = navigation.state === "submitting";

  // console.log(isLogin);
  return (
    <section className="form-section">
      <p>{isLogin ? "Login to your Account" : "Create a new account now!"}</p>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <Form method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button className="btn login-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : isLogin ? "Login" : "Register"}
        </button>
      </Form>
      {isLogin ? (
        <p className="create-acc">
          Don't have an account?{" "}
          <Link to={"/auth?mode=signup"} className="reg">
            Register Here!
          </Link>
        </p>
      ) : (
        <p className="create-acc">
          Already have an account?{" "}
          <Link to={"/auth?mode=login"}>Login Here!</Link>
        </p>
      )}
    </section>
  );
};

export default AuthForm;
